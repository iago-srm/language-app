
resource "aws_lambda_function" "consumer_lambda" {
  filename      = "lambda-function/function.zip"
  function_name = "consumer_lambda"
  role          = aws_iam_role.consumer_lambda.arn
  handler       = "index.handler"

  source_code_hash = filebase64sha256("lambda-function/function.zip")

  runtime = "nodejs14.x"

  environment {
    variables = {
      foo = "bar"
    }
  }
}

resource "aws_lambda_event_source_mapping" "sqs-consumer_lambda" {
  event_source_arn = aws_sqs_queue.auth-domain-queue.arn
  function_name    = aws_lambda_function.consumer_lambda.arn
}
