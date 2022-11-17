variable "tags" {
  type = map(string)
}

variable "server-name" {
  type = string
}

variable "git_repo" {
  type = string
  default = "https://github.com/iago-srm/language-app.git"
}

variable "ecs_cluster_name_production" {
  type = string
}

variable "ecs_cluster_name_staging" {
  type = string
}

variable "ecs_service_name" {
  type = string
  default = ""
}

variable "aws_region" {
  type = string
}

variable "aws_account_id" {
  type = string
}

variable "github_oauth_token" {
  type = string
}