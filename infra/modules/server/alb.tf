resource "aws_lb_listener_rule" "this" {
  listener_arn = var.alb_listener_arn

  action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.this.arn
  }

  condition {
    path_pattern {
      values = ["/${var.server-name}/*"]
    }
  }
}
