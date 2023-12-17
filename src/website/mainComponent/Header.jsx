import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link ,useSearchParams} from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

import './style.css';
import Authuser from '../Authentication/Authuser';
const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams(); // Use useSearchParams

  const handleInputChange = event => {
    setSearchQuery(event.target.value);
  };
  const [Category, setcatg] = useState([]);
  // const
  const { http, user ,token,logout} = Authuser();
  // console.log("auisgyschdbz"+user);
  const [SubCategory, setsubcatagory] = useState([]);
  const [Brand, setbrand] = useState([]);
  const [Cart, setCart] = useState([]);
  const [Cartcount, setCartcount] = useState([]);
  const [isActive, setIsActive] = useState(false);
// console.log(Cartcount);
  const handleToggle = () => {
    setIsActive(!isActive);
  };
  const getbrand = () => {
    http.get(`/brands`)
    .then((res) => {
      setcatg(res.data.brands);
  }).catch((e) => {
      console.log(e);
  });
  }
  const getCartItem = () => {
    http.get(`/get-cart-list`)
    .then((res) => {
      setCart(res.data.cart);
      setCartcount(res.data.cart.length);
      // console.log(res.data.cart.length);
  }).catch((e) => {
      console.log(e);
  });

  
     
  }

  const getcatagory = () => {
    http.get("/categories")
    .then((res) => {
      setcatg(res.data.categories);
      res.data.categories.forEach((categories) => {
        getsubcata(categories.category_id);
      });
  }).catch((e) => {
      console.log(e);
  });
     
  }
  const getsubcata = (Catagoryid) => {
    http.get(`/subcategories/${Catagoryid}`)
    .then((res) => {
      const newsubcategory = res.data.subcategories;
      setsubcatagory((previssubcat) => {
        const filtersubcategory = newsubcategory.filter(
          (newsubcategory) => !previssubcat.some((previs) => previs.subcategory_id === newsubcategory.subcategory_id));

        return [...previssubcat, ...filtersubcategory];
      });
  }).catch((e) => {
      console.log(e);
  });

     
  };


  const [isActivee, setIsActivee] = useState(false);

  const toggleCart = () => {
    // console.log("helloooduefyuwegfygeyfgegfgfugyefugweufwegffweyu");
    setIsActivee(!isActivee);
  };

 
  



  useEffect(() => {
    getcatagory();
    getbrand();
  },[]);



  useEffect(() => {
    getCartItem();
  }, [token]);


  return (
    <>
   <header>
  <div className="header-top">
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-md-4">
          <div className="header-top-left">
            <ul className="phone-wrap">
              <li>
                <span>Telephone Enquiry:</span>
                <a href="#">(+91) 7350721331</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-9 col-md-8">
          <div className="header-top-right">
            <ul className="ht-menu">
              <li>
                <div
                  className={`ht-setting-trigger ${isActive ? 'is-active' : ''}`}
                  onClick={handleToggle}
                >
                  <span>{user && user.name}</span>
                </div>
                <div className={`setting ht-setting ${isActive ? 'is-active' : ''}`}>
                {token ?                               ( 
                  <ul className="ht-setting-list">
                    
                    <li><Link to={'/profile'}>My Account</Link></li>
                    <li><Link to={'/orders'}>My Order</Link></li>
                    <li><Link onClick={logout}> LogOut</Link></li>
                    
                  </ul>
                  ):(
                    <ul className="ht-setting-list">
                    
                    <li><Link to={'/login'}>My Account</Link></li>
                    <li><Link to={'/login'}>My Order</Link></li>
                    <li><Link to={'/login'}>Sign In</Link></li>
                    
                  </ul>
                )}
                </div>
              </li>
              <li>
                <span className="currency-selector-wrapper">Currency:</span>
                <div className="ht-currency-trigger"><span>USD $</span></div>
                <div className="currency ht-currency">
                  <ul className="ht-setting-list">
                    <li><a href="#">EUR €</a></li>
                    <li className="active"><a href="#">USD $</a></li>
                  </ul>
                </div>
              </li>
              <li>
                <span className="language-selector-wrapper">Language:</span>
                <div className="ht-language-trigger"><span>English</span></div>
                <div className="language ht-language">
                  <ul className="ht-setting-list">
                    <li className="active"><a href="#"><img src="images/menu/flag-icon/1.jpg" alt />English</a></li>
                    <li><a href="#"><img src="images/menu/flag-icon/2.jpg" alt />Français</a></li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="header-middle pl-sm-0 pr-sm-0 pl-xs-0 pr-xs-0">
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-md-4">
          <div className="logo pb-sm-30 pb-xs-30">
            <a href="index.html">
              {/* <img src="images/menu/logo/1.jpg" alt /> */}
              <h1>Shiva_The_Boss</h1>
            </a>
          </div>
          
        </div>

        <div className="col-lg-9 pl-0 ml-sm-15 ml-xs-15">
          <form action="#" className="hm-searchbox">
            <select className="nice-select select-search-category">
              <option value={0}>All</option>
              <option value={16}>Accessories</option>
            </select>

            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Search..."
            />
            <button className="li-btn">
              <Link
                className="text-white"
                to={`/search?query=${encodeURIComponent(searchQuery)}`}
                onChange={() => setSearchParams({ query: searchQuery })}
              >
                <i className="fa fa-search" />
              </Link>
            </button>
          </form>
          <div className="header-middle-right">
            <ul className="hm-menu">
              <li className="hm-wishlist">
                {token ? (
                  <Link to={'/wishlist'}>
                    <span className="cart-item-count wishlist-item-count">0</span>
                    <i className="fa fa-heart-o" />
                  </Link>
                ) : (
                  <Link to={'/login'}>
                    <span className="cart-item-count wishlist-item-count">0</span>
                    <i className="fa fa-heart-o" />
                  </Link>
                )}
              </li>
              {token ? (
                <li className={`hm-minicart ${isActivee ? 'is-active' : ''}`}>
                  <div className="hm-minicart-trigger" onClick={toggleCart}>
                    <span className="item-icon" />
                    <span className="item-text">£80.00
                      <span className="cart-item-count">{Cartcount}</span>
                    </span>
                  </div>
                  <span />
                  <div className={`minicart ${isActivee ? 'is-active' : ''}`}>
                    <ul className="minicart-product-list">
                      <li>
                        <a href="single-product.html" className="minicart-product-image">
                          <img src="images/product/small-size/5.jpg" alt="cart products" />
                        </a>
                        <div className="minicart-product-details">
                          <h6><a href="single-product.html">Aenean eu tristique</a></h6>
                          <span>£40 x 1</span>
                        </div>
                        <button className="close" title="Remove">
                          <i className="fa fa-close" />
                        </button>
                      </li>
                      <li>
                        <a href="single-product.html" className="minicart-product-image">
                          <img src="images/product/small-size/6.jpg" alt="cart products" />
                        </a>
                        <div className="minicart-product-details">
                          <h6><a href="single-product.html">Aenean eu tristique</a></h6>
                          <span>£40 x 1</span>
                        </div>
                        <button className="close" title="Remove">
                          <i className="fa fa-close" />
                        </button>
                      </li>
                    </ul>
                    <p className="minicart-total">SUBTOTAL: <span>£80.00</span></p>
                    <div className="minicart-button">
                      <Link to={'/cart'} className="li-button li-button-fullwidth li-button-dark">
                        <span>View Full Cart</span>
                      </Link>
                      <Link to={'/checkout'} className="li-button li-button-fullwidth">
                        <span>Checkout</span>
                      </Link>
                    </div>
                  </div>
                </li>
              ) : (
                <li className='hm-minicart'>
                  <Link to={'/login'}>
                    <div className="hm-minicart-trigger">
                      <span className="item-icon" />
                      <span className="item-text">0.00
                        <span className="cart-item-count">0</span>
                      </span>
                    </div>
                    <span />
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="header-bottom header-sticky d-none d-lg-block d-xl-block">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="hb-menu">
            <nav>
              <ul>
                <li className="dropdown-holder"><Link to={'/'}>Home</Link></li>
                <li className="megamenu-static-holder"><a href="shop-left-sidebar.html">Category</a>
                  <ul className="megamenu hb-megamenu">
                    <div className="container megamenu-scroll">
                      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                        {Category.slice(0, 10).map((category) => (
                          <div className="col-md-4" key={category.category_id}>
                            <div className="megamenu-wrap">
                              <h5 className="megamenu-title">
                                <a>{category.category_name}</a>
                              </h5>
                              <ul className="megamenu-list sub">
                                {SubCategory.filter((subcategory) => subcategory.subcategory_category_id === category.category_id).slice(0, 5).map((subcategory) => (
                                  <li key={subcategory.subcategory_id}>
                                    <Link
                                      className="text-black t"
                                      to={`/product-shop/${category.category_id}/${subcategory.subcategory_id}`}
                                      style={{
                                        textDecoration: 'none'
                                      }}
                                    >
                                      {subcategory.subcategory_name}
                                    </Link>
                                  </li>
                                ))}
                                <li>
                                  <Link to="/product-shop/:cid/:scid">View All</Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="col-lg-12">
                        <div className="btn btn-primary">
                          <a href="/all-category" className="btn btn-outline">
                            <i className="fas fa-eye" />
                            <span>View all Categories</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </ul>
                </li>
                <li class="dropdown-holder"><Link to={'/product'}>Shop</Link></li>
                <li className="megamenu-static-holder"><a href="index.html">Brands</a>
                  <ul className="megamenu hb-megamenu">
                    {Brand.slice(0, 8).map((brand) => (
                      <li key={brand.id}><a href="blog-left-sidebar.html">{brand.name}</a></li>
                    ))}
                  </ul>
                </li>
                <li><a href="about-us.html">About Us</a></li>
                <li><a href="contact.html">Contact</a></li>
                <li><a href="shop-left-sidebar.html">Smartwatch</a></li>
                <li><a href="shop-left-sidebar.html">Accessories</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="mobile-menu-area d-lg-none d-xl-none col-12">
  <div className="container"> 
    <div className="row">
      <div className="mobile-menu mean-container"><div className="mean-bar"><a href="#nav" className="meanmenu-reveal" style={{right: 0, left: 'auto', textAlign: 'center', textIndent: 0, fontSize: 18}}><span /><span /><span /></a><nav className="mean-nav">
            <ul style={{display: 'none'}}>
              <li className="dropdown-holder"><a href="index.html">Home</a>
                <ul className="hb-dropdown" style={{display: 'none'}}>
                  <li><a href="index.html">Home One</a></li>
                  <li><a href="index-2.html">Home Two</a></li>
                  <li><a href="index-3.html">Home Three</a></li>
                  <li><a href="index-4.html">Home Four</a></li>
                </ul>
                <a className="mean-expand" href="#" style={{fontSize: 18}}>+</a></li>
              <li className="catmenu-dropdown megamenu-holder"><a href="shop-left-sidebar.html">Shop</a>
                <ul className="megamenu hb-megamenu" style={{display: 'none'}}>
                  <li><a href="shop-left-sidebar.html">Shop Page Layout</a>
                    <ul style={{display: 'none'}}>
                      <li><a href="shop-3-column.html">Shop 3 Column</a></li>
                      <li><a href="shop-4-column.html">Shop 4 Column</a></li>
                      <li><a href="shop-left-sidebar.html">Shop Left Sidebar</a></li>
                      <li><a href="shop-right-sidebar.html">Shop Right Sidebar</a></li>
                      <li><a href="shop-list.html">Shop List</a></li>
                      <li><a href="shop-list-left-sidebar.html">Shop List Left Sidebar</a></li>
                      <li><a href="shop-list-right-sidebar.html">Shop List Right Sidebar</a></li>
                    </ul>
                    <a className="mean-expand" href="#" style={{fontSize: 18}}>+</a></li>
                  <li><a href="single-product-gallery-left.html">Single Product Style</a>
                    <ul style={{display: 'none'}}>
                      <li><a href="single-product-carousel.html">Single Product Carousel</a></li>
                      <li><a href="single-product-gallery-left.html">Single Product Gallery Left</a></li>
                      <li><a href="single-product-gallery-right.html">Single Product Gallery Right</a></li>
                      <li><a href="single-product-tab-style-top.html">Single Product Tab Style Top</a></li>
                      <li><a href="single-product-tab-style-left.html">Single Product Tab Style Left</a></li>
                      <li><a href="single-product-tab-style-right.html">Single Product Tab Style Right</a></li>
                    </ul>
                    <a className="mean-expand" href="#" style={{fontSize: 18}}>+</a></li>
                  <li><a href="single-product.html">Single Products</a>
                    <ul style={{display: 'none'}}>
                      <li><a href="single-product.html">Single Product</a></li>
                      <li><a href="single-product-sale.html">Single Product Sale</a></li>
                      <li><a href="single-product-group.html">Single Product Group</a></li>
                      <li><a href="single-product-normal.html">Single Product Normal</a></li>
                      <li><a href="single-product-affiliate.html">Single Product Affiliate</a></li>
                    </ul>
                    <a className="mean-expand" href="#" style={{fontSize: 18}}>+</a></li>
                </ul>
                <a className="mean-expand" href="#" style={{fontSize: 18}}>+</a></li>
              <li className="dropdown-holder"><a href="blog-left-sidebar.html">Blog</a>
                <ul className="hb-dropdown" style={{display: 'none'}}>
                  <li className="sub-dropdown-holder"><a href="blog-left-sidebar.html">Blog Grid View</a>
                    <ul className="hb-dropdown hb-sub-dropdown" style={{display: 'none'}}>
                      <li><a href="blog-2-column.html">Blog 2 Column</a></li>
                      <li><a href="blog-3-column.html">Blog 3 Column</a></li>
                      <li><a href="blog-left-sidebar.html">Grid Left Sidebar</a></li>
                      <li><a href="blog-right-sidebar.html">Grid Right Sidebar</a></li>
                    </ul>
                    <a className="mean-expand" href="#" style={{fontSize: 18}}>+</a></li>
                  <li className="sub-dropdown-holder"><a href="blog-list-left-sidebar.html">Blog List View</a>
                    <ul className="hb-dropdown hb-sub-dropdown" style={{display: 'none'}}>
                      <li><a href="blog-list.html">Blog List</a></li>
                      <li><a href="blog-list-left-sidebar.html">List Left Sidebar</a></li>
                      <li><a href="blog-list-right-sidebar.html">List Right Sidebar</a></li>
                    </ul>
                    <a className="mean-expand" href="#" style={{fontSize: 18}}>+</a></li>
                  <li className="sub-dropdown-holder"><a href="blog-details-left-sidebar.html">Blog Details</a>
                    <ul className="hb-dropdown hb-sub-dropdown" style={{display: 'none'}}>
                      <li><a href="blog-details-left-sidebar.html">Left Sidebar</a></li>
                      <li><a href="blog-details-right-sidebar.html">Right Sidebar</a></li>
                    </ul>
                    <a className="mean-expand" href="#" style={{fontSize: 18}}>+</a></li>
                  <li className="sub-dropdown-holder"><a href="blog-gallery-format.html">Blog Format</a>
                    <ul className="hb-dropdown hb-sub-dropdown" style={{display: 'none'}}>
                      <li><a href="blog-audio-format.html">Blog Audio Format</a></li>
                      <li><a href="blog-video-format.html">Blog Video Format</a></li>
                      <li><a href="blog-gallery-format.html">Blog Gallery Format</a></li>
                    </ul>
                    <a className="mean-expand" href="#" style={{fontSize: 18}}>+</a></li>
                </ul>
                <a className="mean-expand" href="#" style={{fontSize: 18}}>+</a></li>
              <li className="catmenu-dropdown megamenu-static-holder"><a href="index.html">Pages</a>
                <ul className="megamenu hb-megamenu" style={{display: 'none'}}>
                  <li><a href="blog-left-sidebar.html">Blog Layouts</a>
                    <ul style={{display: 'none'}}>
                      <li><a href="blog-2-column.html">Blog 2 Column</a></li>
                      <li><a href="blog-3-column.html">Blog 3 Column</a></li>
                      <li><a href="blog-left-sidebar.html">Grid Left Sidebar</a></li>
                      <li><a href="blog-right-sidebar.html">Grid Right Sidebar</a></li>
                      <li><a href="blog-list.html">Blog List</a></li>
                      <li><a href="blog-list-left-sidebar.html">List Left Sidebar</a></li>
                      <li><a href="blog-list-right-sidebar.html">List Right Sidebar</a></li>
                    </ul>
                    <a className="mean-expand" href="#" style={{fontSize: 18}}>+</a></li>
                  <li><a href="blog-details-left-sidebar.html">Blog Details Pages</a>
                    <ul style={{display: 'none'}}>
                      <li><a href="blog-details-left-sidebar.html">Left Sidebar</a></li>
                      <li><a href="blog-details-right-sidebar.html">Right Sidebar</a></li>
                      <li><a href="blog-audio-format.html">Blog Audio Format</a></li>
                      <li><a href="blog-video-format.html">Blog Video Format</a></li>
                      <li><a href="blog-gallery-format.html">Blog Gallery Format</a></li>
                    </ul>
                    <a className="mean-expand" href="#" style={{fontSize: 18}}>+</a></li>
                  <li><a href="index.html">Other Pages</a>
                    <ul style={{display: 'none'}}>
                      <li><a href="login-register.html">My Account</a></li>
                      <li><a href="checkout.html">Checkout</a></li>
                      <li><a href="compare.html">Compare</a></li>
                      <li className="active"><a href="wishlist.html">Wishlist</a></li>
                      <li><a href="shopping-cart.html">Shopping Cart</a></li>
                    </ul>
                    <a className="mean-expand" href="#" style={{fontSize: 18}}>+</a></li>
                  <li><a href="index.html">Other Pages 2</a>
                    <ul style={{display: 'none'}}>
                      <li><a href="contact.html">Contact</a></li>
                      <li><a href="about-us.html">About Us</a></li>
                      <li><a href="faq.html">FAQ</a></li>
                      <li><a href="404.html">404 Error</a></li>
                    </ul>
                    <a className="mean-expand" href="#" style={{fontSize: 18}}>+</a></li>
                </ul>
                <a className="mean-expand" href="#" style={{fontSize: 18}}>+</a></li>
              <li><a href="about-us.html">About Us</a></li>
              <li><a href="contact.html">Contact</a></li>
              <li><a href="shop-left-sidebar.html">Smartwatch</a></li>
              <li className="mean-last"><a href="shop-left-sidebar.html">Accessories</a></li>
            </ul>
          </nav></div>
      </div>
    </div>
  </div>
</div>

</header>

    </>

  )

}

export default Header
