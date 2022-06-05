import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {getAllCustomerRevs,reset} from '../../../redux/customer/customerSlice'
import Spinner from '../../Layout/Spinner'
// import {Rating} from '@mui/lab'
// import Rating from '../../Product/Rating'
import {Rating} from '@mui/lab'

// swiper slider
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import SwiperCore,{EffectCoverflow,Pagination,Navigation} from 'swiper/core'
SwiperCore.use([EffectCoverflow,Pagination,Navigation])


export default function CustomersSays() {
  const dispatch = useDispatch()
  const {allCustomerRevs,isLoading,isError,isSuccess,message} = useSelector(state => state.customerRevs)
  useEffect(() => {
    dispatch(getAllCustomerRevs())
  }, [])
  

  return isLoading ? <Spinner/> : (
    <div className="customers_Say" >
        <div className="container">
            <div className="section-title">
                what our <strong> cusomers say? </strong>
            </div>
            <div className="boxes">
              <div className="swiper">
                    {isLoading ? <Spinner/> : isSuccess && (
                        <div className="swiper-container">
                            <div className="animation">
                                <Swiper
                                    navigation={true}
                                    // effect={"coverflow"}
                                    centeredSlides={true}
                                    slidesPerView={window.innerWidth < 768 ? 1 : 2}
                                    spaceBetween={50}
                                    loop={false}
                                    // coverflowEffect={{
                                    // rotate:50,
                                    // stretch:0,
                                    // depth:100,
                                    // modifier:1,
                                    // slideShadows:true
                                    // }}
                                    pagination={{
                                    clickable:true
                                    }}
                                >
                                    
                                    {allCustomerRevs.map(rev => (
                                        <SwiperSlide > 
                                          <div className="box">
                                            <div className="img">
                                              <img src={rev.images[0].url} alt="" />
                                            </div>
                                            {/* <Rating rating={rev.rating} /> */}
                                            <div className="rating">
                                              <Rating value={rev.rating} readOnly={true} precision={.5}/>
                                            </div>
                                            <div className="content"> {rev.revContent} </div>
                                            <div className="customer_info">
                                              <p> - {rev.name},{rev.address} </p>
                                            </div>
                                          </div>
                                        </SwiperSlide>
                                    ))}
                                    
                                </Swiper>
                            </div>
                        </div>
                    )} 
              </div>  
            </div>
        </div>
    </div>
  )
}
