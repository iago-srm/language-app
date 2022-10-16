data "aws_key_pair" "this" {
  key_name           = var.key_pair_name
}

data "aws_ami" "this" {
  most_recent      = true
  owners           = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-2.0.????????.?-x86_64-gp2"]
  }
  
  filter {
    name   = "state"
    values = ["available"]
  }

}

resource "aws_launch_template" "this" {
  instance_type = "t2.micro"
  image_id = data.aws_ami.this.image_id
  key_name = data.aws_key_pair.this.key_name
}

resource "aws_security_group" "this" {
  name        = "bastion_host"
  description = "Allow SSH inbound traffic and Prisma dashboard"
  vpc_id      = var.vpc_id

  ingress {
    description      = "SSH from admin machine"
    from_port        = 22
    to_port          = 22
    protocol         = "tcp"
    cidr_blocks      = ["${var.allowed_ip}/32"]
  }

  ingress {
    description      = "Prisma dashboard"
    from_port        = 5555
    to_port          = 5555
    protocol         = "tcp"
    cidr_blocks      = ["${var.allowed_ip}/32"]
  }


  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
}

resource "aws_instance" "bastion_host" {

  subnet_id = var.subnet_id
  launch_template {
    id = aws_launch_template.this.id
  }
  tags = var.tags
  vpc_security_group_ids = [aws_security_group.this.id]
  depends_on = [
    aws_security_group.this,
    var.db_id
  ]
}

