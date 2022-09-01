data "aws_s3_bucket" "lambda-bucket" {
  bucket = var.lambda-bucket_name
}

data "archive_file" "this" {
  type = "zip"

  source_dir  = "${path.module}/lambda-function"
  output_path = "${path.module}/lambda-function.zip"
}

resource "aws_s3_object" "this" {
  bucket = data.aws_s3_bucket.lambda-bucket.bucket

  key    = "lambda-function.zip"
  source = data.archive_file.this.output_path

  etag = filemd5(data.archive_file.this.output_path)
}

resource "aws_lambda_function" "this" {
  function_name = "${var.name}-consumer_lambda-${var.environment}"
  handler       = "index.handler"

  s3_bucket = data.aws_s3_bucket.lambda-bucket.bucket
  s3_key    = aws_s3_object.this.key

  source_code_hash = data.archive_file.this.output_base64sha256

  runtime = "nodejs14.x"
  role          = aws_iam_role.consumer_lambda.arn

  environment {
    variables = {
      API_URL = var.env_api_url
    }
  }

  tags = var.tags
}

resource "aws_lambda_event_source_mapping" "sqs-consumer_lambda" {
  event_source_arn = aws_sqs_queue.auth-domain-queue.arn
  function_name    = aws_lambda_function.this.arn
}
