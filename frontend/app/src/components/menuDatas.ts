export interface MenuItem {
    mainMenu: string;
    subMenus: string[];
    price: number;
}

export interface DailyMenu {
    Breakfast: MenuItem;
    Lunch: MenuItem;
    Dinner: MenuItem;
    Lunchbox: MenuItem;
}

export interface RestaurantMenu {
    [day: string]: DailyMenu;
}

export interface Restaurants {
    [restaurant: string]: RestaurantMenu;
}

export const menuDatas: Restaurants = {
    "A": {
        "Monday": {
            "Breakfast": {
                "mainMenu": "Scrambled Eggs",
                "subMenus": ["Toast", "Bacon", "Fruit Salad"],
                "price": 10
            },
            "Lunch": {
                "mainMenu": "Chicken Rice Bowl",
                "subMenus": ["Miso Soup", "Salad", "Pickles"],
                "price": 15
            },
            "Dinner": {
                "mainMenu": "Grilled Salmon",
                "subMenus": ["Rice", "Steamed Vegetables", "Soup"],
                "price": 20
            },
            "Lunchbox": {
                "mainMenu": "Beef Bento",
                "subMenus": ["Rice", "Kimchi", "Fruit"],
                "price": 12
            }
        },
        "Tuesday": {
            "Breakfast": {
                "mainMenu": "Pancakes",
                "subMenus": ["Syrup", "Sausages", "Coffee"],
                "price": 10
            },
            "Lunch": {
                "mainMenu": "Pasta Carbonara",
                "subMenus": ["Garlic Bread", "Caesar Salad", "Lemonade"],
                "price": 15
            },
            "Dinner": {
                "mainMenu": "Steak",
                "subMenus": ["Potato Wedges", "Green Beans", "Wine"],
                "price": 25
            },
            "Lunchbox": {
                "mainMenu": "Chicken Sandwich",
                "subMenus": ["Chips", "Apple", "Juice"],
                "price": 10
            }
        },
        "Wednesday": {
            "Breakfast": {
                "mainMenu": "Pancakes",
                "subMenus": ["Syrup", "Sausages", "Coffee"],
                "price": 10
            },
            "Lunch": {
                "mainMenu": "Pasta Carbonara",
                "subMenus": ["Garlic Bread", "Caesar Salad", "Lemonade"],
                "price": 15
            },
            "Dinner": {
                "mainMenu": "Steak",
                "subMenus": ["Potato Wedges", "Green Beans", "Wine"],
                "price": 25
            },
            "Lunchbox": {
                "mainMenu": "Chicken Sandwich",
                "subMenus": ["Chips", "Apple", "Juice"],
                "price": 10
            }
        },
        "Thursday": {
            "Breakfast": {
                "mainMenu": "Pancakes",
                "subMenus": ["Syrup", "Sausages", "Coffee"],
                "price": 10
            },
            "Lunch": {
                "mainMenu": "Pasta Carbonara",
                "subMenus": ["Garlic Bread", "Caesar Salad", "Lemonade"],
                "price": 15
            },
            "Dinner": {
                "mainMenu": "Steak",
                "subMenus": ["Potato Wedges", "Green Beans", "Wine"],
                "price": 25
            },
            "Lunchbox": {
                "mainMenu": "Chicken Sandwich",
                "subMenus": ["Chips", "Apple", "Juice"],
                "price": 10
            }
        },
        "Friday": {
            "Breakfast": {
                "mainMenu": "Pancakes",
                "subMenus": ["Syrup", "Sausages", "Coffee"],
                "price": 10
            },
            "Lunch": {
                "mainMenu": "Pasta Carbonara",
                "subMenus": ["Garlic Bread", "Caesar Salad", "Lemonade"],
                "price": 15
            },
            "Dinner": {
                "mainMenu": "Steak",
                "subMenus": ["Potato Wedges", "Green Beans", "Wine"],
                "price": 25
            },
            "Lunchbox": {
                "mainMenu": "Chicken Sandwich",
                "subMenus": ["Chips", "Apple", "Juice"],
                "price": 10
            }
        }
        ,"Saturday": {
            "Breakfast": {
                "mainMenu": "Pancakes",
                "subMenus": ["Syrup", "Sausages", "Coffee"],
                "price": 10
            },
            "Lunch": {
                "mainMenu": "Pasta Carbonara",
                "subMenus": ["Garlic Bread", "Caesar Salad", "Lemonade"],
                "price": 15
            },
            "Dinner": {
                "mainMenu": "Steak",
                "subMenus": ["Potato Wedges", "Green Beans", "Wine"],
                "price": 25
            },
            "Lunchbox": {
                "mainMenu": "Chicken Sandwich",
                "subMenus": ["Chips", "Apple", "Juice"],
                "price": 10
            }
        }
        ,"Sunday": {
            "Breakfast": {
                "mainMenu": "Pancakes",
                "subMenus": ["Syrup", "Sausages", "Coffee"],
                "price": 10
            },
            "Lunch": {
                "mainMenu": "Pasta Carbonara",
                "subMenus": ["Garlic Bread", "Caesar Salad", "Lemonade"],
                "price": 15
            },
            "Dinner": {
                "mainMenu": "Steak",
                "subMenus": ["Potato Wedges", "Green Beans", "Wine"],
                "price": 25
            },
            "Lunchbox": {
                "mainMenu": "Chicken Sandwich",
                "subMenus": ["Chips", "Apple", "Juice"],
                "price": 10
            }
        }
    },
    "B": {
        "Monday": {
            "Breakfast": {
                "mainMenu": "Oatmeal",
                "subMenus": ["Nuts", "Berries", "Honey"],
                "price": 8
            },
            "Lunch": {
                "mainMenu": "Fish Tacos",
                "subMenus": ["Salsa", "Guacamole", "Chips"],
                "price": 12
            },
            "Dinner": {
                "mainMenu": "Roast Chicken",
                "subMenus": ["Mashed Potatoes", "Gravy", "Corn"],
                "price": 18
            },
            "Lunchbox": {
                "mainMenu": "Vegetable Wrap",
                "subMenus": ["Hummus", "Orange", "Water"],
                "price": 9
            }
        },
        "Tuesday": {
            "Breakfast": {
                "mainMenu": "French Toast",
                "subMenus": ["Maple Syrup", "Whipped Cream", "Cinnamon"],
                "price": 9
            },
            "Lunch": {
                "mainMenu": "Sushi Platter",
                "subMenus": ["Wasabi", "Soy Sauce", "Ginger"],
                "price": 20
            },
            "Dinner": {
                "mainMenu": "Spaghetti Bolognese",
                "subMenus": ["Parmesan", "Breadsticks", "Red Wine"],
                "price": 15
            },
            "Lunchbox": {
                "mainMenu": "Ham and Cheese Sandwich",
                "subMenus": ["Potato Salad", "Cookie", "Soda"],
                "price": 10
            }
        },
                "Wednesday": {
            "Breakfast": {
                "mainMenu": "Pancakes",
                "subMenus": ["Syrup", "Sausages", "Coffee"],
                "price": 10
            },
            "Lunch": {
                "mainMenu": "Pasta Carbonara",
                "subMenus": ["Garlic Bread", "Caesar Salad", "Lemonade"],
                "price": 15
            },
            "Dinner": {
                "mainMenu": "Steak",
                "subMenus": ["Potato Wedges", "Green Beans", "Wine"],
                "price": 25
            },
            "Lunchbox": {
                "mainMenu": "Chicken Sandwich",
                "subMenus": ["Chips", "Apple", "Juice"],
                "price": 10
            }
        },
        "Thursday": {
            "Breakfast": {
                "mainMenu": "Pancakes",
                "subMenus": ["Syrup", "Sausages", "Coffee"],
                "price": 10
            },
            "Lunch": {
                "mainMenu": "Pasta Carbonara",
                "subMenus": ["Garlic Bread", "Caesar Salad", "Lemonade"],
                "price": 15
            },
            "Dinner": {
                "mainMenu": "Steak",
                "subMenus": ["Potato Wedges", "Green Beans", "Wine"],
                "price": 25
            },
            "Lunchbox": {
                "mainMenu": "Chicken Sandwich",
                "subMenus": ["Chips", "Apple", "Juice"],
                "price": 10
            }
        },
        "Friday": {
            "Breakfast": {
                "mainMenu": "Pancakes",
                "subMenus": ["Syrup", "Sausages", "Coffee"],
                "price": 10
            },
            "Lunch": {
                "mainMenu": "Pasta Carbonara",
                "subMenus": ["Garlic Bread", "Caesar Salad", "Lemonade"],
                "price": 15
            },
            "Dinner": {
                "mainMenu": "Steak",
                "subMenus": ["Potato Wedges", "Green Beans", "Wine"],
                "price": 25
            },
            "Lunchbox": {
                "mainMenu": "Chicken Sandwich",
                "subMenus": ["Chips", "Apple", "Juice"],
                "price": 10
            }
        }
        ,"Saturday": {
            "Breakfast": {
                "mainMenu": "Pancakes",
                "subMenus": ["Syrup", "Sausages", "Coffee"],
                "price": 10
            },
            "Lunch": {
                "mainMenu": "Pasta Carbonara",
                "subMenus": ["Garlic Bread", "Caesar Salad", "Lemonade"],
                "price": 15
            },
            "Dinner": {
                "mainMenu": "Steak",
                "subMenus": ["Potato Wedges", "Green Beans", "Wine"],
                "price": 25
            },
            "Lunchbox": {
                "mainMenu": "Chicken Sandwich",
                "subMenus": ["Chips", "Apple", "Juice"],
                "price": 10
            }
        }
        ,"Sunday": {
            "Breakfast": {
                "mainMenu": "Pancakes",
                "subMenus": ["Syrup", "Sausages", "Coffee"],
                "price": 10
            },
            "Lunch": {
                "mainMenu": "Pasta Carbonara",
                "subMenus": ["Garlic Bread", "Caesar Salad", "Lemonade"],
                "price": 15
            },
            "Dinner": {
                "mainMenu": "Steak",
                "subMenus": ["Potato Wedges", "Green Beans", "Wine"],
                "price": 25
            },
            "Lunchbox": {
                "mainMenu": "Chicken Sandwich",
                "subMenus": ["Chips", "Apple", "Juice"],
                "price": 10
            }
        }
        // Add other days similarly
    },
    "C": {
        "Monday": {
            "Breakfast": {
                "mainMenu": "Bagel with Cream Cheese",
                "subMenus": ["Coffee", "Banana", "Yogurt"],
                "price": 7
            },
            "Lunch": {
                "mainMenu": "Chicken Caesar Salad",
                "subMenus": ["Bread Croutons", "Parmesan", "Caesar Dressing"],
                "price": 12
            },
            "Dinner": {
                "mainMenu": "Lamb Chops",
                "subMenus": ["Roasted Potatoes", "Asparagus", "Mint Sauce"],
                "price": 22
            },
            "Lunchbox": {
                "mainMenu": "Turkey Wrap",
                "subMenus": ["Coleslaw", "Chips", "Soft Drink"],
                "price": 11
            }
        },
        "Tuesday": {
            "Breakfast": {
                "mainMenu": "Smoothie Bowl",
                "subMenus": ["Mixed Berries", "Granola", "Honey"],
                "price": 8
            },
            "Lunch": {
                "mainMenu": "Bibimbap",
                "subMenus": ["Kimchi", "Egg", "Gochujang"],
                "price": 15
            },
            "Dinner": {
                "mainMenu": "Duck Confit",
                "subMenus": ["Sautéed Spinach", "Potato Puree", "Orange Sauce"],
                "price": 24
            },
            "Lunchbox": {
                "mainMenu": "Salad Box",
                "subMenus": ["Mixed Greens", "Cherry Tomatoes", "Vinaigrette"],
                "price": 9
            }
        },
                "Wednesday": {
            "Breakfast": {
                "mainMenu": "Pancakes",
                "subMenus": ["Syrup", "Sausages", "Coffee"],
                "price": 10
            },
            "Lunch": {
                "mainMenu": "Pasta Carbonara",
                "subMenus": ["Garlic Bread", "Caesar Salad", "Lemonade"],
                "price": 15
            },
            "Dinner": {
                "mainMenu": "Steak",
                "subMenus": ["Potato Wedges", "Green Beans", "Wine"],
                "price": 25
            },
            "Lunchbox": {
                "mainMenu": "Chicken Sandwich",
                "subMenus": ["Chips", "Apple", "Juice"],
                "price": 10
            }
        },
        "Thursday": {
            "Breakfast": {
                "mainMenu": "Pancakes",
                "subMenus": ["Syrup", "Sausages", "Coffee"],
                "price": 10
            },
            "Lunch": {
                "mainMenu": "Pasta Carbonara",
                "subMenus": ["Garlic Bread", "Caesar Salad", "Lemonade"],
                "price": 15
            },
            "Dinner": {
                "mainMenu": "Steak",
                "subMenus": ["Potato Wedges", "Green Beans", "Wine"],
                "price": 25
            },
            "Lunchbox": {
                "mainMenu": "Chicken Sandwich",
                "subMenus": ["Chips", "Apple", "Juice"],
                "price": 10
            }
        },
        "Friday": {
            "Breakfast": {
                "mainMenu": "Pancakes",
                "subMenus": ["Syrup", "Sausages", "Coffee"],
                "price": 10
            },
            "Lunch": {
                "mainMenu": "Pasta Carbonara",
                "subMenus": ["Garlic Bread", "Caesar Salad", "Lemonade"],
                "price": 15
            },
            "Dinner": {
                "mainMenu": "Steak",
                "subMenus": ["Potato Wedges", "Green Beans", "Wine"],
                "price": 25
            },
            "Lunchbox": {
                "mainMenu": "Chicken Sandwich",
                "subMenus": ["Chips", "Apple", "Juice"],
                "price": 10
            }
        }
        ,"Saturday": {
            "Breakfast": {
                "mainMenu": "Pancakes",
                "subMenus": ["Syrup", "Sausages", "Coffee"],
                "price": 10
            },
            "Lunch": {
                "mainMenu": "Pasta Carbonara",
                "subMenus": ["Garlic Bread", "Caesar Salad", "Lemonade"],
                "price": 15
            },
            "Dinner": {
                "mainMenu": "Steak",
                "subMenus": ["Potato Wedges", "Green Beans", "Wine"],
                "price": 25
            },
            "Lunchbox": {
                "mainMenu": "Chicken Sandwich",
                "subMenus": ["Chips", "Apple", "Juice"],
                "price": 10
            }
        }
        ,"Sunday": {
            "Breakfast": {
                "mainMenu": "Pancakes",
                "subMenus": ["Syrup", "Sausages", "Coffee"],
                "price": 10
            },
            "Lunch": {
                "mainMenu": "Pasta Carbonara",
                "subMenus": ["Garlic Bread", "Caesar Salad", "Lemonade"],
                "price": 15
            },
            "Dinner": {
                "mainMenu": "Steak",
                "subMenus": ["Potato Wedges", "Green Beans", "Wine"],
                "price": 25
            },
            "Lunchbox": {
                "mainMenu": "Chicken Sandwich",
                "subMenus": ["Chips", "Apple", "Juice"],
                "price": 10
            }
        }
        // Add other days similarly
    }
};
