
const Loader = () => {
    return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-yellow-500"></div>
            </div>
        
    );
};

export default Loader;


// const DotsWaveLoader = () => {
//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-md z-50">
//             <div className="flex space-x-2">
//                 <div className="w-4 h-4 bg-yellow-600 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
//                 <div className="w-4 h-4 bg-yellow-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
//                 <div className="w-4 h-4 bg-yellow-600 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
//             </div>
//         </div>
//     );
// };

// export default DotsWaveLoader;
