# Setting up a fresh architecture

## setting up bastion host

- Install Git
- - https://www.how2shout.com/linux/how-to-install-git-on-aws-ec2-amazon-linux-2/
- Install nvm and then node
- - https://tecadmin.net/how-to-install-nvm-on-centos-7/
- configure AWS
- Run `configure aws` and insert account credentials
- install psql
- - `sudo amazon-linux-extras install postgresql10`

## setting up RDS

- create dbs (same name as server names)
- - Get postgre connection string from db_url parameter `aws ssm get-parameter --name "db_url"`
- - `psql <db_url>`
- - `CREATE DATABASE "<server_name>";` for each server
- - Set DATABASE_URL as psql:.../server-name for each server to run migrations `export DATABASE_URL=...`. Go into the application folder (packages/application) and run `npm run db:migrate:prod` to run migration.
