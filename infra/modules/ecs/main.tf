resource "aws_ecs_cluster" "this" {
  name = "language-app-ecs-cluster-${var.environment}"
}


