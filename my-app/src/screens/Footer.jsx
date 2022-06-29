import React from 'react'
import { Link } from 'react-router-dom'
export default function Footer()
{
    return (
        <footer className="footer"  >
            <div className="container" data-aos="fade-up"
                data-aos-anchor-placement="bottom-bottom">
                <div className="logo">
                    <Link to="/">
                        <span className='Fname'> محمد </span>
                        <span className='Lname'>رمضان</span>
                    </Link>
                </div>
                <ul className="links">
                    <li>
                        <Link to="/">
                            الرئيسية
                        </Link>
                    </li>
                    <li>
                        <Link to="/about">
                            مين انا؟
                        </Link>
                    </li>
                    <li>
                        <Link to="/opinions">
                            اراء العملاء
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact">
                            التواصل
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    )
}