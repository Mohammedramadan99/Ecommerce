import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import cartServices from './cartService'
import {toast} from 'react-toastify'
const allProducts = JSON.parse(localStorage.getItem('products'))


const initialState = {
    products:[],
    shippingAddress:{},
    cartQuantity:0,
    total:0,
    isLoading: false,
    message:''
}

export const addProduct = createAsyncThunk('cart', async (product,thunkAPI) => {
    const {rejectWithValue,getState} = thunkAPI
    try {
        const getproduct = await cartServices.addItemsToCart(product)
        // const cartProducts = getState().cart.products
        return getproduct 
    } catch (error) {
        console.log(error.message);
        return rejectWithValue(error.message)   
    }
})
export const clearCart = createAsyncThunk('cart/clear', async (_,thunkAPI) => {
    const {rejectWithValue,getState} = thunkAPI
    try {
        return null
    } catch (error) {
        console.log(error.message);
        return rejectWithValue(error.message)   
    }
})
export const saveShippingAddress = createAsyncThunk('cart/shipping', async (shippingData,thunkAPI) => {
    const {rejectWithValue,getState} = thunkAPI
    try {
        return shippingData
    } catch (error) {
        console.log(error.message);
        return rejectWithValue(error.message)   
    }
})
// export const addReview = createAsyncThunk('products/review', async (review,thunkAPI) => {
//     return await productsService.newReview(review)
// })


export const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        reset: state => {
            state.isLoading = false
            state.message = ''
        },
        addToCart(state, action) {
            const product = action.payload;
            const existingIndex = state.products.findIndex(
              (item) => item.id === product.id
            );
      
            if (existingIndex >= 0) {
              state.products[existingIndex] = {
                ...state.products[existingIndex],
              };

              state.products[existingIndex].activeSize = product.activeSize;
              state.products[existingIndex].quantity = product.quantity;

            } else {
              let tempProductItem = { ...product };
              state.products.push(tempProductItem);
            }
            localStorage.setItem("products", JSON.stringify(state.products));
            state.total = state.products.reduce((a, c) => a + c.price * c.quantity, 0)
            state.cartQuantity = state.products.reduce((a, c) => a + c.quantity, 0)
          },
        increaseCart(state, action) {
          const product = action.payload;
          const itemIndex = state.products.findIndex(
            (item) => item.id === product.id
          );
          console.log(product)
          
          if (product.quantity >= state.products[itemIndex].Stock) {
            state.products[itemIndex].quantity = state.products[itemIndex].Stock;
          } else {
            state.products[itemIndex].quantity += 1;
          }
          
          state.total = state.products.reduce((a, c) => a + c.price * c.quantity, 0)
          state.cartQuantity = state.products.reduce((a, c) => a + c.quantity, 0)
          localStorage.setItem("products", JSON.stringify(state.products));
        },
        decreaseCart(state, action) {
          const product = action.payload;
          const itemIndex = state.products.findIndex(
            (item) => item.id === product.id
          );
            
          if (state.products[itemIndex].quantity > 1) {
            state.products[itemIndex].quantity -= 1;
    
          } else if (state.products[itemIndex].quantity === 1) {
            const nextCartItems = state.products.filter(
              (item) => item.id !== product.id
            );
    
            state.products = nextCartItems;

          }
          state.total = state.products.reduce((a, c) => a + c.price * c.quantity, 0)
          state.cartQuantity = state.products.reduce((a, c) => a + c.quantity, 0)
    
          localStorage.setItem("products", JSON.stringify(state.products));
        },
        removeFromCart(state, action) {
          const product = action.payload;
          state.products.map((cartItem) => {
            if (cartItem.id === product.id) {
              const nextCartItems = state.products.filter(
                (item) => item.id !== cartItem.id
              );
    
              state.products = nextCartItems;
            }
            state.total = state.products.reduce((a, c) => a + c.price * c.quantity, 0)
            state.cartQuantity = state.products.reduce((a, c) => a + c.quantity, 0)

            localStorage.setItem("products", JSON.stringify(state.products));
            return state;
          });
        },
    },
    extraReducers: builder => {
        builder
        .addCase(addProduct.pending, state => {
            state.isLoading = true
        })
        .addCase(addProduct.fulfilled, (state,{payload}) => {
            state.isLoading = false 
            state.quantity += 1
            state.products.push(payload)
            state.total = payload.price * payload.quantity
        })
        .addCase(addProduct.rejected, (state,{payload}) => {
            state.isLoading = false
            state.message = payload
            state.products = []
        })
        .addCase(clearCart.pending, state => {
            state.isLoading = true
        })
        .addCase(clearCart.fulfilled, (state,{payload}) => {
            state.isLoading = false 
            state.quantity = 0
            state.products = []
            state.total = 0
        })
        .addCase(clearCart.rejected, (state,{payload}) => {
            state.isLoading = false
            state.message = payload
        })
        .addCase(saveShippingAddress.pending, state => {
            state.isLoading = true
        })
        .addCase(saveShippingAddress.fulfilled, (state,{payload}) => {
            state.isLoading = false
            state.shippingInfo = payload
        })
        .addCase(saveShippingAddress.rejected, (state,{payload}) => {
            state.isLoading = false
            state.message = payload
            state.products = []
        })
    }
})


export const {reset,addToCart,increaseCart,decreaseCart,removeFromCart} = cartSlice.actions 

export default cartSlice.reducer


// addToCart: (state, action) => {
//     // const existingIndex = state.products.findIndex(
//     //   (item) => item.id === action.payload.id
//     // );
//     //     console.log(action.payload)
//     // if (existingIndex >= 0) {
//     //   state.products[existingIndex] = {
//     //     ...state.products[existingIndex],
//     //     quantity: action.payload.quantity ,
//     //     activeSize: action.payload.activeSize
//     //   };
      
//     //   toast.info("Increased product quantity", {
//     //     position: "bottom-left",
//     //   });
//     // } else {
//     //   let tempProductItem = { ...action.payload };
//     //   state.products.push(tempProductItem);
//     //   toast.success("Product added to cart", {
//     //     position: "bottom-left",
//     //   });

//     // }

//     const item = action.payload;
//     // console.log(item.product.id)
//     // const existItem = state.products.map((x) =>{
//     //     if (x.id === item.product.id) {
//     //         return x.id === item.product.id
//     //     } else {
//     //         return null
//     //     }
//     // });

//     // state.products.map( x => {
//     //     if (x.id === item.product.id) {
//     //         x.quantity = item.product.quantity
//     //     } 
//     // })
    
//     const existItem = state.products.find((x) => x.id === item.product.id);

//     console.log(existItem)
//     if (existItem) {
//         state.products = state.products.map((x) =>
//             x.id === existItem.id ? item : x
//         )
//     } else {
//         const tempProduct = {...action.payload.product}
//         console.log("s" + action.payload)
//         state.products.push(tempProduct)
//     }

//     state.total = state.products.reduce((a, c) => a + c.price * c.quantity, 0)
//     state.cartQuantity = state.products.reduce((a, c) => a + c.quantity, 0)

//     localStorage.setItem("products", JSON.stringify(state.products));
// },