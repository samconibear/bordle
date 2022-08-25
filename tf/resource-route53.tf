resource "aws_route53_zone" "main" {
  name = local.domain
  tags = local.all_tags
}
resource "aws_route53_record" "main" {
  zone_id  = data.aws_route53_zone.default.zone_id
  name     = "www.${local.domain}"
  type     = "A"

  alias {
    name                   = aws_cloudfront_distribution.main.domain_name
    zone_id                = aws_cloudfront_distribution.main.hosted_zone_id
    evaluate_target_health = false
  }
}
