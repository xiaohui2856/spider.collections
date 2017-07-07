#!/usr/bin/env bash
cd /home/apps/bjda_spider
dt=$(date "+%Y-%m-%d")
path_to_log="log/""$dt""_bjda_spider_311.log"
echo $path_to_log
scrapy crawl bjda_spider_311 -s LOG_FILE=$path_to_log &
