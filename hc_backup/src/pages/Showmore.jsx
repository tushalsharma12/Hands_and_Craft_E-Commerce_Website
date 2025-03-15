import "../assets/styles/style.css";
import Slide from "../sections/Slide";
import { useEffect,useState } from "react";
import axios from "axios";

function Showmore() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    { error && <p className="text-red-500 text-center">{error}</p> }
    { loading && <p className="text-center">Loading...</p> }

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
    const today_big_deals = getSectionProducts("today_big_deals");
    const DiningRounded1 = getSectionProducts("DiningRounded1");
    const DiningRounded2 = getSectionProducts("DiningRounded2");
    const LightingRounded1 = getSectionProducts("LightingRounded1");
    const LightingRounded2 = getSectionProducts("LightingRounded2");
    const DecorRounded1 = getSectionProducts("DecorRounded1");
    const DecorRounded2 = getSectionProducts("DecorRounded2");
    const GardenRounded1 = getSectionProducts("GardenRounded1");
    const GardenRounded2 = getSectionProducts("GardenRounded2");


    return (
        <div >
            <Slide heading="you may also like" today_big_deals={today_big_deals} />    
            <Slide today_big_deals={DiningRounded1} showHeading={false} />
            <Slide today_big_deals={DiningRounded2} showHeading={false} />
            <Slide today_big_deals={LightingRounded1} showHeading={false} />
            <Slide today_big_deals={LightingRounded2} showHeading={false} />
            <Slide today_big_deals={DecorRounded1} showHeading={false} />
            <Slide today_big_deals={DecorRounded2} showHeading={false} />
            <Slide today_big_deals={GardenRounded1} showHeading={false} />
            <Slide today_big_deals={GardenRounded2} showHeading={false} />
        </div>
    )
}

export default Showmore

