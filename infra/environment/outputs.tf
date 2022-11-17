output "bastion_dns" {
  value = module.bastion.dns
}

# output "db_url" {
#   value = "postgres://${module.db.rds_username}:${module.db.rds_password}@${module.db.rds_hostname}:${module.db.rds_port}"
# }