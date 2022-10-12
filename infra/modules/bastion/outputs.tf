output "dns" {
  value = aws_instance.bastion_host.public_dns
}