resource "aws_iam_role" "consumer_lambda" {
  name = "language-app-consumer_lambda"

  assume_role_policy = jsonencode(
    {
      "Version" : "2012-10-17",
      "Statement" : [
        {
          "Action" : "sts:AssumeRole",
          "Principal" : {
            "Service" : "lambda.amazonaws.com"
          },
          "Effect" : "Allow",
          "Sid" : ""
        }
      ]
    }
  )

  inline_policy {
    name = "consumer_lambda"

    policy = jsonencode({
      Version = "2012-10-17"
      "Statement" = [
        {
          Sid = "AllowSQSPermissions"
          Action = [
            "sqs:ChangeMessageVisibility",
            "sqs:DeleteMessage",
            "sqs:GetQueueAttributes",
            "sqs:ReceiveMessage",
          ]
          Effect   = "Allow"
          Resource = "arn:aws:sqs:*"
        },
        {
          Sid      = "AllowInvokingLambdas"
          Action   = ["lambda:InvokeFunction"]
          Effect   = "Allow"
          Resource = ["arn:aws:lambda:us-east-1:*:function:*"]
        },
        {
          Sid      = "AllowCreatingLogGroups"
          Action   = ["logs:CreateLogGroup"]
          Effect   = "Allow"
          Resource = ["arn:aws:logs:us-east-1:*:*"]
        },
        {
          Sid = "AllowWritingLogs"
          Action = [
            "logs:CreateLogStream",
            "logs:PutLogEvents",
          ]
          Effect   = "Allow"
          Resource = ["arn:aws:logs:us-east-1:*:log-group:/aws/lambda/*:*"]
        },
      ]
    })
  }
}
