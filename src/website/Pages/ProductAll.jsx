import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Carousel, Col, Container, Row } from 'react-bootstrap';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Link, useParams } from 'react-router-dom';
import Authuser from '../Authentication/Authuser';



const ProductAll = () => {
  const { http, user, token } = Authuser();

  const [Links, setLinks] = useState([]);
 
  //product
  const [Product, setProduct] = useState([]);
  //subcategoryname  for banner
  const [Brand_, subBrand_] = useState([]);
  //scroll menu
  const [Cat, setCate] = useState([]);
  //slider after banner
  const [brandss, setbrandss] = useState([]);
  //count for brand and categorywise 
  const [Count, setCount] = useState([]);
  console.log(Count);
  const [Count1, setCount1] = useState([]);


    // Pagination state variables
    const [currentPage, setCurrentPage] = useState(0);
    const [productsPerPage] = useState(6);
  
    // Calculate indexes for the products to display
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = Product.slice(indexOfFirstProduct, indexOfLastProduct);
  
    // Function to change the current page
    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
      getAllProduct(pageNumber);
    };

  const getAllProduct = () => {
    // console.log();
    try {
      http.get(`/shop`).then((res) => {
        console.log("ghnj",res.data.product.data);
        setProduct(res.data.product.data);
        // subBrand_(res.data.brands_);
        setCate(res.data.cat);
        setLinks(res.data.product.links);
        // // setBrand(res.data.brand);
        setbrandss(res.data.brand);
        setCount(res.data.count['']);
        setCount1(res.data.count1['']);
      }).catch((e) => {
        console.log(e);
      });
    } catch (error) {
    }
  }
  useEffect(() => {
    getAllProduct();
  },[]);

  const addTocart = (product_id) => {
    console.log(product_id);
    http.get(`/add-to-cart/${product_id}`)
      .then((res) => {
        console.log(res.data);
      }).catch((e) => {
        console.log(e);
      });
  }
  
  return (
    <div>

      <div className="breadcrumb-area">
        <div className="container">
          <div className="breadcrumb-content">
            <ul>
              <li><a href="index.html">Home</a></li>
              <li className="active">View All Product</li>
            </ul>
          </div>
        </div>
      </div>
      {/* <AliceCarousel
        mouseTracking
        items={brandss.map((brand) => (
          <div key={brand.subcategory_image} className="slider-image-container" >
            <img src={brand.subcategory_image} alt={brand.Iceream} height={'100px'} width={'100px'} className="slider-image" />
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
        autoPlayInterval={3000}
        infinite
      /> */}


      <div className="content-wraper pt-60 pb-60 pt-sm-30">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 order-1 order-lg-2">
              <div className="single-banner shop-page-banner">
                <a href="#">
                  <img src={'https://vsmart.ajspire.com/images/single-banner.jpg'} height={150} alt="Li's Static Banner" />
                  <div className="banner-overlay">
      <h2 className="view-all-products">View All Products</h2>
      
    </div>
                </a>
                
              </div>

              <div className="shop-top-bar mt-30">
                <div className="shop-bar-inner">
                  <div className="product-view-mode">
                    <ul className="nav shop-item-filter-list" role="tablist">
                      <li className="active" role="presentation"><a aria-selected="true" className="active show" data-toggle="tab" role="tab" aria-controls="grid-view" href="#grid-view"><i className="fa fa-th" /></a></li>
                      <li role="presentation"><a data-toggle="tab" role="tab" aria-controls="list-view" href="#list-view"><i className="fa fa-th-list" /></a></li>
                    </ul>
                  </div>
                  <div className="toolbar-amount">
                    <span>Showing 1 to 9 of 15</span>
                  </div>
                </div>
                <div className="product-select-box">
                  <div className="product-short">
                    <p>Sort By:</p>
                    <select className="nice-select">
                      <option value="trending">Relevance</option>
                      <option value="sales">Name (A - Z)</option>
                      <option value="sales">Name (Z - A)</option>
                      <option value="rating">Price (Low &gt; High)</option>
                      <option value="date">Rating (Lowest)</option>
                      <option value="price-asc">Model (A - Z)</option>
                      <option value="price-asc">Model (Z - A)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="shop-products-wrapper">
                <div className="tab-content">


                  <div id="grid-view" className="tab-pane fade active show" role="tabpanel">
                    <div className="product-area shop-product-area">
                      <div className="row">
                        {Product.slice(0, 6).map((item) => (




                          <div className="col-lg-4 col-md-4 col-sm-8 mt-40">
                            <div className="single-product-wrap">
                              <div className="product-image">
                                <a href="single-product.html">
                                  <img src={item.product_image} height={'261px'} width={'261px'} alt="Li's Product Image" />
                                </a>
                                <span className="sticker">New</span>
                              </div>
                              <div className="product_desc">
                                <div className="product_desc_info">
                                  <div className="product-review">
                                    <h5 className="manufacturer">
                                      <a href="product-details.html">Graphic Corner</a>
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
                                  <h4><a className="product_name" href="single-product.html">{item.english_name}</a></h4>
                                  <div className="price-box">
                                    <span className="new-price">${item.online_price}</span>
                                  </div>
                                </div>
                                <div className="add-actions">
                                  <ul className="add-actions-link">
                                    <li className="add-cart active">{token ? (<Link onClick={() => addTocart(item.product_id)} >Add to cart </Link>) : (
                                      <Link to={'/login'}> Add to cart </Link>
                                    )}
                                    </li>
                                    <li><a href="#" title="quick view" className="quick-view-btn" data-toggle="modal" data-target="#exampleModalCenter"><i className="fa fa-eye" /></a></li>
                                    <li><a className="links-details" href="wishlist.html"><i className="fa fa-heart-o" /></a></li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                          </div>
                        ))}


                      </div>
                    </div>
                  </div>


                  {/* <div id="list-view" className="tab-pane fade product-list-view" role="tabpanel">
                <div className="row">
                  <div className="col">

                    <div className="row product-layout-list">
                      <div className="col-lg-3 col-md-5 ">
                        <div className="product-image">
                          <a href="single-product.html">
                            <img src="images/product/large-size/12.jpg" alt="Li's Product Image" />
                          </a>
                          <span className="sticker">New</span>
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-7">
                        <div className="product_desc">
                          <div className="product_desc_info">
                            <div className="product-review">
                              <h5 className="manufacturer">
                                <a href="product-details.html">Graphic Corner</a>
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
                            <h4><a className="product_name" href="single-product.html">Hummingbird printed t-shirt</a></h4>
                            <div className="price-box">
                              <span className="new-price">$46.80</span>
                            </div>
                            <p>Beach Camera Exclusive Bundle - Includes Two Samsung Radiant 360 R3 Wi-Fi Bluetooth Speakers. Fill The Entire Room With Exquisite Sound via Ring Radiator Technology. Stream And Control R3 Speakers Wirelessly With Your Smartphone. Sophisticated, Modern Desig</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="shop-add-action mb-xs-30">
                          <ul className="add-actions-link">
                            <li className="add-cart"><a href="#">Add to cart</a></li>
                            <li className="wishlist"><a href="wishlist.html"><i className="fa fa-heart-o" />Add to wishlist</a></li>
                            <li><a className="quick-view" data-toggle="modal" data-target="#exampleModalCenter" href="#"><i className="fa fa-eye" />Quick view</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div> */}


<div className="pagination-box pt-xs-20 pb-xs-15">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <Link
              to="#"
              className="page-link"
              onClick={() => paginate(currentPage - 1)}
            >
              Previous
            </Link>
          </li>
          {Array.from({ length: Math.ceil(Product.length / productsPerPage) }).map(
            (item, index) => (
              <li
                key={index}
                className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
              >
                <Link
                  to="#"
                  className="page-link"
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </Link>
              </li>
            )
          )}
          <li
            className={`page-item ${
              currentPage === Math.ceil(Product.length / productsPerPage)
                ? 'disabled'
                : ''
            }`}
          >
            <Link
              to="#"
              className="page-link"
              onClick={() => paginate(currentPage + 1)}
            >
              Next
            </Link>
          </li>
        </ul>
      </div>
                </div>
              </div>

            </div>
            <div className="col-lg-3 order-2 order-lg-1">
              {/*sidebar-categores-box start  */}
              <div className="sidebar-categores-box mt-sm-30 mt-xs-30">
                <div className="sidebar-title">
                  <h2>Brand</h2>
                </div>

                <div className="category-sub-menu">
                  <ul>
                    {brandss.map((brand) => (


                      <li className="has-sub"><a href="# ">{brand.brand_name} / {Count1.filter((count1) => count1.brand_id == brand.brand_id).map((count1) => (
                        (count1.brand_count)
                      ))} </a>

                      </li>
                    ))}
                  </ul>
                </div>

              </div>
              <div className="sidebar-categores-box mt-sm-30 mt-xs-30">
                <div className="sidebar-title">
                  <h2>Category</h2>
                </div>

                <div className="category-sub-menu">
                  <ul>
                    {Cat.map((cat, index) => (
                      <li key={index} className={index ? 'open' : ''}>
                        <a href="#" className='font-weight-bold text-dark'>
                          {cat.category_name} / {Count.filter((count) => count.product_category_id == cat.category_id).map((count) => (
                            (count.cat_count)
                          ))}
                        </a>

                      </li>


                    ))}
                  </ul>
                </div>

              </div>


              {/*sidebar-categores-box end  */}
              {/*sidebar-categores-box start  */}
              <div className="sidebar-categores-box">
                <div className="sidebar-title">
                  <h2>Filter By</h2>
                </div>

                <button className="btn-clear-all mb-sm-30 mb-xs-30">Clear all</button>


                <div className="filter-sub-area">
                  <h5 className="filter-sub-titel">Brand</h5>
                  <div className="categori-checkbox">
                    <form action="#">
                      <ul>

                        <li><input type="checkbox" name="product-categori" /><a href="#">Prime Video (13)</a></li>

                      </ul>
                    </form>
                  </div>
                </div>


                <div className="filter-sub-area pt-sm-10 pt-xs-10">
                  <h5 className="filter-sub-titel">Categories</h5>
                  <div className="categori-checkbox">
                    <form action="#">
                      <ul>
                        <li><input type="checkbox" name="product-categori" /><a href="#">Graphic Corner (10)</a></li>
                      </ul>
                    </form>
                  </div>
                </div>

              </div>
              {/*sidebar-categores-box end  */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default ProductAll
