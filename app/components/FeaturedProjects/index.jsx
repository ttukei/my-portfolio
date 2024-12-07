import React from 'react';
import styles from './FeaturedProjects.module.css';
import { disperse } from './anim';
import { useRef, useEffect, useState } from 'react';
import { useTransform, motion } from "framer-motion";
import gsap from 'gsap';

const FeaturedProjects = () => {

    const background = useRef(null);

  const setBackground = (isActive) => {
    gsap.to(background.current, {opacity: isActive ? 0.8 : 0})
  }
    return (
        <div className="origin-center bg-white">
            <div className="origin-left  w-[51vh] h-screen bg-white">

        <TextDipserse setBackground={setBackground}>
          <p>Projects</p>
        </TextDipserse>

        <TextDipserse setBackground={setBackground}>
          <p>Obstruction</p>
        </TextDipserse>

        <TextDipserse setBackground={setBackground}>
          <p>Sherlock</p>
        </TextDipserse>
        

      </div>
      </div>
    )
}

function TextDipserse(props) {
  
    const { children, setBackground } = props;
  
    const [isAnimated, setIsAnimated] = useState(false);
  
    const getChars = (element) => {
      let chars = [];
      if(children.length){
        children.forEach( (el, i) => {
          chars.push(splitWord(el.props.children, i))
        })
      }
      else{
        chars.push(splitWord(element.props.children, 1))
      }
      return chars;
    }
  
    const splitWord = (word, indexOfWord) => {
      let chars = [];
      word.split("").forEach( (char, i) => {
        chars.push(<motion.span custom={indexOfWord * i} variants={disperse} animate={isAnimated ? "open" : "closed"} key={char + i}>{char}</motion.span>)
      })
      return chars;
    }
  
    const manageMouseEnter = () => {
      setBackground(true)
      setIsAnimated(true);
    }
    const manageMouseLeave = () => {
      setBackground(false)
      setIsAnimated(false);
    }
  
    return (
      <div style={{cursor: "pointer"}} onMouseEnter={() => {manageMouseEnter()}} onMouseLeave={() => {manageMouseLeave(false)}} className={styles.introLine}>
      { getChars(children) }
      </div>
    )
  }

  export default FeaturedProjects;