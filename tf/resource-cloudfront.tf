/*** s3 bucket policy ***/
data "aws_iam_policy_document" "main" {
  statement {
    sid = "S3GetObjectForCloudFront"
    actions = [
      "s3:GetObject",
      "s3:ListBucket"
    ]
    resources = [
      "arn:aws:s3:::${aws_s3_bucket.main.id}/*",
      "arn:aws:s3:::${aws_s3_bucket.main.id}",
    ]
    principals {
      type = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.main.iam_arn]
    }
  }
}
resource "aws_s3_bucket_policy" "main" {
  bucket = aws_s3_bucket.main.id
  policy = data.aws_iam_policy_document.main.json  
}

/*** Cloudfront ***/
resource "aws_cloudfront_origin_access_identity" "main" {
  comment = local.project_name
}
resource "aws_cloudfront_distribution" "main" {
  http_version           = "http2"
  enabled                = true
  is_ipv6_enabled        = false
  wait_for_deployment    = false
  default_root_object    = "index.html"
  aliases                = [local.domain]
  price_class            = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
      locations        = []
    }
  }
  viewer_certificate {
    acm_certificate_arn      = data.aws_acm_certificate.east.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2019"
  }

  depends_on = [aws_s3_bucket.main]
  tags = local.all_tags

  origin {
    domain_name = aws_s3_bucket.main.bucket_regional_domain_name
    origin_id   = local.project_name
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.main.cloudfront_access_identity_path
    }
  }
  default_cache_behavior {
    # Cache behavior with precedence 2
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.project_name
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    compress               = true
    viewer_protocol_policy = "redirect-to-https"
    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }
}

