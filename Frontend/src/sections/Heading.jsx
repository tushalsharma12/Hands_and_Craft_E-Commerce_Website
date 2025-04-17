import React from "react";

const Heading = ({ heading, subheading }) => {
  return (
     <div className="bg-gray-100 py-8 sm:py-12">
     <div className="max-w-6xl mx-auto text-center px-4">
       <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">{heading}</h2>
       <p className="text-sm sm:text-base text-gray-600 mt-2">{subheading}</p>
     </div>
   </div>
  );
}

export default Heading;
