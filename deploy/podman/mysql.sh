podman network create dev

podman volume create mysql-data

podman run -d --name mysql --network dev \
    -v mysql-data:/var/lib/mysql \
    -p 3306:3306 \
    --restart unless-stopped \
    -e MYSQL_ROOT_PASSWORD=root \
    -e MYSQL_DATABASE=test \
    -e MYSQL_USER=test \
    -e MYSQL_PASSWORD=test \
    mysql:latest