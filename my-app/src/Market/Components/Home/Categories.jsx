import React,{useState} from 'react'
import data from '../../data'
export default function Categories() {
  const [categories,setCategories] = useState(data.categories)
    return (
    <div className="categories">
        <div className="section-title">
            popular <strong>categories</strong>
        </div>
        <div className="container">
            {categories.map((cat,index) => (
                <div key={index} className="item">
                    <div className="img">
                        {cat.img ? <img src={cat.img} alt="" /> : cat.icon } 
                    </div>
                    <div className="info">
                        <div className="title">
                            {cat.title}
                        </div>
                        <p className="desc">
                            {cat.desc}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}
