data "aws_acm_certificate" "default" {
  provider = aws.us-east-1

  domain = "*bordle.com"
  types = ["AMAZON_ISSUED"]
  most_recent = true
}

data "aws_route53_zone" "default" {
  name         = ""
  private_zone = false
}
