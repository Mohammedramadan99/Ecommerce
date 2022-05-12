import React,{useState,useEffect} from 'react'
import data from '../../data'
import {ArrowRight,ArrowLeft} from '@mui/icons-material'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {getProducts} from '../../redux/product/productSlice'

export default function Products() {
    const dispatch = useDispatch()
    const {products,isError,isSuccess,message} = useSelector(state => state.products)
    // const [products,setProducts] = useState(data.products)
    const [listGroup,setListGroup] = useState(['all','shoses','coats','shirts'])
    const [productsFilter,setProductsFilter] = useState([])
    const [activeList,setActiveList] = useState('all')
    const [category, setCategory] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 100]);
    const [ratings, setRatings] = useState(0);
    const [keyword, setKeyword] = useState('');

    const listHandler = (title) => {
        title === 'all' ? setActiveList('all') : setActiveList(title)
        title === 'all' ? setCategory('') :setCategory(title)
    }
    
    // useEffect(() => {
    //     FilterHandler()
    // }, [products,activeList])
    useEffect(() => {
        dispatch(getProducts(category));
    }, [dispatch ,category]);
    
    return (
    <div className="products">
        <div className="container">
            <div className="section-title">
                <strong>products</strong>
            </div>
            <section id="products" className="py-5" >
                <ul className="list-group list-group-horizontal justify-content-center">
                    {listGroup.map((item,i) => (
                        <li key={i} className={ activeList === item ? `list-group-item active` : `list-group-item`} data-filter={item} onClick={() => listHandler(item)} > {item} </li>
                    ))}
                </ul>
                <div className="row filterd-items mt-4" id="lightgallery">
                    {products.map(p => (
                        // ${p.activeClass ? 'active' : 'hidden'}
                        <Link key={p._id} to={`product/${p._id}`} className={`col-md-6 col-lg-4 ${p.category}  all mb-3`}> 
                            <img src={p.images[0].url} className="p-2 shadow w-100 h-100" />
                        </Link>
                    ))}
                </div>
            </section>

        </div>
    </div>
  )
}
