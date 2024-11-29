provider "aws" {
  region = "us-east-1" # Ajusta la región según lo necesites
}

resource "aws_instance" "api_gateway" {
  ami           = "ami-0ff8a91507f77f867"  # Ejemplo de Amazon Linux 2 AMI
  instance_type = "t2.micro"
  key_name      = "mi-keypair"  # Asegúrate de tener una key pair en AWS

  tags = {
    Name = "API Gateway"
  }

  user_data = <<-EOT
              #!/bin/bash
              cd /home/ec2-user/api-gateway
              npm install
              node gateway.js
              EOT

  security_groups = [aws_security_group.api_gateway_sg.name]
}

resource "aws_instance" "carrito" {
  ami           = "ami-0ff8a91507f77f867"  # Ejemplo de Amazon Linux 2 AMI
  instance_type = "t2.micro"
  key_name      = "mi-keypair"

  tags = {
    Name = "Carrito"
  }

  user_data = <<-EOT
              #!/bin/bash
              cd /home/ec2-user/carrito
              npm install
              node carrito.js
              EOT

  security_groups = [aws_security_group.carrito_sg.name]
}

resource "aws_instance" "productos" {
  ami           = "ami-0ff8a91507f77f867"
  instance_type = "t2.micro"
  key_name      = "mi-keypair"

  tags = {
    Name = "Productos"
  }

  user_data = <<-EOT
              #!/bin/bash
              cd /home/ec2-user/productos
              npm install
              node productos.js
              EOT

  security_groups = [aws_security_group.productos_sg.name]
}

resource "aws_instance" "pedidos" {
  ami           = "ami-0ff8a91507f77f867"
  instance_type = "t2.micro"
  key_name      = "mi-keypair"

  tags = {
    Name = "Pedidos"
  }

  user_data = <<-EOT
              #!/bin/bash
              cd /home/ec2-user/pedidos
              npm install
              node pedidos.js
              EOT

  security_groups = [aws_security_group.pedidos_sg.name]
}

resource "aws_instance" "usuarios" {
  ami           = "ami-0ff8a91507f77f867"
  instance_type = "t2.micro"
  key_name      = "mi-keypair"

  tags = {
    Name = "Usuarios"
  }

  user_data = <<-EOT
              #!/bin/bash
              cd /home/ec2-user/usuarios
              npm install
              node usuarios.js
              EOT

  security_groups = [aws_security_group.usuarios_sg.name]
}

resource "aws_security_group" "api_gateway_sg" {
  name        = "api_gateway_sg"
  description = "Security group for API Gateway"
  
  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "carrito_sg" {
  name        = "carrito_sg"
  description = "Security group for Carrito service"
  
  ingress {
    from_port   = 4003
    to_port     = 4003
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "productos_sg" {
  name        = "productos_sg"
  description = "Security group for Productos service"
  
  ingress {
    from_port   = 4002
    to_port     = 4002
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "pedidos_sg" {
  name        = "pedidos_sg"
  description = "Security group for Pedidos service"
  
  ingress {
    from_port   = 4004
    to_port     = 4004
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "usuarios_sg" {
  name        = "usuarios_sg"
  description = "Security group for Usuarios service"
  
  ingress {
    from_port   = 4001
    to_port     = 4001
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

output "api_gateway_public_ip" {
  value = aws_instance.api_gateway.public_ip
}

output "carrito_public_ip" {
  value = aws_instance.carrito.public_ip
}

output "productos_public_ip" {
  value = aws_instance.productos.public_ip
}

output "pedidos_public_ip" {
  value = aws_instance.pedidos.public_ip
}

output "usuarios_public_ip" {
  value = aws_instance.usuarios.public_ip
}