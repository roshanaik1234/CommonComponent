import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

const AOSLabiry = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000
    })
  }, [])

  return (
    <>
    <div>
       <div>
        <h1>AOS Library</h1>
      </div>

      <div style={{ width: "50%"}} data-aos="fade-up">
        <h2>Fade Up Animation</h2>
      </div>

      <div style={{ width: "50%"}} data-aos="fade-down">
        <h2>Fade Down Animation</h2>
      </div>

        <div style={{ width: "50%"}} data-aos="fade-left">
        <h2>Fade Left Animation</h2>
        </div>

        <div style={{ width: "50%"}} data-aos="fade-right">
        <h2>Fade Right Animation</h2>
        </div>

        <div style={{ width: "50%"}} data-aos="zoom-in">
        <h2>Zoom In Animation</h2>
        </div>

        <div style={{ width: "50%"}} data-aos="zoom-out">
        <h2>Zoom Out Animation</h2>
        </div>

        <div style={{ width: "50%"}} data-aos="fade-up-right">
        <h2>Fade Up Right Animation</h2>
        </div>

        <div style={{ width: "50%"}} data-aos="fade-up-left">
        <h2>Fade Up Left Animation</h2>
        </div>

            <div style={{ width: "50%"}} data-aos="fade-down-right">
        <h2>Fade Down Right Animation</h2>
        </div>

        <div style={{ width: "50%"}} data-aos="fade-down-left">
        <h2>Fade Down Left Animation</h2>
        </div>

        <div style={{ width: "50%"}} data-aos="flip-left">
        <h2>Flip Left Animation</h2>
        </div>

        <div style={{ width: "50%"}} data-aos="flip-right">
        <h2>Flip Right Animation</h2>
        </div>

        <div style={{ width: "50%"}} data-aos="flip-up">
        <h2>Flip Up Animation</h2>
        </div>

        <div style={{ width: "50%"}} data-aos="flip-down">
        <h2>Flip Down Animation</h2>
        </div>

        <div style={{ width: "50%"}} data-aos="fade-zoom-in">
        <h2>Fade Zoom In Animation</h2>
        </div>

        <div style={{ width: "50%"}} data-aos="fade-zoom-out">
        <h2>Fade Zoom Out Animation</h2>
        </div>

        <div style={{ width: "50%"}} data-aos="slide-up">
        <h2>Slide Up Animation</h2>
        </div>
        <div style={{ width: "50%"}} data-aos="slide-down">
        <h2>Slide Down Animation</h2>
        </div>
        <div style={{ width: "50%"}} data-aos="slide-left">
        <h2>Slide Left Animation</h2>
        </div>
        <div style={{ width: "50%"}} data-aos="slide-right">
        <h2>Slide Right Animation</h2>
       </div>

       <div style={{ width: "50%"}} data-aos="fade-up" data-aos-delay="500">
        <h2>Fade Up Animation with Delay</h2>
       </div>
         <div style={{ width: "50%"}} data-aos="fade-up" data-aos-duration="2000">  
        <h2>Fade Up Animation with Longer Duration</h2>
         </div>
            <div style={{ width: "50%"}} data-aos="fade-up" data-aos-easing="ease-in-out">
        <h2>Fade Up Animation with Custom Easing</h2>
        </div>
            <div style={{ width: "50%"}} data-aos="fade-up" data-aos-once="true">
        <h2>Fade Up Animation that Occurs Only Once</h2>
        </div>
            <div style={{ width: "50%"}} data-aos="fade-up" data-aos-anchor-placement="top-bottom">
        <h2>Fade Up Animation with Custom Anchor Placement</h2>
        </div>
        <div style={{ width: "50%"}} data-aos="fade-up" data-aos-mirror="true">
        <h2>Fade Up Animation that Mirrors on Scroll</h2>
        </div>
        <div style={{ width: "50%"}} data-aos="fade-up" data-aos-offset="200">
        <h2>Fade Up Animation with Custom Offset</h2>
        </div>
            <div style={{ width: "50%"}} data-aos="fade-up" data-aos-anchor="#example-anchor">
        <h2>Fade Up Animation with Custom Anchor</h2>
        </div>
        <div style={{ width: "50%"}} data-aos="fade-up" data-aos-disable="true">
        <h2>Fade Up Animation Disabled</h2>
        </div>
            <div style={{ width: "50%"}} data-aos="fade-up" data-aos-threshold="0.5">
        <h2>Fade Up Animation with Custom Threshold</h2>
        </div>
            <div style={{ width: "50%"}} data-aos="fade-up" data-aos-delay="500" data-aos-duration="2000" data-aos-easing="ease-in-out" data-aos-once="true" data-aos-anchor-placement="top-bottom" data-aos-mirror="true" data-aos-offset="200" data-aos-anchor="#example-anchor" data-aos-disable="false" data-aos-threshold="0.5">
        <h2>Fade Up Animation with Multiple Custom Settings</h2>
        </div>
    </div>
     



       

    </>
  )
}

export default AOSLabiry