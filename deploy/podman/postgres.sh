podman network create dev

podman volume create postgres-data

podman run -d --name postgres --network dev \
    -v postgres-data:/var/lib/postgresql/data \
    -p 5432:5432 \
    --restart unless-stopped \
    -e POSTGRES_DB=postgres \
    -e POSTGRES_USER=myuser \
    -e POSTGRES_PASSWORD=postgres \
    postgres:latest