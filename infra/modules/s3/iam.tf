resource "aws_s3_bucket_policy" "allow_all_access" {
  bucket = aws_s3_bucket.profile_image_bucket.id
  policy = data.aws_iam_policy_document.allow_all_access.json
}

data "aws_iam_policy_document" "allow_all_access" {
  statement {
    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    actions = [
      "s3:GetObject",
    ]

    resources = [
      "${aws_s3_bucket.profile_image_bucket.arn}/*",
    ]
  }
}