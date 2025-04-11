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
import Loader from "../components/utils/Loader";
import useGetProducts from "../sections/useGetProducts";

function Lighting() {
    const navigate = useNavigate();
    const { products, loading } = useGetProducts(`${import.meta.env.VITE_API_BASE_URL}/api/products`, {type: "lighting"});

    // const [products, setProducts] = useState([]);
    // const [loading, setLoading] = useState(true);


    // useEffect(() => {
    //     axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products`)
    //         .then((res) => {
    //             setProducts(res.data);
    //             setLoading(false);
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         });
    // }, []);

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

    if (loading) {
        return <Loader />;
    }

    return (
        <main className="md:px-0 px-2">



            <Rounded_2_with_heading products={products.filter(product => product.section === "LightingRounded1")} products2={products.filter(product => product.section === "LightingRounded2")} heading="All Lighting💡" heading2="Illuminate your home with handcrafted lights from ExclusiveLane, from table lamps to chandeliers." />

            <Slide heading="Festival Lights" products={products.filter(product => product.section === "Festivallight1")} showHeading={true} />
            <Slide products={products.filter(product => product.section === "Festivallight2")} showHeading={false} />

            <SlideTitle heading="Lamps" products={products.filter(product => product.section === "Lamps1")} />
            <SlideTitle products={products.filter(product => product.section === "Lamps2")} showHeading={false} />

            <RoundedTitle heading="Diys Sets" products={products.filter(product => product.section === "DiyaSet1")} />
            <RoundedTitle products={products.filter(product => product.section === "DiyaSet2")} showHeading={false} />

            <SlideTitle heading="Candles" products={products.filter(product => product.section === "Candles1")} />

            <SlideTitle products={products.filter(product => product.section === "Candles2")} showHeading={false} />

            <Button onClick={() => navigate("/showmore")}>Show More</Button>
            

        </main>
    )
}


export default Lighting;