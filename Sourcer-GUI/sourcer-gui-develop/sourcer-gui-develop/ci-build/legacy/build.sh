# Build file
set -e # Abort on first error

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

# Initialize build variables
GITLAB_IMAGE_TAG=$CI_REGISTRY_IMAGE/$CI_COMMIT_REF_SLUG:$CI_COMMIT_SHA

blue "## -------------------------------------------------------------------------------- "
blue "## CI/CD Variables List"
blue "## -------------------------------------------------------------------------------- "
blue "🔍 CI_REGISTRY_IMAGE     = ${CI_REGISTRY_IMAGE}"
blue "🔍 CI_COMMIT_SHA         = ${CI_COMMIT_SHA}"
blue "🔍 CI_COMMIT_REF_SLUG    = ${CI_COMMIT_REF_SLUG}"
blue "🔍 GITLAB_IMAGE_TAG      = ${GITLAB_IMAGE_TAG}"
blue "## -------------------------------------------------------------------------------- "

green "🔑 Logging into GitLab Docker registry ${CI_REGISTRY}..."
docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY 
check_config && files_list

green "🐳 Building docker image..."
DOCKER_BUILDKIT=1 docker build \
  -t "${GITLAB_IMAGE_TAG}" \
  -f Dockerfile \
  .

green "🕊 Pushing image: ${GITLAB_IMAGE_TAG}"
docker push "${GITLAB_IMAGE_TAG}"

green "✅ Done!"
