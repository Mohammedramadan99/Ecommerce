import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from './CheckoutSteps'



function ShippingAddress({setShowSignup}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userSignin = useSelector((state) => state.auth.userInfo);
  const { user } = userSignin;
  const cart = useSelector((state) => state.cart);
  const {products,total } = cart;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  
  const subtotal = products.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  // if total more than 1000 : shiiping price = 0 else case less than 1000  : shipping price will be 200 
  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const submitHandler = () => {
    const shippingInfo = 
    {
      fullName: firstName + lastName ,
      phone,
      address,
      city,
      postalCode,
      country,
    }
  const orderData = {
    shippingInfo,
    orderItems:products,
    itemsPrice:subtotal,
    taxPrice:tax,
    shippingPrice:shippingCharges,
    totalPrice
  }
    sessionStorage.setItem("orderInfo", JSON.stringify(orderData));
      navigate('/payment')
  }

  // const [lat, setLat] = useState(shippingAddress.lat);
  // const [lng, setLng] = useState(shippingAddress.lng);
  // const userAddressMap = useSelector((state) => state.userAddressMap);
  // const { address: addressMap } = userAddressMap;

  // to check if use logged in or not befor going to shipping 
  if (!user) {
    setShowSignup(true)
    // navigate('/signin');
  }
  
  // const submitHandler = (e) => {
  //   e.preventDefault();
    // const newLat = addressMap ? addressMap.lat : lat;
  //   const newLng = addressMap ? addressMap.lng : lng;
  //   if (addressMap) {
      // setLat(addressMap.lat);
      // setLng(addressMap.lng);
  //   }
  //   let moveOn = true;
    // if (!newLat || !newLng) {
  //     moveOn = window.confirm(
  //       'You did not set your location on map. Continue?'
  //     );
  //   }
  //   if (moveOn) {
  //     dispatch(
  //       saveShippingAddress({
  //         fullName,
  //         address,
  //         city,
  //         postalCode,
  //         country,
          // lat: newLat,
  //         lng: newLng,
  //       })
  //     );
  //     navigate('/payment');
  //   }
  // };
  
  // const chooseOnMap = () => {
  //   // dispatch(
  //   //   saveShippingAddress({
  //   //     firstName,
  //   //     lastName,
  //   //     phone,
  //   //     address,
  //   //     city,
  //   //     postalCode,
  //   //     country,
  //   //     // lat,
  //   //     // lng,
  //   //   })
  //   // );
  //   navigate('/map');
  // };
  return (
    <div className='shipping'>
      <div className="container">
      <CheckoutSteps step1 step2></CheckoutSteps>
        <div className="content">
          <div className="left">
            <div className='title'>
              <div className="h3">
                Billing details
              </div>
            </div>
            <form className="form">
              <div className="form_items">
                <div className='item'>
                  <label >first Name</label>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="Enter first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  ></input>
                </div>
                <div className='item'>
                  <label htmlFor="lastname">last Name</label>
                  <input
                    type="text"
                    id="lastname"
                    placeholder="Enter last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  ></input>
                </div>
                <div className='item'>
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    placeholder="Enter address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  ></input>
                </div>
                <div className='item'>
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  ></input>
                </div>
                <div className='item'>
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    id="country"
                    placeholder="Enter country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  ></input>
                </div>
                <div className='item'>
                  <label htmlFor="state">state</label>
                  <input
                    type="text"
                    id="state"
                    placeholder="Enter state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                  ></input>
                </div>
                <div className='item'>
                  <label htmlFor="phone">phone</label>
                  <input
                    type="text"
                    id="phone"
                    placeholder="Enter phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  ></input>
                </div>
                <div className='item'>
                  <label htmlFor="postalCode">Postal Code</label>
                  <input
                    type="text"
                    id="postalCode"
                    placeholder="Enter postal code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                  ></input>
                </div>
              </div>
            </form>
          </div>
          <div className="right">
            <div className="summery">
              <div className="h3">
                Order summary
              </div>
              <div className="cart_products">
                {products.map(p => (
                  <div className="product">
                    <div className="img">
                      <img src={p.image} alt="" />
                    </div>
                    <div className="info">
                      <div className="product_title"> {p.name} <span> x{p.quantity}  </span> </div>
                      <div className="product_size"></div>
                    </div>
                    <div className="price">
                      <p> {p.price} </p>
                    </div>
                  </div> 
                ))}
              </div>
              <div className="total_price">
                <p> total </p>
                <p> {total} </p>
              </div>
              <div className="order_btn" onClick={submitHandler} >
                place order
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShippingAddress