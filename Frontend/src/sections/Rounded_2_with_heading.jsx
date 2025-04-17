import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Rounded from "./Rounded";  // Import missing component
import "../assets/styles/style.css";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { containerVariants, itemVariants_bottom } from "../variables/animation";
import { useState, useEffect } from "react";
import Heading from "../sections/Heading"; 

const Rounded_2_with_heading = ({ products = [], products2 = [], heading, heading2 }) => {
    // Data split for two different Swipers
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Mobile width check
    
        useEffect(() => {
            const handleResize = () => {
                setIsMobile(window.innerWidth < 768);
            };
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);

    return (
        // bg-gradient-to-b from-yellow-600 to-white 
        <section className="rounded_Dining ">
            <Heading heading={heading} subheading={heading2} />

            <motion.div
                variants={containerVariants} initial="hidden" animate="visible" className="max-w-screen-xl mx-auto text-center lg:px-16 lg:py-8 py-4 px-4">
                {/* First Swiper */}
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    autoplay={isMobile ? false : { delay: 3000, disableOnInteraction: false }}

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
                    {products.map((product) => (
                        <SwiperSlide className="col-span-1 flex flex-nowrap p-1 py-2" key={product._id}>
                            <motion.div variants={itemVariants_bottom} >
                                <Rounded img={product.img} title={product.title} product_id={product._id} />
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Second Swiper with different gifts */}
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    autoplay={isMobile ? false : { delay: 4000, disableOnInteraction: false }}

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
                    {products2.map((product) => (
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
    products: PropTypes.arrayOf(
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
    products2: PropTypes.arrayOf(
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
