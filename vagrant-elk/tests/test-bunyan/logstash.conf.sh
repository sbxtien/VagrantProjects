cd opt/logstash
bin/logstash -e 'input { udp { port => "9998" codec => json } } filter { geoip { source => "_ip" }} output { stdout {} elasticsearch { hosts => ["localhost:9200"] } }'
