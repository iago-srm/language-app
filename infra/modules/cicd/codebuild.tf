resource "aws_s3_bucket" "build_cache" {
  bucket = "language-app-build-cache"
  force_destroy = true
  tags = var.tags
}

# resource "aws_iam_role" "codebuild-hook" {
#   name = "${var.server-name}-codebuild-webhook"

#   assume_role_policy = <<EOF
# {
#   "Version": "2012-10-17",
#   "Statement": [
#     {
#       "Effect": "Allow",
#       "Principal": {
#         "Service": "codebuild.amazonaws.com"
#       },
#       "Action": "sts:AssumeRole"
#     }
#   ]
# }
# EOF

#   tags = var.tags
# }

# resource "aws_iam_role_policy" "codebuild-hook" {
#   role = aws_iam_role.codebuild.name

#   policy = jsonencode(
# {
#   "Version": "2012-10-17",
#   "Statement": [
#     {
#       "Effect": "Allow",
#       "Action": [
#         "codepipeline:*",
#       ],
#       "Resource": [
#         "*"
#       ]
#     }
#   ]
# })
# }


resource "aws_codebuild_project" "this" {
  name          = "${var.server-name}"
  build_timeout = "5"
  service_role  = aws_iam_role.codebuild.arn

  artifacts {
    type = "NO_ARTIFACTS"
  }

  cache {
    type     = "S3"
    location = aws_s3_bucket.build_cache.bucket
  }

  environment {
    compute_type                = "BUILD_GENERAL1_SMALL"
    image                       = "aws/codebuild/standard:4.0"
    type                        = "LINUX_CONTAINER"
    image_pull_credentials_type = "CODEBUILD"
    privileged_mode             = true

    environment_variable {
      name  = "AWS_DEFAULT_REGION"
      value = "${var.aws_region}"
    }

    environment_variable {
      name  = "AWS_ACCOUNT_ID"
      value = "${var.aws_account_id}"
    }

    environment_variable {
      name  = "IMAGE_REPO_NAME"
      value = "language-app/${var.server-name}"
    }
  }

  logs_config {
    cloudwatch_logs {
      group_name  = "${var.server-name}-build-log-group"
      stream_name = "${var.server-name}-build-log-stream"
    }

    s3_logs {
      status   = "ENABLED"
      location = "${aws_s3_bucket.build_cache.id}/build-log"
    }
  }

  source {
    type = "GITHUB"
    location        = "${var.git_repo}"
    git_clone_depth = 1
    buildspec       = "packages/${var.server-name}/buildspec.yml"
  }

  tags = var.tags
}

resource "aws_codebuild_webhook" "this" {
  project_name = aws_codebuild_project.this.name
  build_type   = "BUILD"
  filter_group {
    filter {
      type    = "EVENT"
      pattern = "PUSH"
    }

    filter {
      type    = "HEAD_REF"
      pattern = "main"
    }

    filter {
      type    = "FILE_PATH"
      pattern = "(packages/${var.server-name}/*|packages/common-core|packages/common-platform)"
    }
  }
}