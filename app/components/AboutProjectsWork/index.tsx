import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useTransform, motion } from "framer-motion";
import Character from "../Character";
import Projects from "../FeaturedProjects";


function About (
  {
    scrollYProgress,
  }: {
    scrollYProgress: any;
  }
) {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      {
        translateX: 0,
      },
      {
        translateX: "-300vw",
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "2000 top",
          scrub: 0.6,
          pin: true,
        },
      }
    );
    return () => {
      {/* A return function for killing the animation on component unmount */ }
      pin.kill();
    };
  }, []);

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0])

  return (
    <section className="scroll-section-outer"> 
      <div ref={triggerRef}>
        <div ref={sectionRef} className="scroll-section-inner">
        <motion.div style={{scale, rotate}} className="sticky top-0 h-screen text-[3.5vw] flex flex-col items-center justify-center text-black pb-[10vh] bg-white scroll-section">
          <Character paragraph="I'm Tim, a creative developer from Kampala, Uganda." />
        </motion.div>
        <div className="scroll-section bg-[#111111]">
            <p className="flex text-[60px] leading-none p-[40px] max-w-[1280px] text-white flex-wrap">
              I am passionate about developing efficient, scalable, and user-friendly applications.
              <span className="relative mr-[12px] mt-[12px]">
              </span>
            </p>
        </div>

          <div className="scroll-section bg-white text-black">
            <Projects />
          </div>

          <div className="scroll-section bg-[#111111] text-white">
            <h1>Works</h1> 
          </div>
        </div>
      </div>
     </section>
     
  );
}

export default About;