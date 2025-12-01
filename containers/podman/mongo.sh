podman network create dev

podman volume create mongo-data

podman run -d --name mongodb --network dev \
    -v mongo-data:/data/db \
    -p 27017:27017 \
    --restart unless-stopped \
    mongodb/mongodb-community-server:7.0.8-ubi9