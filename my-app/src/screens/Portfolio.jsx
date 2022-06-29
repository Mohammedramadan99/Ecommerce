import React, { useState, useEffect } from 'react'
import SectionHeader from '../components/SectionHeader'
import data from '../data'
// import scroll from '../components/Scroll'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { allProjects } from '../Redux/Projects/projectsSlice'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import SwiperCore, { EffectCoverflow, Pagination, Navigation } from 'swiper/core'

export default function Portfolio()
{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { projects } = useSelector(state => state.projects)
    const [portfolioGalleries, setPortfolioGalleries] = useState(data.portfolioData)
    useEffect(() =>
    {
        dispatch(allProjects())
    }, [])

    SwiperCore.use([EffectCoverflow, Pagination, Navigation])
    const showDetailsHandler = (id) =>
    {
        navigate(`/project/${id}`)
    }
    return (
        <section className="portfolio">
            <SectionHeader title="معرض اعمالي" />
            <div className="container" data-aos="zoom-in-up">
                <div className="boxes">
                    <Swiper
                        navigation={true}
                        effect={"coverflow"}
                        centeredSlides={true}
                        slidesPerView={window.innerWidth < 768 ? 1 : "auto"}
                        loop={true}
                        coverflowEffect={{
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: true
                        }}
                        pagination={{
                            clickable: true
                        }}
                    >
                        {projects && projects.map(item => (
                            <SwiperSlide>
                                <div className="box">
                                    <div className="img">
                                        <img src={item?.image} alt="" />
                                    </div>
                                    <div className="info">
                                        <div className="title"> {item?.title} </div>
                                        <div className="desc"> {item?.desc} </div>
                                        <Link to={`/project/${item._id}`} className="btn"> مشاهدة التفاصيل </Link>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                </div>
            </div>
        </section>
    )
}
