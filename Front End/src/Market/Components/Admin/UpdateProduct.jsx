import React, { useState, useEffect } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import SideBar from './Sidebar'
import { AccountTree, Description, Storage, Spellcheck, AttachMoney } from '@mui/icons-material'
import { reset, updateProduct } from '../../redux/product/productSlice'

export default function UpdateProduct() {
    const dispatch = useDispatch()

    const navigate = useNavigate()
    
    const {id} = useParams()

    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        'shirts',
        'coats',
        'bags',
        'sneakers',
        'glasses',
        'dresses'
    ];

    useEffect(() => {
        if (isError) {
            toast.error(message);
            dispatch(reset());
        }

        if (isSuccess) {
            toast.success("Product Created Successfully");
            navigate("/admin/dashboard");
        }
    }, [dispatch, toast, isError, navigate, isSuccess]);

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("Stock", Stock);

        images.forEach((image) => {
            myForm.append("images", image);
        });

        const updatedProductData = {
            name,price,description,category,Stock,images
        }
        const data = {
            id,
            updatedProductData
        }
        console.log(data)
        dispatch(updateProduct(data));
    };

    const updateProductImagesChange = (e) => {
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

            reader.readAsDataURL(file);
        });
    };

    return (
        <>
            {/* <MetaData title="Create Product" /> */}
            <div className="admin">
                <SideBar />
                <div className="updateProductContainer" data-aos="zoom-in">
                    <div className="productListHeading">update Product</div>
                    <form
                        className="updateProductForm"
                        encType="multipart/form-data"
                        onSubmit={updateProductSubmitHandler}
                    >
                        
                        <div className="item">
                            <Spellcheck />
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="item">
                            <AttachMoney />
                            <input
                                type="number"
                                placeholder="Price"
                                required
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div className="item">
                            <Description />

                            <textarea
                                placeholder="Product Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>

                        {/* category */}
                        <div className="item">
                            <AccountTree />
                            <select onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="item">
                            <Storage />
                            <input
                                type="number"
                                placeholder="Stock"
                                required
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>

                        {/* file upload */}
                        <div id="updateProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={updateProductImagesChange}
                                multiple
                            />
                        </div>

                        <div id="updateProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                        </div>

                        <button
                            id="updateProductBtn"
                            type="submit"
                            disabled={isLoading ? true : false}
                            className="form-btn"
                        >
                            update
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
