'use client';
import React, { useState, useEffect } from 'react'
import RenderModel from './components/RenderModels'
import AllSeeingEye from './components/models/AllSeeingEye'
import Stars from './components/Stars'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Calculate the scale based on scroll position
  const scale = Math.max(0.009, 1 - scrollY / 500)

  return (
    <main>
      <div className="w-full h-screen">
        <RenderModel>
          <Stars />
          <AllSeeingEye scale={scale} />
        </RenderModel>
      </div>
      <div className="content">
        <h1>Additional Content</h1>
        <p>I'm baby leggings roof party williamsburg gluten-free, pork belly vinyl bicycle rights copper mug mixtape forage church-key shabby chic yes plz tilde. Solarpunk gochujang normcore iPhone fit man bun cupping disrupt vibecession irony polaroid intelligentsia pork belly migas. Paleo bitters organic kombucha butcher activated charcoal bespoke you probably haven't heard of them XOXO trust fund single-origin coffee Brooklyn. Vegan vexillologist hell of, beard chambray butcher kale chips adaptogen trust fund raw denim williamsburg put a bird on it paleo fashion axe fam. Kale chips JOMO drinking vinegar live-edge street art organic offal YOLO shabby chic hoodie gochujang. Quinoa gochujang pop-up vaporware, biodiesel crucifix activated charcoal. Mixtape pitchfork austin, taiyaki green juice fam ugh.

DIY fingerstache distillery 8-bit kale chips cronut health goth chicharrones vape aesthetic jean shorts tonx try-hard. Tumblr hell of direct trade DIY, stumptown thundercats mixtape. Coloring book squid venmo pour-over. Blue bottle meditation pitchfork four dollar toast kogi pop-up cold-pressed direct trade chicharrones air plant ramps. Trust fund pug street art mukbang deep v small batch DSA chicharrones shoreditch.

Fam JOMO pabst banjo, authentic pickled drinking vinegar thundercats man braid grailed pinterest swag normcore. Beard af lumbersexual meditation, bitters subway tile bicycle rights kickstarter. Adaptogen yes plz fashion axe, microdosing cupping unicorn leggings you probably haven't heard of them taiyaki cray synth 3 wolf moon listicle squid. XOXO poutine direct trade occupy green juice. Shabby chic asymmetrical jean shorts chambray bicycle rights fashion axe etsy post-ironic Brooklyn sriracha synth keffiyeh yuccie jawn bushwick. Pop-up selfies +1 air plant. You probably haven't heard of them YOLO man braid Brooklyn microdosing jawn sriracha.

Activated charcoal everyday carry readymade irony authentic live-edge mukbang hot chicken JOMO sus fingerstache kale chips enamel pin affogato. Vice neutra hot chicken stumptown, retro fingerstache distillery banjo before they sold out. Tattooed keytar cupping stumptown gentrify. Four dollar toast wolf mixtape selfies, pinterest iceland 8-bit. Jianbing praxis paleo meditation.

Kogi brunch occupy banjo synth gentrify copper mug cold-pressed tote bag microdosing edison bulb glossier viral austin bodega boys. Post-ironic +1 tumblr, crucifix ramps hella squid irony craft beer brunch XOXO. Direct trade poke salvia, +1 vibecession vaporware tousled cold-pressed tofu keytar post-ironic bespoke deep v affogato blog. Quinoa literally skateboard, bespoke Brooklyn tofu chartreuse four loko organic ugh. Migas yuccie health goth readymade, jianbing jawn tofu semiotics tonx austin dreamcatcher messenger bag edison bulb whatever Brooklyn. Fixie cardigan Brooklyn, neutral milk hotel kale chips synth pok pok raclette.

Dummy text? More like dummy thicc text, amirite?
      </p>
      </div>
    </main>
  )
}
