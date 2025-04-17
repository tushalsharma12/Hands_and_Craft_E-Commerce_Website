import "../assets/styles/style.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Slide from "../sections/Slide";
import Rounded_2_with_heading from "../sections/Rounded_2_with_heading";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import SlideTitle from "../sections/SlideTitle";
import RoundedTitle from "../sections/RoundedTitle";
import Button from "../sections/Button";
import Loader from "../components/utils/Loader";

function Lighting() {

    const navigate = useNavigate();
 
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

    if (loading) {
        return <Loader />;
    }

    return (
        <main className="md:px-0 px-2">

            <Rounded_2_with_heading products={products.filter(product => product.section === "GardenRounded1")} products2={products.filter(product => product.section === "GardenRounded2")}
                heading="Garden Decor Items 🏡"
                heading2="Enhance the beauty of the garden or balcony and magnificent with beautifully handcrafted pots, planters, garden items, and garden accessories."
            />
            <Slide products={products.filter(product => product.section === "Pots_Planters1")} heading="Pots & Planters" />
            <Slide products={products.filter(product => product.section === "Pots_Planters2")} showHeading={false} />

            <SlideTitle heading="Decorative Hangings" products={products.filter(product => product.section === "Decorative_Hangings1")} />
            <SlideTitle products={products.filter(product => product.section === "Decorative_Hangings2")} showHeading={false} />

            <RoundedTitle heading="Garden Decor Products" products={products.filter(product => product.section === "Garden_Decor_Product1")} />
            <RoundedTitle products={products.filter(product => product.section === "Garden_Decor_Product2")} showHeading={false} />

            <SlideTitle heading="More Garden Products" products={products.filter(product => product.section === "More_Garden_Product")} />

            <Button onClick={() => navigate("/showmore")} >Show More</Button>

        </main>
    )
}

export default Lighting