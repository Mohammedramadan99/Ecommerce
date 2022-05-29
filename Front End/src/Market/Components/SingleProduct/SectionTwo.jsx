import React from 'react'
import img_1 from '../../Imgs/model_1.png'
import img_2 from '../../Imgs/model_2.png'

export default function sectionTwo() {
  return (
    <div className='additional_section_two' >
        <div className="container">
            <div className="img">
                <img src={img_2} alt="" />
            </div>
            <div className="text">
                <div className="h3">
                    fast clean and flexable
                </div>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta, doloremque quo ducimus tempore impedit aspernatur? Sint, sunt. Earum fugiat, consequatur magni dolor voluptatum sequi.
                </p>
            </div>
        </div>
    </div>
  )
}
