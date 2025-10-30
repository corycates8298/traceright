# Terraform configuration for TraceRight
# This is a placeholder configuration to satisfy the GitHub Actions workflow

terraform {
  required_version = ">= 1.0"
  
  # Uncomment and configure when ready to use Terraform Cloud
  # backend "remote" {
  #   organization = "your-organization"
  #   workspaces {
  #     name = "traceright"
  #   }
  # }
}

# Placeholder resource - remove when actual infrastructure is defined
resource "null_resource" "placeholder" {
  triggers = {
    timestamp = timestamp()
  }
}