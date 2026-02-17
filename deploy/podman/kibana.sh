podman network create dev

podman run -d --network dev --name kibana \
    -p 5601:5601 \
    -e ELASTICSEARCH_HOSTS=http://elasticsearch:9200 \
    -e ELASTICSEARCH_PASSWORD=YC5ZisGFWFdJ9HP4SxfK \
    -e ELASTICSEARCH_USERNAME=kibana_system \
    docker.elastic.co/kibana/kibana:8.15.2