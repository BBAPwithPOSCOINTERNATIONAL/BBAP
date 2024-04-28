from datetime import date
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from db_connector import DBConnector
from typing import Dict, List
import time


class Crawler:
    def __init__(self, db: DBConnector):
        self.driver = self.__get_driver()
        self.db = db
        self.area_map = {'A': '포항', 'B': '광양', 'C': '서울', 'D': '송도'}
        self.base_url = 'https://m.poswel.co.kr/fmenu'
        self.section_to_id = {'아침': 1, '점심': 2, '저녁': 3, '도시락': 4}

    @staticmethod
    def __get_driver():
        chrome_options = webdriver.ChromeOptions()
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument('headless')
        return webdriver.Chrome(options=chrome_options)

    def __get_sikdang_dict(self, area: str) -> Dict[str, str]:
        self.driver.get(f"{self.base_url}?s_area={area}")
        time.sleep(4)
        sikdang_select = Select(self.driver.find_element(By.ID, 'sikdang'))
        sikdang_options = sikdang_select.options
        return {option.get_attribute('value'): option.accessible_name for option in sikdang_options}

    def __get_section_list(self, area: str, uid: str) -> List[str]:
        self.driver.get(f"{self.base_url}?s_area={area}&s_uid={uid}")
        time.sleep(3)
        section_select = Select(self.driver.find_element(By.ID, 'section'))
        section_options = section_select.options
        return [section.get_attribute('value') for section in section_options]

    def __crawl_restaurant_data(self, area: str, uid: str, section: str, date_data: date):
        self.driver.get(
            f"{self.base_url}?s_area={area}&s_uid={uid}&section={section}&s_date_y={date_data.year}&s_date_m={date_data.month}&s_date_d={date_data.day}")
        todays_lists = self.driver.find_elements(By.CLASS_NAME, 'todays-list')

        for todays_list in todays_lists:
            list_items = todays_list.find_elements(By.CSS_SELECTOR, 'li.more')

            for li_item in list_items:
                food_name = li_item.find_element(By.CSS_SELECTOR, 'h4.tit span').text
                price = int(li_item.find_element(By.CSS_SELECTOR, 'span.price').text[:-1].replace(',', ''))
                food_list = li_item.find_element(By.CSS_SELECTOR, 'p.dtl').text

                li_item.click()
                time.sleep(3)
                menu_detail = self.driver.find_element(By.CLASS_NAME, 'menu-detail')
                menu_img = menu_detail.find_element(By.ID, 'menu_img')
                img_src = menu_img.get_attribute('src')

                menu_date = f"{date_data.year}-{date_data.month}-{date_data.day}"
                eat_count = 0

                close_button = menu_detail.find_element(By.CLASS_NAME, 'close-modal')
                close_button.click()
                time.sleep(3)

                self.db.insert_restaurant_menu(uid, menu_date, section, food_name, img_src, food_list,
                                               price, eat_count)

    def run(self, dates):
        # 근무지 별 순회
        for area in self.area_map.keys():
            sikdang_dict = self.__get_sikdang_dict(area)
            # 식당별 조회
            for uid in sikdang_dict.keys():
                section_list = self.__get_section_list(area, uid)
                # 식구분 조회
                for section in section_list:
                    section_id = self.section_to_id.get(section)
                    for date_data in dates:
                        self.__crawl_restaurant_data(area, uid, section_id, date_data)
