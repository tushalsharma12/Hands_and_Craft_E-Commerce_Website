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

function Decor() {
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
    const DecorRounded1 = getSectionProducts("DecorRounded1");
    const DecorRounded2 = getSectionProducts("DecorRounded2");
    const Wall_Decor1 = getSectionProducts("Wall_Decor1");
    const Wall_Decor2 = getSectionProducts("Wall_Decor2");
    const Vases1 = getSectionProducts("Vases1");
    const Vases2 = getSectionProducts("Vases2");
    const OfficeDesk1 = getSectionProducts("OfficeDesk1");
    const OfficeDesk2 = getSectionProducts("OfficeDesk2");
    const BathDecor1 = getSectionProducts("BathDecor1");
    const BathDecor2 = getSectionProducts("BathDecor2");

    return (
        <main className="md:px-0 px-2">

            {error && <p className="text-red-500 text-center">{error}</p>}
            {loading && <p className="text-center">Loading...</p>}

            <Rounded_2_with_heading gifts={DecorRounded1} gifts2={DecorRounded2} heading="Home Decor Items 🎀" heading2="Explore a wide range of handmade home decor items for your home from Hands & craft" />
            <Slide heading="Wall Decor" today_big_deals={Wall_Decor1} showHeading={true} />
            <Slide today_big_deals={Wall_Decor2} showHeading={false} />
            <SlideTitle heading="Decorative Vases" today_big_deals={Vases1} />
            <SlideTitle today_big_deals={Vases2} showHeading={false} />
            <RoundedTitle heading="Office Desk Decor" today_big_deals={OfficeDesk1} />
            <RoundedTitle today_big_deals={OfficeDesk2} showHeading={false} />
            <SlideTitle heading="Bathroom Accessories" today_big_deals={BathDecor1} />
            <SlideTitle today_big_deals={BathDecor2} showHeading={false} />
            <Button onClick={showmore} >Show More</Button>

        </main>
    )
}

export default Decor