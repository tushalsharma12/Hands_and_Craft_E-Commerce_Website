import PropTypes from 'prop-types';

const Button = ({ children, onClick, ...props }) => {
    return (
        <div className="text-center max-w-[1360px] mx-auto my-10">
            <button
                className="px-5 py-2 text-sm font-semibold rounded-full hover:shadow-[0px_0px_10px_rgba(0,0,0,0.4)] shadow-[0px_0px_5px_rgba(0,0,0,0.4)] shadow-md transition-all duration-300 ease-in-out transform hover:bg-gray-200  border"
                onClick={onClick} {...props}
            >
                {children}
            </button>
        </div>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
};

export default Button;
