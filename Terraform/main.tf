############################# Network #########################

resource "aws_vpc" "Test_Spoke_VPC" {
  cidr_block = var.vpc_cidr

  tags = {
    Name = "Nati_Leumi_test"
  }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.Test_Spoke_VPC.id

  tags = {
    Name = "Nati_Leumi_test"
  }
}

resource "aws_subnet" "public_subnet" {
  vpc_id            = aws_vpc.Test_Spoke_VPC.id
  cidr_block        = var.public_subnet
  map_public_ip_on_launch = true
  availability_zone = var.subnet_az

  tags = {
    Name = "Nati_Leumi_test"
  }
}

resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.Test_Spoke_VPC.id

  route {
    cidr_block = var.rt_cb
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "Nati_Leumi_test"
  }
}

resource "aws_route_table_association" "rt_association" {
  subnet_id      = aws_subnet.public_subnet.id
  route_table_id = aws_route_table.public_rt.id
}

############################# EC2 #########################

resource "aws_security_group" "custom_sg" {
  name        = var.sg_name
  vpc_id      = aws_vpc.Test_Spoke_VPC.id

    ingress {
    description      = "SSH from Leumi"
    from_port        = 22
    to_port          = 22
    protocol         = "tcp"
    cidr_blocks      = var.ssh_allowed_cb
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
  }

  tags = {
    Name = "Nati_Leumi_test"
  }
}

resource "aws_instance" "apache_machine" {
  ami             = var.instance_ami 
  instance_type   = var.instance_type
  key_name        = var.instance_key
  subnet_id       = aws_subnet.public_subnet.id
  security_groups = [aws_security_group.custom_sg.id]

  user_data = <<-EOF
  #!/bin/bash
  sudo apt update -y
  sudo apt install apache2 -y
  EOF

  tags = {
    Name = "Nati_Leumi_test"
  }
}

resource "aws_eip" "eip" {
  instance = aws_instance.apache_machine.id
  vpc      = true
}

############################# NLB #########################


output "web_instance_ip" {
    value = aws_instance.apache_machine.public_ip
}

