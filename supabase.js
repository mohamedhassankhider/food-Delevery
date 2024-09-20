import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabaseUrl = "https://ltfxfuuunncklosxwney.supabase.co";

const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0ZnhmdXV1bm5ja2xvc3h3bmV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ3Mzk3MjEsImV4cCI6MjA0MDMxNTcyMX0.lyB5e1UxNrcvjIi6-yJcQ38Crz4thCIwsdLUN_gM-ko"

//data to add in supabase
// add your own names description and timings that pretty simple i will be sending the menu array just paste it as is
[
    {
      "id": "1",
      "name": "Tacos",
      "items": [
        {
          "id:": "101",
          "veg": "true",
          "name": "Naked Veggie Taco",
          "image": "https://b.zmtcdn.com/data/dish_photos/b3c/5b46acc7cfd30025439f88f29c3d3b3c.jpg?fit=around|130:130&crop=130:130;*,*",
          "price": "249",
          "rating": "4.1",
          "ratings": "43",
          "quantity": "1",
          "bestSeller": "false",
          "description": "A crusted & spice coated plant-based protein patty Taco, layered with warm nacho cheese, lettuce, our signature Mexican Pico De Gallo – a tangy tomato & onion mix along with the goodness of mozzarella and cheddar cheese blend. KCAL 208.02"
        },
        {
          "id": "102",
          "veg": "true",
          "name": "Crunchy Taco Pinto Bean",
          "image": "https://b.zmtcdn.com/data/dish_photos/a49/18e4cd38093be595aee2d18cb58e3a49.jpg?fit=around|130:130&crop=130:130;*,*",
          "price": "109",
          "rating": "4.1",
          "ratings": "34",
          "quantity": "1",
          "bestSeller": "true",
          "description": "It's crunchy. It's delicious! Our signature product served with pinto beans & zesty ranch sauce."
        },
        {
          "id": "103",
          "veg": "false",
          "name": "CRUNCHY TACOS NON VEG",
          "image": "https://b.zmtcdn.com/data/dish_photos/83c/7f0dfe72ccff7d34b5cd5d3d020ac83c.jpg?fit=around|130:130&crop=130:130;*,*",
          "price": "119",
          "rating": "4.3",
          "ratings": "56",
          "quantity": "1",
          "bestSeller": false,
          "description": "It's crunchy. It's delicious! Our signature product served with Mexican chicken & zesty ranch sauce."
        },
        {
          "id": "105",
          "veg": "true",
          "name": "Soft Taco Mexican Paneer",
          "image": "https://b.zmtcdn.com/data/dish_photos/79b/d2c46424c7aa1232cc09d3e7cf27279b.jpg?fit=around|130:130&crop=130:130;*,*",
          "price": "149",
          "rating": "4.5",
          "ratings": "45",
          "quantity": "1",
          "bestSeller": "true",
          "description": "The Soft taco has a warm, flour tortilla, served with Mexican paneer & lava sauce."
        }
      ]
    },
    {
      "id": "11",
      "name": "Burritos Rolls",
      "items": [
        {
          "id": "201",
          "veg": "true",
          "name": "7 Layer Burrito Roll Veg",
          "image": "https://b.zmtcdn.com/data/dish_photos/d2f/688822c306f8c9d323e2493d21675d2f.jpg?fit=around|130:130&crop=130:130;*,*",
          "price": "260",
          "rating": "4.3",
          "ratings": "34",
          "bestSeller": "true",
          "description": "7 layer burrito is a complete meal in itself. It is a grilled soft tortilla filled 7 different including fajita veg, pinto beans, crispy potato bites, Mexican seasoned rice, tangy salsa, nacho cheese sauce & lava sauce, it's mind blowing."
        },
        {
          "id": "202",
          "veg": "true",
          "name": "Burrito Supreme Roll - Veg",
          "image": "https://b.zmtcdn.com/data/dish_photos/acf/36224d0e9f26eae9e539474183f61acf.jpg?fit=around|130:130&crop=130:130;*,*",
          "price": "179",
          "rating": "4.1",
          "ratings": "52",
          "bestSeller": "false",
          "description": "Warm tortilla layered with generous portion of Cheddar & Mozzarella Cheese, filled with Mexican paneer , spices, Jalapeno rice and Reaper ranch sauce."
        },
        {
          "id": "203",
          "veg": "true",
          "name": "Paneer Makhni Burrito Roll",
          "image": "https://b.zmtcdn.com/data/dish_photos/46c/2701e958b7e7edceedaaa2097716c46c.jpg?fit=around|130:130&crop=130:130;*,*",
          "price": "149",
          "rating": "4.5",
          "ratings": "52",
          "bestSeller": "false",
          "description": "Warm tortilla layered with paneer simmered in mildly spicy, aromatic makhani tomato gravy, onion, coriander & our signature Mexican Pico de Gallo"
        }
      ]
    }
  ]
  
  [
    {
      "id": "1",
      "name": "South Indian",
      "items": [
        {
          "id:": "101",
          "veg": "true",
          "name": "Onion Uttapam",
          "image": "https://b.zmtcdn.com/data/dish_photos/6da/77967298b669ff6c16683920eba9e6da.jpg?fit=around|130:130&crop=130:130;*,*",
          "price": "135",
          "rating": "4.1",
          "ratings": "50",
          "quantity": "1",
          "bestSeller": "false",
          "description": "A delectable thickish South Indian fried dosa made of rice flour batter with a generous topping of thinly sliced onions, green chilies, coriander and ground whole spices"
        },
        {
          "id": "102",
          "veg": "true",
          "name": "Uttapam",
          "image": "https://b.zmtcdn.com/data/dish_photos/47d/65977b6ee2659c40084eb232f257847d.jpg?fit=around|130:130&crop=130:130;*,*",
          "price": "115",
          "rating": "4.3",
          "ratings": "34",
          "quantity": "1",
          "bestSeller": "true",
          "description": "A delicious spicy South Indian crisp fried dosa made of rice, lentil, and fenugreek mixed batter served with a spicy sambar and chutney."
        },
        {
          "id": "103",
          "veg": "true",
          "name": "Medhu Vadai",
          "image": "https://b.zmtcdn.com/data/dish_photos/9f1/dc22b1cb3b0901637115f89ee89459f1.jpg?fit=around|130:130&crop=130:130;*,*",
          "price": "120",
          "rating": "4.3",
          "ratings": "56",
          "quantity": "1",
          "bestSeller": false,
          "description": "Crispy donut-shaped deep-fried fritters made of ground black lentil batter mixed with finely diced onions, peppercorn, green chilies served with a spicy sambar and chutney"
        },
        {
          "id": "105",
          "veg": "true",
          "name": "Ghee Masala Dosa",
          "image": "https://b.zmtcdn.com/data/dish_photos/5eb/7df78a0c7c01bdaa246a2b4195c495eb.jpg?fit=around|130:130&crop=130:130;*,*",
          "price": "149",
          "rating": "4.5",
          "ratings": "45",
          "quantity": "1",
          "bestSeller": "true",
          "description": "A crispy golden brown dosa fried using clarified butter with a spicy filling of mashed potatoes,onions, served with sambar and chutneys."
        }
      ]
    },
    {
      "id": "11",
      "name": "Sweets",
      "items": [
        {
          "id": "201",
          "veg": "true",
          "name": "Assorted Sweets",
          "image": "https://b.zmtcdn.com/data/dish_photos/0b8/4b7a40d02572df8a55357a70e87880b8.jpg?fit=around|130:130&crop=130:130;*,*",
          "price": "200",
          "rating": "4.3",
          "ratings": "34",
          "bestSeller": "true",
          "description": "Delicious nutritious assorted almonds, cashews, and pistachio pralines blended in with hot boiled sugar syrup"
        },
        {
          "id": "202",
          "veg": "true",
          "name": "Kaju Kathily",
          "image": "https://b.zmtcdn.com/data/dish_photos/47e/405660ff9cc274a4945d61d691e5447e.jpg?fit=around|130:130&crop=130:130;*,*",
          "price": "305",
          "rating": "4.4",
          "ratings": "52",
          "bestSeller": "false",
          "description": "A rich nutritious delightful diamond shaped soft sweet fudge made of powdered cashew nuts blended with sugar syrup, clarified butter and flavored with cardamom"
        },
        {
          "id": "203",
          "veg": "true",
          "name": "Premium Kaju Kathily",
          "image": "https://b.zmtcdn.com/data/dish_photos/46c/2701e958b7e7edceedaaa2097716c46c.jpg?fit=around|130:130&crop=130:130;*,*",
          "price": "350",
          "rating": "4.5",
          "ratings": "52",
          "bestSeller": "false",
          "description": "A rich nutritious delectable diamond shaped soft sweet fudge made of powdered cashew nuts blended with sugar syrup, clarified butter flavored with cardamom and topped with silver foil."
        }
      ]
    },
    {
      "id": "12",
      "name": "Recommended",
      "items": [
        {
          "id": "201",
          "veg": "true",
          "name": "Mini Tiffin",
          "image": "https://b.zmtcdn.com/data/dish_photos/b38/dcfc03e1f4223cbf9e4b063b0d79bb38.jpg?fit=around|130:130&crop=130:130;*,*",
          "price": "150",
          "rating": "4.3",
          "ratings": "34",
          "bestSeller": "true",
          "description": "A delicious traditional platter of fluffy idlis, Medhu Vada, Pongal, Rava Kesari, and a Mini Dosa, served with a spicy sambar and chutneys."
        },
        {
          "id": "202",
          "veg": "true",
          "name": "Chow Chow Bhath",
          "image": "https://b.zmtcdn.com/data/dish_photos/c53/8d885bcced9e1143baffd6a81da6bc53.jpg?fit=around|130:130&crop=130:130;*,*",
          "price": "100",
          "rating": "4.4",
          "ratings": "52",
          "bestSeller": "false",
          "description": "A South Indian breakfast combo of two semolina-based dishes, a rich sweet dish called Kesari Bath and a spiced dish called Khara Bath served with a spicy chutney"
        },
        {
          "id": "203",
          "veg": "true",
          "name": "Rava Onion Masala",
          "image": "https://b.zmtcdn.com/data/dish_photos/530/b59adb207b0d126f3d71abe501691530.jpg?fit=around|130:130&crop=130:130;*,*",
          "price": "110",
          "rating": "4.5",
          "ratings": "52",
          "bestSeller": "false",
          "description": "A delicious textured dosa made of semolina, rice and all-purpose flour batter with chopped chilies, onions, pepper corns and coriander served with sambar and chutney."
        }
      ]
    }
  ]
  
  [
    {
      "id": "1",
      "name": "Whopper",
      "items": [
        {
          "id:": "101",
          "veg": "false",
          "name": "Mutton Whopper",
          "image": "https://b.zmtcdn.com/data/dish_photos/2b9/01b7cb04a2f54faa47b9dd52ad8432b9.jpg?fit=around|130:130&crop=130:130;*,*",
          "price": "319",
          "rating": "4.3",
          "ratings": "50",
          "quantity": "1",
          "bestSeller": "false",
          "description": "Our signature Whopper with 7 layers between the buns. Flame-Grilled mutton patty, fresh onions, crispy lettuce, juicy tomatoes (seasonal), tangy gherkins, creamy and smoky sauces with new glazed buns. Swaad Aisa, India Jaisa"
        },
        {
          "id": "102",
          "veg": "false",
          "name": "Boss Whopper Mutton",
          "image": "https://b.zmtcdn.com/data/dish_photos/07f/40ab573c44eada77c739509fdc03807f.jpg?fit=around|130:130&crop=130:130;*,*",
          "price": "350",
          "rating": "4.3",
          "ratings": "34",
          "quantity": "1",
          "bestSeller": "true",
          "description": "The biggest Whopper ever, Boss Whopper, with Premium buns, flame grilled mutton patty, cheese, crunchy chips, 'loads of veggies & sauces. Big on flavours, big on bite"
        },
        {
          "id": "103",
          "veg": "false",
          "name": "Boss Whopper Chicken",
          "image": "https://b.zmtcdn.com/data/dish_photos/cbc/2ece2c5f21d615e1bb12163a495bbcbc.jpg?fit=around|130:130&crop=130:130;*,*",
          "price": "220",
          "rating": "4.2",
          "ratings": "56",
          "quantity": "1",
          "bestSeller": false,
          "description": "The biggest Whopper ever, Boss Whopper, with Premium buns, flame grilled chicken patty, cheese, crunchy chips, loads of veggies & sauces. Big on flavours, big on bite"
        },
        {
          "id": "105",
          "veg": "true",
          "name": "Veg Whopper with Cheese",
          "image": "https://b.zmtcdn.com/data/dish_photos/65b/5b62c9147712a4744c398f9761bd665b.jpg?fit=around|130:130&crop=130:130;*,*",
          "price": "149",
          "rating": "4.5",
          "ratings": "45",
          "quantity": "1",
          "bestSeller": "true",
          "description": "Our Signature Whopper With 7 Layers Between The Buns. Extra Crunchy Veg Patty With Cheese Slice, Fresh Onion, Crispy Lettuce, Juicy Tomatoes(seasonal), Tangy Gherkins, Creamy And Smoky Sauces With Xxl Buns"
        }
      ]
    },
    {
      "id": "11",
      "name": "Deal Of The Day @169",
      "items": [
        {
          "id": "201",
          "veg": "false",
          "name": "New Chicken Tandoori Burger",
          "image": "https://b.zmtcdn.com/data/dish_photos/c31/8bf3ab324756a300edeff94516514c31.jpg?fit=around|130:130&crop=130:130;*,*",
          "price": "159",
          "rating": "4.3",
          "ratings": "34",
          "bestSeller": "true",
          "description": "Flame Grilled Tandoori Chicken, veg khurchan, soft square masala buns. It's Tandoorilicious."
        },
        {
          "id": "202",
          "veg": "true",
          "name": "Paneer Royale Burger",
          "image": "https://b.zmtcdn.com/data/dish_photos/8db/82697afab8220f1e8a813a5407f608db.jpg?fit=around|130:130&crop=130:130;*,*",
          "price": "170",
          "rating": "4.1",
          "ratings": "52",
          "bestSeller": "false",
          "description": "Thick Paneer Patty, loads of sauces in soft square masala buns. It's Royally Paneer"
        },
        {
          "id": "203",
          "veg": "true",
          "name": "1 Veg Whopper + 1 Crispy Veg Burger",
          "image": "https://b.zmtcdn.com/data/dish_photos/cd3/c8cd619f123fb128323cdef81aa1ccd3.jpg?fit=around|130:130&crop=130:130;*,*",
          "price": "180",
          "rating": "4.1",
          "ratings": "52",
          "bestSeller": "false",
          "description": "A rich nutritious delectable diamond shaped soft sweet fudge made of powdered cashew nuts blended with sugar syrup, clarified butter flavored with cardamom and topped with silver foil."
        }
      ]
    },
    {
      "id": "12",
      "name": "Family Feast for 4",
      "items": [
        {
          "id": "201",
          "veg": "true",
          "name": "Premium Family Feast for 4- Veg",
          "image": "https://b.zmtcdn.com/data/dish_photos/d79/a9b60d491d38b5a193285d4f5d779d79.jpg?fit=around|130:130&crop=130:130;*,*",
          "price": "500",
          "rating": "4.3",
          "ratings": "34",
          "bestSeller": "true",
          "description": "Veg Whopper + Paneer Royale + Crispy Veg + BK Veggie + 2 Med Fries + 1 Dip + Peri Peri Sachet + Pepsi + Chocolate Thick Shake"
        },
        {
          "id": "202",
          "veg": "false",
          "name": "Premium Family Feast for 4- Chicken",
          "image": "https://b.zmtcdn.com/data/dish_photos/30c/3ff9747682a64122fd4b4a6e0601130c.jpg?fit=around|130:130&crop=130:130;*,*",
          "price": "987",
          "rating": "4.4",
          "ratings": "52",
          "bestSeller": "false",
          "description": "Save Rs. 200 | 2 Crispy Veg + BK Veggie + Veg Crunchy Taco + 2 Med Fries + 2 Dips + Pepsi + Chocolate Thick Shake"
        },
        {
          "id": "203",
          "veg": "false",
          "name": "Classic Family Feast for 4- Chicken",
          "image": "https://b.zmtcdn.com/data/dish_photos/138/abf2088a65b3dfcd30d66d2cfd99e138.jpg?fit=around|130:130&crop=130:130;*,*",
          "price": "765",
          "rating": "4.5",
          "ratings": "52",
          "bestSeller": "false",
          "description": "Save Rs. 200 | 2 Crispy Chicken + BK Chicken + Chicken Crunchy Taco + 2 Med Fries + 2 Dips + Pepsi + Chocolate Thick Shake"
        }
      ]
    }
  ]
    
export const supabase = createClient(supabaseUrl,supabaseAnonKey)