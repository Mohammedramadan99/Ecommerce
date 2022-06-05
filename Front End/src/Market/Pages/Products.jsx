import React,{useState,useEffect} from 'react'
import {Link, Navigate} from 'react-router-dom'
import {motion} from 'framer-motion'
import {toast} from 'react-toastify'
import {useSelector,useDispatch} from 'react-redux'
import { useParams,useNavigate } from 'react-router-dom'
import {Add,Remove,SearchOutlined} from '@mui/icons-material'
import {Slider} from '@mui/material'
import Rating from '../Components/Product/Rating'
import {getFilterProducts,reset,getProducts} from '../redux/product/productSlice'
import {addToCart} from '../redux/cart/cartSlice'
import Spinner from '../Components/Layout/Spinner'
import Pagination from '../Components/Product/Pagination'


export default function Products() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {categoryName,keywordSearch} = useParams()
    const [show,setShow] = useState(false)
    const {products} = useSelector(state => state.products)
    const {products:filterProducts,isLoading,isError,isSuccess,message,filteredProductsCount,resultPerPage,productsCount } = useSelector(state => state.products.filterProducts)
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage,setProductsPerPage] = useState(5);
    
    // start
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    
    const currentProducts = filterProducts.slice(indexOfFirstProduct,indexOfLastProduct)
    // const [currentProducts,setCurrentProducts] = useState(products)
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    // end


    const [keyword, setKeyword] = useState('');
    const [price, setPrice] = useState([0, 25000]);
    const [ratings, setRatings] = useState(0);
    const [category, setCategory] = useState(categoryName?categoryName:'');
    const [size, setSize] = useState("");
    const [clickOption,setClickOption] = useState({data:{activeOption:''}})
    
    console.log(keywordSearch)

    // to make categories without any duplecated values
    // step_1. get all categories
    const cat = products.map(item => item.category)
    // step_2. filter categories to remove duplecated values
    const uniqueCategories = cat.filter(function (item,pos) {
        return cat.indexOf(item) == pos;
    })

    const sizes = ['xx','xxx','xl','m','s','44','42','38']
    
    let count = filteredProductsCount;

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
      };
    useEffect(() => {
            // console.log("type " + clickOption.data.type)
            if(clickOption?.data?.title === 'categories') {
                setCategory('')
            } else if(clickOption?.data?.title === 'sizes') {
                setSize('')
            } else if (clickOption?.data?.type === 'category') {
                setCategory(clickOption?.data?.option)
                console.log(category)
            } else {
                setSize(clickOption?.data?.option)
                console.log(size)
            }
    }, [category,size,clickOption,clickOption?.data?.type,clickOption?.data?.option])
    

    const sidebarInfo = [
        {
            title:'categories',
            itemNum:'One',
            element: uniqueCategories.map(option => (
                <div
                    className={`item ${clickOption.data.activeOption === option ? 'active' : ''}`}
                    key={option}
                    active={false}
                    onClick={() => setClickOption({data:{option,type:'category',activeOption:option} } ) } // 
                    >
                    {option}
                </div>
            )),
            
        },
        {
            title:'sizes',
            itemNum:'Two',
            element: sizes.map(option => (
                <div
                    className={`item ${clickOption.data.activeOption === option ? 'active' : ''}`}
                    key={option}
                    active={false}
                    onClick={() => selectSizeHandler(option) } 
                    >
                    {option}
                </div>
            )),
        },
        {
            title:'price',
            itemNum:'Three',
            element: <Slider
            value={price}
            onChange={priceHandler}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            min={0}
            max={100}
        />
        },
        {
            title:'rating',
            itemNum:'Four',
            element: <Slider
            value={ratings}
            onChange={(e, newRating) => {
              setRatings(newRating);
            }}
            aria-labelledby="continuous-slider"
            valueLabelDisplay="auto"
            min={0}
            max={5}
          />
        },

    ]
    
    const showHandler = (e,title) => {

    }
    const filterHandler = () => {
        dispatch(getFilterProducts({keyword, currentPage, price,size, category, ratings}));
    }
    const detailsHandler = (id) => {
        // dispatch(addToCart({id:p._id,name:p.name,qty:p.quantity,image:p.images[0].url,price:p.price}))
        navigate(`product/${id}`)
        dispatch(reset())
    }
    // useEffect(() => {
    //     dispatch(getProducts())
    // },[])

    // useEffect(() => {
        // setCurrentProducts(filterProducts.length >= 1 ? filterProducts : products )
    // }, [currentProducts, filterProducts,products])
    
    useEffect(() => {
        if(categoryName){
            if(isError) {
                toast(message)
            }
            dispatch(getFilterProducts({keyword, currentPage, price,size, category, ratings}));
            dispatch(reset())
        }
        console.log(categoryName)
        dispatch(getFilterProducts({keyword, currentPage, price,size, category, ratings}));
        setCurrentPage(1)

    }, [dispatch,categoryName,keyword, price,size, category, ratings])
    
    const selectSizeHandler = ({status,option}) =>{
        if(status !== 'all'){
            setClickOption({data:{option,type:'size',activeOption:option} } )
            setSize(option)
        } else {
            setClickOption({data:{title:option},type:''})
            setSize('')
        }

    }

  return (
    <div className='products'>
        <div className="h3">
            products
        </div>
        <div className="search">
                <input type="text" placeholder='search' onChange={(e) => setKeyword(e.target.value)} />
                <div className="icon">
                    <SearchOutlined/>
                </div>
            </div>
        <div className="container">
            <div className="products_filter">
                {sidebarInfo.map(item => (
                    <div className={`widget_product ${show && "active" }`} onClick={(e) => showHandler(e,item.title)}>
                        {/* accordion -- bootstrap*/}
                        <div class="accordion" id="accordionExample">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id={`heading${item.itemNum}`}>
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${item.itemNum}`} aria-expanded="true" aria-controls={`collapse${item.itemNum}`}>
                                        {item.title}
                                    </button>
                                </h2>
                                <div id={`collapse${item.itemNum}`} class="accordion-collapse collapse show" aria-labelledby={`heading${item.itemNum}`} data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        <div className={`widget_product_content`}>
                                            <div
                                                className={`item`}
                                                key={'all'}
                                                onClick={(e) => selectSizeHandler({status:'all',option:item.title})}
                                            >
                                                {item.title === 'categories' ? 'all Categories' : item.title === 'sizes' ? 'all sizes' : ''}
                                            </div>
                                            {item.element}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                ))}

                        {/* <div className="widget_product_title">
                            {item.title}
                            <span> <Add  /> </span>
                        </div>
                        <div className={`widget_product_content`}>
                            <div
                                className="item"
                                key={'all'}
                                onClick={(e) => setClickOption({data:{title:item.title}})} 
                            >
                                {item.title === 'price' || item.title === 'rating' ? '' : 'all'}
                            </div>

                            {item.element}
                        </div>
                    </div> */}
                <button className="products_filter__btn" onClick={filterHandler}>filter</button>
            </div>
            {isLoading ? <p> <Spinner/> </p> : (
                <>
                    <motion.div className="products_group">
                        {currentProducts.map(p => (
                            <motion.div layout animate={{opacity:1}} initial={{opacity:0}} exit={{opacity:0}} key={p._id} className="product">
                                <Link to={`/product/${p._id}`}>
                                    <div className="product__img">
                                        <img src={p.images[0].url} alt="" />
                                    </div>
                                    <div className="product__info">
                                        <div className="product__info__category"> {p.category} </div>
                                        <div className="product__info__title">{p.name}</div>
                                        <div className="product__info__ratings"> <Rating rating={p.ratings} numReviews={p.reviews.length}/></div>
                                        <div className="product__info__founder"> by <span>moRa</span> </div>
                                        <div className="product__info__price"> ${p.price} </div>
                                        <div className="product__info__btn" onClick={() => detailsHandler(p._id)}> show </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </>
            )}

        </div>
        {productsPerPage <= filterProducts.length && (
            <Pagination currentPage={currentPage} totalProducts={filterProducts.length} productsPerPage={productsPerPage} paginate={paginate} />
        )}
    </div>
  )
}
