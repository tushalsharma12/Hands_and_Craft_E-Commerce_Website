// import mongoose from "mongoose";
// // import dotenv from "dotenv";
// import Product from "./models/Product.js";
// import dotenv from "dotenv";
// dotenv.config();
// import "./middlewares/upload.js";

// // import connectDB from "./db.js";

// // ✅ Sample Data
// const products = [
//   //Home--------------------------------------------------------------------------------------------------------------------------------------------//
//   //today_big_deals
//   {
//     title: "9 Terracotta Warli Handpainted Pots With Sheesham Wooden Frame Wall Hanging",
//     page: "Home",
//     section: "today_big_deals",
//     price: "2,740",
//     prev_price: "5,499",
//     discount: "50",
//     img: "http://localhost:5000/uploads/deal1.webp",
//     rating: 4.5
//   },
//   {
//     title: "The Red-Shade Log' Madhubani Hand-Painted Table Lamp In Wood",
//     page: "Home",
//     section: "today_big_deals",
//     price: "1,875",
//     prev_price: "3,749",
//     discount: "49",
//     img: "http://localhost:5000/uploads/deal2.webp",
//     rating: 4.8
//   },
//   {
//     title: "Ethnic Lily' Hand-painted Table Planter Pots In Ceramic (Set of 2)",
//     page: "Home",
//     section: "today_big_deals",
//     price: "750",
//     prev_price: "1499",
//     discount: "49",
//     img: "http://localhost:5000/uploads/deal3.webp",
//     rating: 5.0
//   },
//   {
//     title: "Rajasthani Veena Musician' Handmade & Hand-painted Wall Décor Hanging In Iron",
//     page: "Home",
//     section: "today_big_deals",
//     price: "1000",
//     prev_price: "1999",
//     discount: "35",
//     img: "http://localhost:5000/uploads/deal4.webp",
//     rating: 4.9
//   },
//   {
//     title: "Cotton Paradise' Handwoven Conical Hanging Pendant Lamp In Cotton Rope & Iron (35.6 cm)",
//     page: "Home",
//     section: "today_big_deals",
//     price: "1,588",
//     prev_price: "3,175",
//     discount: "45",
//     img: "http://localhost:5000/uploads/deal5.webp",
//     rating: 4.7
//   },
//   {
//     title: "Krishna Melodies' Wall Décor Hanging In Recycled Wood (27.9 cm | Hand-Painted | Multicoloured)",
//     page: "Home",
//     section: "today_big_deals",
//     price: "1,063",
//     prev_price: "2,125",
//     discount: "55",
//     img: "http://localhost:5000/uploads/deal6.webp",
//     rating: 4.7
//   },
//   {
//     title: "Jugnu Chakori' Wooden Tea Light Holder (Set of 2)",
//     page: "Home",
//     section: "today_big_deals",
//     price: "538",
//     prev_price: "1,075",
//     discount: "53",
//     img: "http://localhost:5000/uploads/deal7.webp",
//     rating: 4.8
//   },
//   {
//     title: "Garden Lamp",
//     page: "Home",
//     section: "today_big_deals",
//     price: "900",
//     prev_price: "1200",
//     discount: "65",
//     img: "http://localhost:5000/uploads/birds.webp",
//     rating: 4.8
//   }, 
//   //gifts
//   {
//     title: "Gift Wrapping Service and Calligraphy Name Personalisation",
//     page: "Home",
//     section: "Gifts",
//     price: "49",
//     prev_price: "50",
//     discount: "2",
//     img: "http://localhost:5000/uploads/gift1.jpg",
//     rating: 4.9
//   },
//   {
//     title: "Crochet flowers bouquet, Tulip, Pink, white, purple, blue, everlasting, Graduation, Birthday, Friend, Sister, Girlfriend Gift, love",
//     page: "Home",
//     section: "Gifts",
//     price: "1,815",
//     prev_price: "2,063",
//     discount: "12",
//     img: "http://localhost:5000/uploads/gift2.webp",
//     rating: 5
//   },
//   {
//     title: "Pull Out Photo Album Custom Wooden Photo Box Personalized Memory Keepsake Box Trinket Wood Box Customized Wooden Photo Frame Shadow Box",
//     page: "Home",
//     section: "Gifts",
//     price: "2,432",
//     prev_price: "4,864",
//     discount: "50",
//     img: "http://localhost:5000/uploads/gift3.webp",
//     rating: 4.6
//   },
//   {
//     title: "Family Birth Flower Bouquet Necklace, Engraved Birthflower Pendant, Mother‘s day Gift for Grandma, Birthstone Jewelry, Birthday Gift for Her",
//     page: "Home",
//     section: "Gifts",
//     price: "1,663",
//     prev_price: "4,158",
//     discount: "60",
//     img: "http://localhost:5000/uploads/gift4.webp",
//     rating: 4.9
//   },
//   {
//     title: "Personalized Groomsmen Watch Box Custom Jewelry Storage Case Personalized watch case customized christmas Gifts For Men personalized groom",
//     page: "Home",
//     section: "Gifts",
//     price: "676",
//     prev_price: "1,351",
//     discount: "50",
//     img: "http://localhost:5000/uploads/gift5.webp",
//     rating: 5
//   },
//   {
//     title: "Vantage Corduroy Patchwork Journal Embroidered Flower Notebook A6 A5 Cute Bunny Fabric Notepad Refillable Traveler's Notebook Holiday Gift",
//     page: "Home",
//     section: "Gifts",
//     price: "2,297",
//     prev_price: "2,702",
//     discount: "15",
//     img: "http://localhost:5000/uploads/gift6.webp",
//     rating: 4.7
//   },
//   {
//     title: "DIY Kit Build a Lamp - Educational STEM Toy for Kids, Personalized Gift for kids, Fun Science Crafts STEM Kit",
//     page: "Home",
//     section: "Gifts",
//     price: "1,622",
//     prev_price: "2,702",
//     discount: "25",
//     img: "http://localhost:5000/uploads/gift7.webp",
//     rating: 4.9
//   },
//   {
//     title: "Personalized Gift, Fun Science Crafts STEM Kit",
//     page: "Home",
//     section: "Gifts",
//     price: "1,122",
//     prev_price: "2,702",
//     discount: "35",
//     img: "http://localhost:5000/uploads/gift8.webp",
//     rating: 5
//   },
// //New Arrivals
//   {
//     title: "Grape Vines' Hand-Painted Decorative Table Lamp In Mango Wood (30 cm)",
//     page: "Home",
//     section: "New Arrivals",
//     price: "1599",
//     prev_price: "2825",
//     discount: "43",
//     img: "http://localhost:5000/uploads/arrival1.webp",
//     rating: 4.9
//   },
//   {
//     title: "Swinging Dog Hand-painted Hanging Planter Pot In Terracotta (Set of 2, 14 cm)",
//     page: "Home",
//     section: "New Arrivals",
//     price: "1,160",
//     prev_price: "2,320",
//     discount: "50",
//     img: "http://localhost:5000/uploads/arrival2.webp",
//     rating: 4.8
//   },
//   {
//     title: "'Yin-Yang' Decorative Ceramic Vases (Set of 2, 22.6 cm, Handglazed Studio Pottery)",
//     page: "Home",
//     section: "New Arrivals",
//     price: "899",
//     prev_price: "1775",
//     discount: "49",
//     img: "http://localhost:5000/uploads/arrival3.webp",
//     rating: 5.0
//   },
//   {
//     title: "'Radha-Krishna & Peacock' Idol Showpiece Figurine with Diya (1 Wick, 17.5 cm, Golden, Metal, Handcrafted)",
//     page: "Home",
//     section: "New Arrivals",
//     price: "685",
//     prev_price: "1371",
//     discount: "53",
//     img: "http://localhost:5000/uploads/arrival4.webp",
//     rating: 4.9
//   },
//   {
//     title: "'Nerdy Boy' Handmade & Hand-Painted Terracotta Table Planter Flower Pot (22.9 cm, Multicolored)",
//     page: "Home",
//     section: "New Arrivals",
//     price: "816",
//     prev_price: "1,175",
//     discount: "45",
//     img: "http://localhost:5000/uploads/arrival5.webp",
//     rating: 4.7
//   },
//   {
//     title: "'Human Wisdom Face' Modern Decorative Showpiece Sculpture (Set of 3, Resin, Handcrafted)",
//     page: "Home",
//     section: "New Arrivals",
//     price: "1,063",
//     prev_price: "2,125",
//     discount: "55",
//     img: "http://localhost:5000/uploads/arrival6.webp",
//     rating: 4.7
//   },
//   {
//     title: "'Family Bliss' Modern Decorative Showpiece Sculpture (Resin, Handcrafted, 30.7 cm)",
//     page: "Home",
//     section: "New Arrivals",
//     price: "538",
//     prev_price: "1,075",
//     discount: "53",
//     img: "http://localhost:5000/uploads/arrival7.webp",
//     rating: 4.8
//   },
//   {
//     title: "'Cotton Weaved' Hanging Pendant Lamp Shade (25.9 cm, Iron & Cotton Rope, Handwoven)",
//     page: "Home",
//     section: "New Arrivals",
//     price: "900",
//     prev_price: "1200",
//     discount: "65",
//     img: "http://localhost:5000/uploads/arrival8.webp",
//     rating: 4.8
//   },
//   {
//     title: "'Radha-Krishna & Peacock' Idol Showpiece Figurine with Diya (1 Wick, 17.5 cm, Golden, Metal, Handcrafted)",
//     page: "Home",
//     section: "New Arrivals",
//     price: "685",
//     prev_price: "1371",
//     discount: "53",
//     img: "http://localhost:5000/uploads/arrival4.webp",
//     rating: 4.9
//   },
//   {
//     title: "'Nerdy Boy' Handmade & Hand-Painted Terracotta Table Planter Flower Pot (22.9 cm, Multicolored)",
//     page: "Home",
//     section: "New Arrivals",
//     price: "816",
//     prev_price: "1,175",
//     discount: "45",
//     img: "http://localhost:5000/uploads/arrival5.webp",
//     rating: 4.7
//   },
//   //Most Loved

