import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { useState, useEffect } from "react";
import axios from "axios";

const TestimonialSlider = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products`)
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




  return (

    <div className="max-w-2xl mx-auto p-4 lg:my-14 md:my-10 my-5 ">

      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading && <p className="text-center">Loading...</p>}

      <h1 className="text-2xl font-semibold mb-1 text-center">Reviews that speak volumes.</h1>
      <h5 className="text-sm text-gray-500 text-center mb-7">Don&apos;t just take our word for it, hear what our customers have to say about us</h5>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation={true}
        autoplay={{ delay: 3000 }}
        modules={[Pagination, Navigation, Autoplay]}
        className="rounded-lg shadow-[0px_0px_15px_rgba(0,0,0,0.3)] overflow-hidden "
      >
        {products.filter((product) => product.section === "testimonials").map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <div className="bg-white p-8 rounded-lg text-center ">
              <img
                src={testimonial.img}
                alt={testimonial.title}
                className="w-16 h-16 mx-auto rounded-full object-cover "
              />
              <h3 className="text-lg font-semibold mt-2">{testimonial.title}</h3>
              <p className="text-sm text-gray-500">{testimonial.price}</p>
              <p className="mt-2 text-gray-700">{testimonial.prev_price}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialSlider;
