#!/bin/bash

sudo docker build -t imesec/sql-injectable:db db/
sudo docker push imesec/sql-injectable:db

sudo docker build -t imesec/sql-injectable:latest .
sudo docker push imesec/sql-injectable:latest