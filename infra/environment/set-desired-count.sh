#!/bin/bash
aws ecs update-service --cluster language-app-ecs-cluster-staging --service auth-web-api-staging --desired-count $1 > /dev/null &
# aws ecs update-service --cluster language-app-ecs-cluster-production --service auth-web-api-production --desired-count $1 > /dev/null &
aws ecs update-service --cluster language-app-ecs-cluster-staging --service web-api-staging --desired-count $1 > /dev/null &
# aws ecs update-service --cluster language-app-ecs-cluster-production --service web-api-production --desired-count $1 > /dev/null &

