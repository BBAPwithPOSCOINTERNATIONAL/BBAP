import os
from dotenv import load_dotenv
import mysql.connector


class DBConnector:
    def __init__(self):
        load_dotenv()

        user = os.getenv('DB_USER')
        password = os.getenv('DB_PASSWORD')
        host = os.getenv('DB_HOST')
        port = os.getenv('DB_PORT')
        database = os.getenv('DB_DATABASE')

        self.cnx = mysql.connector.connect(user=user, password=password, host=host, port=port, database=database)
        self.cursor = self.cnx.cursor()

    def insert_restaurant_menu(
            self, restaurant_id, menu_date, section_id, food_name, img_src, food_detail, price, eat_count
    ):
        select_query = f"""
        SELECT * FROM restaurant_menu
        WHERE restaurant_id = '{restaurant_id}' AND menu_date = '{menu_date}'
        AND meal_classification = '{section_id}' AND menu_name = '{food_name}';
        """

        self.cursor.execute(select_query)
        result = self.cursor.fetchone()

        if result is None:
            insert_query = f"""
            INSERT INTO restaurant_menu 
            (restaurant_id, menu_date, meal_classification, menu_name, menu_image, menu_detail, menu_price, eat_count) 
            VALUES ('{restaurant_id}', '{menu_date}', '{section_id}', '{food_name}', 
            '{img_src}', '{food_detail}', '{price}', '{eat_count}');
            """

            self.cursor.execute(insert_query)
        else:
            existing_img_src = result['menu_image']
            if existing_img_src != img_src:
                update_query = f"""
                UPDATE restaurant_menu
                SET menu_image = '{img_src}'
                WHERE restaurant_id = '{restaurant_id}' AND menu_date = '{menu_date}'
                AND meal_classification = '{section_id}' AND menu_name = '{food_name}';
                """

                self.cursor.execute(update_query)

        self.cnx.commit()

    def close(self):
        self.cursor.close()
        self.cnx.close()
