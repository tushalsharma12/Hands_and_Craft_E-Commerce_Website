import "../assets/styles/style.css";
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

const Home = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load products.");
        setLoading(false);
      });
  }, []);

  // ✅ Section Wise Filter Karein
  const getSectionProducts = (section) => {
    return products.filter(product => product.section === section);
  };
  const Gifts = getSectionProducts("Gifts");
  const today_big_deals = getSectionProducts("today_big_deals");
  const NewArrivals = getSectionProducts("New Arrivals");
  const MostLoved = getSectionProducts("Most Loved");
  const IndianArtForms = getSectionProducts("Indian Art Forms");
  const explore = getSectionProducts("explore");
  const SpecialPrice = getSectionProducts("Special Price");
  const SliderImages = getSectionProducts("SliderImages");
  const Slider2Images = getSectionProducts("Slider2Images");

  const items = [
    {
      icon: "🛒", // Replace with actual icon/image
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

  return (

    <main className="px-2 ">
      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading && <p className="text-center">Loading...</p>}

      <section className="slider lg:my-6 my-2">

        <div className="max-w-screen-xl mx-auto ">
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
            <motion.div {...motion_left_to_right} className="col-span-3 md:col-span-2  border-transparent rounded-3xl hover:shadow-[0px_5px_10px_rgba(0,0,0,0.5)] transition-shadow ease-in-out duration-300 ">
              <Swiper
                modules={[Autoplay, Navigation, Pagination]} // ✅ Pass modules here
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 4000, disableOnInteraction: false }} // ✅ Enable autoplay
                pagination={{ clickable: true }}
              >
                {SliderImages.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={img.img}
                      alt={`Slide ${index}`}
                      className=" w-full md:max-h-[400px] min-h-[400px] slider-images object-cover rounded-3xl"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>

            <motion.div {...motion_right_to_left} className="col-span-1 hidden md:block border-transparent rounded-3xl hover:shadow-[0px_0px_10px_rgba(0,0,0,0.5)] transition-shadow ease-in-out duration-300 ">
              <div className="flex  flex-col  justify-center  items-center h-full">
                <div
                  className="relative rounded-3xl w-full h-full bg-cover bg-center flex items-center justify-center text-center"
                  style={{
                    backgroundImage: `url(${Slider2Images[0]?.img})`,
                  }}
                >
                  {/* Blurred Background Layer */}
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-xs  rounded-3xl"></div>

                  {/* Clear Content */}
                  <div className="absolute flex flex-col items-center justify-center lg:p-2 md:p-4 sm:p-3 p-1 md:space-y-3 space-y-1">
                    <h2 className=" lg:text-2xl md:text-xl sm:text-md text-sm  pacifico-regular text-yellow-500">
                      Where Tradition Meets Art
                    </h2>
                    <p className="text-white lg:text-sm  text-xs  md:text-sm ">
                      From the hands of artisans to your world.
                    </p>
                    <motion.button {...button_hover} onClick={() => navigate("/Showmore")} className="mt-4 md:px-6 px-2 md:py-2 py-1 text-black bg-yellow-500 hover:bg-yellow-600 md:text-sm text-xs font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300 shadow-md hover:shadow-lg">
                      Shop Now
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

      </section>

      <RoundedHome Gifts={Gifts} heading="Discover gifts for every occasion 🎁" />

      <Slide heading="Today's Big Deals" today_big_deals={today_big_deals} />

      <SlideTitle heading="New Arrivals" today_big_deals={NewArrivals} />

      {/* <section className="max-w-[1360px] mx-auto lg:my-7 md:my-5 my-3">

        <div className="grid-cols-2 grid  ">
          <div className=" col-span-1 flex flex-col  space-y-3 justify-center items-center">
            <p className="font-bold lg:text-2xl md:text-xl text-sm md:w-1/2 w-3/4 text-black md:mt-0 mt-2  text-center text-yellow-500 pacifico-regular">&quot;Behind the Scenes: The Making of Our Handcrafted Pieces&quot;</p>
            <p className="font-bold lg:text-2xl md:text-xl text-sm md:w-3/4 w-3/4 text-black md:mt-0 mt-2  text-center ">Every Handcrafted Piece Tells a Story – Discover the Love, Skill, and Passion That Goes Into Making It!</p>
          </div>

          <div className="col-span-1 flex justify-center  items-center md:p-5 p-2 justify-end">
            <VideoPlayerHome
              videoId="AVR45-hdm-g"

            />
          </div>
        </div>

      </section> */}

      <RoundedTitle heading="Most Loved" today_big_deals={MostLoved} />

      <motion.section {...banner} className="explore lg:my-7 md:my-5 my-3">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid md:grid-cols-5 grid-cols-1 gap-2">
            <div className="md:col-span-2 col-span-1 flex flex-col justify-center justify-start md:items-center md:p-5 p-2">
              <div className="">
                <h2 className="lading-none text-xl md:text-2xl font-semibold">
                  Explore original items from local shops
                </h2>
                <motion.button {...button_hover} onClick={() => navigate("/Showmore")} className="bg-yellow-500 mt-3 rounded-full lg:p-2 p-1 lg:px-3 px-2 text-white md:text-sm text-xs font-semibold hover:bg-yellow-600 hover:shadow-[0px_0px_5px_rgba(0,0,0,0.4)] transition-shadow ease-in-out duration-300 ">
                  Get inspired
                </motion.button>
              </div>
            </div>
            <div className="sm:grid-cols-4  grid-cols-2 grid md:col-span-3 col-span-1">
              {explore.map((product) => (
                <div
                  className="md:col-span-1 col-span-1 flex flex-nowrap p-1"
                  key={product._id}
                  onClick={() => product._id && navigate(`/products/${product._id}`)}

                >
                  <div className=" rounded-xl hover:shadow-[0px_0px_8px_rgba(0,0,0,0.7)] transition-shadow ease-in-out duration-300 md:p-2 p-1">
                    <div className=" ">
                      <img
                        className=" gift rounded-t-xl md:size-44  object-cover rounded-xl  "
                        src={product.img}
                        alt="gift"
                      />
                    </div>
                    <div className="content  text-center">
                      <h6 className="font-semibold text-xs line-clamp-2">
                        {product.title}
                      </h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <Slide heading="Indian Art Forms" today_big_deals={IndianArtForms} />

      <SlideTitle heading="Popular gifts right now" today_big_deals={getSectionProducts("Popular")} />

      <RoundedTitle heading="Shop extraordinary items at special prices" today_big_deals={SpecialPrice} />

      <div className="lg:pt-5 md:pt-3 pt-2">
        <hr className="border border-gray-300 w-full max-w-7xl mx-auto " />
      </div>

      <motion.section {...motion_bottom_to_top} className="readmore lg:my-7 md:my-5 my-3 ">

        <div className="max-w-[1360px] mx-auto  p-3 px-5 bg-gray-200 bg-opacity-60 rounded-xl  ">
          <h1 className="md:text-2xl sm:text-xl text-lg my-3 leading-none font-medium">
            The Luxurious Way to Decorate Your Home
          </h1>
          <p className=" text-justify text-sm leading-tight md:leading-relaxed">
            Interior home decor is one of the most important yet hassling parts of getting a new home. Even if you are living in your house for a long time, it is essential to transform your home interiors every now and then. It gives a fresh perspective to you while you are relaxing or working at home and also gives your home a new appearance. Changing things up is always better, especially when you have guests over. Once you have decided to decorate your home, you will find a large number of ideas and tips online to beautify your home. But this is when you must carefully choose the vibe or look you want to create. Ultimately, it is you who will be staying there all day, and you should love your home, interiors and all!
          </p>
          <p className="leading-tight md:leading-relaxed">
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}

                transition={{ duration: 1, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <h2 className="md:text-2xl sm:text-xl text-lg my-3 leading-none font-medium">
                  Make your home stand out with decorative Lights
                </h2>
                <p className="text-sm text-justify">
                  Perfect lighting can make a huge difference in bringing out the warmth of your home. Some rooms need bright light for every nook and corner while others need a soft balminess of light making you feel relaxed. From spreading the light to creating a mood for a certain moment, you can do it all with decorative lamp lights. Instead of putting up bulbs and tube lights in every corner of the house, use your creative imagination to choose the right light for every room of the house. Here are some ways that can bring out the beauty of your home with handcrafted wall and table lamps online.
                </p>

                <h2 className="md:text-2xl sm:text-xl text-lg my-3 leading-none font-medium">
                  Lighting solution for every corner of the house
                </h2>
                <p className="text-sm text-justify">
                  Every room has a different need for lighting and if chosen carefully it can make it the best room in the house. For your bedroom, go for decorative candles that are handmade with essential oils. It will feel the room with a gentle warm glow along with sensuous scents. You can also go for aroma diffusers online at ExclusiveLane for lighting up corners creating a relaxing cosy mood.
                </p>
                <p className="text-sm text-justify">
                  At the entrance and for your puja room, wall hanging lamps are simply perfect as you can place little tealights on them for a beautiful appearance. It can make your home ready for every festival. For your living room or balcony, a chandelier or hanging lamp can be a perfect centrepiece for the entire room. ExclusiveLane has a magnificent collection of handmade lamps, hangings, tea-lights holders, candle stands, and various other decorative lamp lighting pieces.
                </p>
                <h2 className="md:text-2xl sm:text-xl text-lg my-3 leading-none font-medium">
                  Shop online for exclusive kitchen and dining accessories for your modern home
                </h2>
                <p className="text-sm text-justify">
                  Home decoration can be fun and exciting while mixing and matching colours, art and patterns to make a space that defines you. For kitchen accessories and dining accessories, selectively picking up pieces makes a lot of difference in the entire kitchen setting.
                </p>
                <h2 className="md:text-xl sm:text-lg text-base my-3 leading-none font-medium">
                  1. Kitchenware online{" "}
                </h2>
                <p className="text-sm text-justify">
                  This exotic and classic kitchenware collection is unique and
                  bound to leave you spellbound. Beautiful, durable and
                  functional - that is what makes the range of kitchen storage
                  containers from ExclusiveLane so popular. With a vast choice
                  of designs and styles in spice boxes, Jars & Containers, and
                  bottles, you are bound to find something to suit your taste.
                </p>
                <h2 className="md:text-xl sm:text-lg text-base my-3 leading-none font-medium">
                  2. Tableware online
                </h2>
                <p className="text-sm text-justify">
                  If you love to add a traditional yet trendy touch to your
                  dining table, then our Tableware collection is designed just
                  for you. At ExclusiveLane, we offer a range of tableware and
                  dining accessories sourced from various regions of India. So,
                  discover attractive designs in cutlery holders, napkin
                  holders, coasters and salt & pepper shakers to add some
                  aesthetics to your table.
                </p>
                <h2 className="md:text-xl sm:text-lg text-base my-3 leading-none font-medium">
                  3. Serveware online
                </h2>
                <p className="text-sm text-justify">
                  Speak volumes about your taste in serveware with the latest
                  handmade ceramic and wooden items from ExclusiveLane. Explore
                  a wide range of serveware to enhance your dining experiences,
                  such as plates & platters, dinner sets, trays, bowls, kadhai &
                  handi or chapati boxes. Grab your favourites now!
                </p>
                <h2 className="md:text-xl sm:text-lg text-base my-3 leading-none font-medium">
                  4. Furniture online{" "}
                </h2>
                <p className="text-sm text-justify">
                  If you hare tired of the same old furniture in your living
                  room and home, discover the ExclusiveLane furniture collection
                  - intricately designed to add elegance and functionality to
                  your interior decor. Explore our wide range of wooden
                  furniture in storage, console sets, bookshelf, tables, and
                  more categories available for you.
                </p>
                <h2 className="md:text-xl sm:text-lg text-base my-3 leading-none font-medium">
                  5. Garden décor online
                </h2>
                <p className="text-sm text-justify">
                  you a unique collection of garden decor accessories, a must
                  explore collection to add warm and happy vibes to your garden.
                  So, make your garden look more appealing and magnificent with
                  beautifully handcrafted pots and planters, hangings and garden
                  decor with us.
                </p>

              </motion.div>
            )}
          </p>

          <button
            onClick={
              expanded ? () => setExpanded(false) : () => setExpanded(true)
            }
            className="text-blue-800 outline-none border-none mt-3 text-sm font-medium"
          >
            {expanded ? "Read Less" : "Read More"}
          </button>
        </div>
      </motion.section>

      <TestimonialSlider />

      <motion.div {...motion_bottom_to_top} className="text-center pb-10 lg:my-5 md:my-3 my-2">

        <h2 className="text-2xl font-semibold mb-6 ">Shop on Hands&Craft</h2>
        <div className="grid grid-cols-4 gap-6 max-w-5xl mx-auto">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col items-start text-left ">
              <span className="text-4xl mb-3">{item.icon}</span>
              <h3 className="font-bold text-lg">{item.title}</h3>
              <ul className="mt-2 text-gray-600">
                {item.links.map((link, i) => (
                  <li key={i} className="text-sm mb-1">{link}</li>
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