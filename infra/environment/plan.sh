#!/bin/bash
terraform plan -out=plan.out -var-file=environment.tfvars -lock=false