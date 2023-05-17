#!/bin/bash

echo '**** Deploying spotlight-api to you local Kubernetes environment ****'

set -e

# make sure dependencies are installed and published
dotnet clean
dotnet publish Api/Api.csproj -o Api/publishedApp

# build the docker container
docker build -t spotlight-api:local .

set +e
# check helm histor for a previous deployment
HELM_HISTORY=$(helm history spotlight-api 2>&1)

set -e
# if a deployment does not exist, skip helm delete
if [ "$HELM_HISTORY" == "Error: release: not found" ]
then
    echo "helm chart not installed, proceeding with deployment"
else
    echo "helm chart installed, removing for redeployment"
    helm delete spotlight-api
fi

helm install spotlight-api helm/spotlight-api

COMPLETE_MESSAGE=$(cat <<-END
**** spotlight-api deployment complete ****
🚀  spotlight-api is now deployed to your local Kubernetes environment.
It can take a minute for the pod to spin up, but once it does the spotlight-api will be available at http://localhost:8080/swagger
END
)

echo "$COMPLETE_MESSAGE"