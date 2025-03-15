
import Img1 from "../assets/aboutimg/aboutimg1.webp"
import Img4 from "../assets/aboutimg/aboutimg4.webp"
import Img5 from "../assets/aboutimg/aboutimg5.png"
import Img6 from "../assets/aboutimg/aboutimg6.jpeg"
import Img7 from "../assets/aboutimg/aboutimg7.jpg"
import Img8 from "../assets/aboutimg/aboutimg8.jpg"
import Img9 from "../assets/aboutimg/aboutimg9.jpg"
import Img10 from "../assets/aboutimg/aboutimg10.jpg"
import Img11 from "../assets/aboutimg/aboutimg11.jpg"
import Img12 from "../assets/aboutimg/aboutimg12.png"
import { motion } from "framer-motion";
import { motion_bottom_to_top, banner, fadein, motion_left_to_right, motion_right_to_left } from "../variables/animation";

const img = [Img6, Img7, Img8, Img9, Img10, Img11];

const About = () => {
    // const [isOpen, setIsOpen] = useState(false);

    return (
        <>

            <section className="About max-w-screen-2xl lg:mb-32 md:mb-10 mb-5">

                <div className="bg-gray-100 py-12">
                    <div className="max-w-6xl mx-auto text-center">
                        <h2 className="text-4xl font-bold text-gray-800">About Us</h2>
                        <p className="text-gray-600 mt-2">Get to know our story and passion for handcrafted art!</p>
                    </div>
                </div>

                <div className="max-w-[1360px] mx-auto lg:my-12 md:my-5 my-3">
                    <div className="grid grid-cols-12 sm:gap-10">
                        <motion.div {...motion_left_to_right} className="lg:col-span-6 md:col-span-5 col-span-12"><img src={Img1} alt="" className="w-full h-auto object-cover" /></motion.div>

                        <motion.div {...motion_right_to_left} className="flex items-center lg:col-span-6 md:col-span-7 col-span-12 lg:p-0 p-4">
                            <div className="flex flex-col">
                                {/* <img src={Img2} alt="" className="lg:size-20 size-10" /> */}
                                <div className="lg:text-5xl sm:text-xl text-sm ">
                                    Experience the Transformative Power of Art at ArtEssence
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-10">
                                    <path d="M0 16.5 L3000 16.5" fill="none" stroke="#8d8032" strokeWidth="3px" ></path>
                                </svg>
                                <div className="space-y-3">
                                    <h2 className=" lg:text-lg sm:text-base text-sm ">Let your creativity soar and become a part of our vibrant community.</h2>
                                    <p className=" lg:text-base sm:text-sm text-xs text-justify">Our mission is to inspire and empower individuals of all ages and skill levels to explore their creative potential. Through our diverse range of workshops and courses, we provide a platform for artistic growth and self-discovery.</p>
                                    <p className=" lg:text-base sm:text-sm text-xs text-justify">With a team of experienced artists and instructors, we offer a supportive and encouraging environment where creativity flourishes. Whether you are a beginner taking your first steps in the art world or an experienced artist seeking further inspiration, our programs are designed to cater to your needs and aspirations.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <motion.section {...motion_bottom_to_top} className="vision lg:my-32 md:my-10 my-5">
                <div className="max-w-[1360px] mx-auto ">

                    <div className="grid grid-cols-12 lg:gap-12 sm:gap-4 gap-0 p-4 lg:p-0  lg:my-24  md:my-5 my-3">
                        <div className="md:col-span-4 col-span-12 sspace-y-5">
                            {/* <img src={Img3} alt="" className="lg:size-15 size-10" /> */}
                            <div className="lg:text-4xl sm:text-xl text-base  ">Learn About Our Mission and Vision</div>
                            <div className="lg:text-lg sm:text-sm text-xs  text-justify">We create our workshops with love for hand work and collaboration.</div>
                        </div>
                        <div className="md:col-span-4 col-span-12 space-y-5">
                            <div className="lg:text-xl sm:text-base text-sm  font-semibold">Our Mission</div>
                            <p className=" lg:text-base sm:text-sm text-xs text-justify">Our mission at ArtEssence is to ignite creativity, inspire artistic exploration, and nurture a deep appreciation for the arts.</p>
                            <p className=" lg:text-base sm:text-sm text-xs text-justify">We strive to provide a welcoming and inclusive space where individuals of all backgrounds can unleash their creativity, develop their artistic skills, and express themselves authentically.</p>
                        </div>
                        <div className="md:col-span-4 col-span-12 space-y-5">
                            <div className="lg:text-xl text-base  font-semibold">Our Vision</div>
                            <p className=" lg:text-base sm:text-sm text-xs text-justify">We believe that pottery should be accessible to all. We strive to make it easy to come together and create unique pieces of art.</p>
                            <p className=" lg:text-base sm:text-sm text-xs text-justify">We’re committed to fostering a love of pottery in all forms by providing a place where everyone can come to learn, discover, practice and create items that brings them joy and pride.

                            </p>
                        </div>

                    </div>
                    <img src={Img4} alt="" className="sm:pt-10 pt-5 w-full object-cover lg:max-h-[450px] max-h-[300px] lg:p-0 p-4" />
                </div>

            </motion.section>

            <motion.section {...banner} className="gift lg:my-32 md:my-10 my-5">
                <div className="max-w-[1360px] mx-auto ">
                    <div className="grid md:grid-cols-2 grid-cols-1 lg:gap-20 sm:gap-10 gap-5 p-4 lg:p-0">
                        <div className=" flex items-center">
                            <h2 className="lg:text-5xl sm:text-2xl text-sm ">Place your first order and get 50% off on any product!</h2>
                        </div>
                        <div className="">
                            <img src={Img12} alt="" className="w-full max-h-[350px] object-cover" />
                        </div>
                    </div>
                </div>
            </motion.section>

            <motion.section {...fadein} className="meetOurSeller lg:my-32 md:my-10 my-5">
                <div className="max-w-6xl mx-auto ">
                    <div className="lg:text-3xl sm:text-xl text-sm font-semibold  text-center">
                        Meet Our Seller
                    </div>
                    <div className="lg:text-xl sm:text-sm text-xs text-center sm:py-5 py-2">These artisans carefully design and create handmade products with excellent quality.</div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:space-y-10 md:gap-0 gap-5 sm:space-y-5 space-y-2 place-items-center">
                        {img.map((item, index) => (
                            <div className=" col-span-1 " key={index}>
                                <div> <img src={item} alt="" className="rounded-full   transition-transform duration-300 ease-in-out hover:scale-105  object-cover" />
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </motion.section>

            <motion.section {...motion_bottom_to_top} className="Questions lg:my-32 md:my-10 my-5 ">
                <div className="max-w-[1360px] mx-auto ">
                    <div className="grid grid-cols-12 md:gap-10 p-4 lg:p-0">
                        <div className="lg:col-span-7 col-span-12 flex flex-col justify-center ">
                            <h2 className="lg:text-5xl sm:text-2xl text-sm  font-semibold">Have Questions? Read Our Frequently Asked Questions</h2>
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-10">
                                <path d="M0 16.5 L3000 16.5" fill="none" stroke="#8d8032" strokeWidth="3px" ></path>
                            </svg>
                            <div className="space-y-5 ">

                                <div className="lg:text-xl sm:text-base text-sm text-justify text-amber-700">If you have any further questions or need more information, please dont hesitate to contact our friendly team.</div>
                                <div className="space-y-4">
                                    <div className="group">

                                        <div className="flex justify-between items-center cursor-pointer">
                                            <div className="lg:text-lg sm:text-sm text-xs   font-semibold">
                                                How can I contact customer support if I have an issue?
                                            </div>
                                            <div className="lg:text-4xl sm:text-2xl text-lg font-semibold duration-700  group-hover:rotate-45 transition-transform ">+</div>
                                        </div>
                                        <hr className="w-full" />
                                        <p className="opacity-0 max-h-0 transition-all duration-700 ease-in-out group-hover:max-h-2 group-hover:block text-gray-600 group-hover:opacity-100 ">
                                            You can reach our customer support via email, phone, or live chat available on our website.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4 ">
                                    <div className="group">

                                        <div className="flex justify-between items-center cursor-pointer">
                                            <div className="lg:text-lg sm:text-sm text-xs  font-semibold">
                                                Do I need to create an account to shop?
                                            </div>
                                            <div className="lg:text-4xl sm:text-2xl text-lg font-semibold  group-hover:rotate-45 transition-transform duration-700">+</div>
                                        </div>
                                        <hr className="w-full" />

                                        <p className="opacity-0 max-h-0 transition-all duration-700 ease-in-out group-hover:max-h-2 group-hover:block text-gray-600 group-hover:opacity-100 ">
                                            Yes, you need to create an account to place an order and track your purchases.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4 ">
                                    <div className="group">

                                        <div className="flex justify-between items-center cursor-pointer">
                                            <div className="lg:text-lg sm:text-sm text-xs  font-semibold">
                                                Are the handicrafts handmade and authentic?
                                            </div>
                                            <div className="lg:text-4xl sm:text-2xl text-lg font-semibold  group-hover:rotate-45 transition-transform duration-700">+</div>
                                        </div>
                                        <hr className="w-full" />

                                        <p className="opacity-0 max-h-0 transition-all duration-700 ease-in-out group-hover:max-h-2 group-hover:block text-gray-600 group-hover:opacity-100 ">
                                            Yes, all our products are 100% handmade by skilled artisans using high-quality materials.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4 ">
                                    <div className="group">

                                        <div className="flex justify-between items-center cursor-pointer">
                                            <div className="lg:text-lg sm:text-sm text-xs  font-semibold">
                                                How can I track my order status?      </div>
                                            <div className="lg:text-4xl sm:text-2xl text-lg font-semibold  group-hover:rotate-45 transition-transform duration-700">+</div>
                                        </div>
                                        <hr className="w-full" />

                                        <p className="opacity-0 max-h-0 transition-all duration-700 ease-in-out group-hover:max-h-2 group-hover:block text-gray-600 group-hover:opacity-100 ">
                                            Once your order is shipped, you will receive a tracking link via email or SMS.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4 ">
                                    <div className="group">

                                        <div className="flex justify-between items-center cursor-pointer">
                                            <div className="lg:text-lg sm:text-sm text-xs  font-semibold">
                                                Can I return a product if I don’t like it?   </div>
                                            <div className="lg:text-4xl sm:text-2xl text-lg font-semibold  group-hover:rotate-45 transition-transform duration-700">+</div>
                                        </div>
                                        <hr className="w-full" />

                                        <p className="opacity-0 max-h-0 transition-all duration-700 ease-in-out group-hover:max-h-2 group-hover:block text-gray-600 group-hover:opacity-100 ">
                                            Yes, we offer easy returns within a specified period. Please check our return policy for details
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4 ">
                                    <div className="group">

                                        <div className="flex justify-between items-center cursor-pointer">
                                            <div className="lg:text-lg sm:text-sm text-xs  font-semibold">
                                                Can I cancel my order after placing it?  </div>
                                            <div className="lg:text-4xl sm:text-2xl text-lg font-semibold  group-hover:rotate-45 transition-transform duration-700">+</div>
                                        </div>
                                        <hr className="w-full" />

                                        <p className="opacity-0 max-h-0 transition-all duration-700 ease-in-out group-hover:max-h-2 group-hover:block text-gray-600 group-hover:opacity-100 ">
                                            Yes, you can cancel your order within a limited time before it is shipped.</p>
                                    </div>
                                </div>

                                <div className="space-y-4 ">
                                    <div className="group">

                                        <div className="flex justify-between items-center cursor-pointer">
                                            <div className="lg:text-lg sm:text-sm text-xs  font-semibold">
                                                How long does delivery take?  </div>
                                            <div className="lg:text-4xl sm:text-2xl text-lg font-semibold  group-hover:rotate-45 transition-transform duration-700">+</div>
                                        </div>
                                        <hr className="w-full" />

                                        <p className="opacity-0 max-h-0 transition-all duration-700 ease-in-out group-hover:max-h-2 group-hover:block text-gray-600 group-hover:opacity-100 ">
                                            Delivery time varies by location, but it usually takes 3-7 business days.
                                        </p>
                                    </div>
                                </div>                    </div></div>
                        <div className="md:col-span-5 col-span-12   max-h-[500px] justify-center flex items-center hidden lg:flex "><img src={Img5} alt="" className="object-cover object-center transition-all duration-500 ease-in-out" /></div>
                    </div>
                </div>
            </motion.section>



        </>
    );
};

export default About;
