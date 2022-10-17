resource "aws_ecs_task_definition" "this" {
  network_mode             = "awsvpc"
  family                   = var.server-name
  requires_compatibilities = ["FARGATE"]
  cpu                      = 256
  memory                   = 512
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn # This role is required by tasks to pull container images and publish container logs to Amazon CloudWatch on your behalf
  task_role_arn            = aws_iam_role.ecs_task_role.arn           # to access AWS Services
  container_definitions = jsonencode([
    {
      name      = "${var.server-name}"
      image     = "${var.container_image}"
      environment = [
        { "Name" = "DATABASE_URL", "Value" = "${var.env_database_url}" },
        { "Name" = "BUCKET_NAME", "Value" = "${var.env_profile_image_bucket}" },  
        { "Name" = "TOKEN_SECRET", "Value" = "${var.env_token_secret}" },
        { "Name" = "WEB_APP_URL", "Value" = "isrm.link" },
        { "Name" = "PORT", "Value" = "${var.container_port}" },
        { "Name" = "SENDGRID_API_KEY", "Value" = "${var.env_sendgrid_api_key}" },
        { "Name" = "AWS_ACCESS_KEY_ID", "Value" = "${var.aws_access_key_id}" },  
        { "Name" = "AWS_SECRET_ACCESS_KEY", "Value" = "${var.aws_secret_access_key}" },  
        { "Name" = "QUEUE_URL", "Value" = "${var.env_queue_url}" },  
      ]
      logConfiguration = {
        "logDriver": "awslogs",
        "options": {
            "awslogs-region" : "${var.aws_region}",
            "awslogs-group" : "language-app-${var.server-name}",
            "awslogs-stream-prefix" : "language-app-${var.server-name}",
            "awslogs-create-group": "true",
        }
      },
      essential = true
      portMappings = [
        {
          protocol      = "tcp"
          containerPort = "${tonumber(var.container_port)}"
          hostPort      = "${tonumber(var.container_port)}"
        }
      ]
    }
  ])

  tags = var.tags
}


resource "aws_security_group" "ecs_security_group" {
  name   = "${var.server-name}-ecs-sg"
  vpc_id = var.vpc_id

  ingress {
    description = "HTTP inbound"
    from_port   = var.container_port
    to_port     = var.container_port
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  # ingress {
  #   from_port   = 80
  #   protocol    = "tcp"
  #   to_port     = 443
  #   cidr_blocks = ["0.0.0.0/0"]
  # }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8
    to_port     = 0
    protocol    = "icmp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = var.tags
}

resource "aws_ecs_service" "this" {
  name                               = "${var.server-name}"
  launch_type                        = "FARGATE"
  cluster                            = var.cluster_id
  task_definition                    = aws_ecs_task_definition.this.arn
  desired_count                      = 1
  deployment_minimum_healthy_percent = 50
  deployment_maximum_percent         = 200
  scheduling_strategy                = "REPLICA"
  
  network_configuration {
    security_groups  = [aws_security_group.ecs_security_group.id]
    subnets          = [var.subnet_id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_alb_target_group.this.arn
    container_name   = var.server-name
    container_port   = var.container_port
  }

  tags = var.tags
}
