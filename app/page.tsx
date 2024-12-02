// app/page.tsx

'use client';
import { useState, useEffect } from 'react';
import ThreeScene from './components/models/ThreeScene';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import Loader from './components/Loader';
import 'tailwindcss/tailwind.css';
import '../styles/globals.css';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3880); // Adjust the loading time as needed

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="h-screen flex flex-col justify-between bg-black">
      <Parallax pages={4}>
        {/* First Parallax Layer (3D Scene) */}
        <ParallaxLayer offset={0} speed={0.5}>
          <ThreeScene />
          <h1>Projects</h1>
          <div className="absolute left-0 right-0 flex justify-between items-start z-10">
            <div
              className="text-white text-4xl tracking-widest flex flex-col items-start pl-10 relative"
              style={{
                top: '-790px',
              }}
            >
              {`The waves of innovation are infinite`.split(' ').map((word, idx) => (
                <span key={idx} className="block">{word}</span>
              ))}
            </div>
            <div
              className="text-white text-4xl tracking-widest flex flex-col items-end pr-10 relative"
              style={{
                top: '-300px',
              }}
            >
              {`carried by the winds of curiosity.`.split(' ').map((word, idx) => (
                <span key={idx} className="block">{word}</span>
              ))}
            </div>
          </div>
        </ParallaxLayer>

        {/* Text Layer Split between Left and Right */}
        <ParallaxLayer offset={0.9} speed={0.5} className="flex justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-300"></div>
              <div className="relative z-10 bg-white rounded-lg overflow-hidden shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                <img
                  src="https://via.placeholder.com/300" // Replace with your project image
                  alt="Project 1"
                  className="w-full h-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold">GitHub Project 1</h3>
                  <p className="text-gray-500">This is a description of the project.</p>
                  <a href="https://github.com/yourusername/project1" target="_blank" className="text-blue-500 mt-2 inline-block">View on GitHub</a>
                </div>
              </div>
            </div>
            {/* Repeat for other projects */}
            <div className="relative group">
              <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-300"></div>
              <div className="relative z-10 bg-white rounded-lg overflow-hidden shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                <img
                  src="https://via.placeholder.com/300" // Replace with your project image
                  alt="Project 2"
                  className="w-full h-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold">GitHub Project 2</h3>
                  <p className="text-gray-500">This is another project description.</p>
                  <a href="https://github.com/yourusername/project2" target="_blank" className="text-blue-500 mt-2 inline-block">View on GitHub</a>
                </div>
              </div>
            </div>
            {/* More projects can be added here */}
          </div>
        </ParallaxLayer>

        {/* Second Parallax Layer (GitHub Projects and Hover Cards) */}
        <ParallaxLayer offset={1} speed={0.5}>
          
        </ParallaxLayer>

        <ParallaxLayer offset={2} speed={0.5}>
          {/* Additional content */}
        </ParallaxLayer>

        <ParallaxLayer offset={3} speed={0.5}>
          {/* Additional content */}
        </ParallaxLayer>
      </Parallax>
    </main>
  );
}
