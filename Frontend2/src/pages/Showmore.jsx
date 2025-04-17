import "../assets/styles/style.css";
import Slide from "../sections/Slide";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/utils/Loader";

function Showmore() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    { error && <p className="text-center text-red-500">{error}</p> }
    { loading && <p className="text-center">Loading...</p> }

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

    if (loading) return <Loader />

    return (
        <div className="px-2 md:px-0">
            <Slide heading="you may also like" products={products.filter(product => product.section === "today_big_deals")} showHeading={true} />
            <Slide products={products.filter(product => product.section === "DiningRounded1")} showHeading={false} />
            <Slide products={products.filter(product => product.section === "DiningRounded2")} showHeading={false} />
            <Slide products={products.filter(product => product.section === "Drinkware1")} showHeading={false} />
            <Slide products={products.filter(product => product.section === "LightingRounded2")} showHeading={false} />
            <Slide products={products.filter(product => product.section === "DecorRounded1")} showHeading={false} />
            <Slide products={products.filter(product => product.section === "DecorRounded2")} showHeading={false} />
            <Slide products={products.filter(product => product.section === "GardenRounded1")} showHeading={false} />
            <Slide products={products.filter(product => product.section === "GardenRounded2")} showHeading={false} />
        </div>
    )
}

export default Showmore

