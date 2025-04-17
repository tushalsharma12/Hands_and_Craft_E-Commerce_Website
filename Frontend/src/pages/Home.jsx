import React from 'react';
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Slide from "../sections/Slide";
import SlideTitle from "../sections/SlideTitle";
import RoundedTitle from "../sections/RoundedTitle";
import { motion_bottom_to_top, motion_left_to_right, motion_right_to_left, banner, button_hover } from "../variables/animation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RoundedHome from "../sections/RoundedHome";
import VideoPlayerHome from "../sections/VideoPlayerHome";
import TestimonialSlider from "../sections/TestimonialSlider";
import Loader from "../components/utils/Loader";

const Home = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const items = [
    {
      icon: "🛒",
      title: "Buying on Etsy",
      links: ["Shopping & Gifting", "Searching for Items", "Buying Safely"],
    },
    {
      icon: "💳",
      title: "Cart & Payment",
      links: ["Taxes & Customs Fees", "Checkout", "Payment Options"],
    },
    {
      icon: "📦",
      title: "Your Orders",
      links: ["After You Purchase", "Order Status", "Returns & Refunds"],
    },
    {
      icon: "👤",
      title: "Your Etsy Account",
      links: ["Sign In & Password", "Contacting Etsy", "Account Safety & Privacy"],
    },
  ];

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="px-3 md:px-0">

      <section className="my-3 sm:my-4 lg:my-6 slider">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div {...motion_left_to_right} className="col-span-3 md:col-span-2 border-transparent rounded-3xl transition-shadow duration-300 ease-in-out hover:shadow-[0px_5px_10px_rgba(0,0,0,0.5)]">
              <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
              >
                {products.filter(product => product.section === "SliderImages").map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={img.img}
                      alt={`Slide ${index}`}
                      className="w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover rounded-3xl"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>

            <motion.div {...motion_right_to_left} className="hidden md:block col-span-1 border-transparent rounded-3xl transition-shadow duration-300 ease-in-out hover:shadow-[0px_0px_10px_rgba(0,0,0,0.5)]">
              <div className="flex flex-col h-full justify-center items-center">
                <div
                  className="flex bg-center bg-cover h-full w-full justify-center rounded-3xl text-center items-center relative"
                  style={{
                    backgroundImage: `url(${products.filter(product => product.section === "Slider2Images")[0]?.img})`,
                  }}
                >
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-xs rounded-3xl"></div>
                  <div className="relative z-10 flex flex-col justify-center items-center space-y-2 sm:space-y-3 p-4">
                    <h2 className="text-yellow-500 pacifico-regular text-lg sm:text-xl md:text-2xl">
                      Where Tradition Meets Art
                    </h2>
                    <p className="text-white text-xs sm:text-sm md:text-base">
                      From the hands of artisans to your world.
                    </p>
                    <motion.button {...button_hover} onClick={() => navigate("/Showmore")} className="mt-2 sm:mt-4 px-4 py-2 text-xs sm:text-sm bg-yellow-500 text-black rounded-lg font-semibold transition-all duration-300 hover:bg-yellow-600 hover:shadow-lg">
                      Shop Now
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <RoundedHome products={products.filter(product => product.section === "Gifts")} heading="Discover gifts 🎁" />

      <Slide heading="Today's Big Deals" products={products.filter(product => product.section === "today_big_deals")} />

      <SlideTitle heading="New Arrivals" products={products.filter(product => product.section === "New Arrivals")} />
<hr />
      <section className="my-5 mb-7 lg:my-7 max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col justify-center items-center space-y-3 text-center px-4">
            <p className="text-yellow-500 font-bold pacifico-regular text-lg sm:text-xl md:text-2xl lg:text-3xl w-full md:w-3/4">
              "Behind the Scenes: The Making of Our Handcrafted Pieces"
            </p>
            <p className="text-black font-bold text-sm sm:text-base md:text-lg lg:text-xl w-full md:w-3/4">
              Every Handcrafted Piece Tells a Story – Discover the Love, Skill, and Passion That Goes Into Making It!
            </p>
          </div>
          <div className="flex justify-center items-center p-2 md:p-5">
            <VideoPlayerHome videoId="AVR45-hdm-g" />
          </div>
        </div>
      </section>

      <RoundedTitle heading="Most Loved" products={products.filter(product => product.section === "Most Loved")} />

      <motion.section {...banner} className="explore my-3 md:my-5 lg:my-7">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="col-span-1 md:col-span-2 flex flex-col justify-center p-2">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold leading-tight">
                  Explore original items from local shops
                </h2>
                <motion.button {...button_hover} onClick={() => navigate("/Showmore")} className="mt-4 px-4 py-2 text-sm sm:text-base bg-yellow-500 text-white rounded-full font-semibold transition-all duration-300 hover:bg-yellow-600 hover:shadow-lg">
                  Get inspired
                </motion.button>
              </div>
            </div>
            <div className="col-span-1 md:col-span-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {products.filter(product => product.section === "explore").map((product) => (
                  <div
                    key={product._id}
                    onClick={() => product._id && navigate(`/products/${product._id}`)}
                    className="p-2 rounded-xl transition-shadow duration-300 hover:shadow-lg"
                  >
                    <img
                      className="w-full h-32 sm:h-44 object-cover rounded-xl"
                      src={product.img}
                      alt={product.title}
                    />
                    <h6 className="mt-2 text-xs sm:text-sm font-semibold line-clamp-2 text-center">
                      {product.title}
                    </h6>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <Slide heading="Indian Art Forms" products={products.filter(product => product.section === "Indian Art Forms")} />

      <SlideTitle heading="Popular gifts right now" products={products.filter(product => product.section === "Popular")} />

      <RoundedTitle heading="Shop extraordinary items at special prices" products={products.filter(product => product.section === "Special Price")} />

      <div className="py-2 sm:py-4 lg:py-6">
        <hr className="border border-gray-300 w-full max-w-7xl mx-auto" />
      </div>

      <motion.section  className="my-4 sm:my-6 lg:my-8 readmore">
  <div className="bg-gray-200 bg-opacity-60 p-4 sm:p-6 lg:p-8 rounded-xl max-w-screen-lg mx-auto">
    <h1 className="text-lg sm:text-xl lg:text-2xl font-medium mb-2 ">
      The Luxurious Way to Decorate Your Home
    </h1>
    <div className="space-y-4 sm:space-y-6">
      <p className="text-sm sm:text-base lg:text-lg text-justify leading-relaxed">
        Interior home decor is one of the most important yet hassling parts of getting a new home. Even if you are living in your house for a long time, it is essential to transform your home interiors every now and then. It gives a fresh perspective to you while you are relaxing or working at home and also gives your home a new appearance.
      </p>
      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="overflow-hidden space-y-6 sm:space-y-8 lg:space-y-10"
        >
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-medium leading-tight">
              Make your home stand out with decorative Lights
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-justify leading-relaxed">
              Perfect lighting can make a huge difference in bringing out the warmth of your home. Some rooms need bright light for every nook and corner while others need a soft balminess of light making you feel relaxed. From spreading the light to creating a mood for a certain moment, you can do it all with decorative lamp lights. Instead of putting up bulbs and tube lights in every corner of the house, use your creative imagination to choose the right light for every room of the house. Here are some ways that can bring out the beauty of your home with handcrafted wall and table lamps online.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-medium leading-tight">
              Lighting solution for every corner of the house
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-justify leading-relaxed">
              Every room has a different need for lighting and if chosen carefully it can make it the best room in the house. For your bedroom, go for decorative candles that are handmade with essential oils. It will feel the room with a gentle warm glow along with sensuous scents. You can also go for aroma diffusers online at ExclusiveLane for lighting up corners creating a relaxing cosy mood.
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-justify leading-relaxed">
              At the entrance and for your puja room, wall hanging lamps are simply perfect as you can place little tealights on them for a beautiful appearance. It can make your home ready for every festival. For your living room or balcony, a chandelier or hanging lamp can be a perfect centrepiece for the entire room. ExclusiveLane has a magnificent collection of handmade lamps, hangings, tea-lights holders, candle stands, and various other decorative lamp lighting pieces.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-medium leading-tight">
              Shop online for exclusive kitchen and dining accessories for your modern home
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-justify leading-relaxed">
              Home decoration can be fun and exciting while mixing and matching colours, art and patterns to make a space that defines you. For kitchen accessories and dining accessories, selectively picking up pieces makes a lot of difference in the entire kitchen setting.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-base sm:text-lg lg:text-xl font-medium leading-tight">
              1. Kitchenware online
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-justify leading-relaxed">
              This exotic and classic kitchenware collection is unique and bound to leave you spellbound. Beautiful, durable and functional - that is what makes the range of kitchen storage containers from ExclusiveLane so popular. With a vast choice of designs and styles in spice boxes, Jars & Containers, and bottles, you are bound to find something to suit your taste.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-base sm:text-lg lg:text-xl font-medium leading-tight">
              2. Tableware online
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-justify leading-relaxed">
              If you love to add a traditional yet trendy touch to your dining table, then our Tableware collection is designed just for you. At ExclusiveLane, we offer a range of tableware and dining accessories sourced from various regions of India. So, discover attractive designs in cutlery holders, napkin holders, coasters and salt & pepper shakers to add some aesthetics to your table.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-base sm:text-lg lg:text-xl font-medium leading-tight">
              3. Serveware online
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-justify leading-relaxed">
              Speak volumes about your taste in serveware with the latest handmade ceramic and wooden items from ExclusiveLane. Explore a wide range of serveware to enhance your dining experiences, such as plates & platters, dinner sets, trays, bowls, kadhai & handi or chapati boxes. Grab your favourites now!
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-base sm:text-lg lg:text-xl font-medium leading-tight">
              4. Furniture online
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-justify leading-relaxed">
              If you hare tired of the same old furniture in your living room and home, discover the ExclusiveLane furniture collection - intricately designed to add elegance and functionality to your interior decor. Explore our wide range of wooden furniture in storage, console sets, bookshelf, tables, and more categories available for you.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-base sm:text-lg lg:text-xl font-medium leading-tight">
              5. Garden décor online
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-justify leading-relaxed">
              you a unique collection of garden decor accessories, a must explore collection to add warm and happy vibes to your garden. So, make your garden look more appealing and magnificent with beautifully handcrafted pots and planters, hangings and garden decor with us.
            </p>
          </div>
        </motion.div>
      )}
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-blue-800 hover:text-blue-600 font-medium mt-4 sm:mt-6 text-sm sm:text-base transition-colors duration-200"
      >
        {expanded ? "Read Less" : "Read More"}
      </button>
    </div>
  </div>
</motion.section>

      <TestimonialSlider />

<hr />
      <motion.div {...motion_bottom_to_top} className="text-center my-2 md:my-4 lg:my-6 pb-10 pt-3">
        <h2 className="text-2xl sm:text-2xl md:text-3xl font-semibold mb-4  px-4">Shop on Hands&Craft</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto px-4">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col text-left items-start">
              <span className="text-3xl sm:text-4xl mb-2 sm:mb-3">{item.icon}</span>
              <h3 className="text-base sm:text-lg font-bold">{item.title}</h3>
              <ul className="text-gray-600 mt-2">
                {item.links.map((link, i) => (
                  <li key={i} className="text-xs sm:text-sm mb-1">{link}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </main>
  );
};

export default Home;