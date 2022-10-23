#!/bin/bash
aws ecs update-service --cluster language-app-ecs-cluster --service auth-web-api --desired-count $1 > /dev/null &
aws ecs update-service --cluster language-app-ecs-cluster --service web-api --desired-count $1 > /dev/null &
