import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { motion_bottom_to_top } from "../variables/animation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";

const RoundedHome = ({ Gifts = [], heading }) => {

  const navigate = useNavigate();

  return (
    <motion.section {...motion_bottom_to_top}
      className="roundedhome lg:my-7 md:my-5 my-3"
    >
      <div className="max-w-screen-xl mx-auto text-center  lg:px-16 md:px-10 px-2 py-2">
        <h2 className="md:text-2xl text-lg  font-semibold lg:my-3">
          {heading}
        </h2>
        {/* Discover gifts for every occasion */}

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={7}
          // navigation={{
          //   nextEl: ".custom-next",
          //   prevEl: ".custom-prev",
          // }}
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

          {Gifts.map((product) => (
            <SwiperSlide
              className="col-span-1 flex  flex-nowrap p-1 py-2"
              key={product._id}
            >
              {/* <Rounded img={product.img} title={product.title} product_id={product._id} /> */}
              <motion.div
                {...motion_bottom_to_top}
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
  Gifts: PropTypes.array,
  heading: PropTypes.string.isRequired,
};

export default RoundedHome;
