podman network create dev

podman volume create os-data

podman run -d --network dev --name opensearch \
    -v os-data:/usr/share/opensearch/data \
    -p 9200:9200 \
    --health-cmd "curl --user admin:b3BlbnNlYXJjaAo= http://localhost:9200" \
    --health-interval 10s \
    --health-retries 10 \
    -e OPENSEARCH_INITIAL_ADMIN_PASSWORD=b3BlbnNlYXJjaAo= \
    -e cluster.name=opensearch-cluster \
    -e node.name=node1 \
    -e discovery.type=single-node \
    -e bootstrap.memory_lock=true \
    -e OPENSEARCH_JAVA_OPTS="-Xms512m -Xmx512m" \
    -e plugins.security.disabled=false \
    opensearchproject/opensearch:latest