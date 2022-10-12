variable "tags" {
  type = map(string)
}

variable "vpc_id" {
  type = string
}
variable "public_subnet_ids" {
  type = list(string)
  default = [""]
}

variable "private_subnet_ids" {
  type = list(string)
}

variable "db_password" {
  type = string
}

variable "db_user" {
  type = string
  default = "postgres"
}
