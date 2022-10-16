output "alb_dns" {
  value = aws_lb.main.dns_name
}

output "alb_listener_https_arn" {
  value = aws_alb_listener.https.arn
}

output "alb_listener_http_arn" {
  value = aws_alb_listener.http.arn
}

output "alb" {
  value = aws_lb.main
}

output "cluster" {
  value = aws_ecs_cluster.this
}