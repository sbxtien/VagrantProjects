curl \
    -H "content-type: application/json" \
    -X POST "ca-to-sc-elk-dev:8000/test_index/test_type" \
    -d '{ "key": "value" }'
