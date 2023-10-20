import React from 'react'
import Authuser from '../Authentication/Authuser';
import { useState } from 'react';
import { useEffect } from 'react';

const Checkout = () => {
    const { http, user ,token} = Authuser();
    const [Cart, setCart] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [gst, setGst] = useState(0);
    const [pv, setPv] = useState(0);
    const [disc, setDisc] = useState(0);
    const [Order, setOder] = useState({
      product_id: [], // An array of product IDs
      product_qty: [], // An array of product quantities
      online_price: [], // An array of product prices
      discount: [], // An array of discounts
      pv_value: [], // An array of point values
      prototal: [], // An array of subtotals
      gst: [], // An array of GST values
  
      order_address: user.address, // Address for the order
      paymentmode: '', // Payment mode (adjust as needed)
      totalgst: '', // Total GST
  
      total: '', // Total order amount
      total_discount: '', // Total order discount
      totalpv: '', // Total point value
    })
  
    // const [product_id, setproduct_id] = useState([]);
    // console.log('ids',product_id);
     
    // console.log(Order)

    const getCartItem = () => {
      http.get(`/get-cart-list`)
        .then((res) => {
          const cartdata = res.data.cart;
          // console.log(cartdata);
                  const productIds = [];
                  const productQtys = [];
                  const productPrices = [];
                  const productDiscounts = [];
                  const productPvValues = [];
                  const productTotals = [];
                  const productGsts = [];
          
                  cartdata.forEach((item) => {
                    productIds.push(item.product_id);
                    productQtys.push(item.cart_product_qty);
                    productPrices.push(item.online_price);
                    productDiscounts.push(item.discount);
                    productPvValues.push(item.point_value);
                    productTotals.push(item.cart_price);
                    productGsts.push(item.tax_per);
          
          
                  })
          
                  // Assuming the response contains the list of cart items
          
                  setOder((prevOrder) => ({
                    ...prevOrder,
                    product_id: productIds, // An array of product IDs
                    product_qty: productQtys, // An array of product quantities
                    online_price: productPrices, // An array of product prices
                    discount: productDiscounts, // An array of discounts
                    pv_value: productPvValues, // An array of point values
                    prototal: productTotals, // An array of subtotals
                    gst: productGsts,
          
                  }))
          
                  setCart(cartdata);
                })
    };
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
            // console.log(disc);



            setOder((prevOrder) => ({
              ...prevOrder,
              total: newSubtotal,
              totalgst: gst,
              total_discount: disc,
              totalpv: pv,
            }));

        }, [Cart]);

        const OninputChange = (e) => {
          console.log(e);
          // Set({ ...Order, [e.target.name]: e.target.value });
          setOder((prevOrder) => ({
            ...prevOrder,
           [e.target.name]: e.target.value
          }));
        }
        
        const placeOrder = (e) => {
            console.log(Order);

          e.preventDefault();
          // console.log(Order.product_id);
          http.post(`/order_now`,Order)
            .then((res) => {
              console.log(res.data);
              
            }).catch(function(er){
              console.log(er);
            });
        
      };
  return (
   <div>
  {/* Begin Li's Breadcrumb Area */}
  <div className="breadcrumb-area">
    <div className="container">
      <div className="breadcrumb-content">
        <ul>
          <li><a href="index.html">Home</a></li>
          <li className="active">Checkout</li>
        </ul>
      </div>
    </div>
  </div>
  {/* Li's Breadcrumb Area End Here */}
  {/*Checkout Area Strat*/}
  <div className="checkout-area pt-60 pb-30">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="coupon-accordion">
            {/*Accordion Start*/}
            <h3>Returning customer? <span id="showlogin">Click here to login</span></h3>
            <div id="checkout-login" className="coupon-content">
              <div className="coupon-info">
                <p className="coupon-text">Quisque gravida turpis sit amet nulla posuere lacinia. Cras sed est sit amet ipsum luctus.</p>
                <form action="#">
                  <p className="form-row-first">
                    <label>Username or email <span className="required">*</span></label>
                    <input type="text" />
                  </p>
                  <p className="form-row-last">
                    <label>Password  <span className="required">*</span></label>
                    <input type="text" />
                  </p>
                  <p className="form-row">
                    <input defaultValue="Login" type="submit" />
                    <label>
                      <input type="checkbox" />
                      Remember me 
                    </label>
                  </p>
                  <p className="lost-password"><a href="#">Lost your password?</a></p>
                </form>
              </div>
            </div>
            {/*Accordion End*/}
            {/*Accordion Start*/}
            <h3>Have a coupon? <span id="showcoupon">Click here to enter your code</span></h3>
            <div id="checkout_coupon" className="coupon-checkout-content">
              <div className="coupon-info">
                <form action="#">
                  <p className="checkout-coupon">
                    <input placeholder="Coupon code" type="text" />
                    <input defaultValue="Apply Coupon" type="submit" />
                  </p>
                </form>
              </div>
            </div>
            {/*Accordion End*/}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-12">
          <form action="#">
            <div className="checkbox-form">
              <h3>Billing Details</h3>
              <div className="row">
                <div className="col-md-12">
                  <div className="country-select clearfix">
                    <label>Country <span className="required">*</span></label>
                    <select className="nice-select wide">
                      <option data-display="Bangladesh">Bangladesh</option>
                      <option value="uk">London</option>
                      <option value="rou">Romania</option>
                      <option value="fr">French</option>
                      <option value="de">Germany</option>
                      <option value="aus">Australia</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="checkout-form-list">
                    <label>First Name <span className="required">*</span></label>
                    <input placeholder type="text" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="checkout-form-list">
                    <label>Last Name <span className="required">*</span></label>
                    <input placeholder type="text" />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="checkout-form-list">
                    <label>Company Name</label>
                    <input placeholder type="text" />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="checkout-form-list">
                    <label>Address <span className="required">*</span></label>
                    <input placeholder="Street address" type="text" />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="checkout-form-list">
                    <input placeholder="Apartment, suite, unit etc. (optional)" type="text" />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="checkout-form-list">
                    <label>Town / City <span className="required">*</span></label>
                    <input type="text" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="checkout-form-list">
                    <label>State / County <span className="required">*</span></label>
                    <input placeholder type="text" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="checkout-form-list">
                    <label>Postcode / Zip <span className="required">*</span></label>
                    <input placeholder type="text" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="checkout-form-list">
                    <label>Email Address <span className="required">*</span></label>
                    <input placeholder type="email" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="checkout-form-list">
                    <label>Phone  <span className="required">*</span></label>
                    <input type="text" />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="checkout-form-list create-acc">
                    <input id="cbox" type="checkbox" />
                    <label>Create an account?</label>
                  </div>
                  <div id="cbox-info" className="checkout-form-list create-account">
                    <p>Create an account by entering the information below. If you are a returning customer please login at the top of the page.</p>
                    <label>Account password  <span className="required">*</span></label>
                    <input placeholder="password" type="password" />
                  </div>
                </div>
              </div>
              <div className="different-address">
                <div className="ship-different-title">
                  <h3>
                    <label>Ship to a different address?</label>
                    <input id="ship-box" type="checkbox" />
                  </h3>
                </div>
                <div id="ship-box-info" className="row">
                  <div className="col-md-12">
                    <div className="country-select clearfix">
                      <label>Country <span className="required">*</span></label>
                      <select className="nice-select wide">
                        <option data-display="Bangladesh">Bangladesh</option>
                        <option value="uk">London</option>
                        <option value="rou">Romania</option>
                        <option value="fr">French</option>
                        <option value="de">Germany</option>
                        <option value="aus">Australia</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkout-form-list">
                      <label>First Name <span className="required">*</span></label>
                      <input placeholder type="text" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkout-form-list">
                      <label>Last Name <span className="required">*</span></label>
                      <input placeholder type="text" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkout-form-list">
                      <label>Company Name</label>
                      <input placeholder type="text" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkout-form-list">
                      <label>Address <span className="required">*</span></label>
                      <input placeholder="Street address" type="text" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkout-form-list">
                      <input placeholder="Apartment, suite, unit etc. (optional)" type="text" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkout-form-list">
                      <label>Town / City <span className="required">*</span></label>
                      <input type="text" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkout-form-list">
                      <label>State / County <span className="required">*</span></label>
                      <input placeholder type="text" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkout-form-list">
                      <label>Postcode / Zip <span className="required">*</span></label>
                      <input placeholder type="text" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkout-form-list">
                      <label>Email Address <span className="required">*</span></label>
                      <input placeholder type="email" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="checkout-form-list">
                      <label>Phone  <span className="required">*</span></label>
                      <input type="text" />
                    </div>
                  </div>
                </div>
                <div className="order-notes">
                  <div className="checkout-form-list">
                    <label>Order Notes</label>
                    <textarea id="checkout-mess" cols={30} rows={10} placeholder="Notes about your order, e.g. special notes for delivery." defaultValue={""} />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="col-lg-6 col-12">
          <div className="your-order">
            <h3>Your order</h3>
            <div className="your-order-table table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th className="cart-product-name">Product</th>
                    <th className="cart-product-total">Total</th>
                  </tr>
                </thead>
                <tbody>
                {
                    
                    Cart.map((item)=>(

                  <tr className="cart_item">
                    <td className="cart-product-name"> {item.english_name}<strong className="product-quantity"> × {item.cart_product_qty}</strong></td>
                    <td className="cart-product-total"><span className="amount">&#8377;{item.online_price*item.cart_product_qty}</span></td>  
                  </tr>
                    ))}
                </tbody>
                <tfoot>
                  <tr className="cart-subtotal">
                    <th>Cart Subtotal</th>
                    <td><span className="amount">&#8377;{subtotal.toFixed(2)}</span></td>
                  </tr>
                  <tr className="cart-subtotal">
                    <th>Cart Gst</th>
                    <td><span className="amount">&#8377;{gst.toFixed(2)}</span></td>
                  </tr>
                  <tr className="cart-subtotal">
                    <th>Cart P V Value</th>
                    <td><span className="amount">&#8377;{pv.toFixed(2)}</span></td>
                  </tr>
                  <tr className="cart-subtotal">
                    <th>Cart Discount</th>
                    <td><span className="amount">&#8377;{disc.toFixed(2)}</span></td>
                  </tr>
                  <tr className="order-total">
                    <th>Order Total</th>
                    <td><strong><span className="amount">&#8377;{subtotal.toFixed(2)}</span></strong></td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="payment-method">
              <div className="payment-accordion">
                <div id="accordion">
                  <div className="card">
                    <div className="card-header" id="#payment-1">
                      <h5 className="panel-title">
                        <a className data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                          Direct Bank Transfer.
                        </a>
                      </h5>
                    </div>
                    <div id="collapseOne" className="collapse show" data-parent="#accordion">
                      <div className="card-body">
                        <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</p>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header" id="#payment-2">
                      <h5 className="panel-title">
                      <input type="checkbox" name="paymentmode" onClick={(e)=>OninputChange(e)}  className="form-control" value={'cash on delivery'} />
                       
                      </h5>
                    </div>
                    <div id="collapseTwo" className="collapse" data-parent="#accordion">
                      <div className="card-body">
                        <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</p>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header" id="#payment-3">
                      <h5 className="panel-title">
                        <a className="collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                          PayPal
                        </a>
                      </h5>
                    </div>
                    <div id="collapseThree" className="collapse" data-parent="#accordion">
                      <div className="card-body">
                        <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-button-payment">
                  <input  type="submit" onClick={(e)=>placeOrder(e)}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/*Checkout Area End*/}
</div>

  )
}

export default Checkout
