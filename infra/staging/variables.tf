variable "tags" {
  type = map(string)
  default = {
    project     = "aws-monorepo-poc"
    environment = "staging"
  }
}
