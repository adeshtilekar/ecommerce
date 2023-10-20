import React, { useEffect, useState } from 'react'
import Authuser from '../Authentication/Authuser';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { http, user ,token} = Authuser();
  const[Wishlist,setWishlist]=useState([]);
  const[setwish,setWish]=useState([]);
console.log(Wishlist);


    const getWishItem = () => {
        http.get(`/get-wishlist`)
        .then((res) => {
            // console.log(res.data);
            setWishlist(res.data.wishlist);
          // console.log(res.data.cart.length);
      }).catch((e) => {
          console.log(e);
      });
         
      }

      const addTocart=(product_id)=>{
        // console.log(product_id);
        http.get(`/add-to-cart/${product_id}`).then((res)=>{console.log(res.data);}).catch((e)=>{console.log(e);});
        }
        const removewishlist=(wish_id)=>{
            // console.log(wish_id);
            http.get(`/remove-from-wishlist/${wish_id}`).then((res)=>{
                // console.log(res.data);
                setWish(wish_id);
           console.log(setWishlist((prevWishlist) => prevWishlist.filter(item => item.wish_id !== wish_id)));
            }).catch((e)=>{console.log(e);});
            
        }
      useEffect(()=>{
        getWishItem();
      },[token , setwish ])
  return (
    <div>
    
  {/* Begin Li's Breadcrumb Area */}
  <div className="breadcrumb-area">
    <div className="container">
      <div className="breadcrumb-content">
        <ul>
          <li><a href="index.html">Home</a></li>
          <li className="active">Wishlist</li>
        </ul>
      </div>
    </div>
  </div>
  {/* Li's Breadcrumb Area End Here */}
  {/*Wishlist Area Strat*/}
  <div className="wishlist-area pt-60 pb-60">
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
                    <th className="li-product-stock-status">Stock Status</th>
                    <th className="li-product-add-cart">add to cart</th>
                  </tr>
                </thead>
                <tbody>
              {Wishlist.map((item)=>(


                  <tr>
                    <td className="li-product-remove">
                    
                      <li onClick={()=>removewishlist(item.wishe_id)}><i className="fa fa-times" /></li>
                    </td>
                    <td className="li-product-thumbnail">
                      <a href="#"><img src={'https://vsmart.ajspire.com/uploads/product_image/'+item.product_image} width={90} height={90} alt /></a>
                    </td>
                    <td className="li-product-name">
                      <a href="#">{item.english_name}</a>
                    </td>
                    <td className="li-product-price">
                      <span className="amount">${item.online_price}</span>
                    </td>
                    <td className="li-product-stock-status">
                      <span className="in-stock">in stock</span>
                    </td>
                    <td className="li-product-add-cart">

                      <Link onClick={()=>addTocart(item.product_id)}>add to cart</Link>
                     
                    </td>
                  </tr>
              ))}
                 
                </tbody>
              </table>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  {/*Wishlist Area End*/}
</div>

   
  )
}

export default Wishlist
