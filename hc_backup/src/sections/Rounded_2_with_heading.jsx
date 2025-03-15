import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Rounded from "./Rounded";  // Import missing component
import "../assets/styles/style.css";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { containerVariants, itemVariants_bottom } from "../variables/animation";

const Rounded_2_with_heading = ({ gifts = [], gifts2 = [], heading, heading2 }) => {
    // Data split for two different Swipers
    return (
        // bg-gradient-to-b from-yellow-600 to-white 
        <section className="rounded_Dining ">

            <div className="bg-gray-100 py-12">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-800">{heading}</h2>
                    <p className="text-gray-600 mt-2">{heading2}</p>
                </div>
            </div>

            <motion.div
                variants={containerVariants} initial="hidden" animate="visible" className="max-w-screen-xl mx-auto text-center lg:px-16 lg:py-8 py-4 px-4">
                {/* First Swiper */}
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={0}
                    slidesPerView={7}
                    navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
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
                    {gifts.map((product) => (
                        <SwiperSlide className="col-span-1 flex flex-nowrap p-1 py-2" key={product._id}>
                            <motion.div variants={itemVariants_bottom} >
                                <Rounded img={product.img} title={product.title} product_id={product._id} />
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Second Swiper with different gifts */}
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={0}
                    slidesPerView={7}
                    navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
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
                    {gifts2.map((product) => (
                        <SwiperSlide className="col-span-1 flex flex-nowrap p-1 py-2" key={product._id}>
                            <motion.div variants={itemVariants_bottom} >
                                <Rounded img={product.img} title={product.title} product_id={product._id} />
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.div>
        </section>
    );
};

Rounded_2_with_heading.propTypes = {
    gifts: PropTypes.arrayOf(
        PropTypes.shape({
            img: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
            rating: PropTypes.number.isRequired,
            price: PropTypes.string.isRequired,
            prev_price: PropTypes.string.isRequired,
            discount: PropTypes.string.isRequired
        })
    ),
    gifts2: PropTypes.arrayOf(
        PropTypes.shape({
            img: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
            rating: PropTypes.number.isRequired,
            price: PropTypes.string.isRequired,
            prev_price: PropTypes.string.isRequired,
            discount: PropTypes.string.isRequired
        })
    ),
    heading: PropTypes.string.isRequired,
    heading2: PropTypes.string.isRequired
};

export default Rounded_2_with_heading;
