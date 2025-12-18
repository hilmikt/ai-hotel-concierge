import React from 'react';
import bgImage from '../assets/bg.png';

const LandingScreen = ({ onEnter }) => {
    return (
        <div className="relative h-screen w-full overflow-hidden text-hotel-text">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                <img
                    src={bgImage}
                    alt="Lumiere Lobby"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex h-full flex-col justify-end pb-12 px-6 fade-in">

                {/* Welcome Text */}
                <div className="mb-12">
                    <p className="text-hotel-gold text-xs uppercase tracking-widest mb-4 font-sans font-medium">San Francisco</p>
                    <h1 className="text-5xl font-serif text-hotel-text tracking-wide leading-tight mb-2">
                        Welcome to <br />
                        <span className="italic">The Lumiere</span>
                    </h1>
                </div>

                {/* Guest Info Card */}
                <div className="w-full max-w-md mx-auto glass-panel p-6 rounded-sm mb-8 animate-slide-up transform transition-all duration-700 delay-100">
                    <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4">
                        <div>
                            <p className="text-hotel-muted text-xs uppercase tracking-wider mb-1">Guest</p>
                            <p className="text-lg font-serif">Alexander Mercer</p>
                        </div>
                        <div className="text-right">
                            <p className="text-hotel-muted text-xs uppercase tracking-wider mb-1">Room</p>
                            <p className="text-lg font-serif text-hotel-gold">402</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 text-xs text-hotel-muted">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span>Connection Secure</span>
                    </div>
                </div>

                {/* Access Button */}
                <button
                    onClick={onEnter}
                    className="group w-full max-w-md mx-auto bg-hotel-gold text-black font-medium py-4 px-6 rounded-[2px] 
                     hover:bg-[#d6b066] transition-all duration-300 transform active:scale-[0.99]
                     flex items-center justify-center space-x-2 animate-slide-up animation-delay-300"
                >
                    <span className="tracking-widest uppercase text-sm">Access Concierge</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default LandingScreen;
