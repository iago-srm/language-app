#!/bin/bash

cd language-app/packages/web-api

export DATABASE_URL=postgres://postgres:supersecretpassword@main.cc0qmkg5rwaj.us-east-1.rds.amazonaws.com:5432/web-api

npx prisma studio