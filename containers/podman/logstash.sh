podman network create dev

podman pod create --network dev -p 9200:9200 -p 5601:5601 -p 5044:5044 elk

podman volume create es-data

podman build --file ../config/elastic/Containerfile --tag elastic

podman run -d --pod elk --name elasticsearch \
    -v es-data:/usr/share/elasticsearch/data \
    --health-cmd "curl --user elastic:elastic http://localhost:9200" \
    --health-interval 10s \
    --health-retries 10 \
    -e ELASTIC_PASSWORD=elastic \
    -e discovery.type=single-node \
    -e xpack.security.enabled=true \
    -e KIBANA_SYSTEM_PASSWORD=kibana \
    docker.elastic.co/elasticsearch/elasticsearch:8.15.2

podman run -d --pod elk --name kibana \
    --requires elasticsearch \
    -e ELASTICSEARCH_HOSTS=http://elasticsearch:9200 \
    -e ELASTICSEARCH_PASSWORD=kibana \
    -e ELASTICSEARCH_USERNAME=kibana_system \
    docker.elastic.co/kibana/kibana:8.15.2

podman run -d --pod elk --name logstash \
    --requires elasticsearch \
    docker.elastic.co/logstash/logstash:8.15.2