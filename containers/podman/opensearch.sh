podman network create dev

podman volume create os-data

podman build --file ../config/opensearch/Containerfile --tag opensearch

podman run -d --network dev --name opensearch \
    -v os-data:/usr/share/opensearch/data \
    -p 9200:9200 \
    --health-cmd "curl --user admin:open http://localhost:9200" \
    --health-interval 10s \
    --health-retries 10 \
    -e OPENSEARCH_INITIAL_ADMIN_PASSWORD=b3BlbnNlYXJjaAo= \
    localhost/opensearch:latest