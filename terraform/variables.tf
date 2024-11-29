variable "app_name" {
  description = "Nombre de la aplicación"
  default     = "microservicios"
}

variable "ec2_instance_type" {
  description = "Tipo de instancia EC2"
  default     = "t2.micro"
}

variable "ami_id" {
  description = "AMI ID para las instancias EC2"
  default     = "ami-0453ec754f44f9a4a" 
}

variable "instance_count" {
  description = "Número de instancias EC2 a desplegar"
  default     = 3
}