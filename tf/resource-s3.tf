/*** www ***/
resource "aws_s3_bucket" "main" {
  bucket = "${local.resource_name}"
  force_destroy = true
  website {
    index_document = "index.html"
  }
  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }
  dynamic "cors_rule" {
    for_each = distinct(compact(concat(["*"], [local.alias])))
    content {
      allowed_headers = ["*"]
      allowed_methods = ["GET"]
      allowed_origins = [cors_rule.value]
      expose_headers  = ["ETag"]
      max_age_seconds = 3600
    }
  }
  tags = local.all_tags
}