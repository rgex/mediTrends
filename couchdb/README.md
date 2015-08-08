TODO : increade CouchDB stack size
curl localhost:5984/_config/query_servers/javascript -X PUT -H content-type:application/json -d '"/usr/bin/couchjs -S 8388608 /usr/share/couchjs/main.js"'
