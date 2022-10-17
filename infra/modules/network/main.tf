resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = var.tags
}

resource "aws_subnet" "public_one" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.0.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "us-east-1a"

  tags = var.tags
}

resource "aws_subnet" "public_two" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "us-east-1b"

  tags = var.tags
}

resource "aws_subnet" "private_one" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "us-east-1a"

  tags = var.tags
}

resource "aws_subnet" "private_two" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.3.0/24"
  availability_zone = "us-east-1b"

  tags = var.tags
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id
  tags = var.tags
}


resource "aws_route_table" "rt" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = var.tags
}

resource "aws_route_table_association" "public_one" {
  subnet_id      = aws_subnet.public_one.id
  route_table_id = aws_route_table.rt.id
}

resource "aws_route_table_association" "public_two" {
  subnet_id      = aws_subnet.public_two.id
  route_table_id = aws_route_table.rt.id
}

# resource "aws_nat_gateway" "main" {
#   allocation_id = aws_eip.nat.id
#   subnet_id     = aws_subnet.public_one.id
#   depends_on    = [aws_internet_gateway.igw]

#   tags = var.tags
# }

# resource "aws_eip" "nat" {
#   vpc = true

#   tags = var.tags
# }

# resource "aws_route_table" "private" {
#   vpc_id = aws_vpc.main.id

#   tags = var.tags
# }

# resource "aws_route" "private" {
#   route_table_id         = aws_route_table.private.id
#   destination_cidr_block = "0.0.0.0/0"
#   nat_gateway_id         = aws_nat_gateway.main.id
# }

# resource "aws_route_table_association" "private_one" {
#   subnet_id      = aws_subnet.private_one.id
#   route_table_id = aws_route_table.private.id
# }

# resource "aws_route_table_association" "private_two" {
#   subnet_id      = aws_subnet.private_two.id
#   route_table_id = aws_route_table.private.id
# }

