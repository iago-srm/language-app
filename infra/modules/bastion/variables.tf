variable "tags" {
  type = map(string)
}

variable "vpc_id" {
  type = string
}

variable "db_id" {
  type = string
}

variable "allowed_ip" {
  type = string
}

variable "key_pair_name" {
  type = string
}

variable "subnet_id" {
  type = string
}

variable "database_url" {
  type = string
  default = ""
}
