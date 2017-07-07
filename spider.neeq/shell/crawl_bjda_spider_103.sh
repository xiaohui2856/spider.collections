#!/usr/bin/env bash
cd /home/apps/neeq_spider
dt=$(date "+%Y-%m-%d")
path_to_log="log/""$dt""_neeq_spider_103.log"
echo $path_to_log
scrapy crawl neeq_spider_103 -s LOG_FILE=$path_to_log &
