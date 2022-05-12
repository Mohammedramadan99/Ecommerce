import React,{useState,useEffect} from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import {ArrowRightOutlined, ArrowLeftOutlined} from '@mui/icons-material'
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
import {addProduct} from '../redux/cart/cartSlice'
export default function SingleProduct() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {productDetails,isError,isSuccess,reviewSuccess,message} = useSelector(state => state.products)
    const {user} = useSelector(state => state.auth)
    const {productID} = useParams() // you need to transfare the id to Number
    const {_id,sizes,images, name, price, ratings, numOfReviews, Stock, reviews} = productDetails
    const [avtiveSize,setAvtiveSize] = useState('')
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

    
    const addToCart = () => {
        dispatch(
            addProduct({id:_id,quantity,avtiveSize}))
    }
    const ChangeQuantity = (type) => {
        if(type === "plus") {
            quantity > Stock ? setQuantity(Stock) : setQuantity(quantity + 1)
        } else {
            quantity < 0 ? setQuantity(0) : setQuantity(quantity - 1)
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

    return (
        <div className="singleProduct">
            <div className="container">
                <div className="imgs">
                    <div className="allImgs">
                        {images && images.map((img,i) => (
                            <div key={i} className="img_Container" onClick={() => setImgIndex(img._id)}>
                                <img src={img.url} alt="" />
                            </div>
                        ))}
                    </div>
                    <div className="activeImg">
                        <img src={ currentImg ? currentImg.url : images && images[0].url } alt="" />
                    </div> 
                </div>
                <div className="info">
                    <div className="title">
                        {name}
                    </div>
                    <div className="rating">
                        <Rating value={ratings} readOnly={true} precision={.5}/>
                    </div>
                    <div className="price">
                        ${price}
                    </div>
                    <div className="quantity">
                        <ArrowLeftOutlined onClick={() => ChangeQuantity('minus')}/>
                        {quantity}
                        <ArrowRightOutlined onClick={() => ChangeQuantity('plus')}/>
                    </div>
                    <div className="sizes">
                        {sizes && sizes.map((size,i) => (
                            <div key={i} className={avtiveSize === size ? 'size focused' : 'size'} onClick={(e) => setAvtiveSize(size)}>
                                {size}
                            </div>
                        ))}
                    </div>
                    <div className="btn" onClick={() => addToCart()}>
                        add to cart
                    </div>
                    <div className="btn" onClick={submitReviewToggle}>
                            Submit Review
                    </div>
                    <div className="details">
                        <h3>product details</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, hic vitae exercitationem optio reprehenderit voluptatum tempora sed autem qui error facere, sunt accusamus magni ipsum minima ratione. Harum, numquam nam!</p>
                    </div>
                    <h3 className="reviewsHeading">REVIEWS</h3>

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

                {reviews && reviews[0] ? (
                    <div className="reviews">
                        {reviews &&
                            reviews.map((review) => (
                                <ReviewCard key={review._id} review={review} />
                            ))}
                    </div>
                ) : (
                    <p className="noReviews">No Reviews Yet</p>
                )}
                </div>
            </div>
        </div>
  )
}
