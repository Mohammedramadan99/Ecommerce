import React, { useState } from 'react'
import {useParams} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import {createPost} from '../../redux/blog/blogSlice'

export default function NewPost() {
    const dispatch = useDispatch()
    const {id} = useParams()
    const {title} = useSelector(state => state.blog.postDetails)
    const [postTitle,setPostTitle] = useState(title)
    const [descHead,setDescHead] = useState("")
    const [descText,setDescText] = useState("")
    const [categories,setCategories] = useState("")
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const {user} = useSelector(state => state.auth.userInfo)

    const createPostImagesChange = (e) => {
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

    const writePostHandler = (e) => {
        e.preventDefault()
        const categoriesArray = categories.split(',')
        const descItem = {
            title:descHead,
            desc:descText
        };

        const paragraphs = [];
        paragraphs.push(descItem)

        const data = {
            username:user.name,
            title:postTitle,
            paragraphs,
            categories:categoriesArray,
            images
        }

        dispatch(createPost(data))
        
        console.log(data)
    }

    return (
        <div className='blog__new__post'>
            <div className="h3">
                write post
            </div>
            <div className="container">
                <form  className="form" onSubmit={writePostHandler}>
                    <div className="item title">
                        <label>title</label>
                        <input type="text" name="name" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} />
                    </div>
                    
                    <label> post content </label>
                    <div className="content">
                        <div className="item heading">
                            <input type="text" name="descHead" placeholder='heading' onChange={(e) => setDescHead(e.target.value)} />
                        </div>
                        <div className="item desc">
                            <textarea name="descText" placeholder='description' onChange={(e) => setDescText(e.target.value)} />
                        </div>
                    </div>
                    <div className="item">
                        <label>category</label>
                        <input type="text" name="categories" placeholder='category' onChange={(e) => setCategories(e.target.value)} />
                    </div>
                    <div className="item">
                        <label> image </label>
                        <input
                            type="file"
                            name="avatar"
                            className="imageField"
                            accept="image/*"
                            onChange={createPostImagesChange}
                            multiple
                        />
                        <div className="img_preview">
                        {imagesPreview.map((image, index) => (
                            <div className="img">
                                <img key={index} src={image} alt="Product Preview" />
                            </div>
                        ))}
                        </div>
                    </div>
                    <div className="submit">
                        <input type="submit"  />
                    </div>
                </form>
            </div>
        </div>
    )
}
