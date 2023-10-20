import React from 'react'
import Authuser from '../Authentication/Authuser';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { http, user ,token} = Authuser();
  const [Cart, setCart] = useState([]);
//   const [Cart, setCart] = useState([]);
const [subtotal, setSubtotal] = useState(0);
const [subto, setSubto] = useState(0);
const [gst, setGst] = useState(0);
const [pv, setPv] = useState(0);
const [disc, setDisc] = useState(0);
    const getCartItem = () => {
        http.get(`/get-cart-list`)
        .then((res) => {
          setCart(res.data.cart);
          console.log(res.data.cart);
      }).catch((e) => {
          console.log(e);
      });
    
      
         
      }
      useEffect(() => {
        getCartItem();
      }, [token]);
      useEffect(() => {
        // Calculate the subtotal whenever the cart items change
        
        const newSubtotal = Cart.reduce(
          (accumulator, item) => accumulator + item.online_price * item.cart_product_qty,
          0
        );
        setSubtotal(newSubtotal);

        // Calculate the Gst whenever the cart items change
        // $gst = ($subto * $task->tax_per) / (100 + $task->tax_per);
        const gst = Cart.reduce(
            (accumulator, item) => accumulator + (item.online_price*item.cart_product_qty*item.tax_per)/(100+item.tax_per),
            0
          );
          setGst(gst);
        // Calculate the P v whenever the cart items change

        const pv = Cart.reduce(
            (accumulator, item) => accumulator + item.point_value,
            0
          );
          setPv(pv);
        // Calculate the Discount whenever the cart items change

        const disc = Cart.reduce(
            (accumulator, item) => {
                console.log('Total Discount:', item.total_discount);
                const totalDiscount = parseFloat(item.total_discount);
  return accumulator + totalDiscount;
            }
          ,
            0
          );
          setDisc(disc);
          console.log(disc);
      }, [Cart]);
  return (
   <div>
  {/* Begin Li's Breadcrumb Area */}
  <div className="breadcrumb-area">
    <div className="container">
      <div className="breadcrumb-content">
        <ul>
          <li><a href="index.html">Home</a></li>
          <li className="active">Shopping Cart</li>
        </ul>
      </div>
    </div>
  </div>
  {/* Li's Breadcrumb Area End Here */}
  {/*Shopping Cart Area Strat*/}
  <div className="Shopping-cart-area pt-60 pb-60">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <form action="#">
            <div className="table-content table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th className="li-product-remove">remove</th>
                    <th className="li-product-thumbnail">images</th>
                    <th className="cart-product-name">Product</th>
                    <th className="li-product-price">Unit Price</th>
                    <th className="li-product-quantity">Quantity</th>
                    <th className="li-product-subtotal">Tax</th>
                    <th className="li-product-subtotal">P.v</th>
                    <th className="li-product-subtotal">Total</th>
                  </tr>
                </thead>
                <tbody>
                    {
                    
                    Cart.map((item)=>(

                      
                  <tr>
                    
                    <td className="li-product-remove"><a href="#"><i className="fa fa-times" /></a></td>
                    <td className="li-product-thumbnail"><a href="#"><img width={150} height={150} src={'https://vsmart.ajspire.com/uploads/product_image/'+item.product_image} alt="Li's Product Image" /></a></td>
                    <td className="li-product-name"><a href="#">{item.english_name}</a></td>
                    <td className="li-product-price"><span className="amount">&#8377;{item.online_price}</span></td>
                    <td className="quantity">
                      <label>Quantity</label>
                      <div className="cart-plus-minus">
                        <input className="cart-plus-minus-box" value={item.cart_product_qty} type="text" />
                        <div className="dec qtybutton"><i className="fa fa-angle-down" /></div>
                        <div className="inc qtybutton"><i className="fa fa-angle-up" /></div>
                      </div>
                    </td>                                              
                    <td className="product-subtotal"><span className="amount">&#8377;{((item.online_price*item.cart_product_qty*item.tax_per)/(100+item.tax_per)).toFixed(2)}</span></td>
                    <td className="product-subtotal"><span className="amount">{ item.point_value }</span></td>
                   
                    <td className="product-subtotal"><span className="amount">&#8377;{item.online_price*item.cart_product_qty}</span></td>
                  </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="coupon-all">
                  <div className="coupon">
                    <input id="coupon_code" className="input-text" name="coupon_code" defaultValue placeholder="Coupon code" type="text" />
                    <input className="button" name="apply_coupon" defaultValue="Apply coupon" type="submit" />
                  </div>
                  <div className="coupon2">
                    <input className="button" name="update_cart" defaultValue="Update cart" type="submit" />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-5 ml-auto">
                <div className="cart-page-total">
                  <h2>Cart totals</h2>
                  <ul>
                    <li>Subtotal <span>&#8377;{subtotal.toFixed(2)}</span></li>
                    <li>Gst <span>&#8377;{gst.toFixed(2)}</span></li>
                    <li>P V Value <span>&#8377;{pv.toFixed(2)}</span></li>
                    <li>Discount <span>&#8377;{disc.toFixed(2)}</span></li>
                    <li>Total <span>&#8377;{subtotal.toFixed(2)}</span></li>
                  </ul>
                  <Link to={'/checkout'}>Proceed to checkout</Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  {/*Shopping Cart Area End*/}
</div>

  )
}

export default Cart
