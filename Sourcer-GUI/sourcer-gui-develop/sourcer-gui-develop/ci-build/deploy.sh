set -e # Abort on first error

# Initialize AWS environment
aws-env-set $ENV_NAME

VERSION=${CI_COMMIT_TAG:-"${ENV_NAME}-${CI_COMMIT_SHORT_SHA}"}
ECS_NAME="${ENV_NAME}-${APP_NAME}"

ECR_HOST=$(cat ~/.aws-env.json | jq -r ".ecr_repo")
ECR_BASE="${ECR_HOST}/jobtarget/${ENV_NAME}-${APP_NAME}";
ECR_IMAGE_TAG="${ECR_BASE}:${ENV_NAME}"
GITLAB_IMAGE_TAG="${CI_REGISTRY_IMAGE}/${APP_NAME}:${VERSION}"

blue "## -------------------------------------------------- "
blue "## CI/CD Variables List"
blue "## -------------------------------------------------- "
blue "🔍 GITLAB_IMAGE_TAG = ${GITLAB_IMAGE_TAG} (Pull from here)"
blue "🔍 ECR_IMAGE_TAG    = ${ECR_IMAGE_TAG} (Push to here)"
blue "🔍 ECR_HOST         = ${ECR_HOST}"
blue "🔍 VERSION          = ${VERSION}"
blue "🔍 ECS_NAME         = ${ECS_NAME}"
blue "## -------------------------------------------------- "

# Checking the configuration file.
if [ -z "$ENV_FILE" ]; then
    red "CI variable is empty! 'ENV_FILE' "
    exit 1
elif [ -z "$ENV_FILE_DSTN" ]; then
    red "CI variable is empty! 'ENV_FILE_DSTN' "
    exit 1
else
    green "📝 Copying application config into application..."
    mv $ENV_FILE $ENV_FILE_DSTN && chmod 0600 $ENV_FILE_DSTN

    ## insert other files to copy
    mv $NPMRC_CONFIG ./.npmrc && chmod 0600 ./.npmrc
fi

green "🐳 Building docker image..."
docker build \
  --build-arg BUILD_APP_VERSION=$VERSION \
    -t "${GITLAB_IMAGE_TAG}" \
    -f Dockerfile \
    .

green "🏷 Retagging image to: ${ECR_IMAGE_TAG}"
docker tag $GITLAB_IMAGE_TAG $ECR_IMAGE_TAG

green "🕊 Pushing image: ${ECR_IMAGE_TAG}"
docker push "${ECR_IMAGE_TAG}"


green "🚀 Deploying the app "${ECS_NAME}" to an ECS cluster and service."
# Update ECS service
ecs_params="$AWS_DEFAULT_PROFILE --cluster $ECS_NAME --service $ECS_NAME"
ecs_update_command=$(aws ecs update-service $ecs_params --force-new-deployment)

# Function to check the deployment status
check_deployment_status() {
# Get the service events
ecs_service_events=$(aws ecs describe-services $ecs_params --query "services[0].events" --output json)

# Check for the most recent deployment event
most_recent_deployment_event=$(echo $ecs_service_events | jq 'map(select(.message | contains("has started") or contains("has reached a steady state"))) | .[0]' -r)

  if [ -n "$most_recent_deployment_event" ]; then
    deployment_reached_steady_state=$(echo $most_recent_deployment_event | jq 'select(.message | contains("has reached a steady state"))' -r)

    if [ -n "$deployment_reached_steady_state" ]; then
      return 0
    else
      return 1
    fi
  else
    return 1
  fi
}

check_running_tasks () {
  # Get the running tasks for the service
  running_tasks=$(aws ecs list-tasks $ecs_params --query "taskArns" --output json)
  running_tasks_json=$(aws ecs describe-tasks $AWS_DEFAULT_PROFILE --cluster $ECS_NAME --tasks $(echo $running_tasks | jq -r 'join(" ")') --output json)
  container_details=$(echo $running_tasks_json | jq '.tasks[].containers[] | {name: .name, containerArn: .containerArn, lastStatus: .lastStatus, taskArn: .taskArn}')

  green "🎉 ECS deployment successful! The following containers are running:"
  blue "$container_details"
}

# Check the deployment status initially
if check_deployment_status; then
  check_running_tasks
  exit 0
else
  blue "🔍 Deployment events logs: $ecs_service_events"
  red "The most recent deployment is in progress⏳ or failed☠️. Waiting for 5 minutes before checking again."

  # Countdown timer for 5 minutes
  countdown_seconds=$((5 * 60))

  while [ $countdown_seconds -gt 0 ]; do
    printf "\rWaiting for %02d:%02d minutes..." $((countdown_seconds / 60)) $((countdown_seconds % 60))
    sleep 1
    countdown_seconds=$((countdown_seconds - 1))
  done

  echo ""

  # Re-check the deployment status after waiting
  if check_deployment_status; then
    check_running_tasks
    exit 0
  else
    blue "🔍 Deployment events logs: $ecs_service_events"
    red "The most recent deployment is still in progress⏳ or failed☠️. Please review the deployment events logs above or check in the ECS service console."
    exit 1
  fi
fi
