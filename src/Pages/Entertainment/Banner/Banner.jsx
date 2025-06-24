import React from 'react';

const Banner = () => {
    return (
        <div className="relative w-full h-screen">
            {/* Background overlay with low opacity */}
            <div 
                className="absolute inset-0 bg-cover bg-center opacity-30" 
                style={{ backgroundImage: `url('/banner2.jpg')` }} 
            ></div>

            {/* Content */}
            <div className="absolute inset-0 flex justify-center items-center z-10">
                <div className="text-center text-white px-6 py-8">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">Featured Entertainment</h1>
                    <p className="text-lg mb-6">We are glad to have you here. Explore our services and find what best fits your needs.</p>
                    <div className="flex justify-center gap-4">
                        <button className="px-6 py-3 border-2 border-white text-white text-lg font-semibold rounded-md hover:scale-110 hover:text-white transition">
                            Learn More
                        </button>
                        <button className="px-6 py-3 border-2 border-white text-white text-lg font-semibold rounded-md hover:scale-110 hover:text-white transition">
                            Contact Us
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
