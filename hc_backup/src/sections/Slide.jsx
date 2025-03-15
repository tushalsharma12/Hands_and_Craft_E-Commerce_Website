import "../assets/styles/style.css";
import PropTypes from "prop-types";
import CountdownTimer from "./CountdownTimer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { fadein } from "../variables/animation";
import { useNavigate } from "react-router-dom";

const Slide = ({ today_big_deals = [], heading, showHeading = true }) => {

    const navigate = useNavigate();

    return (
        <motion.section {...fadein} className="today's bg-gray-100 lg:pb-7 md:pb-5 pb-3 md:px-0 px-2 ">
            <div className="max-w-[1360px] mx-auto ">
                {showHeading && (
                    <div className="flex justify-between gap-1 lg:pt-7 md:pt-5 px-2 ">
                        <div className="flex items-center ">
                            <h2>{heading}</h2>
                            <CountdownTimer />
                        </div>
                    </div>
                )}

                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={0}
                    slidesPerView={7}
                    // navigation={{
                    //     nextEl: ".custom-next",
                    //     prevEl: ".custom-prev",
                    // }}
                    className="relative w-full "

                    breakpoints={{
                        320: { slidesPerView: 2 },
                        480: { slidesPerView: 3 },
                        668: { slidesPerView: 4 },
                        900: { slidesPerView: 5 },
                        1280: { slidesPerView: 6 },
                        1480: { slidesPerView: 7 },
                    }}
                >

                    {today_big_deals.map((product) => (
                        <SwiperSlide className="col-span-1 flex p-1 md:p-2 " key={product._id}>
                            <div className="border border-gray-300 rounded-xl hover:shadow-[0px_0px_8px_rgba(0,0,0,0.7)] transition-shadow ease-in-out duration-300 " onClick={() => navigate(`/products/${product._id}`)}>
                                <div className="">
                                    <img
                                        className="product rounded-t-xl border-b object-cover "
                                        src={product.img}
                                        alt="product"
                                    />
                                    <div className="content lg:p-3 p-2">
                                        <div className="flex justify-between items-center">
                                            <h6 className="font-semibold lg:text-sm text-xs line-clamp-1">{product.title}</h6>
                                        </div>
                                        <div className="md:flex items-center justify-between lg:mt-2 mt-1">
                                            <div className="flex items-center gap-2">
                                                <p className="price text-yellow-600 lg:text-sm text-xs font-medium">₹{product.price}</p>
                                            </div>
                                            <div className="flex gap-1 items-center">
                                                <p className="lg:text-sm text-xs font-semibold">{product.rating}</p>
                                                <i className="fa-solid fa-star lg:text-sm text-xs text-yellow-500"></i>
                                            </div>
                                        </div>
                                        <div className="flex  lg:gap-5 gap-2  items-center mt-1">
                                            <p className="prev_price line-through text-xs text-gray-400">₹{product.prev_price}</p>
                                            <p className="discount text-xs  bg-yellow-500 text-black font-semibold rounded-lg lg:px-2 px-1 lg:py-1 py-0.5">
                                                {product.discount}% off
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </motion.section>
    );
};

Slide.propTypes = {
    today_big_deals: PropTypes.array,
    heading: PropTypes.string,
    showHeading: PropTypes.bool
};

export default Slide;
