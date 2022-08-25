variable "application" {
  description = "The name of the application. Used for the value of the Application tag."
  type        = string
  default     = "bordle"
}

locals {
  environment = lower(terraform.workspace)

  project_name = "${local.environment}-${lower(var.application)}"

  all_tags = {
    Terraform   = "true"
    Name        = local.project_name
    Environment = local.environment
  }

  domain = "bordle.com"
}
