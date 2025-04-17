import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { motion_bottom_to_top, fadein } from "../variables/animation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination , Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


const RoundedHome = ({ products = [], heading }) => {

  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Mobile width check
      
          useEffect(() => {
              const handleResize = () => {
                  setIsMobile(window.innerWidth < 768);
              };
              window.addEventListener("resize", handleResize);
              return () => window.removeEventListener("resize", handleResize);
          }, []);
  

  return (
    <motion.section {...motion_bottom_to_top}
      className="roundedhome lg:my-7 md:my-5 my-3"
    >
      <div className="max-w-screen-xl mx-auto text-center  lg:px-16 md:px-10 px-2 py-2">
        <h2 className="text-2xl  font-semibold lg:my-3 mb-2">
          {heading}
        </h2>
        {/* Discover products for every occasion */}

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={7}
          // navigation={{
          //   nextEl: ".custom-next",
          //   prevEl: ".custom-prev",
          // }}
          autoplay={isMobile ? false : { delay: 3000, disableOnInteraction: false }}

          className="relative w-full"
          breakpoints={{
            320: { slidesPerView: 2 },
            480: { slidesPerView: 3 },
            668: { slidesPerView: 4 },
            900: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
            1480: { slidesPerView: 6 },

          }}
        >
          {/* <div className="justify-end gap-1 hidden lg:flex">
              <button
                className="custom-prev absolute top-5  left-0 transform -translate-y-1/2 z-10 text-black  cursor-pointer flex items-center"
              >
                <i className="fa-solid fa-arrow-left bg-yellow-500   hover:bg-yellow-600 shadow-[0px_0px_4px_rgba(0,0,0,0.2)] text-white rounded-full hover:shadow-[0px_0px_5px_rgba(0,0,0,0.4)] transition-shadow ease-in-out duration-300 p-2"></i>
              </button>
              <button
                className="custom-next absolute top-5  right-0 transform -translate-y-1/2 z-10 text-black  cursor-pointer flex items-center "
              >
                <i className="fa-solid fa-arrow-right bg-yellow-500 px-2 hover:bg-yellow-600 shadow-[0px_0px_4px_rgba(0,0,0,0.2)] text-white rounded-full hover:shadow-[0px_0px_5px_rgba(0,0,0,0.4)] transition-shadow ease-in-out duration-300 p-2"></i>
              </button>
            </div> */}

          {products.map((product) => (
            <SwiperSlide
              className="col-span-1 flex  flex-nowrap p-1 py-2"
              key={product._id}
            >
              {/* <Rounded img={product.img} title={product.title} product_id={product._id} /> */}
              <motion.div
                {...motion_bottom_to_top} whileHover={{ y: 5 }}
                className="border border-transparent rounded-2xl hover:shadow-[0px_0px_10px_rgba(0,0,0,0.3)] transition-shadow ease-in-out duration-300"
                onClick={() => navigate(`/products/${product._id}`)}
              >
                <div className="sm:my-3 md:m-1 flex flex-col items-center justify-center">
                  <img
                    className="gift rounded-full aspect-[4/3]  size-40 border-2 border-gray-200 object-cover "
                    src={product.img}
                    alt="gift"
                  />
                  <h6 className="font-semibold mt-4 line-clamp-2 text-xs">{product.title}</h6>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.section>
  );
};

// ✅ Props Validation
RoundedHome.propTypes = {
  products: PropTypes.array,
  heading: PropTypes.string.isRequired,
};

export default RoundedHome;
