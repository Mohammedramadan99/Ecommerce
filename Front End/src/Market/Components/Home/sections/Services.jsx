
import React,{useState} from 'react'
import data from '../../../data'
export default function Services() {
  const [services,setServices] = useState(data.services)
    return (
    <div className="services">
        <div className="container">
            {
              services.map((feat,i) => (
                <div key={i} className="item">
                    <div className="icon"> {feat.icon} </div>
                    <div className="title"> {feat.title} </div>
                    <div className="desc"> {feat.desc} </div>
                </div>
              ))  
            }
        </div>
    </div>
  )
}
