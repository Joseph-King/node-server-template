podman network create dev

podman build --file ../config/fluentd/Containerfile --tag fluentd

podman run -d --network dev --name fluentd \
    -v ../config/fluentd/conf:/fluentd/etc \
    -p 9880:9800 \
    --requires elasticsearch \
    localhost/fluentd:latest