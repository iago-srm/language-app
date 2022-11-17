resource "aws_iam_role" "ecs_task_execution_role" {
  name = "${var.server-name}-ecsTaskExecutionRole-${var.environment}"

inline_policy {
    name = "allow_create_log_groups"

    policy = jsonencode({
      Version = "2012-10-17"
      Statement = [
        {
          Action   = ["logs:CreateLogGroup"]
          Effect   = "Allow"
          Resource = "*"
        },
      ]
    })
    
  }

  

  assume_role_policy = <<EOF
{
 "Version": "2012-10-17",
 "Statement": [
   {
     "Action": "sts:AssumeRole",
     "Principal": {
       "Service": "ecs-tasks.amazonaws.com"
     },
     "Effect": "Allow",
     "Sid": ""
   }
 ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "ecs-task-execution-role-policy-attachment" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_iam_role" "ecs_task_role" {
  name = "${var.server-name}-ecsTaskRole-${var.environment}"

inline_policy {
    name = "allow_execute_command"

    policy = jsonencode({
      Version = "2012-10-17"
      Statement = [
        {
          Action   = [ "ssmmessages:CreateControlChannel",            
      "ssmmessages:CreateDataChannel",            
      "ssmmessages:OpenControlChannel",            
      "ssmmessages:OpenDataChannel"  ]
          Effect   = "Allow"
          Resource = "*"
        },
      ]
    })
    
  }
  
  assume_role_policy = <<EOF
{
 "Version": "2012-10-17",
 "Statement": [
   {
     "Action": "sts:AssumeRole",
     "Principal": {
       "Service": "ecs-tasks.amazonaws.com"
     },
     "Effect": "Allow",
     "Sid": ""
   }
 ]
}
EOF
}

resource "aws_iam_policy" "sqs" {
  name        = "${var.server-name}-task-policy-sqs-${var.environment}"
  description = "Policy that allows access to SQS"

  policy = <<EOF
{
   "Version": "2012-10-17",
   "Statement": [
       {
           "Effect": "Allow",
           "Action": [
              "sqs:*"
           ],
           "Resource": "*"
       }
   ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "ecs-task-role-policy-attachment_sqs" {
  role       = aws_iam_role.ecs_task_role.name
  policy_arn = aws_iam_policy.sqs.arn
}


resource "aws_iam_policy" "s3" {
  name        = "${var.server-name}-task-policy-s3-${var.environment}"
  description = "Policy that allows access to S3"

  policy = <<EOF
{
   "Version": "2012-10-17",
   "Statement": [
       {
           "Effect": "Allow",
           "Action": [
              "s3:*"
           ],
           "Resource": "*"
       }
   ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "ecs-task-role-policy-attachment_s3" {
  role       = aws_iam_role.ecs_task_role.name
  policy_arn = aws_iam_policy.s3.arn
}

resource "aws_iam_policy" "ssm" {
  name        = "${var.server-name}-task-policy-ssm-${var.environment}"
  description = "Policy that allows access to SSM"

  policy = <<EOF
{
   "Version": "2012-10-17",
   "Statement": [
      {
        "Effect": "Allow",
        "Action": [
          "ecs:ExecuteCommand"
        ],
        "Resource": "*"
      }
   ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "ecs-ssm" {
  role       = aws_iam_role.ecs_task_role.name
  policy_arn = aws_iam_policy.sqs.arn
}