//   {
//     title: "Daawat-e-Taj' Handcrafted Ceramic Snacks Serving Platters (Small) (Set of 2 | Microwave Safe)",
//     page: "Home",
//     section: "Most Loved",
//     price: "1,063",
//     prev_price: "2,125",
//     discount: "55",
//     img: "http://localhost:5000/uploads/loved1.webp",
//     rating: 4.7
//   },
//   {
//     title: "'Merry Cat' Handmade & Hand-painted Pen Stand In Terracotta (14 cm)",
//     page: "Home",
//     section: "Most Loved",
//     price: "538",
//     prev_price: "1,075",
//     discount: "53",
//     img: "http://localhost:5000/uploads/loved2.webp",
//     rating: 4.8
//   },
//   {
//     title: "'Love Couple' Modern Decorative Showpiece Statue (Resin, Handcrafted, 21.5 cm)",
//     page: "Home",
//     section: "Most Loved",
//     price: "900",
//     prev_price: "1200",
//     discount: "65",
//     img: "http://localhost:5000/uploads/loved3.webp",
//     rating: 4.9
//   }, 
//   {
//     title: "DIY Kit Build a Lamp - Educational STEM Toy for Kids, Personalized Gift for kids, Fun Science Crafts STEM Kit",
//     page: "Home",
//     section: "Most Loved",
//     price: "1,622",
//     prev_price: "2,702",
//     discount: "25",
//     img: "http://localhost:5000/uploads/gift7.webp",
//     rating: 4.9
//   },
//   {
//     title: "Personalized Gift, Fun Science Crafts STEM Kit",
//     page: "Home",
//     section: "Most Loved",
//     price: "1,122",
//     prev_price: "2,702",
//     discount: "35",
//     img: "http://localhost:5000/uploads/gift8.webp",
//     rating: 5
//   },
//   {
//     title: "Krishna Melodies' Wall Décor Hanging In Recycled Wood (27.9 cm | Hand-Painted | Multicoloured)",
//     page: "Home",
//     section: "Most Loved",
//     price: "1,063",
//     prev_price: "2,125",
//     discount: "55",
//     img: "http://localhost:5000/uploads/deal6.webp",
//     rating: 4.7
//   },
//   {
//     title: "Jugnu Chakori' Wooden Tea Light Holder (Set of 2)",
//     page: "Home",
//     section: "Most Loved",
//     price: "538",
//     prev_price: "1,075",
//     discount: "53",
//     img: "http://localhost:5000/uploads/deal7.webp",
//     rating: 4.8
//   },
//   {
//     title: "Garden Lamp",
//     page: "Home",
//     section: "Most Loved",
//     price: "900",
//     prev_price: "1200",
//     discount: "65",
//     img: "http://localhost:5000/uploads/birds.webp",
//     rating: 4.9
//   }, 
//   //Indian Art Forms
//   {
//     title: "'The Jute-Shade Log' Madhubani Hand-Painted Table Lamp In Wood",
//     page: "Home",
//     section: "Indian Art Forms",
//     price: "1,063",
//     prev_price: "2,125",
//     discount: "55",
//     img: "http://localhost:5000/uploads/art1.webp",
//     rating: 4.7
//   },
//   {
//     title: "Jugnu Chakori' Wooden Tea Light Holder (Set of 2)",
//     page: "Home",
//     section: "Indian Art Forms",
//     price: "538",
//     prev_price: "1,075",
//     discount: "53",
//     img: "http://localhost:5000/uploads/deal7.webp",
//     rating: 4.8
//   },
//   {
//     title: "'In-Key-Geneous' Madhubani Hand-Painted Key Holder In Sheesham & Teak Wood (6 Hooks)",
//     page: "Home",
//     section: "Indian Art Forms",
//     price: "900",
//     prev_price: "1200",
//     discount: "65",
//     img: "http://localhost:5000/uploads/art2.webp",
//     rating: 4.8
//   }, 
//   {
//     title: "Madhubani Handpainted Bottle Shaped Terracotta Vase Set",
//     page: "Home",
//     section: "Indian Art Forms",
//     price: "49",
//     prev_price: "50",
//     discount: "2",
//     img: "http://localhost:5000/uploads/art3.webp",
//     rating: 4.9
//   },
//   {
//     title: "'Kathakali Maquillage' Hand Carved Block Wall Decor In Sheesham Wood",
//     page: "Home",
//     section: "Indian Art Forms",
//     price: "1,815",
//     prev_price: "2,063",
//     discount: "12",
//     img: "http://localhost:5000/uploads/art4.webp",
//     rating: 5
//   },
  
