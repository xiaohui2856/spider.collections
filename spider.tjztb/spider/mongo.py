# -*- coding:utf-8 -*-
__author__ = 'zhaojm'

import pymongo
import logging
import random

# MONGO
MONGO_URI = "localhost:27017"
mongo_client = pymongo.MongoClient(MONGO_URI)

tjztb_db = mongo_client["tjztb"]


class TjztbDB(object):
    def __init__(self):
        pass

    @staticmethod
    def upsert_company(company):
        logging.info("<MONGO> %s" % company)
        tjztb_db.company_info.update({'url': company['url']}, {'$set': company}, True, True)

    @staticmethod
    def find_one(url):
        logging.info("<MONGO> %s" % url)
        company = tjztb_db.company_info.find_one({'url': url})
        if company:
            return True
        else:
            return False
