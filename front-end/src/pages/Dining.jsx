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

function Dining() {
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

            <Rounded_2_with_heading products={products.filter(product => product.section === "DiningRounded1")} products2={products.filter(product => product.section === "DiningRounded2")} heading={`All Kitchen & Dining🍴`} heading2={"Elevate your kitchen with hands&craft handcrafted wooden accessories and dining décor."} />
            <Slide heading="Drinkware" products={products.filter(product => product.section === "Drinkware1")} showHeading={true} />
            <Slide products={products.filter(product => product.section === "Drinkware2")} showHeading={false} />
            <SlideTitle heading="Tableware" products={products.filter(product => product.section === "Tableware1")} showHeading={true} />
            <SlideTitle products={products.filter(product => product.section === "Tableware2")} showHeading={false} />
            <RoundedTitle heading="Serveware" products={products.filter(product => product.section === "Serveware1")} showHeading={true} />
            <RoundedTitle products={products.filter(product => product.section === "Serveware2")} showHeading={false} />
            <SlideTitle heading="Cutlery" products={products.filter(product => product.section === "Cutlery")} showHeading={true} />
            <Button onClick={() => navigate("/showmore")}>Show More</Button>

        </main>
    )
}

export default Dining


