import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import {
    reset,
    getProductReviews,
    deleteReview,
} from "../../redux/product/productSlice";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Star from "@mui/icons-material/Star";

import SideBar from "./Sidebar";

const ProductReviews = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { error: deleteError, isDeleted,message } = useSelector(
        (state) => state.products.review
    );

    const { isError, reviews, isLoading } = useSelector(
        (state) => state.products.productReviews
    );

    const [productId, setProductId] = useState("");

    const deleteReviewHandler = (reviewId) => {
        const data = {reviewId,productId}
        dispatch(deleteReview(data));
    };

    const productReviewsSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(getProductReviews(productId));
    };

    useEffect(() => {
        if (productId.length === 24) {
            dispatch(getProductReviews(productId));
        }
        if (isError) {
            toast.error(message);
            dispatch(reset());
        }

        if (deleteError) {
            toast.error(deleteError);
            dispatch(reset());
        }

        if (isDeleted) {
            toast.success("Review Deleted Successfully");
            navigate("/admin/reviews");
            dispatch(reset());
        }
    }, [dispatch, toast, Error, deleteError, isDeleted, productId]);

    const columns = [
        { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },
        {
            field: "user",
            headerName: "User",
            minWidth: 200,
            flex: 0.6,
        },

        {
            field: "comment",
            headerName: "Comment",
            minWidth: 350,
            flex: 1,
        },

        {
            field: "rating",
            headerName: "Rating",
            type: "number",
            minWidth: 180,
            flex: 0.4,

            cellClassName: (params) => {
                return params.getValue(params.id, "rating") >= 3
                    ? "greenColor"
                    : "redColor";
            },
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Button
                            onClick={() =>
                                deleteReviewHandler(params.getValue(params.id, "id"))
                            }
                        >
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                );
            },
        },
    ];

    const rows = [];

    reviews &&
        reviews.forEach((item) => {
            rows.push({
                id: item._id,
                rating: item.rating,
                comment: item.comment,
                user: item.name,
            });
        });

    return (
        <Fragment>


            <div className="admin">
                <SideBar />
                <div className="productReviewsContainer" data-aos="zoom-in">
                    <form
                        className="productReviewsForm"
                        onSubmit={productReviewsSubmitHandler}
                    >
                    <div className="productReviewsFormHeading">ALL REVIEWS</div>

                        <div>
                            <Star />
                            <input
                                type="text"
                                placeholder="Product Id"
                                required
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                            />
                        </div>

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={
                                isLoading ? true : false || productId === "" ? true : false
                            }
                        >
                            Search
                        </Button>
                    </form>
                  
                    {reviews && reviews.length > 0 ? (
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            className="productListTable"
                            autoHeight
                        />
                    ) : (
                        <h1 className="productReviewsFormHeading">No Reviews Found</h1>
                    )}
                      <h1>
                        you can here put some info about the product
                    </h1>
                </div>
                
            </div>
        </Fragment>
    );
};

export default ProductReviews;
