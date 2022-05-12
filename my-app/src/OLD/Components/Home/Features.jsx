import React,{useState} from 'react'
import data from '../../data'
export default function Features() {
  const [Feats,setFeats] = useState(data.features)
    return (
    <div className="features">
        <div className="container">
            {
              Feats.map((feat,i) => (
                <div key={i} className="item">
                    <div className="icon"> {feat.icon} </div>
                    <div className="desc"> {feat.desc} </div>
                </div>
              ))  
            }
        </div>
    </div>
  )
}
