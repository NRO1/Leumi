terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "4.48.0"
    }
  }
  backend "local" {
    path="./terraform.tfstate"
  }
}

provider "aws" {
     profile = var.profile
}