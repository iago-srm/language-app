output "rds_hostname" {
  description = "RDS instance hostname"
  value       = aws_db_instance.this.address
}

output "rds_port" {
  description = "RDS instance port"
  value       = aws_db_instance.this.port
}

output "rds_username" {
  description = "RDS instance root username"
  value       = aws_db_instance.this.username
}

output "rds_password" {
  description = "RDS instance root username"
  value       = aws_db_instance.this.password
}

output "rds_id" {
  value       = aws_db_instance.this.id
}