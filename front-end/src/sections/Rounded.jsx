import "../assets/styles/style.css";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { motion_bottom_to_top ,fadein} from "../variables/animation";
import { useNavigate } from "react-router-dom";

const Rounded = ({ img, title = "title title", product_id }) => {
  const navigate = useNavigate();
  return (

    <motion.div whileHover={{ y: -5 }}
      {...fadein} 
      className="border border-transparent rounded-2xl hover:shadow-[0px_0px_10px_rgba(0,0,0,0.3)] transition-shadow ease-in-out duration-300 "
      onClick={() => navigate(`/products/${product_id}`)}
    >
      <div  className="sm:my-3 md:m-1 flex flex-col items-center justify-center">
        <img
          className="gift rounded-full  border-2 border-gray-200 object-cover "
          src={img}
          alt="gift"
        />
        <h6 className="font-semibold mt-4 line-clamp-2 text-xs">{title}</h6>
      </div>
    </motion.div>
  );
}

Rounded.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  product_id: PropTypes.string.isRequired
};

export default Rounded;

