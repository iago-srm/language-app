variable "tags" {
  type = map(string)
}

variable "server-name" {
  type = string
}

variable "alb_listener_arn" {
  type = string
}

variable "cluster_id" {
  type = string
}

variable "container_image" { 
  type = string
}

variable "container_port" { 
  type = string
  default = "3006"
}

variable "alb_id" {
  type = string
}

variable "vpc_id" {
  type = string
}

variable "subnet_id" {
  type = string
}

variable "env_database_url" {
  type = string
}

variable "env_queue_url" {
  type = string
}

variable "env_profile_image_bucket" {
  type = string
}

variable "env_token_secret" {
  type = string
}

variable "env_sendgrid_api_key" {
  type = string
}

variable "aws_access_key_id" {
  type = string
}

variable "aws_secret_access_key" {
  type = string
}

variable "aws_region" {
  type = string
}