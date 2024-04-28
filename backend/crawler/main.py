from crawler import Crawler
from db_connector import DBConnector
from datetime import datetime, timedelta
from apscheduler.schedulers.blocking import BlockingScheduler

sched = BlockingScheduler()
db = DBConnector()
crawler = Crawler(db)


def crawl_this_week():
    now = datetime.now()
    end_date = now + timedelta((6 - now.weekday()))
    dates = [(now + timedelta(days=i)).date() for i in range((end_date - now).days + 1)]
    crawler.run(dates)


def crawl_today():
    now = datetime.now()
    crawler.run([now.date()])


sched.add_job(crawl_this_week, 'cron', hour=6)

for hour in [8, 9, 11, 12, 13, 17, 18, 19]:
    sched.add_job(crawl_today, 'cron', hour=hour)

crawl_this_week()
sched.start()
