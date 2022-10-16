resource "aws_iam_role" "codepipeline_role" {
  name = "language-app-codepipeline"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "codepipeline.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "codepipeline_policy" {
  name = "codepipeline_policy"
  role = aws_iam_role.codepipeline_role.id

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
        "Action": [
            "ecs:DescribeServices",
            "ecs:CreateTaskSet",
            "ecs:UpdateServicePrimaryTaskSet",
            "ecs:DeleteTaskSet",
            "elasticloadbalancing:DescribeTargetGroups",
            "elasticloadbalancing:DescribeListeners",
            "elasticloadbalancing:ModifyListener",
            "elasticloadbalancing:DescribeRules",
            "elasticloadbalancing:ModifyRule",
            "lambda:InvokeFunction",
            "cloudwatch:DescribeAlarms",
            "sns:Publish",
            "s3:GetObject",
            "s3:GetObjectVersion"
        ],
        "Resource": "*",
        "Effect": "Allow"
    },
    {
        "Action": [
            "iam:PassRole"
        ],
        "Effect": "Allow",
        "Resource": "*",
        "Condition": {
            "StringLike": {
                "iam:PassedToService": [
                    "ecs-tasks.amazonaws.com"
                ]
            }
        }
    },
    {
      "Effect":"Allow",
      "Action": [
        "s3:GetObject",
        "s3:GetObjectVersion",
        "s3:GetBucketVersioning",
        "s3:PutObjectAcl",
        "s3:PutObject"
      ],
      "Resource": [
        "${aws_s3_bucket.codepipeline_bucket.arn}",
        "${aws_s3_bucket.codepipeline_bucket.arn}/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "ecr:*"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "codedeploy:*"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ecs:*"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "codebuild:BatchGetBuilds",
        "codebuild:StartBuild"
      ],
      "Resource": "*"
    },
    {
        "Action": [
            "opsworks:CreateDeployment",
            "opsworks:DescribeApps",
            "opsworks:DescribeCommands",
            "opsworks:DescribeDeployments",
            "opsworks:DescribeInstances",
            "opsworks:DescribeStacks",
            "opsworks:UpdateApp",
            "opsworks:UpdateStack"
        ],
        "Resource": "*",
        "Effect": "Allow"
    },
    {
        "Action": [
            "elasticbeanstalk:*",
            "ec2:*",
            "elasticloadbalancing:*",
            "autoscaling:*",
            "cloudwatch:*",
            "s3:*",
            "sns:*",
            "cloudformation:*",
            "rds:*",
            "sqs:*",
            "ecs:*"
        ],
        "Resource": "*",
        "Effect": "Allow"
    },
    {
        "Action": [
            "codedeploy:CreateDeployment",
            "codedeploy:GetApplication",
            "codedeploy:GetApplicationRevision",
            "codedeploy:GetDeployment",
            "codedeploy:GetDeploymentConfig",
            "codedeploy:RegisterApplicationRevision"
        ],
        "Resource": "*",
        "Effect": "Allow"
    }
  ]
}
EOF
}
