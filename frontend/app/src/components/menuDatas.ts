export interface MenuItem {
  mainMenu: string;
  subMenus: string[];
  price: number;
  imageUrl?: string;
}

export interface DailyMenu {
  Breakfast: MenuItem[];
  Lunch: MenuItem[];
  Dinner: MenuItem[];
  Lunchbox: MenuItem[];
}

export interface RestaurantMenu {
  [day: string]: DailyMenu;
}

export interface Restaurants {
  [restaurant: string]: RestaurantMenu;
}

export const menuDatas: Restaurants = {
  A: {
    Monday: {
      Breakfast: [
        {
          mainMenu: "Scrambled Eggs",
          subMenus: ["Toast", "Bacon", "Fruit Salad"],
          price: 10,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Omelette",
          subMenus: ["Mushrooms", "Tomatoes", "Cheese"],
          price: 12,
          imageUrl: "/assets/images/clzls.jpg",
        },
      ],
      Lunch: [
        {
          mainMenu: "Chicken Rice Bowl",
          subMenus: ["Miso Soup", "Salad", "Pickles"],
          price: 15,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Veggie Burger",
          subMenus: ["Fries", "Coleslaw"],
          price: 14,
          imageUrl: "/assets/images/clzls.jpg",
        },
      ],
      Dinner: [
        {
          mainMenu: "Grilled Salmon",
          subMenus: ["Rice", "Steamed Vegetables", "Soup"],
          price: 20,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Pork Chops",
          subMenus: ["Mashed Potatoes", "Green Beans"],
          price: 22,
          imageUrl: "/assets/images/clzls.jpg",
        },
      ],
      Lunchbox: [
        {
          mainMenu: "Beef Bento",
          subMenus: ["Rice", "Kimchi", "Fruit"],
          price: 12,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Salad Box",
          subMenus: ["Greek Salad", "Chicken Breast", "Pita Bread"],
          price: 11,
          imageUrl: "/assets/images/clzls.jpg",
        },
      ],
    },
    Tuesday: {
      Breakfast: [
        {
          mainMenu: "Grilled Salmon",
          subMenus: ["Rice", "Steamed Vegetables", "Soup"],
          price: 20,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Pork Chops",
          subMenus: ["Mashed Potatoes", "Green Beans"],
          price: 22,
          imageUrl: "/assets/images/clzls.jpg",
        },
      ],
      Lunch: [
        {
          mainMenu: "Beef Bento",
          subMenus: ["Rice", "Kimchi", "Fruit"],
          price: 12,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Salad Box",
          subMenus: ["Greek Salad", "Chicken Breast", "Pita Bread"],
          price: 11,
          imageUrl: "/assets/images/clzls.jpg",
        },
      ],
      Dinner: [
        {
          mainMenu: "Chicken Rice Bowl",
          subMenus: ["Miso Soup", "Salad", "Pickles"],
          price: 15,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Veggie Burger",
          subMenus: ["Fries", "Coleslaw"],
          price: 14,
          imageUrl: "/assets/images/clzls.jpg",
        },
      ],
      Lunchbox: [
        {
          mainMenu: "Scrambled Eggs",
          subMenus: ["Toast", "Bacon", "Fruit Salad"],
          price: 10,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Omelette",
          subMenus: ["Mushrooms", "Tomatoes", "Cheese"],
          price: 12,
          imageUrl: "/assets/images/clzls.jpg",
        },
      ],
    },
    Wednesday: {
      Breakfast: [
        {
          mainMenu: "Grilled Salmon",
          subMenus: ["Rice", "Steamed Vegetables", "Soup"],
          price: 20,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Pork Chops",
          subMenus: ["Mashed Potatoes", "Green Beans"],
          price: 22,
          imageUrl: "/assets/images/clzls.jpg",
        },
      ],
      Lunch: [
        {
          mainMenu: "Beef Bento",
          subMenus: ["Rice", "Kimchi", "Fruit"],
          price: 12,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Salad Box",
          subMenus: ["Greek Salad", "Chicken Breast", "Pita Bread"],
          price: 11,
          imageUrl: "/assets/images/clzls.jpg",
        },
      ],
      Dinner: [
        {
          mainMenu: "Chicken Rice Bowl",
          subMenus: ["Miso Soup", "Salad", "Pickles"],
          price: 15,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Veggie Burger",
          subMenus: ["Fries", "Coleslaw"],
          price: 14,
          imageUrl: "/assets/images/clzls.jpg",
        },
      ],
      Lunchbox: [
        {
          mainMenu: "Scrambled Eggs",
          subMenus: ["Toast", "Bacon", "Fruit Salad"],
          price: 10,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Omelette",
          subMenus: ["Mushrooms", "Tomatoes", "Cheese"],
          price: 12,
          imageUrl: "/assets/images/clzls.jpg",
        },
      ],
    },
    Thursday: {
      Breakfast: [
        {
          mainMenu: "Grilled Salmon",
          subMenus: ["Rice", "Steamed Vegetables", "Soup"],
          price: 20,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Pork Chops",
          subMenus: ["Mashed Potatoes", "Green Beans"],
          price: 22,
          imageUrl: "/assets/images/clzls.jpg",
        },
      ],
      Lunch: [
        {
          mainMenu: "Beef Bento",
          subMenus: ["Rice", "Kimchi", "Fruit"],
          price: 12,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Salad Box",
          subMenus: ["Greek Salad", "Chicken Breast", "Pita Bread"],
          price: 11,
          imageUrl: "/assets/images/clzls.jpg",
        },
      ],
      Dinner: [
        {
          mainMenu: "Chicken Rice Bowl",
          subMenus: ["Miso Soup", "Salad", "Pickles"],
          price: 15,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Veggie Burger",
          subMenus: ["Fries", "Coleslaw"],
          price: 14,
          imageUrl: "/assets/clzls.jpg",
        },
      ],
      Lunchbox: [
        {
          mainMenu: "Scrambled Eggs",
          subMenus: ["Toast", "Bacon", "Fruit Salad"],
          price: 10,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Omelette",
          subMenus: ["Mushrooms", "Tomatoes", "Cheese"],
          price: 12,
          imageUrl: "/assets/images/clzls.jpg",
        },
      ],
    },
    Friday: {
      Breakfast: [
        {
          mainMenu: "Grilled Salmon",
          subMenus: ["Rice", "Steamed Vegetables", "Soup"],
          price: 20,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Pork Chops",
          subMenus: ["Mashed Potatoes", "Green Beans"],
          price: 22,
          imageUrl: "/assets/images/clzls.jpg",
        },
      ],
      Lunch: [
        {
          mainMenu: "Beef Bento",
          subMenus: ["Rice", "Kimchi", "Fruit"],
          price: 12,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Salad Box",
          subMenus: ["Greek Salad", "Chicken Breast", "Pita Bread"],
          price: 11,
          imageUrl: "/assets/images/clzls.jpg",
        },
      ],
      Dinner: [
        {
          mainMenu: "Chicken Rice Bowl",
          subMenus: ["Miso Soup", "Salad", "Pickles"],
          price: 15,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Veggie Burger",
          subMenus: ["Fries", "Coleslaw"],
          price: 14,
          imageUrl: "/assets/images/clzls.jpg",
        },
      ],
      Lunchbox: [
        {
          mainMenu: "Scrambled Eggs",
          subMenus: ["Toast", "Bacon", "Fruit Salad"],
          price: 10,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Omelette",
          subMenus: ["Mushrooms", "Tomatoes", "Cheese"],
          price: 12,
          imageUrl: "/assets/images/clzls.jpg",
        },
      ],
    },
    Saturday: {
      Breakfast: [
        {
          mainMenu: "Grilled Salmon",
          subMenus: ["Rice", "Steamed Vegetables", "Soup"],
          price: 20,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Pork Chops",
          subMenus: ["Mashed Potatoes", "Green Beans"],
          price: 22,
          imageUrl: "/assets/images/clzls.jpg",
        },
      ],
      Lunch: [
        {
          mainMenu: "Beef Bento",
          subMenus: ["Rice", "Kimchi", "Fruit"],
          price: 12,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Salad Box",
          subMenus: ["Greek Salad", "Chicken Breast", "Pita Bread"],
          price: 11,
          imageUrl: "/assets/images/clzls.jpg",
        },
      ],
      Dinner: [
        {
          mainMenu: "Chicken Rice Bowl",
          subMenus: ["Miso Soup", "Salad", "Pickles"],
          price: 15,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Veggie Burger",
          subMenus: ["Fries", "Coleslaw"],
          price: 14,
          imageUrl: "/assets/images/clzls.jpg",
        },
      ],
      Lunchbox: [
        {
          mainMenu: "Scrambled Eggs",
          subMenus: ["Toast", "Bacon", "Fruit Salad"],
          price: 10,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Omelette",
          subMenus: ["Mushrooms", "Tomatoes", "Cheese"],
          price: 12,
          imageUrl: "/assets/images/clzls.jpg",
        },
      ],
    },
    Sunday: {
      Breakfast: [
        {
          mainMenu: "Grilled Salmon",
          subMenus: ["Rice", "Steamed Vegetables", "Soup"],
          price: 20,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Pork Chops",
          subMenus: ["Mashed Potatoes", "Green Beans"],
          price: 22,
          imageUrl: "/assets/images/clzls.jpg",
        },
      ],
      Lunch: [
        {
          mainMenu: "Beef Bento",
          subMenus: ["Rice", "Kimchi", "Fruit"],
          price: 12,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Salad Box",
          subMenus: ["Greek Salad", "Chicken Breast", "Pita Bread"],
          price: 11,
          imageUrl: "/assets/images/clzls.jpg",
        },
      ],
      Dinner: [
        {
          mainMenu: "Chicken Rice Bowl",
          subMenus: ["Miso Soup", "Salad", "Pickles"],
          price: 15,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Veggie Burger",
          subMenus: ["Fries", "Coleslaw"],
          price: 14,
        },
      ],
      Lunchbox: [
        {
          mainMenu: "Scrambled Eggs",
          subMenus: ["Toast", "Bacon", "Fruit Salad"],
          price: 10,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Omelette",
          subMenus: ["Mushrooms", "Tomatoes", "Cheese"],
          price: 12,
          imageUrl: "/assets/images/clzls.jpg",
        },
      ],
    },
  },
  B: {
    Monday: {
      Breakfast: [
        {
          mainMenu: "Grilled Salmon",
          subMenus: ["Rice", "Steamed Vegetables", "Soup"],
          price: 20,
        },
        {
          mainMenu: "Pork Chops",
          subMenus: ["Mashed Potatoes", "Green Beans"],
          price: 22,
        },
      ],
      Lunch: [
        {
          mainMenu: "Beef Bento",
          subMenus: ["Rice", "Kimchi", "Fruit"],
          price: 12,
        },
        {
          mainMenu: "Salad Box",
          subMenus: ["Greek Salad", "Chicken Breast", "Pita Bread"],
          price: 11,
        },
      ],
      Dinner: [
        {
          mainMenu: "Chicken Rice Bowl",
          subMenus: ["Miso Soup", "Salad", "Pickles"],
          price: 15,
        },
        {
          mainMenu: "Veggie Burger",
          subMenus: ["Fries", "Coleslaw"],
          price: 14,
        },
      ],
      Lunchbox: [
        {
          mainMenu: "Scrambled Eggs",
          subMenus: ["Toast", "Bacon", "Fruit Salad"],
          price: 10,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Omelette",
          subMenus: ["Mushrooms", "Tomatoes", "Cheese"],
          price: 12,
          imageUrl: "/assets/images/clzls.jpg",
        },
      ],
    },
    Tuesday: {
      Breakfast: [
        {
          mainMenu: "Grilled Salmon",
          subMenus: ["Rice", "Steamed Vegetables", "Soup"],
          price: 20,
        },
        {
          mainMenu: "Pork Chops",
          subMenus: ["Mashed Potatoes", "Green Beans"],
          price: 22,
        },
      ],
      Lunch: [
        {
          mainMenu: "Beef Bento",
          subMenus: ["Rice", "Kimchi", "Fruit"],
          price: 12,
        },
        {
          mainMenu: "Salad Box",
          subMenus: ["Greek Salad", "Chicken Breast", "Pita Bread"],
          price: 11,
        },
      ],
      Dinner: [
        {
          mainMenu: "Chicken Rice Bowl",
          subMenus: ["Miso Soup", "Salad", "Pickles"],
          price: 15,
        },
        {
          mainMenu: "Veggie Burger",
          subMenus: ["Fries", "Coleslaw"],
          price: 14,
        },
      ],
      Lunchbox: [
        {
          mainMenu: "Scrambled Eggs",
          subMenus: ["Toast", "Bacon", "Fruit Salad"],
          price: 10,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Omelette",
          subMenus: ["Mushrooms", "Tomatoes", "Cheese"],
          price: 12,
          imageUrl: "/assets/images/clzls.jpg",
        },
      ],
    },
    Wednesday: {
      Breakfast: [
        {
          mainMenu: "Grilled Salmon",
          subMenus: ["Rice", "Steamed Vegetables", "Soup"],
          price: 20,
        },
        {
          mainMenu: "Pork Chops",
          subMenus: ["Mashed Potatoes", "Green Beans"],
          price: 22,
        },
      ],
      Lunch: [
        {
          mainMenu: "Beef Bento",
          subMenus: ["Rice", "Kimchi", "Fruit"],
          price: 12,
        },
        {
          mainMenu: "Salad Box",
          subMenus: ["Greek Salad", "Chicken Breast", "Pita Bread"],
          price: 11,
        },
      ],
      Dinner: [
        {
          mainMenu: "Chicken Rice Bowl",
          subMenus: ["Miso Soup", "Salad", "Pickles"],
          price: 15,
        },
        {
          mainMenu: "Veggie Burger",
          subMenus: ["Fries", "Coleslaw"],
          price: 14,
        },
      ],
      Lunchbox: [
        {
          mainMenu: "Scrambled Eggs",
          subMenus: ["Toast", "Bacon", "Fruit Salad"],
          price: 10,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Omelette",
          subMenus: ["Mushrooms", "Tomatoes", "Cheese"],
          price: 12,
          imageUrl: "/assets/images/clzls.jpg",
        },
      ],
    },
    Thursday: {
      Breakfast: [
        {
          mainMenu: "Grilled Salmon",
          subMenus: ["Rice", "Steamed Vegetables", "Soup"],
          price: 20,
        },
        {
          mainMenu: "Pork Chops",
          subMenus: ["Mashed Potatoes", "Green Beans"],
          price: 22,
        },
      ],
      Lunch: [
        {
          mainMenu: "Beef Bento",
          subMenus: ["Rice", "Kimchi", "Fruit"],
          price: 12,
        },
        {
          mainMenu: "Salad Box",
          subMenus: ["Greek Salad", "Chicken Breast", "Pita Bread"],
          price: 11,
        },
      ],
      Dinner: [
        {
          mainMenu: "Chicken Rice Bowl",
          subMenus: ["Miso Soup", "Salad", "Pickles"],
          price: 15,
        },
        {
          mainMenu: "Veggie Burger",
          subMenus: ["Fries", "Coleslaw"],
          price: 14,
        },
      ],
      Lunchbox: [
        {
          mainMenu: "Scrambled Eggs",
          subMenus: ["Toast", "Bacon", "Fruit Salad"],
          price: 10,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Omelette",
          subMenus: ["Mushrooms", "Tomatoes", "Cheese"],
          price: 12,
          imageUrl: "/assets/images/clzls.jpg",
        },
      ],
    },
    Friday: {
      Breakfast: [
        {
          mainMenu: "Grilled Salmon",
          subMenus: ["Rice", "Steamed Vegetables", "Soup"],
          price: 20,
        },
        {
          mainMenu: "Pork Chops",
          subMenus: ["Mashed Potatoes", "Green Beans"],
          price: 22,
        },
      ],
      Lunch: [
        {
          mainMenu: "Beef Bento",
          subMenus: ["Rice", "Kimchi", "Fruit"],
          price: 12,
        },
        {
          mainMenu: "Salad Box",
          subMenus: ["Greek Salad", "Chicken Breast", "Pita Bread"],
          price: 11,
        },
      ],
      Dinner: [
        {
          mainMenu: "Chicken Rice Bowl",
          subMenus: ["Miso Soup", "Salad", "Pickles"],
          price: 15,
        },
        {
          mainMenu: "Veggie Burger",
          subMenus: ["Fries", "Coleslaw"],
          price: 14,
        },
      ],
      Lunchbox: [
        {
          mainMenu: "Scrambled Eggs",
          subMenus: ["Toast", "Bacon", "Fruit Salad"],
          price: 10,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Omelette",
          subMenus: ["Mushrooms", "Tomatoes", "Cheese"],
          price: 12,
          imageUrl: "/assets/images/clzls.jpg",
        },
      ],
    },
    Saturday: {
      Breakfast: [
        {
          mainMenu: "Grilled Salmon",
          subMenus: ["Rice", "Steamed Vegetables", "Soup"],
          price: 20,
        },
        {
          mainMenu: "Pork Chops",
          subMenus: ["Mashed Potatoes", "Green Beans"],
          price: 22,
        },
      ],
      Lunch: [
        {
          mainMenu: "Beef Bento",
          subMenus: ["Rice", "Kimchi", "Fruit"],
          price: 12,
        },
        {
          mainMenu: "Salad Box",
          subMenus: ["Greek Salad", "Chicken Breast", "Pita Bread"],
          price: 11,
        },
      ],
      Dinner: [
        {
          mainMenu: "Chicken Rice Bowl",
          subMenus: ["Miso Soup", "Salad", "Pickles"],
          price: 15,
        },
        {
          mainMenu: "Veggie Burger",
          subMenus: ["Fries", "Coleslaw"],
          price: 14,
        },
      ],
      Lunchbox: [
        {
          mainMenu: "Scrambled Eggs",
          subMenus: ["Toast", "Bacon", "Fruit Salad"],
          price: 10,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Omelette",
          subMenus: ["Mushrooms", "Tomatoes", "Cheese"],
          price: 12,
          imageUrl: "/assets/images/clzls.jpg",
        },
      ],
    },
    Sunday: {
      Breakfast: [
        {
          mainMenu: "Grilled Salmon",
          subMenus: ["Rice", "Steamed Vegetables", "Soup"],
          price: 20,
        },
        {
          mainMenu: "Pork Chops",
          subMenus: ["Mashed Potatoes", "Green Beans"],
          price: 22,
        },
      ],
      Lunch: [
        {
          mainMenu: "Beef Bento",
          subMenus: ["Rice", "Kimchi", "Fruit"],
          price: 12,
        },
        {
          mainMenu: "Salad Box",
          subMenus: ["Greek Salad", "Chicken Breast", "Pita Bread"],
          price: 11,
        },
      ],
      Dinner: [
        {
          mainMenu: "Chicken Rice Bowl",
          subMenus: ["Miso Soup", "Salad", "Pickles"],
          price: 15,
        },
        {
          mainMenu: "Veggie Burger",
          subMenus: ["Fries", "Coleslaw"],
          price: 14,
        },
      ],
      Lunchbox: [
        {
          mainMenu: "Scrambled Eggs",
          subMenus: ["Toast", "Bacon", "Fruit Salad"],
          price: 10,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Omelette",
          subMenus: ["Mushrooms", "Tomatoes", "Cheese"],
          price: 12,
          imageUrl: "/assets/images/clzls.jpg",
        },
      ],
    },
  },
  C: {
    Monday: {
      Breakfast: [
        {
          mainMenu: "Grilled Salmon",
          subMenus: ["Rice", "Steamed Vegetables", "Soup"],
          price: 20,
        },
        {
          mainMenu: "Pork Chops",
          subMenus: ["Mashed Potatoes", "Green Beans"],
          price: 22,
        },
      ],
      Lunch: [
        {
          mainMenu: "Beef Bento",
          subMenus: ["Rice", "Kimchi", "Fruit"],
          price: 12,
        },
        {
          mainMenu: "Salad Box",
          subMenus: ["Greek Salad", "Chicken Breast", "Pita Bread"],
          price: 11,
        },
      ],
      Dinner: [
        {
          mainMenu: "Chicken Rice Bowl",
          subMenus: ["Miso Soup", "Salad", "Pickles"],
          price: 15,
        },
        {
          mainMenu: "Veggie Burger",
          subMenus: ["Fries", "Coleslaw"],
          price: 14,
        },
      ],
      Lunchbox: [
        {
          mainMenu: "Scrambled Eggs",
          subMenus: ["Toast", "Bacon", "Fruit Salad"],
          price: 10,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Omelette",
          subMenus: ["Mushrooms", "Tomatoes", "Cheese"],
          price: 12,
          imageUrl: "/assets/images/clzls.jpg",
        },
      ],
    },
    Tuesday: {
      Breakfast: [
        {
          mainMenu: "Grilled Salmon",
          subMenus: ["Rice", "Steamed Vegetables", "Soup"],
          price: 20,
        },
        {
          mainMenu: "Pork Chops",
          subMenus: ["Mashed Potatoes", "Green Beans"],
          price: 22,
        },
      ],
      Lunch: [
        {
          mainMenu: "Beef Bento",
          subMenus: ["Rice", "Kimchi", "Fruit"],
          price: 12,
        },
        {
          mainMenu: "Salad Box",
          subMenus: ["Greek Salad", "Chicken Breast", "Pita Bread"],
          price: 11,
        },
      ],
      Dinner: [
        {
          mainMenu: "Chicken Rice Bowl",
          subMenus: ["Miso Soup", "Salad", "Pickles"],
          price: 15,
        },
        {
          mainMenu: "Veggie Burger",
          subMenus: ["Fries", "Coleslaw"],
          price: 14,
        },
      ],
      Lunchbox: [
        {
          mainMenu: "Scrambled Eggs",
          subMenus: ["Toast", "Bacon", "Fruit Salad"],
          price: 10,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Omelette",
          subMenus: ["Mushrooms", "Tomatoes", "Cheese"],
          price: 12,
          imageUrl: "/assets/images/clzls.jpg",
        },
      ],
    },
    Wednesday: {
      Breakfast: [
        {
          mainMenu: "Grilled Salmon",
          subMenus: ["Rice", "Steamed Vegetables", "Soup"],
          price: 20,
        },
        {
          mainMenu: "Pork Chops",
          subMenus: ["Mashed Potatoes", "Green Beans"],
          price: 22,
        },
      ],
      Lunch: [
        {
          mainMenu: "Beef Bento",
          subMenus: ["Rice", "Kimchi", "Fruit"],
          price: 12,
        },
        {
          mainMenu: "Salad Box",
          subMenus: ["Greek Salad", "Chicken Breast", "Pita Bread"],
          price: 11,
        },
      ],
      Dinner: [
        {
          mainMenu: "Chicken Rice Bowl",
          subMenus: ["Miso Soup", "Salad", "Pickles"],
          price: 15,
        },
        {
          mainMenu: "Veggie Burger",
          subMenus: ["Fries", "Coleslaw"],
          price: 14,
        },
      ],
      Lunchbox: [
        {
          mainMenu: "Scrambled Eggs",
          subMenus: ["Toast", "Bacon", "Fruit Salad"],
          price: 10,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Omelette",
          subMenus: ["Mushrooms", "Tomatoes", "Cheese"],
          price: 12,
          imageUrl: "/assets/images/clzls.jpg",
        },
      ],
    },
    Thursday: {
      Breakfast: [
        {
          mainMenu: "Grilled Salmon",
          subMenus: ["Rice", "Steamed Vegetables", "Soup"],
          price: 20,
        },
        {
          mainMenu: "Pork Chops",
          subMenus: ["Mashed Potatoes", "Green Beans"],
          price: 22,
        },
      ],
      Lunch: [
        {
          mainMenu: "Beef Bento",
          subMenus: ["Rice", "Kimchi", "Fruit"],
          price: 12,
        },
        {
          mainMenu: "Salad Box",
          subMenus: ["Greek Salad", "Chicken Breast", "Pita Bread"],
          price: 11,
        },
      ],
      Dinner: [
        {
          mainMenu: "Chicken Rice Bowl",
          subMenus: ["Miso Soup", "Salad", "Pickles"],
          price: 15,
        },
        {
          mainMenu: "Veggie Burger",
          subMenus: ["Fries", "Coleslaw"],
          price: 14,
        },
      ],
      Lunchbox: [
        {
          mainMenu: "Scrambled Eggs",
          subMenus: ["Toast", "Bacon", "Fruit Salad"],
          price: 10,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Omelette",
          subMenus: ["Mushrooms", "Tomatoes", "Cheese"],
          price: 12,
          imageUrl: "/assets/images/clzls.jpg",
        },
      ],
    },
    Friday: {
      Breakfast: [
        {
          mainMenu: "Grilled Salmon",
          subMenus: ["Rice", "Steamed Vegetables", "Soup"],
          price: 20,
        },
        {
          mainMenu: "Pork Chops",
          subMenus: ["Mashed Potatoes", "Green Beans"],
          price: 22,
        },
      ],
      Lunch: [
        {
          mainMenu: "Beef Bento",
          subMenus: ["Rice", "Kimchi", "Fruit"],
          price: 12,
        },
        {
          mainMenu: "Salad Box",
          subMenus: ["Greek Salad", "Chicken Breast", "Pita Bread"],
          price: 11,
        },
      ],
      Dinner: [
        {
          mainMenu: "Chicken Rice Bowl",
          subMenus: ["Miso Soup", "Salad", "Pickles"],
          price: 15,
        },
        {
          mainMenu: "Veggie Burger",
          subMenus: ["Fries", "Coleslaw"],
          price: 14,
        },
      ],
      Lunchbox: [
        {
          mainMenu: "Scrambled Eggs",
          subMenus: ["Toast", "Bacon", "Fruit Salad"],
          price: 10,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Omelette",
          subMenus: ["Mushrooms", "Tomatoes", "Cheese"],
          price: 12,
          imageUrl: "/assets/images/clzls.jpg",
        },
      ],
    },
    Saturday: {
      Breakfast: [
        {
          mainMenu: "Grilled Salmon",
          subMenus: ["Rice", "Steamed Vegetables", "Soup"],
          price: 20,
        },
        {
          mainMenu: "Pork Chops",
          subMenus: ["Mashed Potatoes", "Green Beans"],
          price: 22,
        },
      ],
      Lunch: [
        {
          mainMenu: "Beef Bento",
          subMenus: ["Rice", "Kimchi", "Fruit"],
          price: 12,
        },
        {
          mainMenu: "Salad Box",
          subMenus: ["Greek Salad", "Chicken Breast", "Pita Bread"],
          price: 11,
        },
      ],
      Dinner: [
        {
          mainMenu: "Chicken Rice Bowl",
          subMenus: ["Miso Soup", "Salad", "Pickles"],
          price: 15,
        },
        {
          mainMenu: "Veggie Burger",
          subMenus: ["Fries", "Coleslaw"],
          price: 14,
        },
      ],
      Lunchbox: [
        {
          mainMenu: "Scrambled Eggs",
          subMenus: ["Toast", "Bacon", "Fruit Salad"],
          price: 10,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Omelette",
          subMenus: ["Mushrooms", "Tomatoes", "Cheese"],
          price: 12,
          imageUrl: "/assets/images/clzls.jpg",
        },
      ],
    },
    Sunday: {
      Breakfast: [
        {
          mainMenu: "Grilled Salmon",
          subMenus: ["Rice", "Steamed Vegetables", "Soup"],
          price: 20,
        },
        {
          mainMenu: "Pork Chops",
          subMenus: ["Mashed Potatoes", "Green Beans"],
          price: 22,
        },
      ],
      Lunch: [
        {
          mainMenu: "Beef Bento",
          subMenus: ["Rice", "Kimchi", "Fruit"],
          price: 12,
        },
        {
          mainMenu: "Salad Box",
          subMenus: ["Greek Salad", "Chicken Breast", "Pita Bread"],
          price: 11,
        },
      ],
      Dinner: [
        {
          mainMenu: "Chicken Rice Bowl",
          subMenus: ["Miso Soup", "Salad", "Pickles"],
          price: 15,
        },
        {
          mainMenu: "Veggie Burger",
          subMenus: ["Fries", "Coleslaw"],
          price: 14,
        },
      ],
      Lunchbox: [
        {
          mainMenu: "Scrambled Eggs",
          subMenus: ["Toast", "Bacon", "Fruit Salad"],
          price: 10,
          imageUrl: "/assets/images/clzls.jpg",
        },
        {
          mainMenu: "Omelette",
          subMenus: ["Mushrooms", "Tomatoes", "Cheese"],
          price: 12,
          imageUrl: "/assets/images/clzls.jpg",
        },
      ],
    },
  },
};