//   {
//     title: "Personalized Groomsmen Watch Box Custom Jewelry Storage Case Personalized watch case customized christmas Indian Art Forms For Men personalized groom",
//     page: "Home",
//     section: "Indian Art Forms",
//     price: "676",
//     prev_price: "1,351",
//     discount: "50",
//     img: "http://localhost:5000/uploads/gift5.webp",
//     rating: 5
//   },
//   {
//     title: "Vantage Corduroy Patchwork Journal Embroidered Flower Notebook A6 A5 Cute Bunny Fabric Notepad Refillable Traveler's Notebook Holiday Gift",
//     page: "Home",
//     section: "Indian Art Forms",
//     price: "2,297",
//     prev_price: "2,702",
//     discount: "15",
//     img: "http://localhost:5000/uploads/gift6.webp",
//     rating: 4.7
//   },
//   //Popular
//   {
//     title: "DIY Kit Build a Lamp - Educational STEM Toy for Kids, Personalized Gift for kids, Fun Science Crafts STEM Kit",
//     page: "Home",
//     section: "Popular",
//     price: "1,622",
//     prev_price: "2,702",
//     discount: "25",
//     img: "http://localhost:5000/uploads/gift7.webp",
//     rating: 4.9
//   },
//   {
//     title: "Personalized Gift, Fun Science Crafts STEM Kit",
//     page: "Home",
//     section: "Popular",
//     price: "1,122",
//     prev_price: "2,702",
//     discount: "35",
//     img: "http://localhost:5000/uploads/gift8.webp",
//     rating: 5
//   },
//   {
//     title: "Jugnu Chakori' Wooden Tea Light Holder (Set of 2)",
//     page: "Home",
//     section: "Popular",
//     price: "538",
//     prev_price: "1,075",
//     discount: "53",
//     img: "http://localhost:5000/uploads/deal7.webp",
//     rating: 4.8
//   },
//   {
//     title: "Garden Lamp Hand-Painted Terracotta Table Planter Flower Pot (22.9 cm, Multicolored",
//     page: "Home",
//     section: "Popular",
//     price: "900",
//     prev_price: "1200",
//     discount: "65",
//     img: "http://localhost:5000/uploads/birds.webp",
//     rating: 4.8
//   }, 
//   {
//     title: "Family Birth Flower Bouquet Necklace, Engraved Birthflower Pendant, Mother‘s day Gift for Grandma, Birthstone Jewelry, Birthday Gift for Her",
//     page: "Home",
//     section: "Gifts",
//     price: "1,663",
//     prev_price: "4,158",
//     discount: "60",
//     img: "http://localhost:5000/uploads/gift4.webp",
//     rating: 4.9
//   },
//   {
//     title: "Personalized Groomsmen Watch Box Custom Jewelry Storage Case Personalized watch case customized christmas Gifts For Men personalized groom",
//     page: "Home",
//     section: "Gifts",
//     price: "676",
//     prev_price: "1,351",
//     discount: "50",
//     img: "http://localhost:5000/uploads/gift5.webp",
//     rating: 5
//   },
//   {
//     title: "'Cotton Weaved' Hanging Pendant Lamp Shade (25.9 cm, Iron & Cotton Rope, Handwoven)",
//     page: "Home",
//     section: "Popular",
//     price: "900",
//     prev_price: "1200",
//     discount: "65",
//     img: "http://localhost:5000/uploads/arrival8.webp",
//     rating: 4.8
//   },
//   {
//     title: "'Radha-Krishna & Peacock' Idol Showpiece Figurine with Diya (1 Wick, 17.5 cm, Golden, Metal, Handcrafted)",
//     page: "Home",
//     section: "Popular",
//     price: "685",
//     prev_price: "1371",
//     discount: "53",
//     img: "http://localhost:5000/uploads/arrival4.webp",
//     rating: 4.9
//   },
//   {
//     title: "'Nerdy Boy' Handmade & Hand-Painted Terracotta Table Planter Flower Pot (22.9 cm, Multicolored)",
//     page: "Home",
//     section: "Popular",
//     price: "816",
//     prev_price: "1,175",
//     discount: "45",
//     img: "http://localhost:5000/uploads/arrival5.webp",
//     rating: 4.7
//   },
//   //explore
//   {
//     title: "'The Arched Bucket' Wall Planter Pot In Galvanized Iron",
//     page: "Home",
//     section: "explore",
//     price: "654",
//     prev_price: "960",
//     discount: "31",
//     img: "http://localhost:5000/uploads/explore1.webp",
//     rating: 4.7
//   },
//   {
//     title: "'Leafy Plants' Hand Etched Table Lamp In Iron & Mango Wood (30.5 cm)",
//     page: "Home",
//     section: "explore",
//     price: "685",
//     prev_price: "1371",
//     discount: "53",
//     img: "http://localhost:5000/uploads/explore2.webp",
//     rating: 4.9
//     },
//   {
//     title: "'Spring Hues' Decorative Ceramic Vases (Set of 2, 10.4 cm, Handglazed Studio Pottery)",
//     page: "Home",
//     section: "explore",
//     price: "538",
//     prev_price: "1,075",
//     discount: "53",
//     img: "http://localhost:5000/uploads/explore3.webp",
//     rating: 4.8
//   },
//   {
//     title: "Jugnu Chakori' Wooden Tea Light Holder (Set of 2)",
//     page: "Home",
//     section: "explore",
//     price: "538",
//     prev_price: "1,075",
//     discount: "53",
//     img: "http://localhost:5000/uploads/deal7.webp",
//     rating: 4.8
//   },
//   //Special Price
//   {
//     title: "'Rock Fellowship' Modern Decorative Showpiece Sculpture (Resin, Handcrafted, 16.8 cm)", 
//     page: "Home",
//     section: "Special Price",
//     price: "654",
//     prev_price: "960",
//     discount: "31",
//     img: "http://localhost:5000/uploads/specialprize1.webp",
//     rating: 4.7
//   },
//   {
//     title: "'Chatting Birds' Modern Decorative Showpiece Statue (Resin, Handcrafted, 20.6 cm)", 
//     page: "Home",
//     section: "Special Price",
//     price: "1254",
//     prev_price: "2960",
//     discount: "60",
//     img: "http://localhost:5000/uploads/specialprize2.webp",
//     rating: 4.6
//   },
//   {
//     title: "'Kathakali Maquillage' Hand Carved Block Wall Decor In Sheesham Wood", 
//     page: "Home",
//     section: "Special Price",
//     price: "1654",
//     prev_price: "2260",
//     discount: "31",
//     img: "http://localhost:5000/uploads/specialprize3.webp",
//     rating: 4.9
//   },
//   {
//     title: "Swinging Dog Hand-painted Hanging Planter Pot In Terracotta (Set of 2, 14 cm)", 
//     page: "Home",
//     section: "Special Price",
//     price: "1,160",
//     prev_price: "2260",
//     discount: "50",
//     img: "http://localhost:5000/uploads/specialprize4.webp",
//     rating: 4.9
//   },
//   {
//     title: "'In-Key-Geneous' Madhubani Hand-Painted Key Holder In Sheesham & Teak Wood (6 Hooks)",
//     page: "Home",
//     section: "Special Price",
//     price: "900",
//     prev_price: "1200",
//     discount: "65",
//     img: "http://localhost:5000/uploads/art2.webp",
//     rating: 4.8
//   }, 
//   {
//     title: "Madhubani Handpainted Bottle Shaped Terracotta Vase Set",
//     page: "Home",
//     section: "Special Price",
//     price: "49",
//     prev_price: "50",
//     discount: "2",
//     img: "http://localhost:5000/uploads/art3.webp",
//     rating: 4.9
//   },
//   {
//     title: "Swinging Dog Hand-painted Hanging Planter Pot In Terracotta (Set of 2, 14 cm)",
//     page: "Home",
//     section: "Special Price",
//     price: "1,160",
//     prev_price: "2,320",
//     discount: "50",
//     img: "http://localhost:5000/uploads/arrival2.webp",
//     rating: 4.8
//   },
//   {
//     title: "'Yin-Yang' Decorative Ceramic Vases (Set of 2, 22.6 cm, Handglazed Studio Pottery)",
//     page: "Home",
//     section: "Special Price",
//     price: "899",
//     prev_price: "1775",
//     discount: "49",
//     img: "http://localhost:5000/uploads/arrival3.webp",
//     rating: 5.0
//   },
//   {
//     img: "http://localhost:5000/uploads/slider-1.jpg",
//     page: "Home",
//     section: "SliderImages",
//     title: "Gift for Him",
//     rating: 4.8,
//     price: "1600",
//     prev_price: "2000",
//     discount: "40",
//   },
//   {
//     img: "http://localhost:5000/uploads/slider-4.jpg",
//     page: "Home",
//     section: "SliderImages",
//     title: "Gift for Her",
//     rating: 4.8,
//     price: "1600",
//     prev_price: "2000",
//     discount: "40",
//   },
//   {
//     img: "http://localhost:5000/uploads/slider-5.jpg",
//     page: "Home",
//     section: "SliderImages",
//     title: "Gift for Him",
//     rating: 4.8,
//     price: "1600",
//     prev_price: "2000",
//     discount: "40",
//   },
//   {
//     img: "http://localhost:5000/uploads/slider2.1.jpg",
//     page: "Home",
//     section: "Slider2Images",
//     title: "Gift for Kids",
//     rating: 4.8,
//     price: "1600",
//     prev_price: "2000",
//     discount: "40",
//   },
//   //page : "Dining"----------------------------------------------------------------------------------------------------------------------------------//
//   {
//     title: "Jugnu Chakori' Wooden Tea Light Holder (Set of 2)",
//     page: "Dining",
//     section: "DiningRounded1",
//     price: "538",
//     prev_price: "1,075",
//     discount: "53",
//     img: "http://localhost:5000/uploads/deal7.webp",
//     rating: 4.8
//   },
//   {
//     title: "'Cotton Weaved' Hanging Pendant Lamp Shade (25.9 cm, Iron & Cotton Rope, Handwoven)",
//     page: "Dining",
//     section: "DiningRounded1",
//     price: "900",
//     prev_price: "1200",
//     discount: "65",
//     img: "http://localhost:5000/uploads/arrival8.webp",
//     rating: 4.8
//   },
//   {
//     title: "'Radha-Krishna & Peacock' Idol Showpiece Figurine with Diya (1 Wick, 17.5 cm, Golden, Metal, Handcrafted)",
//     page: "Dining",
//     section: "DiningRounded1",
//     price: "685",
//     prev_price: "1371",
//     discount: "53",
//     img: "http://localhost:5000/uploads/arrival4.webp",
//     rating: 4.9
//   },
//   // {
//   //   title: "'Nerdy Boy' Handmade & Hand-Painted Terracotta Table Planter Flower Pot (22.9 cm, Multicolored)",
//   //   page: "Dining",
//   //   section: "DiningRounded1",
//   //   price: "816",
//   //   prev_price: "1,175",
//   //   discount: "45",
//   //   img: "http://localhost:5000/uploads/arrival5.webp",
//   //   rating: 4.7
//   // },
//   // //explore
//   // {
//   //   title: "'The Arched Bucket' Wall Planter Pot In Galvanized Iron",
//   //   page: "Dining",
//   //   section: "DiningRounded1",
//   //   price: "654",
//   //   prev_price: "960",
//   //   discount: "31",
//   //   img: "http://localhost:5000/uploads/explore1.webp",
//   //   rating: 4.7
//   // },
//   // {
//   //   title: "'Leafy Plants' Hand Etched Table Lamp In Iron & Mango Wood (30.5 cm)",
//   //   page: "Dining",
//   //   section: "DiningRounded1",
//   //   price: "685",
//   //   prev_price: "1371",
//   //   discount: "53",
//   //   img: "http://localhost:5000/uploads/explore2.webp",
//   //   rating: 4.9
//   //   },
//   // {
//   //   title: "'Spring Hues' Decorative Ceramic Vases (Set of 2, 10.4 cm, Handglazed Studio Pottery)",
//   //   page: "Dining",
//   //   section: "DiningRounded1",
//   //   price: "538",
//   //   prev_price: "1,075",
//   //   discount: "53",
//   //   img: "http://localhost:5000/uploads/explore3.webp",
//   //   rating: 4.8
//   // },
//   // {
//   //   title: "Jugnu Chakori' Wooden Tea Light Holder (Set of 2)",
//   //   page: "Dining",
//   //   section: "DiningRounded1",
//   //   price: "538",
//   //   prev_price: "1,075",
//   //   discount: "53",
//   //   img: "http://localhost:5000/uploads/deal7.webp",
//   //   rating: 4.8
//   // },
//   // //Special Price
//   // {
//   //   title: "'Rock Fellowship' Modern Decorative Showpiece Sculpture (Resin, Handcrafted, 16.8 cm)", 
//   //   page: "Dining",
//   //   section: "DiningRounded1",
//   //   price: "654",
//   //   prev_price: "960",
//   //   discount: "31",
//   //   img: "http://localhost:5000/uploads/specialprize1.webp",
//   //   rating: 4.7
//   // },
//   // {
//   //   title: "'Chatting Birds' Modern Decorative Showpiece Statue (Resin, Handcrafted, 20.6 cm)", 
//   //   page: "Dining",
//   //   section: "DiningRounded1",
//   //   price: "1254",
//   //   prev_price: "2960",
//   //   discount: "60",
//   //   img: "http://localhost:5000/uploads/specialprize2.webp",
//   //   rating: 4.6
//   // },
//   // {
//   //   title: "'Kathakali Maquillage' Hand Carved Block Wall Decor dg In Sheesham Wood", 
//   //   page: "Dining",
//   //   section: "DiningRounded1",
//   //   price: "1654",
//   //   prev_price: "2260",
//   //   discount: "31",
//   //   img: "http://localhost:5000/uploads/specialprize3.webp",
//   //   rating: 4.9
//   // },

// ];

// // ✅ Data Insert Function
// const seedProducts = async () => {

//     await mongoose.connect(process.env.MONGO_URI);
  
//     // Delete all existing products
//     // await Product.deleteMany({});
  
//     // Insert new products 
//     console.log("Inserting new products...");

//     for (const product of products) {
//       const exists = await Product.findOne({ title: product.title }); // ✅ Check if already exists
//       if (!exists) {
//         await Product.insertMany(products); // ✅ Insert only if not exists
//       }
//     }
  
//     console.log("Data Seeded Without Deleting Old Data!");
//     process.exit();
  
// };

// // ✅ Run Function
// seedProducts();
