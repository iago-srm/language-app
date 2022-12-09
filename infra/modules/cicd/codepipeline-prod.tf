resource "aws_s3_bucket" "codepipeline_bucket_prod" {
  bucket = "language-app-${var.server-name}-codepipeline-artifacts-production"
  force_destroy = true
}

resource "aws_codepipeline" "prod" {
  name     = "language-app-${var.server-name}-production"
  role_arn = "${aws_iam_role.codepipeline_role.arn}"

  artifact_store {
    location = "${aws_s3_bucket.codepipeline_bucket_prod.bucket}"
    type     = "S3"
  }

  stage {
    name = "Source"

    action {
      name             = "Source"
      category         = "Source"
      owner            = "ThirdParty"
      provider         = "GitHub"
      version          = "1"
      output_artifacts = ["source"]

      configuration = {
        Owner  = "iago-srm"
        Repo   = "language-app"
        Branch = "main"
        OAuthToken = "${var.github_oauth_token}"
      }
    }
  }

  stage {
    name = "Build"

    action {
      name             = "Build"
      category         = "Build"
      owner            = "AWS"
      provider         = "CodeBuild"
      version          = "1"
      input_artifacts  = ["source"]
      output_artifacts = ["imagedefinitions"]

      configuration = {
        ProjectName = "${var.server-name}"
      }
    }
  }

  stage {
    name = "Deploy"

    action {
      category = "Deploy"
      configuration = {
        "ClusterName" = var.ecs_cluster_name_production
        "ServiceName" = "${var.ecs_service_name}-production"
        "FileName"    = "packages/${var.server-name}/imagedefinitions.json"
        #"DeploymentTimeout" = "15"
      }
      input_artifacts = [
        "imagedefinitions",
      ]
      name             = "Deploy"
      output_artifacts = []
      owner            = "AWS"
      provider         = "ECS"
      run_order        = 1
      version          = "1"
    }
  }

}