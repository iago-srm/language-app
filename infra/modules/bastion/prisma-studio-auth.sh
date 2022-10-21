#!/bin/bash

cd language-app/packages/auth-web-api

export DATABASE_URL=postgres://postgres:supersecretpassword@main.cc0qmkg5rwaj.us-east-1.rds.amazonaws.com:5432/auth-web-api

npx prisma studio