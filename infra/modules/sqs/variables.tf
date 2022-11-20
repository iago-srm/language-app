variable "tags" {
  type = map(string)
}

variable "env_api_url" {
  type = string
}

variable "lambda-bucket_name" {
  type = string
  default = "language-app-lambda-bucket"
}

variable "environment" {
  type = string
}