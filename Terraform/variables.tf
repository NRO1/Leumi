variable "profile" {
  type = string
  default = "nr_dev"
}

variable "region" {
  type = string
  default = "eu-central-1"
}

############################# Network #########################

variable "vpc_cidr" {
    type = string
    default = "10.181.242.0/24"
}

variable "public_subnet" {
    type = string
    default = "10.181.242.0/24"
}

variable "subnet_az" {
    type = string
    default = "eu-central-1a"
}

variable "rt_cb" {
    type = string
    default = "0.0.0.0/0"
}

############################# EC2 #########################
variable "sg_name" {
    type = string
    default = "Custom_sg_Leumi"
}

variable "HTTP_allowed_cb" {
    type = list
    default = ["91.231.246.50/32"]
}

variable "instance_ami" {
    type = string
    default = "t2.micro"
}


variable "instance_type" {
    type = string
    default = "t2.micro"
}

variable "instance_key" {
    type = string
    default = "k8s_instance"
}





