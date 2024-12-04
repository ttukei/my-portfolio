'use client';
import { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination } from "swiper/modules";
import { ServiceData } from "./constants";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const firstText = useRef<HTMLParagraphElement>(null);
  const secondText = useRef<HTMLParagraphElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  let xPercent = 0;
  let direction = -1;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: (e) => {
          direction = e.direction * -1;
        },
      },
      x: "-500px",
    });
    requestAnimationFrame(animate);
  }, []);

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

  // Mouse movement handler
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = clientX / window.innerWidth;
    const y = clientY / window.innerHeight;
    setMousePosition({ x, y });
  };

  return (
    <main ref={container} className="relative h-[200vh] hover-container font-dotgothic" onMouseMove={handleMouseMove}>
      <LandingPage scrollYProgress={scrollYProgress} />
      <Section2
        scrollYProgress={scrollYProgress}
        slider={slider}
        firstText={firstText}
        secondText={secondText}
      />
    </main>
  );
}

const LandingPage = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const scale = useTransform(scrollYProgress, [0.1, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0.1, 1], [0, -10]);
  const [mousePosition, setMousePosition] = useState({ x: -1, y: -1 });

  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: -1, y: -1 });
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
  style={{ scale, rotate }}
  className="sticky top-0 h-screen text-[2vw] text-white pb-[10vh] noisy-background"
>
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      background:
        mousePosition.x === -1 && mousePosition.y === -1
          ? "none"
          : `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.08), rgba(17, 17, 17, 0) 50%)`,
    }}
  />
  <div className="absolute top-0 left-0 right-0 flex items-center justify-center h-full z-20 text-gray-300">
    {/* Name in the center */}
    <div className="absolute top-[1.5%] font-dotgothic text-center">
      Timon Tukei
    </div>

    {/* Vertical "Developer" on the left, centered */}
    <div className="absolute top-[50%] left-[1.5%]  -translate-y-1/2 -rotate-90 origin-left justify-center">
      Developer
    </div>

    {/* Location on the right */}
    <div className="absolute top-[60%] right-[1.5%] -translate-y-1/2 -rotate-90 -rotate-90 rotate-90 origin-right">
      Seattle, Washington
    </div>
  </div>
</motion.div>
  );
  
};

const Section2 = ({
  scrollYProgress,
  slider,
  firstText,
  secondText,
}: {
  scrollYProgress: any;
  slider: any;
  firstText: any;
  secondText: any;
}) => {
  const [mousePosition, setMousePosition] = useState({ x: -1, y: -1 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: -1, y: -1 });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative flex flex-col h-screen mb-[100vh] overflow-hidden noisy-background">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: mousePosition.x === -1 && mousePosition.y === -1
            ? 'none'
            : `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0) 50%)`,
        }}
      />
      <div className="mt-[-150px]"> {/* Adjust this margin to move the slider up */}
        <ActiveSlider />
      </div>
      <div className="absolute top-[calc(100vh-350px)]">
        <div ref={slider} className="relative whitespace-nowrap">
          <p ref={firstText} className="font-dotgothic relative m-0 text-black text-[230px] font-medium pr-[50px]">Featured Projects -</p>
          <p ref={secondText} className="absolute left-full top-0 m-0 text-black text-[230px] font-medium pr-[50px]">Featured Projects -</p>
        </div>
      </div>
    </div>
  );
};

const ActiveSlider = () => {
  return (
    <div className="flex items-center justify-center flex-col h-[900px] bg-[#F5F5F5]">
      <Swiper
        breakpoints={{
          340: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          700: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
        }}
        freeMode={true}
        modules={[FreeMode]}
        className="max-w-[90%] lg:max-w-[80%]"
      >
        {ServiceData.map((item) => (
          <SwiperSlide key={item.title}>
            <div className="flex flex-col gap-6 mb-20 group relative shadow-lg text-black rounded-xl px-6 py-8 h-[250px] w-[215px] lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                style={{ backgroundImage: `url(${item.backgroundImage})` }}
              />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold">{item.title}</h3>
                <p>{item.content}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
