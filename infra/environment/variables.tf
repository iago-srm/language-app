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

variable "admin_ip" {
  type = string
}

variable "domain_name" {
  type = string
  default = "api.language-app.isrm.link"
}