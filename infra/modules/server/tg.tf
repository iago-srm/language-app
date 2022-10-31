resource "aws_alb_target_group" "this" {
  name        = "${var.server-name}"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "ip"

  health_check {
    healthy_threshold   = "2"
    # interval            = "30"
    protocol            = "HTTP"
    matcher             = "200"
    timeout             = "20"
    path                = "/"
    unhealthy_threshold = "2"
  }

  tags = var.tags
}
