import React from 'react'
import img_1 from '../../Imgs/model_1.png'
import img_2 from '../../Imgs/model_2.png'

export default function sectionOne() {
  return (
    <div className='additional_section_one' >
        <div className="container">
            <div className="text">
                <div className="h3">
                    moRa- shopify theme
                </div>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta, doloremque quo ducimus tempore impedit aspernatur? Sint, sunt. Earum fugiat, consequatur magni dolor voluptatum sequi.
                </p>
            </div>
            <div className="img">
                <img src={img_1} alt="" />
            </div>
        </div>
    </div>
  )
}
