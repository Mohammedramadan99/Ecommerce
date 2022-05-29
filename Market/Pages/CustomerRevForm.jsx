import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {reset,newCustomerRev} from '../redux/customer/customerSlice'
import {toast} from 'react-toastify'
import Spinner from '../Components/Layout/Spinner'
import AOS from 'aos'

export default function CustomerRevForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector(state => state.auth.userInfo)
    
  useEffect(() => {
    AOS.init({
      duration : 2000
    });
  }, []);

    const {customerRevs,isLoading,isSuccess,isError,message} = useSelector(state=> state.customerRevs)
    const [email, setEmail] = useState(user.email);
    const [name, setName] = useState(user.name);
    const [revContent, setRevContent] = useState("");
    const [rating, setRating] = useState(0);
    const [address, setAddress] = useState("");
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setImages([]);
        setImagesPreview([]);
    
        files.forEach((file) => {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setImagesPreview((old) => [...old, reader.result]);
              setImages((old) => [...old, reader.result]);
            }
          };
          console.log(images)
          reader.readAsDataURL(file);
        });
      };

    const createProductSubmitHandler = (e) => {
        e.preventDefault();
        
        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("address", address);
        myForm.set("revContent",revContent);
        myForm.set("rating", rating);
    
        images.forEach((image) => {
          myForm.append("images", image);
        });
        
        console.log(myForm)
        dispatch(newCustomerRev(myForm));
      };

      useEffect(() => {
          if (isError) {
            toast.error(message)
            dispatch(reset())
          }
          if (isSuccess) {
            toast.success(`thanks ${user.name},we're happy for your review`)
            dispatch(reset())
            navigate('/')
          }
      }, [dispatch,toast,message,isError,isSuccess])
      
  useEffect(() => {
    AOS.init({
      duration : 2000
    });
  }, []);
    return isLoading ? <Spinner/> : (
    <div className='customerRev_form' data-aos="zoom-in" >
        <div className="container">
            <form  className="form" onSubmit={createProductSubmitHandler}>
                <div className="item">
                    <label>name</label>
                    <input type="text" value={user.name} name="name" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="item">
                    <label> email </label>
                    <input type="email" value={user.email ? user.email : email} name="email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="item">
                    <label> rating </label>
                    <input type="number" name="rating" onChange={(e) => setRating(e.target.value)} />
                </div>
                <div className="item">
                    <label> your opinion </label>
                    <textarea name="revContent" onChange={(e) => setRevContent(e.target.value)}/>
                </div>
                
                <div className="item">
                    <label> address </label>
                    <input type="text" name="address" onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className="item">
                    <label> image </label>
                    <input
                        type="file"
                        name="avatar"
                        className="imageField"
                        accept="image/*"
                        onChange={createProductImagesChange}
                        multiple
                    />
                    <div className="img_preview">
                      {imagesPreview.map((image, index) => (
                        <img key={index} src={image} alt="Product Preview" />
                      ))}
                    </div>
                </div>
                <input type="submit" />
            </form>
            
        </div>
    </div>
  )
}


