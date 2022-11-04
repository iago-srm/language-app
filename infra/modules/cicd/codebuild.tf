resource "aws_s3_bucket" "build_cache" {
  bucket = "language-app-build-cache"
  force_destroy = true
  tags = var.tags
}

resource "aws_codebuild_project" "this" {
  name          = "${var.server-name}"
  build_timeout = "5"
  service_role  = aws_iam_role.codebuild.arn

  artifacts {
    type = "CODEPIPELINE"
    # type = "NO_ARTIFACTS"
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
    type            = "CODEPIPELINE"
    buildspec       = "packages/${var.server-name}/buildspec.yml"
  }

  tags = var.tags
}

