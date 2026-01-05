
export const feastCategories = [
    { id: 'healthy', name: 'Healthy', image: 'https://picsum.photos/seed/autumn-leaves/200/200' },
    { id: 'pizza', name: 'Pizza', image: 'https://picsum.photos/seed/concert-stage/200/200' },
    { id: 'burger', name: 'Burger', image: 'https://picsum.photos/seed/mountain-valley/200/200' },
    { id: 'rolls', name: 'Rolls', image: 'https://picsum.photos/seed/fresh-herbs/200/200' },
    { id: 'chinese', name: 'Chinese', image: 'https://picsum.photos/seed/brooklyn-bridge/200/200' },
    { id: 'home-cooked', name: 'Home Cooked', image: 'https://picsum.photos/seed/railroad-tracks/200/200' },
    { id: 'chicken', name: 'Chicken', image: 'https://picsum.photos/seed/space-station/200/200' },
    { id: 'indian', name: 'Indian', image: 'https://picsum.photos/seed/field-sunset/200/200' },
];

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: 'Indian' | 'Appetizers' | 'Desserts' | 'Pizza' | 'Sides' | 'Burgers' | 'Chinese' | 'Healthy' | 'Rolls' | 'Home Cooked' | 'Chicken';
    restaurantId?: string;
    restaurantName?: string;
}

export interface Restaurant {
    id: string;
    name: string;
    cuisine: string;
    rating: number;
    deliveryTime: string;
    distance: string;
    offer?: string;
    image: string;
    menu: MenuItem[];
}

