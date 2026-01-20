podman network create dev

podman volume create dynamo-data

podman run -d --name dynamodb --network dev \
    -v dynamo-data:/home/dynamodblocal/data \
    -p 8000:8000 \
    --restart unless-stopped \
    amazon/dynamodb-local:latest