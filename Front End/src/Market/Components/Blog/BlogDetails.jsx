import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams,Link, useNavigate } from 'react-router-dom'
import {getPostDetails,deletePost,reset} from '../../redux/blog/blogSlice'
import {Delete,Edit} from '@mui/icons-material'
import {toast} from 'react-toastify'
import Spinner from '../../Components/Layout/Spinner'

function BlogDetails() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {posts,postDetails,isDeleted,isError,message,isLoading } = useSelector(state => state.blog)
    const {id} = useParams()

    const {title,images,username,desc,createdAt,paragraphs} = postDetails

    const cat = posts.map(item => item.category)
    const uniqueCategories = cat.filter(function (item,pos) {
        return cat.indexOf(item) == pos;
    })

    const deleteHandler = id => {
        dispatch(deletePost(id))
        dispatch(reset())
    }

    useEffect(() => {
        if(isError) {
            toast.error(message)
            dispatch(reset())

        }
        if(isDeleted){
            toast.success('post deleted successfully')
            dispatch(reset())
            navigate('/blog')
        }
        dispatch(getPostDetails(id))

    }, [isError,isDeleted,toast])
    
    return isLoading ? <Spinner/> :  (
        <div className="blogDetails" >
            <div className="img">
                <img src={images&&images[0].url} alt="" />
            </div>
            
            <div className="container">
                <div className="info">
                    <div className="info_title">
                        {title}
                    </div>
                    <div className="info_bar">
                        <div className="author"> {username} </div>
                        <div className="info_date">
                            {createdAt}
                        </div>
                        <div className="options">
                            <Link to={`/blog/edit/${id}`} className="edit"> <Edit/> </Link>
                            <div className="delete" onClick={() => deleteHandler(id) } > <Delete/> </div>
                        </div>
                    </div>
                    <div className="content">
                        {console.log(paragraphs)}
                        {paragraphs&&paragraphs.map(p => (
                            <div className="item" >
                                <div className="title">
                                    {p.title}
                                </div>
                                <div className="desc">
                                    {p.desc}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="sidebar">
                    <div className="item">
                        <div className="h6">blog categories</div>
                        <ul>
                            {uniqueCategories.map(c => (
                                <li> {c} </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogDetails