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


function Decor() {
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

            <Rounded_2_with_heading products={products.filter(product => product.section === "DecorRounded1")} products2={products.filter(product => product.section === "DecorRounded2")} heading="Home Decor Items 🎀" heading2="Explore a wide range of handmade home decor items for your home from Hands & craft" />
            <Slide heading="Wall Decor" products={products.filter(product => product.section === "Wall_Decor1")} showHeading={true} />
            <Slide products={products.filter(product => product.section === "Wall_Decor2")} showHeading={false} />
            <SlideTitle heading="Decorative Vases" products={products.filter(product => product.section === "Vases1")}  />
            <SlideTitle products={products.filter(product => product.section === "Vases2")} showHeading={false} />
            <RoundedTitle heading="Office Desk Decor" products={products.filter(product => product.section === "OfficeDesk1")} />
            <RoundedTitle products={products.filter(product => product.section === "OfficeDesk2")} showHeading={false} />
            <SlideTitle heading="Bathroom Accessories" products={products.filter(product => product.section === "BathDecor1")} showHeading={true} />
            <SlideTitle products={products.filter(product => product.section === "BathDecor2")} showHeading={false} />
            <Button onClick={() => navigate("/showmore")} >Show More</Button>

        </main>
    )
}

export default Decor