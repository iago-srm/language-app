variable "tags" {
  type = map(string)
  default = {
    project     = "language-app"
  }
}

variable "db_password" {
  type = string
}

variable "key_pair_name" {
  type = string
}

variable "admin_ips" {
  type = list(string)
}

variable "domain_name" {
  type = string
  default = "api.language-app.isrm.link"
}

variable "auth_token_secret" {
  type = string
}

variable "aws_secret_access_key" {
  type = string
}

variable "aws_access_key_id" {
  type = string
}

variable "sendgrid_api_key" {
  type = string
}

variable "github_oauth_token" {
  type = string
}

variable "aws_region" {
  type = string
  default = "us-east-1"
}

variable "aws_account_id" {
  type = string
}

variable "microsservices" {
  description = "The microsservices in this architecture"
  type = list(string)
  default = ["auth-web-api", "web-api"]
}