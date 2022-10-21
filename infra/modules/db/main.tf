resource "aws_db_subnet_group" "this" {
  name       = "main"
  # subnet_ids = var.public_subnet_ids
  subnet_ids = var.private_subnet_ids

  tags = var.tags
}

resource "aws_db_parameter_group" "this" {
  name   = "main"
  family = "postgres13"

  parameter {
    name  = "log_connections"
    value = "1"
  }
}

resource "aws_security_group" "pgsecgrp" {
  name        = "pgsecgrp"
  description = "Allow inbound traffic for PG"
  vpc_id      = var.vpc_id

  ingress {
    description      = "PG connection"
    from_port        = 5432
    to_port          = 5432
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = var.tags
}

resource "aws_db_instance" "this" {
  identifier             = "main"
  instance_class         = "db.t3.micro"
  apply_immediately = true
  allocated_storage      = 5
  engine                 = "postgres"
  engine_version         = "13.7"
  username               = var.db_user
  password               = var.db_password
  db_subnet_group_name   = aws_db_subnet_group.this.name
  vpc_security_group_ids = [aws_security_group.pgsecgrp.id]
  parameter_group_name   = aws_db_parameter_group.this.name
  publicly_accessible    = false
  skip_final_snapshot    = true

  tags = var.tags
}

