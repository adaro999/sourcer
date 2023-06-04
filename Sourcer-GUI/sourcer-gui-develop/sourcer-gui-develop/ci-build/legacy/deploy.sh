set -e # Abort on first error

# Initialize the AWS environment
aws-env-set $ENV_NAME

VERSION=${CI_COMMIT_TAG:-"${ENV_NAME}-${CI_COMMIT_SHORT_SHA}"}
ECS_NAME="${ENV_NAME}-${APP_NAME}"

ECR_HOST=$(cat ~/.aws-env.json | jq -r ".ecr_repo")
ECR_BASE="${ECR_HOST}/jobtarget/${ENV_NAME}-${APP_NAME}";
ECR_IMAGE_TAG="${ECR_BASE}:${ENV_NAME}"

function config_files() {
    green "📝 Copying application config into application..."

    # Default config file.
    mv $ENV_FILE ${CONFIG_DESTINATION} \
    && chmod 0600 ${CONFIG_DESTINATION}

     # Bring over .npmrc config file from CICD file variable.
    # Required in order to allow install of internal app libraries
    mv $NPMRC_CONFIG ./.npmrc \
    && chmod 0600 ./.npmrc
}

function check_config() {
    if [ -z "$ENV_FILE" ]; then
        red "ENV_FILE is empty!"
        exit 1
    elif [ -z "$CONFIG_DESTINATION" ]; then
        red "CONFIG_DESTINATION is empty!"
        exit 1
    else
        config_files
    fi
}

function variable_list() {
    blue "## -------------------------------------------------------------------------------- "
    blue "## CI/CD Variables List"
    blue "## -------------------------------------------------------------------------------- "
    blue "🔍 GITLAB_IMAGE_TAG = ${GITLAB_IMAGE_TAG} (Pull from here)"
    blue "🔍 ECR_IMAGE_TAG    = ${ECR_IMAGE_TAG} (Push to here)"
    blue "🔍 ECR_HOST         = ${ECR_HOST}"
    blue "🔍 VERSION          = ${VERSION}"
    blue "🔍 ECS_NAME         = ${ECS_NAME}"
    blue "## -------------------------------------------------------------------------------- "
}

function files_list() {
    blue "## -------------------------------------------------------------------------------- "
    blue "## Listing files inside project directory"
    blue "## -------------------------------------------------------------------------------- "
    ls -alh ./
    blue "## -------------------------------------------------------------------------------- "
    blue "## Listing files inside project directory"
    blue "## -------------------------------------------------------------------------------- "
    green "Config file location: $CONFIG_DESTINATION"
    blue "## -------------------------------------------------------------------------------- "
}

function pull_from_gitlab() {
    green "🔑 Logging into GitLab Docker registry ${CI_REGISTRY}..."
    docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY

    green "🦑 Pulling image from GitLab: ${GITLAB_IMAGE_TAG}"
    docker pull $GITLAB_IMAGE_TAG
}

function build_image() {
    green "🐳 Building docker image..."
    DOCKER_BUILDKIT=1 docker build \
    -t "${GITLAB_IMAGE_TAG}" \
    -f Dockerfile \
    .
}

function deploy_ecs() {
    green "🏷 Retagging image to: ${ECR_IMAGE_TAG}"
    docker tag $GITLAB_IMAGE_TAG $ECR_IMAGE_TAG

    green "🕊 Pushing image: ${ECR_IMAGE_TAG}"
    docker push "${ECR_IMAGE_TAG}"

    green "🚀 Deploying image in the '${ECS_NAME}' ECS cluster and service..."
    aws-ecs-deploy $ECS_NAME
}

if [ $ENV_NAME != "qa" ]
then
   GITLAB_IMAGE_TAG="${CI_REGISTRY_IMAGE}/${APP_NAME}:${VERSION}" \
   && variable_list \
   && check_config \
   && files_list \
   && build_image \
   && deploy_ecs
else
   GITLAB_IMAGE_TAG=$CI_REGISTRY_IMAGE/$CI_COMMIT_REF_SLUG:$CI_COMMIT_SHA \
   && variable_list \
   && pull_from_gitlab \
   && deploy_ecs
fi

