import React,{useState,useEffect} from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import {SearchOutlined,ArrowRightOutlined, ArrowLeftOutlined} from '@mui/icons-material'
import Carousel from "react-material-ui-carousel";

import data from '../data'
import {useSelector,useDispatch} from 'react-redux'
import {addReview,reset,getProductDetails} from '../redux/product/productSlice'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from "@mui/material";
import {Rating} from '@mui/lab'
import ReviewCard from '../Components/Product/ReviewCard'
import {toast} from 'react-toastify'
import {addProduct,addToCart} from '../redux/cart/cartSlice'
import SectionOne from '../Components/SingleProduct/SectionOne'
import SectionTwo from '../Components/SingleProduct/SectionTwo'

export default function SingleProduct() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {productDetails,isError,isSuccess,reviewSuccess,message} = useSelector(state => state.products)
    const {user} = useSelector(state => state.auth.userInfo)
    const {productID} = useParams() // you need to transfare the id to Number
    const {_id,sizes,images, name, price, ratings, numOfReviews,category, Stock, reviews} = productDetails
    const [activeSize,setActiveSize] = useState('')
    const [imgIndex,setImgIndex] = useState(0)
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [quantity,setQuantity] = useState(0)

    let [imgID,setImgID] = useState(0)
    const currentImg = images&& images.find(img => img._id === imgIndex)

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };

    const reviewSubmitHandler = () => {
        if(!user) {
            toast.error('you need to login first')
        } else {
            const myForm = {rating: rating ,comment:comment ,productId:productID}
            dispatch(addReview(myForm));
            setOpen(false);
        }
    };

    
    const addToCartHandler = () => {
        dispatch(addToCart({id:_id,quantity,activeSize,name,image:images[0].url,price:price,Stock,category}))
    }
    
    const ChangeQuantity = (type) => {
        if(type === "plus") {
            quantity >= Stock ? setQuantity(Stock) : setQuantity(quantity + 1)
        } else {
            quantity <= 0 ? setQuantity(0) : setQuantity(quantity - 1)
        }
    }

    useEffect(() => {
        if (isError) {
            toast.error(message);
            dispatch(reset())
        }
        if (reviewSuccess) {
            toast.success("Review Submitted Successfully");
            dispatch(reset())
        }
        dispatch(getProductDetails(productID)) // to show the productDetails on touch while any changes happened. for example: case you review 
    }, [dispatch,productID,isError,toast,isSuccess,reviewSuccess])


    const [listGroup,setListGroup] = useState(['details','reviews'])
    const [activeList,setActiveList] = useState('details')
    const [activeFeat,setActiveFeat] = useState([])
    const listHandler = (title) => {
        title === 'details' ? setActiveList('details') : setActiveList(title)
    }
    const productFeats = [
        {
            num:"details",
            title:"details",
            element: 
            <div className="details">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, hic vitae exercitationem optio reprehenderit voluptatum tempora sed autem qui error facere, sunt accusamus magni ipsum minima ratione. Harum, numquam nam!</p>
            </div>
        },
        {
            num:"reviews",
            title:"reviews",
            element:
            reviews && reviews[0] ? (
                <div className="reviews">
                    {reviews &&
                        reviews.map((review) => (
                            <ReviewCard key={review._id} review={review} />
                        ))}
                </div>
            ) : (
                <p className="noReviews">No Reviews Yet</p>
            )
        },
    ]

    useEffect(() => {
        setActiveFeat(productFeats.filter(p => (
            p.title !== activeList
        )))
        console.log(activeFeat)
    }, [activeList])
    return (
        <div className="singleProduct">
            
            <div className="container">
                <div className="top">
                    <div className="imgs">
                        {/* <div className="allImgs">
                            {images && images.map((img,i) => (
                                <div key={i} className="img_Container" onClick={() => setImgIndex(img._id)}>
                                    <img src={img.url} alt="" />
                                </div>
                            ))}
                        </div>
                        <div className="activeImg">
                            <img src={ currentImg ? currentImg.url : images && images[0].url } alt="" />
                        </div>  */}
                        <Carousel className='carousel_container'>
                            {images && images.map((item, i) => (
                                <div className="img_Container">
                                    <img
                                    className="CarouselImage"
                                    key={i}
                                    src={item.url}
                                    alt={`${i} Slide`}
                                    />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                    <div className="info">
                        <div className="title">
                            {name}
                        </div>
                        <div className="rating">
                            <Rating value={ratings ? ratings : 0} readOnly={true} precision={.5}/>
                            <div className="numReviews"> ({reviews?.length > 1 ? `${reviews?.length} reviews ` : `${reviews?.length} review`})  </div>
                        </div>
                        <div className="price">
                            ${price}
                        </div>
                        <div className="quantity">
                            <div className="icon">
                                <ArrowLeftOutlined onClick={() => ChangeQuantity('minus')}/>
                            </div>
                            <p> {quantity} </p>
                            <div className="icon">
                                <ArrowRightOutlined onClick={() => ChangeQuantity('plus')}/>
                            </div>
                        </div>
                        <div className="sizes">
                            {sizes && sizes.map((size,i) => (
                                <div key={i} className={activeSize === size ? 'size focused' : 'size'} onClick={(e) => setActiveSize(size)}>
                                    {size}
                                </div>
                            ))}
                        </div>
                        <div className="btn" onClick={() => addToCartHandler()}>
                            add to cart
                        </div>
                        <div className="btn" onClick={submitReviewToggle}>
                                Submit Review
                        </div>
                        <div className="stock">
                            <p>availiable : <span> {Stock > 0 ? "in stock" : "out of stock"} </span> </p>
                            <p>category : <span> { category && category} </span> </p>
                        </div>
                    </div>
                    <Dialog
                            aria-labelledby="simple-dialog-title"
                            open={open}
                            onClose={submitReviewToggle}
                        >
                            <DialogTitle>Submit Review</DialogTitle>
                            <DialogContent className="submitDialog">
                                <Rating
                                    onChange={(e) => setRating(e.target.value)}
                                    value={rating}
                                    size="large"
                                />

                                <textarea
                                    className="submitDialogTextArea"
                                    cols="30"
                                    rows="5"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                ></textarea>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={submitReviewToggle} color="secondary">
                                    Cancel
                                </Button>
                                <Button onClick={reviewSubmitHandler} color="primary">
                                    Submit
                                </Button>
                            </DialogActions>
                    </Dialog>
                </div>



                <div className="bottom">

                <ul className="list-items">
                    {listGroup.map((item,i) => (
                        <li key={i}  className={ activeList === item ? `item active` : `item`} data-filter={item} onClick={() => listHandler(item)} > {item} </li>
                    ))}
                </ul>
                {productFeats.map(item => (
                    <div className={`content ${ item.num === activeList  ? 'show' : '' }`}>
                        {item.element}
                    </div>
                ))}
                

                    {/* <div className="details">
                        <h3>product details</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, hic vitae exercitationem optio reprehenderit voluptatum tempora sed autem qui error facere, sunt accusamus magni ipsum minima ratione. Harum, numquam nam!</p>
                    </div> */}
                    
                    {/* <h3 className="reviewsHeading">REVIEWS</h3>
                    {reviews && reviews[0] ? (
                        <div className="reviews">
                            {reviews &&
                                reviews.map((review) => (
                                    <ReviewCard key={review._id} review={review} />
                                ))}
                        </div>
                    ) : (
                        <p className="noReviews">No Reviews Yet</p>
                    )} */}
                </div>
                <SectionOne/>
                <SectionTwo/>
            </div>
        </div>
  )
}
