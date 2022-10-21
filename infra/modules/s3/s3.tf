resource "aws_s3_bucket" "profile_image_bucket" {
  bucket = "language-app-auth-web-api-profile-image"
  force_destroy = true
}

resource "aws_s3_bucket_acl" "bucket_acl" {
  bucket = aws_s3_bucket.profile_image_bucket.id
  acl    = "public-read"
}

resource "aws_s3_bucket_object" "object" {
  bucket = aws_s3_bucket.profile_image_bucket.bucket
  key    = "generic-avatar-1.jpg"
  source = "../modules/s3/generic-avatar-1.jpg"
  acl = "public-read"
  etag = filemd5("../modules/s3/generic-avatar-1.jpg")
}