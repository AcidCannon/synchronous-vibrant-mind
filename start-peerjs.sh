#!/bin/bash
nohup peerjs --port 9000 --key peerjs --path / --sslkey ~/synchronous-vibrant-mind/nginx/server.key --sslcert ~/synchronous-vibrant-mind/nginx/server.crt > /dev/null 2>&1 & 

