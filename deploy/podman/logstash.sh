podman network create dev

podman run -d --network dev --name logstash \
    -p 5044:5044 \
    -v ~/Code/node-server-template/containers/config/logstash/logstash.yml:/usr/share/logstash/config/logstash.yml \
    -v ~/Code/node-server-template/containers/config/logstash/logstash.conf:/usr/share/logstash/pipeline/logstash.conf \
    docker.elastic.co/logstash/logstash:8.15.2