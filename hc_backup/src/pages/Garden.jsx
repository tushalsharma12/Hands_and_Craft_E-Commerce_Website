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

function Lighting() {

    const navigate = useNavigate();
    const showmore = () => {
        navigate("/showmore")
    }
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
    const GardenRounded1 = getSectionProducts("GardenRounded1");
    const GardenRounded2 = getSectionProducts("GardenRounded2");
    const Pots_Planters1 = getSectionProducts("Pots_Planters1");
    const Pots_Planters2 = getSectionProducts("Pots_Planters2");
    const Decorative_Hangings1 = getSectionProducts("Decorative_Hangings1");
    const Decorative_Hangings2 = getSectionProducts("Decorative_Hangings2");
    const Garden_Decor_Product1 = getSectionProducts("Garden_Decor_Product1");
    const Garden_Decor_Product2 = getSectionProducts("Garden_Decor_Product2");
    const More_Garden_Product = getSectionProducts("More_Garden_Product");

    return (
        <main className="md:px-0 px-2">

            {error && <p className="text-red-500 text-center">{error}</p>}
            {loading && <p className="text-center">Loading...</p>}

            <Rounded_2_with_heading gifts={GardenRounded1} gifts2={GardenRounded2}
                heading="Garden Decor Items 🏡"
                heading2="Enhance the beauty of the garden or balcony and magnificent with beautifully handcrafted pots, planters, garden items, and garden accessories."
            />

            <Slide today_big_deals={Pots_Planters1} heading="Pots & Planters" />
            <Slide today_big_deals={Pots_Planters2} showHeading={false} />

            <SlideTitle heading="Decorative Hangings" today_big_deals={Decorative_Hangings1} />
            <SlideTitle today_big_deals={Decorative_Hangings2} showHeading={false} />

            <RoundedTitle heading="Garden Decor Products" today_big_deals={Garden_Decor_Product1} />
            <RoundedTitle today_big_deals={Garden_Decor_Product2} showHeading={false} />

            <SlideTitle heading="More Garden Products" today_big_deals={More_Garden_Product} />

            <Button onClick={showmore} >Show More</Button>

        </main>
    )
}

export default Lighting