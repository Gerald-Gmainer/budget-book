#!/bin/bash

# Define variables
BACKEND_IMAGE_NAME="budgetbook/budget-book-backend:latest"
BACKEND_CONTAINER_NAME="budget-book-backend"
FRONTEND_IMAGE_NAME="budgetbook/budget-book-frontend:latest"
FRONTEND_CONTAINER_NAME="budget-book-frontend"
PLATFORM="linux/arm64"

# Function to print logs with timestamps
log() {
  echo "$(date +"%Y-%m-%d %H:%M:%S") - $1"
}

# Function to update a container
update_container() {
  local IMAGE_NAME=$1
  local CONTAINER_NAME=$2
  local PORT_MAPPING=$3

  log "Pulling the latest image: $IMAGE_NAME for platform $PLATFORM"
  if docker pull --platform $PLATFORM $IMAGE_NAME; then
    log "Successfully pulled the latest image."
  else
    log "Failed to pull the latest image."
    exit 1
  fi

  log "Stopping the container: $CONTAINER_NAME"
  if docker stop $CONTAINER_NAME; then
    log "Successfully stopped the container."
  else
    log "Failed to stop the container or container is not running."
  fi

  log "Removing the container: $CONTAINER_NAME"
  if docker rm $CONTAINER_NAME; then
    log "Successfully removed the container."
  else
    log "Failed to remove the container or container does not exist."
  fi

  log "Running a new container with the latest image for platform $PLATFORM."
  if docker run -d --platform $PLATFORM -p $PORT_MAPPING --name $CONTAINER_NAME $IMAGE_NAME; then
    log "Successfully started the new container."
  else
    log "Failed to start the new container."
    exit 1
  fi

  # Wait a few seconds and then check logs
  sleep 5
  log "Fetching logs from the new container."
  docker logs $CONTAINER_NAME
}

# Update backend container
update_container $BACKEND_IMAGE_NAME $BACKEND_CONTAINER_NAME "8080:8080"

# Update frontend container
update_container $FRONTEND_IMAGE_NAME $FRONTEND_CONTAINER_NAME "3000:80"

log "Update process completed successfully."
