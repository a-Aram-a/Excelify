#!/bin/bash

action=$1

if [[ $action = "dev-up" ]]; then
    echo "starting docker compose"
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
fi

if [[ $action = "prod-up" ]]; then
    echo "starting docker compose"
    docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
fi

if [[ $action = "down" ]]; then
    echo "stopping docker compose"
    docker-compose down
fi