export const restaurants: Restaurant[] = [
    {
        id: '1',
        name: 'Biryani Central',
        cuisine: 'Indian, Biryani, Mughlai',
        rating: 4.7,
        deliveryTime: '25-30 min',
        distance: '3.2 km',
        offer: '30% OFF',
        image: 'https://picsum.photos/seed/biryani-deal/800/400',
        menu: [
            { id: 'm1', name: 'Chicken Dum Biryani', description: 'Classic slow-cooked chicken biryani.', price: 45, image: 'https://picsum.photos/seed/chicken-biryani/200/200', category: 'Indian' },
            { id: 'm2', name: 'Mutton Seekh Kebab', description: 'Spiced minced mutton kebabs.', price: 35, image: 'https://picsum.photos/seed/seekh-kebab/200/200', category: 'Appetizers' },
            { id: 'm3', name: 'Gulab Jamun', description: 'Sweet dumplings in rose syrup.', price: 15, image: 'https://picsum.photos/seed/gulab-jamun/200/200', category: 'Desserts' },
            { id: 'm4', name: 'Paneer Tikka Masala', description: 'Marinated cottage cheese in a creamy tomato gravy.', price: 40, image: 'https://picsum.photos/seed/paneer-tikka-masala/200/200', category: 'Indian'},
            { id: 'm5', name: 'Veg Pulao', description: 'Aromatic rice with mixed vegetables.', price: 35, image: 'https://picsum.photos/seed/veg-pulao/200/200', category: 'Indian'},
            { id: 'm6', name: 'Butter Chicken', description: 'Creamy and rich butter chicken.', price: 50, image: 'https://picsum.photos/seed/butter-chicken/200/200', category: 'Chicken'},
            { id: 'm7', name: 'Dal Makhani', description: 'Creamy black lentils.', price: 30, image: 'https://picsum.photos/seed/dal-makhani/200/200', category: 'Home Cooked'},
            { id: 'm8', name: 'Tandoori Chicken', description: 'Yogurt-marinated chicken grilled in a tandoor.', price: 48, image: 'https://picsum.photos/seed/tandoori-chicken/200/200', category: 'Chicken' },
            { id: 'm9', name: 'Naan Bread', description: 'Soft and fluffy Indian bread.', price: 8, image: 'https://picsum.photos/seed/naan-bread/200/200', category: 'Sides' },

        ],
    },
    {
        id: '2',
        name: 'Pizza House',
        cuisine: 'Pizza, Italian, Fast Food',
        rating: 4.5,
        deliveryTime: '20-25 min',
        distance: '2.1 km',
        offer: 'Buy 1 Get 1 Free',
        image: 'https://picsum.photos/seed/pizza-place/800/400',
         menu: [
            { id: 'p1', name: 'Margherita Pizza', description: 'Classic cheese and tomato pizza.', price: 55, image: 'https://picsum.photos/seed/margherita-pizza/200/200', category: 'Pizza' },
            { id: 'p2', name: 'Pepperoni Pizza', description: 'Loaded with pepperoni and cheese.', price: 65, image: 'https://picsum.photos/seed/pepperoni-pizza/200/200', category: 'Pizza' },
            { id: 'p3', name: 'Garlic Bread', description: 'Toasted bread with garlic butter.', price: 20, image: 'https://picsum.photos/seed/garlic-bread-sticks/200/200', category: 'Sides' },
            { id: 'p4', name: 'Veggie Supreme Pizza', description: 'Onions, peppers, olives, and mushrooms.', price: 60, image: 'https://picsum.photos/seed/veggie-pizza/200/200', category: 'Pizza'},
            { id: 'p5', name: 'BBQ Chicken Pizza', description: 'Grilled chicken with BBQ sauce.', price: 70, image: 'https://picsum.photos/seed/bbq-chicken-pizza/200/200', category: 'Pizza'},
            { id: 'p6', name: 'Hawaiian Pizza', description: 'Ham and pineapple toppings.', price: 68, image: 'https://picsum.photos/seed/hawaiian-pizza/200/200', category: 'Pizza' },
            { id: 'p7', name: 'Meat Lovers Pizza', description: 'Pepperoni, ham, sausage, and bacon.', price: 75, image: 'https://picsum.photos/seed/meat-pizza/200/200', category: 'Pizza' },
            { id: 'p8', name: 'Pasta Arrabiata', description: 'Spicy tomato sauce pasta.', price: 45, image: 'https://picsum.photos/seed/pasta-arrabiata/200/200', category: 'Home Cooked' },
            { id: 'p9', name: 'Four Cheese Pizza', description: 'A blend of four delicious cheeses.', price: 72, image: 'https://picsum.photos/seed/four-cheese-pizza/200/200', category: 'Pizza' },

        ],
    },
    {
        id: '3',
        name: 'Burger Joint',
        cuisine: 'Burgers, American, Fast Food',
        rating: 4.6,
        deliveryTime: '15-20 min',
        distance: '1.5 km',
        image: 'https://picsum.photos/seed/burger-joint-photo/800/400',
        menu: [
            { id: 'b1', name: 'Classic Beef Burger', description: 'Juicy beef patty with lettuce, tomato, and cheese.', price: 40, image: 'https://picsum.photos/seed/beef-burger/200/200', category: 'Burgers' },
            { id: 'b2', name: 'Crispy Chicken Burger', description: 'Fried chicken fillet with special sauce.', price: 38, image: 'https://picsum.photos/seed/chicken-burger/200/200', category: 'Burgers' },
            { id: 'b3', name: 'French Fries', description: 'Golden crispy french fries.', price: 15, image: 'https://picsum.photos/seed/fries/200/200', category: 'Sides' },
            { id: 'b4', name: 'Veggie Burger', description: 'A delicious vegetable patty burger.', price: 35, image: 'https://picsum.photos/seed/veggie-burger/200/200', category: 'Burgers'},
            { id: 'b5', name: 'Double Cheese Burger', description: 'Two beef patties with double cheese.', price: 55, image: 'https://picsum.photos/seed/double-burger/200/200', category: 'Burgers'},
            { id: 'b6', name: 'Mushroom Swiss Burger', description: 'Beef patty with sautéed mushrooms and Swiss cheese.', price: 48, image: 'https://picsum.photos/seed/mushroom-burger/200/200', category: 'Burgers' },
            { id: 'b7', name: 'Spicy Chicken Sandwich', description: 'Spicy fried chicken with pickles.', price: 42, image: 'https://picsum.photos/seed/spicy-chicken-sandwich/200/200', category: 'Burgers' },
            { id: 'b8', name: 'Bacon Cheeseburger', description: 'Beef patty, crispy bacon, and cheddar cheese.', price: 52, image: 'https://picsum.photos/seed/bacon-cheeseburger/200/200', category: 'Burgers' },
            { id: 'b9', name: 'Onion Rings', description: 'Crispy battered onion rings.', price: 20, image: 'https://picsum.photos/seed/onion-rings/200/200', category: 'Sides' },
        ],
    },
    {
        id: '4',
        name: 'Wok & Roll',
        cuisine: 'Chinese, Asian',
        rating: 4.4,
        deliveryTime: '30-35 min',
        distance: '4.0 km',
        image: 'https://picsum.photos/seed/wok-and-roll/800/400',
        menu: [
            { id: 'c1', name: 'Hakka Noodles', description: 'Stir-fried noodles with vegetables.', price: 35, image: 'https://picsum.photos/seed/hakka-noodles/200/200', category: 'Chinese' },
            { id: 'c2', name: 'Chilli Chicken Dry', description: 'Spicy chicken appetizer.', price: 40, image: 'https://picsum.photos/seed/chilli-chicken/200/200', category: 'Chinese' },
            { id: 'c3', name: 'Veg Manchurian Gravy', description: 'Veggie balls in a tangy sauce.', price: 38, image: 'https://picsum.photos/seed/manchurian/200/200', category: 'Chinese' },
            { id: 'c4', name: 'Spring Rolls', description: 'Crispy fried rolls with vegetable filling.', price: 25, image: 'https://picsum.photos/seed/spring-rolls/200/200', category: 'Appetizers' },
            { id: 'c5', name: 'Chicken Fried Rice', description: 'Classic chicken fried rice.', price: 38, image: 'https://picsum.photos/seed/chicken-fried-rice/200/200', category: 'Chinese' },
            { id: 'c6', name: 'Sweet & Sour Pork', description: 'Crispy pork in a sweet and sour sauce.', price: 45, image: 'https://picsum.photos/seed/sweet-sour-pork/200/200', category: 'Chinese' },
            { id: 'c7', name: 'Kung Pao Chicken', description: 'Spicy stir-fry with chicken, peanuts, and vegetables.', price: 42, image: 'https://picsum.photos/seed/kung-pao-chicken/200/200', category: 'Chinese' },
            { id: 'c8', name: 'Chicken Momos', description: 'Steamed dumplings filled with chicken.', price: 30, image: 'https://picsum.photos/seed/chicken-momos/200/200', category: 'Chinese' },
        ],
    },
    {
        id: '5',
        name: 'The Green Bowl',
        cuisine: 'Healthy, Salads, Soups',
        rating: 4.8,
        deliveryTime: '15-20 min',
        distance: '1.8 km',
        image: 'https://picsum.photos/seed/green-bowl-restaurant/800/400',
        menu: [
            { id: 'h1', name: 'Quinoa Salad', description: 'Quinoa, chickpeas, cucumber, and lemon vinaigrette.', price: 40, image: 'https://picsum.photos/seed/quinoa-salad/200/200', category: 'Healthy' },
            { id: 'h2', name: 'Grilled Chicken Caesar', description: 'Grilled chicken, romaine lettuce, croutons, and Caesar dressing.', price: 45, image: 'https://picsum.photos/seed/chicken-caesar/200/200', category: 'Healthy' },
            { id: 'h3', name: 'Lentil Soup', description: 'Hearty and nutritious lentil soup.', price: 25, image: 'https://picsum.photos/seed/lentil-soup/200/200', category: 'Healthy' },
            { id: 'h4', name: 'Avocado Toast', description: 'Smashed avocado on sourdough toast.', price: 35, image: 'https://picsum.photos/seed/avocado-toast/200/200', category: 'Healthy' },
            { id: 'h5', name: 'Green Smoothie', description: 'Spinach, banana, and almond milk smoothie.', price: 30, image: 'https://picsum.photos/seed/green-smoothie/200/200', category: 'Healthy' },
            { id: 'h6', name: 'Greek Salad', description: 'Feta, olives, tomatoes, and cucumber.', price: 38, image: 'https://picsum.photos/seed/greek-salad/200/200', category: 'Healthy' },
            { id: 'h7', name: 'Salmon and Veggies', description: 'Grilled salmon with roasted vegetables.', price: 65, image: 'https://picsum.photos/seed/salmon-veggies/200/200', category: 'Healthy' },
        ],
    },
    {
        id: '6',
        name: 'Wrap & Go',
        cuisine: 'Rolls, Wraps, Fast Food',
        rating: 4.3,
        deliveryTime: '20-25 min',
        distance: '2.5 km',
        image: 'https://picsum.photos/seed/wrap-and-go-restaurant/800/400',
        menu: [
            { id: 'r1', name: 'Chicken Tikka Roll', description: 'Spicy chicken tikka in a paratha.', price: 30, image: 'https://picsum.photos/seed/chicken-roll/200/200', category: 'Rolls' },
            { id: 'r2', name: 'Paneer Tikka Roll', description: 'Spicy paneer tikka in a paratha.', price: 28, image: 'https://picsum.photos/seed/paneer-roll/200/200', category: 'Rolls' },
            { id: 'r3', name: 'Falafel Wrap', description: 'Falafel, hummus, and veggies in a pita wrap.', price: 25, image: 'https://picsum.photos/seed/falafel-wrap/200/200', category: 'Rolls' },
            { id: 'r4', name: 'Beef Shawarma Roll', description: 'Tender beef shawarma in a roll.', price: 32, image: 'https://picsum.photos/seed/beef-shawarma/200/200', category: 'Rolls' },
            { id: 'r5', name: 'Mutton Kebab Roll', description: 'Minced mutton kebabs in a paratha.', price: 35, image: 'https://picsum.photos/seed/mutton-roll/200/200', category: 'Rolls' },
            { id: 'r6', name: 'Veggie Spring Roll', description: 'Crispy fried vegetable spring rolls.', price: 20, image: 'https://picsum.photos/seed/veg-spring-roll/200/200', category: 'Rolls' },
            { id: 'r7', name: 'Spicy Potato Roll', description: 'Spiced mashed potatoes in a roll.', price: 22, image: 'https://picsum.photos/seed/potato-roll/200/200', category: 'Rolls' },
        ],
    },
     {
        id: '7',
        name: 'Mama\'s Kitchen',
        cuisine: 'Home Cooked, Indian',
        rating: 4.9,
        deliveryTime: '35-40 min',
        distance: '4.5 km',
        image: 'https://picsum.photos/seed/mamas-kitchen/800/400',
        menu: [
            { id: 'hc1', name: 'Rajma Chawal', description: 'Red kidney bean curry with steamed rice.', price: 40, image: 'https://picsum.photos/seed/rajma-chawal/200/200', category: 'Home Cooked' },
            { id: 'hc2', name: 'Aloo Gobi', description: 'Cauliflower and potato stir-fry.', price: 35, image: 'https://picsum.photos/seed/aloo-gobi/200/200', category: 'Home Cooked' },
            { id: 'hc3', name: 'Bhindi Masala', description: 'Okra stir-fried with spices.', price: 35, image: 'https://picsum.photos/seed/bhindi-masala/200/200', category: 'Home Cooked' },
            { id: 'hc4', name: 'Chicken Curry', description: 'Simple homestyle chicken curry.', price: 45, image: 'https://picsum.photos/seed/chicken-curry/200/200', category: 'Chicken' },
            { id: 'hc5', name: 'Roti', description: 'Whole wheat flatbread.', price: 5, image: 'https://picsum.photos/seed/roti-bread/200/200', category: 'Sides' },
            { id: 'hc6', name: 'Kadhi Pakora', description: 'Yogurt curry with gram flour fritters.', price: 38, image: 'https://picsum.photos/seed/kadhi-pakora/200/200', category: 'Home Cooked' },
            { id: 'hc7', name: 'Palak Paneer', description: 'Spinach and cottage cheese curry.', price: 42, image: 'https://picsum.photos/seed/palak-paneer/200/200', category: 'Home Cooked' },
            { id: 'hc8', name: 'Jeera Rice', description: 'Cumin flavored rice.', price: 25, image: 'https://picsum.photos/seed/jeera-rice/200/200', category: 'Home Cooked' },
        ],
    },
     {
        id: '8',
        name: 'Cluckin\' Good',
        cuisine: 'Chicken, Fast Food',
        rating: 4.5,
        deliveryTime: '20-25 min',
        distance: '2.8 km',
        image: 'https://picsum.photos/seed/cluckin-good/800/400',
        menu: [
            { id: 'cg1', name: 'Fried Chicken Bucket', description: '8 pieces of crispy fried chicken.', price: 80, image: 'https://picsum.photos/seed/fried-chicken-bucket/200/200', category: 'Chicken' },
            { id: 'cg2', name: 'Spicy Chicken Wings', description: '6 pieces of spicy chicken wings.', price: 45, image: 'https://picsum.photos/seed/spicy-wings/200/200', category: 'Chicken' },
            { id: 'cg3', name: 'Grilled Chicken Burger', description: 'Grilled chicken fillet in a soft bun.', price: 40, image: 'https://picsum.photos/seed/grilled-chicken-burger/200/200', category: 'Chicken' },
            { id: 'cg4', name: 'Chicken Popcorn', description: 'Bite-sized fried chicken pieces.', price: 30, image: 'https://picsum.photos/seed/chicken-popcorn/200/200', category: 'Chicken' },
            { id: 'cg5', name: 'Chicken Wrap', description: 'Grilled chicken strips with salad in a wrap.', price: 35, image: 'https://picsum.photos/seed/chicken-wrap/200/200', category: 'Chicken' },
            { id: 'cg6', name: 'BBQ Wings', description: '6 pieces of chicken wings tossed in BBQ sauce.', price: 45, image: 'https://picsum.photos/seed/bbq-wings/200/200', category: 'Chicken' },
            { id: 'cg7', name: 'Chicken Tenders', description: '4 crispy chicken tenders with dip.', price: 38, image: 'https://picsum.photos/seed/chicken-tenders/200/200', category: 'Chicken' },
        ],
    },
];

const allMenuItems: MenuItem[] = restaurants.flatMap(r => 
    r.menu.map(item => ({...item, restaurantId: r.id, restaurantName: r.name}))
);

export const popularHealthy = allMenuItems.filter(item => item.category === 'Healthy').slice(0,7);
export const popularPizzas = allMenuItems.filter(item => item.category === 'Pizza').slice(0,7);
export const popularBurgers = allMenuItems.filter(item => item.category === 'Burgers').slice(0,7);
export const popularRolls = allMenuItems.filter(item => item.category === 'Rolls').slice(0,7);
export const popularChinese = allMenuItems.filter(item => item.category === 'Chinese').slice(0,7);
export const popularHomeCooked = allMenuItems.filter(item => item.category === 'Home Cooked').slice(0,7);
export const popularChicken = allMenuItems.filter(item => item.category === 'Chicken').slice(0,7);
export const popularIndian = allMenuItems.filter(item => item.category === 'Indian').slice(0,7);
