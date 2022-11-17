data "aws_acm_certificate" "production" {
  domain      = var.domain_name-production
  types       = ["AMAZON_ISSUED"]
  most_recent = true
}

data "aws_acm_certificate" "staging" {
  domain      = var.domain_name-staging
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
  allowed_ips = var.admin_ips
  db_id = module.db.rds_id
  subnet_id = module.vpc.public_subnet_ids[0]
  key_pair_name = var.key_pair_name

  # database_url = "postgres://${module.db.rds_username}:${module.db.rds_password}@${module.db.rds_hostname}:${module.db.rds_port}/api-2"
}

module "ecs-staging" {
  source = "../modules/ecs"
  environment = "staging"

  vpc_id      = module.vpc.vpc_id
  tags        = var.tags

  public_subnet_ids = module.vpc.public_subnet_ids
  certificate_arn = data.aws_acm_certificate.staging.arn
  default_tg_arn  = module.server-staging["web-api"].tg_arn
}

module "ecs-production" {
  source = "../modules/ecs"
  environment = "production"

  vpc_id      = module.vpc.vpc_id
  tags        = var.tags

  public_subnet_ids = module.vpc.public_subnet_ids
  certificate_arn = data.aws_acm_certificate.production.arn
  default_tg_arn  = module.server-production["web-api"].tg_arn
}

module "profile_image_bucket" {
  source = "../modules/s3"
}

module "server-staging" {
  source = "../modules/server"
  environment = "staging"

  tags        = var.tags

  for_each = toset(var.microsservices)
  server-name      = each.value

  alb_listener_arn = module.ecs-staging.alb_listener_https_arn
  container_image  = "${module.cicd-pipeline[each.value].repository_url}:latest"
  alb_id           = module.ecs-staging.alb.id
  cluster_id       = module.ecs-staging.cluster.id
  vpc_id           = module.vpc.vpc_id
  subnet_id        = module.vpc.public_subnet_ids[0]

  env_database_url = "postgres://${module.db.rds_username}:${module.db.rds_password}@${module.db.rds_hostname}:${module.db.rds_port}/${each.value}-staging"
  env_profile_image_bucket = module.profile_image_bucket.bucket
  env_token_secret = var.auth_token_secret
  env_queue_url = module.sqs.queue_url
  env_sendgrid_api_key = var.sendgrid_api_key
  aws_access_key_id = var.aws_access_key_id
  aws_secret_access_key = var.aws_secret_access_key
  aws_region = var.aws_region
}

module "server-production" {
  source = "../modules/server"
  environment = "production"

  tags        = var.tags

  for_each = toset(var.microsservices)
  server-name      = each.value

  alb_listener_arn = module.ecs-production.alb_listener_https_arn
  container_image  = "${module.cicd-pipeline[each.value].repository_url}:latest"
  alb_id           = module.ecs-production.alb.id
  cluster_id       = module.ecs-production.cluster.id
  vpc_id           = module.vpc.vpc_id
  subnet_id        = module.vpc.public_subnet_ids[0]

  env_database_url = "postgres://${module.db.rds_username}:${module.db.rds_password}@${module.db.rds_hostname}:${module.db.rds_port}/${each.value}"
  env_profile_image_bucket = module.profile_image_bucket.bucket
  env_token_secret = var.auth_token_secret
  env_queue_url = module.sqs.queue_url
  env_sendgrid_api_key = var.sendgrid_api_key
  aws_access_key_id = var.aws_access_key_id
  aws_secret_access_key = var.aws_secret_access_key
  aws_region = var.aws_region
}

module "cicd-pipeline" {
  source = "../modules/cicd"

  for_each = toset(var.microsservices)
  server-name      = each.value

  tags        = var.tags

  aws_region = var.aws_region
  aws_account_id = var.aws_account_id
  github_oauth_token = var.github_oauth_token

  ecs_cluster_name_production = module.ecs-production.cluster.name
  ecs_cluster_name_staging = module.ecs-staging.cluster.name

  ecs_service_name = each.value
}


module "sqs" {
  source = "../modules/sqs"

  tags = "${var.tags}"

  env_api_url = "api.language-app.isrm.link/web-api"
}