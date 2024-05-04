import logging
from crawler import Crawler
from db_connector import DBConnector
from datetime import datetime, timedelta
from apscheduler.schedulers.blocking import BlockingScheduler


# Configuring the logging
logging.basicConfig(level=logging.INFO)  # Set minimum log level to INFO
logger = logging.getLogger(__name__)  # Get a logger


sched = BlockingScheduler()
db = DBConnector()
crawler = Crawler(db)


def crawl_this_week():

    now = datetime.now()
    end_date = now + timedelta((6 - now.weekday()))
    dates = [(now + timedelta(days=i)).date() for i in range((end_date - now).days + 1)]
    logger.info(f"주간 크롤링 시작 : {dates[0]} ~ {dates[-1]}")
    crawler.run(dates)
    logger.info(f"주간 크롤링 종료 : {dates[0]} ~ {dates[-1]}")


def crawl_today():
    now = datetime.now()
    logger.info(f"오늘의 메뉴 크롤링 시작 : {now.date()}...")
    crawler.run([now.date()])
    logger.info(f"오늘의 메뉴 크롤링 종료 : {now.date()}...")


sched.add_job(crawl_this_week, 'cron', hour=6)

for hour in [8, 9, 11, 12, 13, 17, 18, 19]:
    sched.add_job(crawl_today, 'cron', hour=hour)

logger.info("애플리케이션 시작")
crawl_this_week()
sched.start()
