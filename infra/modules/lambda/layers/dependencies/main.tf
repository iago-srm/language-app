resource "aws_lambda_layer_version" "dependencies" {
  filename   = "lambda_layer_payload.zip"
  layer_name = "lambda_layer_name"

  compatible_runtimes = ["nodejs12.x"]
}