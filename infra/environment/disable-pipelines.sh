#!/bin/bash
aws codepipeline disable-stage-transition --pipeline-name language-app-web-api-codepipeline --stage-name Source --transition-type Outbound --reason "Not updating"
aws codepipeline disable-stage-transition --pipeline-name language-app-auth-web-api-codepipeline --stage-name Source --transition-type Outbound --reason "Not updating"
