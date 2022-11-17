variable "tags" {
  type = map(string)
}

variable "public_subnet_ids" {
  type = list(string)
}

variable "vpc_id" {
  type = string
}

variable "certificate_arn" {
  type = string
}

variable "default_tg_arn" {
  type = string
}

variable "environment" {
  type = string
}