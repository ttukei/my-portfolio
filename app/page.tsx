'use client';
import { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Lenis from '@studio-freight/lenis';
import Welcome from './components/Welcome';

import About  from './components/AboutProjectsWork';
import React from 'react';

import StickyFooter from './components/StickyFooter';




gsap.registerPlugin(ScrollTrigger);


// Main component for the Home page
export default function Home() {

  const background = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const firstText = useRef<HTMLParagraphElement>(null);
  const secondText = useRef<HTMLParagraphElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  let xPercent = 0;
  let direction = -1;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });

  // Lenis smooth scrolling setup
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  // GSAP animation for the slider
  useEffect(() => {
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: (e) => {
          direction = e.direction * -1.5;
        },
      },
      x: "-500px",
    });
    requestAnimationFrame(animate);
  }, []);

  // Animation function for the text
  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    requestAnimationFrame(animate);
    xPercent += 0.1 * direction;
  };

  // Mouse move handler to update mouse position state
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = clientX / window.innerWidth;
    const y = clientY / window.innerHeight;
    setMousePosition({ x, y });
  };

  const setBackground = (isActive: boolean) => {
    if (background.current) {
      background.current.style.opacity = isActive ? '0.8' : '0';
    }
  }

  return (
    <main ref={container} className="relative h-[200vh] hover-container font-bespokeslab" onMouseMove={handleMouseMove}>

      <Welcome 
      scrollYProgress={scrollYProgress}
      slider={slider}
      firstText={firstText}
      secondText={secondText}
      />
      <About scrollYProgress={scrollYProgress} />
      <div className='w-full h-screen bg-red-500'></div>
      <StickyFooter />
    </main>
  );
}

