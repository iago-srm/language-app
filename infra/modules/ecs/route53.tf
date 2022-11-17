data "aws_route53_zone" "this" {
  name         = "isrm.link."
}

resource "aws_route53_record" "api-language-app" {
  zone_id = data.aws_route53_zone.this.zone_id
  name    = "${var.environment == "staging" ? "staging." : ""}api.language-app.isrm.link"
  type    = "A"

  alias {
    name                   = aws_lb.main.dns_name
    zone_id                = aws_lb.main.zone_id
    evaluate_target_health = false

  }
}