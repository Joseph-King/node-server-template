podman network create dev

podman volume create mariadb-data

podman run -d --name mariadb --network dev \
    -v mysql-data:/var/lib/mysql \
    -p 3306:3306 \
    --restart unless-stopped \
    -e MARIADB_ROOT_PASSWORD=root \
    -e MARIADB_DATABASE=test \
    -e MARIADB_USER=test \
    -e MARIADB_PASSWORD=test \
    mariadb:latest