import React,{useState} from 'react'
import data from '../../../data'
import {Link} from 'react-router-dom'

export default function Categories() {
  const [categories,setCategories] = useState(data.categories)
    return (
    <div className="categories">
        <div className="section-title">
            popular <strong>categories</strong>
        </div>
        <div className="container">
            {categories.map((cat,index) => (
                <Link to={`/products/${cat.title}`} key={index} className="item">
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
                </Link>
            ))}
        </div>
    </div>
  )
}
