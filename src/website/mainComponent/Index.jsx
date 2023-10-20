import React, { useEffect, useState } from 'react'
import axios from "axios";

import { Carousel } from 'react-bootstrap'
import AliceCarousel from 'react-alice-carousel';
import Authuser from '../Authentication/Authuser';
import { Link } from 'react-router-dom';

const Index = () => {
  const { http, user ,token} = Authuser();
  const [Product, setProduct] = useState([]);
  const [Slider, setSlider] = useState([]);
  const [Category, setCategory] = useState([]);
  const [Brand, setBrand] = useState([]);

const getProduct=()=>{
http.get(`/products`).then((res) => {setProduct(res.data.products.data);}).catch((e) => {console.log(e);});
}

const getSlider=()=>{
  http.get(`/banners`).then((res) => {setSlider(res.data.banners);}).catch((e) => {console.log(e);});
}
const getBrand=()=>{
  http.get(`/brands`).then((res) =>{setBrand(res.data.brands);}).catch((e) => {console.log(e);});
}
const getCategory=()=>{
  http.get(`/categories`).then((res) => {setCategory(res.data.categories);}).catch((e) => {console.log(e);});
}

    useEffect(() => {
      getProduct(); getSlider(); getBrand(); getCategory();
    },[]);

// const [productid,Setproductid]= useState('');
const addTocart=(product_id)=>{
  // console.log(product_id);
  http.get(`/add-to-cart/${product_id}`).then((res)=>{console.log(res.data);}).catch((e)=>{console.log(e);});
  }
    // const [productid,Setproductid]= useState('');
const addTowish=(product_id)=>{
  console.log(product_id);
  http.get(`/add-to-wishlist/${product_id}`).then((res)=>{console.log(res.data);}).catch((e)=>{console.log(e);});
  }
  
  return (
    <div>
<div className="slider-with-banner">
  <div className="container">
    <div className="row">
      <div className="col-lg-8 col-md-8">
        <div className="slider-area">
          <div className="slider-active ">

            <Carousel>
          {Slider.map((slider) => (


            <Carousel.Item>
              <div class="carousel-item active" >
                <img style={{width:"100%" , height:"500px"}}    src={slider.slider_image} alt=""  />
                <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div class="p-3" style={{ maxWidth: "700px" }}>
                    
                  </div>
                </div>
              </div>
            </Carousel.Item>
          ))}

        </Carousel>
          </div>
        </div>
      </div>
      
      <div className="col-lg-4 col-md-4 text-center pt-xs-30">
        <div className="li-banner">
          <a href="#">
            <img src="images/banner/1_1.jpg" alt />
          </a>
        </div>
        <div className="li-banner mt-15 mt-sm-30 mt-xs-30">
          <a href="#">
            <img src="images/banner/1_2.jpg" alt />
          </a>
        </div>
      </div>
    </div>
  </div>
</div>




<div className="product-area pt-60 pb-50">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="li-product-tab">
          <ul className="nav li-product-menu">
            <li><a className="active" data-toggle="tab" href="#li-new-product"><span> Featured Product </span></a></li>
           
          </ul>               
        </div>
      </div>
    </div>
    <div className="tab-content">
      <div id="li-new-product" className="tab-pane active show" role="tabpanel">
        <div className="row">
       
{ Product.filter((featured)=>featured.featured==0).slice(0,8).map((featured)=>
(


  
            <div className="col-lg-3 col-md-4 col-6">
              <div className="single-product-wrap">
                <div className="product-image">
                  <a href="single-product.html">
                    <img src={featured.product_image} height={'261px'} width={'261px'} alt="Li's Product Image" />
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
                    <h4><a className="product_name" href="single-product.html">{featured.english_name}</a></h4>
                    <div className="price-box">
                      <span className="new-price">${featured.online_price}</span>
                    </div>
                  </div>
                  <div className="add-actions">
                    <ul className="add-actions-link">
                      <li className="add-cart active">{token ?                               (  <Link  onClick={()=>addTocart(featured.product_id)} >Add to cart </Link>):(
                            <Link to={'/login'}> Add to cart </Link>
                        )}</li>
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

<section className="product-area li-laptop-product pt-60 pb-45">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="li-section-title">
          <h2>
            <span>Product</span>
          </h2>
          <ul className="li-sub-category-list">
            <li className="active"><a href="shop-left-sidebar.html">Prime Video</a></li>
            <li><a href="shop-left-sidebar.html">Computers</a></li>
            <li><a href="shop-left-sidebar.html">Electronics</a></li>
          </ul>
        </div>
        <div className="row">
        { Product.slice(0,12).map((product)=>
(


  
            <div className="col-lg-3 col-md-4 col-6">
              <div className="single-product-wrap">
                <div className="product-image">
                  <a href="single-product.html">
                    <img src={product.product_image} height={'261px'} width={'261px'} alt="Li's Product Image" />
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
                    <h4><a className="product_name" href="single-product.html">{product.english_name}</a></h4>
                    <div className="price-box">
                      <span className="new-price">${product.online_price}</span>
                    </div>
                  </div>
                  <div className="add-actions">
                    <ul className="add-actions-link">
                      <li className="add-cart active">

                        {token ?                               (  <Link  onClick={()=>addTocart(product.product_id)} >Add to cart</Link>):(
                            <Link to={'/login'}> Add to cart </Link>
                        )}
                      
                        
                        </li>
                      <li>
                      {token ?                               (  <Link className="links-details" onClick={()=>addTowish(product.product_id)} ><i className="fa fa-heart-o" /></Link>):(
                            <Link  className="links-details" to={'/login'}><i className="fa fa-heart-o" /></Link>
                        )}
                      
                      </li>
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
</section>



<section className="product-area li-laptop-product pt-60 pb-45">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="li-section-title">
          <h2>
            <span>Categories</span>
          </h2>
          
        </div>
        <div className="row">
        <AliceCarousel 
      mouseTracking
      items={Category.map((category) => (
        <div key={category.category_banner} className="slider-image-container" >
          <img src={category.category_banner} alt={category.category_name} height={'150px'} width={'180px'} className="slider-image" />
        </div>
      ))}
      
      responsive={{
        0: { items: 1 },
        576: { items: 2 },
        768: { items: 3 },
        992: { items: 4 },
        1200: { items: 5 },
      }}
      autoPlay
      autoPlayInterval={2000}
      infinite
    />
        </div>
      </div>
    </div>
  </div>
</section>



<section className="product-area li-laptop-product li-tv-audio-product pb-45">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="li-section-title">
          <h2>
            <span>Brands</span>
          </h2>
          
        </div>
        <div className="row">
        <AliceCarousel 
      mouseTracking
      items={Brand.slice(0,20).map((brand) => (
        <div key={brand.brand_banner} className="slider-image-container" >
          <img src={brand.brand_banner} alt={brand.brand_name} height={'150px'} width={'180px'} className="slider-image" />
        </div>
      ))}
      
      responsive={{
        0: { items: 1 },
        576: { items: 2 },
        768: { items: 3 },
        992: { items: 4 },
        1200: { items: 5 },
      }}
      autoPlay
      autoPlayInterval={2000}
      infinite
    />
        </div>
      </div>
    </div>
  </div>
</section>

    </div>
  )
}

export default Index
