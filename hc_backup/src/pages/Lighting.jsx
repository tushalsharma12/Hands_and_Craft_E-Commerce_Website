import { useState, useEffect } from "react"
import "../assets/styles/style.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Rounded_2_with_heading from "../sections/Rounded_2_with_heading";
import Slide from "../sections/Slide";
import { useNavigate } from 'react-router-dom';
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
    const LightingRounded1 = getSectionProducts("LightingRounded1");
    const LightingRounded2 = getSectionProducts("LightingRounded2");
    const Festivallight1 = getSectionProducts("Festivallight1");
    const Festivallight2 = getSectionProducts("Festivallight2");
    const Lamps1 = getSectionProducts("Lamps1");
    const Lamps2 = getSectionProducts("Lamps2");
    const DiyaSet1 = getSectionProducts("DiyaSet1");
    const DiyaSet2 = getSectionProducts("DiyaSet2");
    const Candles1 = getSectionProducts("Candles1");
    const Candles2 = getSectionProducts("Candles2");

    return (
        <main className="md:px-0 px-2">

            {error && <p className="text-red-500 text-center">{error}</p>}
            {loading && <p className="text-center">Loading...</p>}

            <Rounded_2_with_heading gifts={LightingRounded1} gifts2={LightingRounded2} heading="All Lighting💡" heading2="Illuminate your home with handcrafted lights from ExclusiveLane, from table lamps to chandeliers." />

            <Slide heading="Festival Lights" today_big_deals={Festivallight1} showHeading={true} />
            <Slide today_big_deals={Festivallight2} showHeading={false} />

            <SlideTitle heading="Lamps" today_big_deals={Lamps1} />
            <SlideTitle today_big_deals={Lamps2} showHeading={false} />

            <RoundedTitle heading="Diys Sets" today_big_deals={DiyaSet1} />
            <RoundedTitle today_big_deals={DiyaSet2} showHeading={false} />

            <SlideTitle heading="Candles" today_big_deals={Candles1} />

            <SlideTitle today_big_deals={Candles2} showHeading={false} />

            <Button onClick={showmore} text="Show More" />

        </main>
    )
}


export default Lighting