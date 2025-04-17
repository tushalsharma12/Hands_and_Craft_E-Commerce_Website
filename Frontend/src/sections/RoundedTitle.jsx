import "../assets/styles/style.css";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { motion_bottom_to_top } from "../variables/animation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination ,Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


const RoundedTitle = ({ heading, products = [], showHeading = true }) => {

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
        <div className="bg-gray-100 md:px-0 px-2 rounded-xl">
            <div className="max-w-[1360px] mx-auto ">
                <motion.section {...motion_bottom_to_top}
                    className="roundedhome lg:pb-8 md:pb-6 pb-4  pt-1 "
                >
                    <div className="">
                        {showHeading && (
                            <div className="flex justify-between gap-1 lg:mt-7 md:mt-5 mt-2  py-1 ">
                                
                                    <h2 className=" text-2xl font-semibold ">{heading}</h2>

                            </div>
                        )}

                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={0}
                            slidesPerView={7}
                            // navigation={{
                            //     nextEl: ".custom-next",
                            //     prevEl: ".custom-prev",
                            // }}
                            autoplay={isMobile ? false : { delay: 4000, disableOnInteraction: false }}

                            className="relative w-full"
                            breakpoints={{
                                320: { slidesPerView: 2 },
                                480: { slidesPerView: 3 },
                                668: { slidesPerView: 4 },
                                900: { slidesPerView: 5 },
                                1280: { slidesPerView: 6 },
                                1480: { slidesPerView: 7 },
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
                                    <motion.div
                                        {...motion_bottom_to_top} whileHover={{ y: -5 }}
                                        className="border border-transparent rounded-2xl hover:shadow-[0px_0px_10px_rgba(0,0,0,0.3)] transition-shadow ease-in-out duration-300"
                                        onClick={() => navigate(`/products/${product._id}`)}
                                    >
                                        <div className=" md:m-1 flex flex-col items-center justify-center ">
                                            <img
                                                className="gift rounded-full border-2 border-gray-200 object-cover "
                                                src={product.img}
                                                alt="gift"
                                            />
                                            <h6 className="font-semibold mt-2 mx-2  line-clamp-2 text-center text-xs">{product.title}</h6>
                                            <div className="md:flex items-center gap-2">
                                                <div className="flex items-center gap-1">
                                                    <p className="price text-yellow-600 text-xs">₹{product.price}</p>
                                                </div>

                                            </div>
                                        </div>
                                    </motion.div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </motion.section>
            </div>
        </div>
    );
};

RoundedTitle.propTypes = {
    heading: PropTypes.string.isRequired,
    products: PropTypes.array,
    showHeading: PropTypes.bool,

};


export default RoundedTitle 