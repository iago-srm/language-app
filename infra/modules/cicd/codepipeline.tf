resource "aws_s3_bucket" "codepipeline_bucket" {
  bucket = "language-app-${var.server-name}-codepipeline-artifacts"
  force_destroy = true
}

resource "aws_codepipeline" "this" {
  name     = "language-app-${var.server-name}-codepipeline"
  role_arn = "${aws_iam_role.codepipeline_role.arn}"

  artifact_store {
    location = "${aws_s3_bucket.codepipeline_bucket.bucket}"
    type     = "S3"
  }

  stage {
    name = "Source"

    action {
      name             = "Image"
      category         = "Source"
      owner            = "AWS"
      provider         = "ECR"
      version          = "1"
      output_artifacts = ["source"]

      configuration = {
        RepositoryName = aws_ecr_repository.this.name
      }
    }
  }

  # stage {
  #   name = "Build"

  #   action {
  #     name             = "Build"
  #     category         = "Build"
  #     owner            = "AWS"
  #     provider         = "CodeBuild"
  #     version          = "1"
  #     input_artifacts  = ["source"]
  #     output_artifacts = ["imagedefinitions"]

  #     configuration = {
  #       ProjectName = "${var.server-name}"
  #     }
  #   }
  # }

  stage {
    name = "Deploy"

    action {
      category = "Deploy"
      configuration = {
        "ClusterName" = var.ecs_cluster_name
        "ServiceName" = var.ecs_service_name
        "FileName"    = "packages/${var.server-name}/imagedefinitions.json"
        #"DeploymentTimeout" = "15"
      }
      input_artifacts = [
        "source",
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