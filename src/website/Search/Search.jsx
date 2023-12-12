import React, { useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom';
import Authuser from '../Authentication/Authuser';
import { useState } from 'react';
 
const Search = () => {
  const { http, user ,token} = Authuser();
  const [Product, setProduct] = useState([]);                                                                                                                                                                      
    const location = useLocation();

  const [searchParams] = useSearchParams(location.search); // Use useSearchParams

  const query = searchParams.get('query');


  const filteredRecords = Product.filter(record =>
    record.english_name.toLowerCase().includes(query.toLowerCase())
  );
console.log(filteredRecords);

  const getProduct=()=>{
  
  http.get(`/products`)
.then((res) => {
  const filteredRecords = res.data.products.data.filter(record =>
    record.english_name.toLowerCase().includes(query.toLowerCase())
  );
setProduct(filteredRecords);
}).catch((e) => {
console.log(e);
});



}
useEffect(() => {
    getProduct();

  },[query]);
  return (
    <>
      <div className="product-area pt-60 pb-50">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="li-product-tab">
          <ul className="nav li-product-menu">
            <li><a className="active" data-toggle="tab" href="#li-new-product"><span> Search Product </span></a></li>
           
          </ul>               
        </div>
      </div>
    </div>
    <div className="tab-content">
      <div id="li-new-product" className="tab-pane active show" role="tabpanel">
        <div className="row">
       
{ Product.map((search)=>
(


  
            <div className="col-lg-3">
              <div className="single-product-wrap">
                <div className="product-image">
                  <a href="single-product.html">
                    <img src={search.product_image} height={'261px'} width={'261px'} alt="Li's Product Image" />
                  </a>
                  <span className="sticker">New</span>
                </div>
                <div className="product_desc">
                  <div className="product_desc_info">
                    <div className="product-review">
                      <h5 className="manufacturer">
                        <a href="shop-left-sidebar.html">Graphic Corner</a>
                      </h5>
                      <div className="rating-box">
                        <ul className="rating">
                          <li><i className="fa fa-star-o" /></li>
                          <li><i className="fa fa-star-o" /></li>
                          <li><i className="fa fa-star-o" /></li>
                          <li className="no-star"><i className="fa fa-star-o" /></li>
                          <li className="no-star"><i className="fa fa-star-o" /></li>
                        </ul>
                      </div>
                    </div>
                    <h4><a className="product_name" href="single-product.html">{search.english_name}</a></h4>
                    <div className="price-box">
                      <span className="new-price">$46.80</span>
                    </div>
                  </div>
                  <div className="add-actions">
                    <ul className="add-actions-link">
                      <li className="add-cart active"><a href="#">Add to cart</a></li>
                      <li><a className="links-details" href="wishlist.html"><i className="fa fa-heart-o" /></a></li>
                      <li><a href="#" title="quick view" className="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><i className="fa fa-eye" /></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
           
            ))}
          </div>
        </div>
      
      
    </div>
  </div>
</div>
    </>
  )
}

export default Search
