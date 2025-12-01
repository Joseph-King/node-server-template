podman network create dev

podman run -d --network dev --name os-dashboard \
    -v ~/Code/node-server-template/containers/config/os-dashboard/opensearch_dashboards.yml:/usr/share/opensearch-dashboards/config/opensearch_dashboards.yml \
    -p 5601:5601 \
    opensearchproject/opensearch-dashboards:latest