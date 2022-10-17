#!/bin/bash
aws ecs update-service --cluster language-app-ecs-cluster --service auth-web-api --desired-count 0
aws ecs update-service --cluster language-app-ecs-cluster --service web-api --desired-count 0
aws ec2 delete-nat-gateway --nat-gateway-id `aws ec2 describe-nat-gateways | python3 -c "import sys, json; print(json.load(sys.stdin)['NatGateways'][0]['NatGatewayId'])"`
aws ec2 release-address --allocation-id `aws ec2 describe-addresses | python3 -c "import sys, json; print(json.load(sys.stdin)['Addresses'][0]['AllocationId'])"`
