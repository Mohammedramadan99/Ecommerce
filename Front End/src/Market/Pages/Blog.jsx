import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {allPosts} from '../redux/blog/blogSlice'
import {Person} from '@mui/icons-material'
import { Link } from 'react-router-dom'
import {Error} from '@mui/icons-material'

export default function Blog() {
    const dispatch = useDispatch()
    const {posts} = useSelector(state => state.blog)
    useEffect(() => {
      dispatch(allPosts())
    }, [])
    console.log(posts)
    return (
        <div className="blog">
            <div className="h3">
                mora blog
            </div>
            <div className="container">
                <div className="blog_bar">
                    <div className="item">
                        <strong> {posts.length} </strong>
                        <p>posts</p>
                    </div>
                    <div className="item"> 
                        <Link to="/blog/new"> write post </Link> 
                    </div>
                </div>
                <div className={`${posts.length < 1 ? 'emptyBlog' : 'posts' } `}>
                    {posts && posts.length < 1 ? (
                        <>
                            <div className="icon">
                                <Error/>
                            </div>
                            <p>there is no any posts to show</p>
                        </>
                    ) : posts.map(post => (
                        <div className="post">
                            <div className="img">
                                <div className="overlay">
                                    <div className="name">
                                        <Person/>
                                        {post.username}
                                    </div>
                                </div>
                                <img src={post.images[0].url} alt="img" />
                            </div>
                            <div className="info">
                                <div className="title"> {post.title} </div>
                                <div className="text">
                                    {post.paragraphs[0].desc.substring(0,200)}...
                                </div>
                                <Link to={`/blog/${post._id}`} className="btn">read more</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ) 
}