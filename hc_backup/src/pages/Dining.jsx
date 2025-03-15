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

function Dining() {
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
    const DiningRounded1 = getSectionProducts("DiningRounded1");
    const DiningRounded2 = getSectionProducts("DiningRounded2");
    const Drinkware1 = getSectionProducts("Drinkware1");
    const Drinkware2 = getSectionProducts("Drinkware2");
    const Tableware1 = getSectionProducts("Tableware1");
    const Tableware2 = getSectionProducts("Tableware2");
    const Serveware1 = getSectionProducts("Serveware1");
    const Serveware2 = getSectionProducts("Serveware2");
    const Cutlery = getSectionProducts("Cutlery");

    return (
        <main className="">

            {error && <p className="text-red-500 text-center">{error}</p>}
            {loading && <p className="text-center">Loading...</p>}
            <Rounded_2_with_heading gifts={DiningRounded1} gifts2={DiningRounded2} heading={`All Kitchen & Dining🍴`} heading2={"Elevate your kitchen with hands&craft handcrafted wooden accessories and dining décor."} />
            <Slide heading="Drinkware" today_big_deals={Drinkware1} showHeading={true} />
            <Slide today_big_deals={Drinkware2} showHeading={false} />
            <SlideTitle heading="Tableware" today_big_deals={Tableware1} />
            <SlideTitle today_big_deals={Tableware2} showHeading={false} />
            <RoundedTitle heading="Serveware" today_big_deals={Serveware1} />
            <RoundedTitle today_big_deals={Serveware2} showHeading={false} />
            <SlideTitle heading="Cutlery" today_big_deals={Cutlery} />
            <Button onClick={showmore}>Show More</Button>

        </main>
    )
}

export default Dining


