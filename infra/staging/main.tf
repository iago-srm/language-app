data "aws_s3_bucket" "state" {
  bucket = "language-app-terraform-state"
}

data "aws_dynamodb_table" "locks" {
  name = "terraform-locks-language-app"
}


terraform {
  required_version = "1.2.4"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.21.0"
    }
  }

  backend "s3" {
    bucket = aws_s3_bucket.state.bucket
    key            = "global/s3/staging.tfstate"
    region         = "us-east-1"
    dynamodb_table = aws_dynamodb_table.locks.name
    encrypt        = false
  }
}

provider "aws" {
  region = "us-east-1"
}

