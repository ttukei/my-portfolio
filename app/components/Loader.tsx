'use client';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="relative w-32 h-32">
        <svg
          className="infinity-loader"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 50"
        >
          <path
            d="M 10,25 C 20,5 40,5 50,25 C 60,45 80,45 90,25 C 80,5 60,5 50,25 C 40,45 20,45 10,25 Z"
            fill="none"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
        <style jsx>{`
          .infinity-loader path {
            stroke-dasharray: 223;
            stroke-dashoffset: 0;
            animation: dash 2s linear infinite;
          }
          @keyframes dash {
            0% {
              stroke-dashoffset: 150;
            }
            100% {
              stroke-dashoffset: 0;
            }
          }
        `}</style>
      </div>

      {/* Loading Text */}
      <div className="absolute bottom-10 text-white text-xl animate-bounce">
        Loading...
      </div>
    </div>
  );
};

export default Loader;
