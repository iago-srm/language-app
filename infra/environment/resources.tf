data "aws_acm_certificate" "this" {
  domain      = var.domain_name
  types       = ["AMAZON_ISSUED"]
  most_recent = true
}

module "vpc" {
  source = "../modules/network"
  tags        = var.tags

}

module "db" {
  source = "../modules/db"

  tags        = var.tags

  vpc_id            = module.vpc.vpc_id
  private_subnet_ids = module.vpc.private_subnet_ids
  db_password       = var.db_password
}

resource "aws_ssm_parameter" "db_url" {
  name  = "db_url"
  type  = "String"
  value = "postgres://${module.db.rds_username}:${module.db.rds_password}@${module.db.rds_hostname}:${module.db.rds_port}"
}

module "bastion" {
  source = "../modules/bastion"
  
  tags        = var.tags
  vpc_id = module.vpc.vpc_id
  allowed_ip = var.admin_ip
  db_id = module.db.rds_id
  subnet_id = module.vpc.public_subnet_ids[0]
  key_pair_name = var.key_pair_name

  # database_url = "postgres://${module.db.rds_username}:${module.db.rds_password}@${module.db.rds_hostname}:${module.db.rds_port}/api-2"
}