import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Carousel, ToastContainer } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Auth_user from "../../authentication/Auth_user";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const All_ProdShop = () => {
  const { http, user, logout, token } = Auth_user();

  const { page } = useParams();

  const [Product, setProduct] = useState([]);

  const [loading, setLoading] = useState(true);

  const [Links, setLinks] = useState([]);

  const [Brand, setBrand] = useState([]);

  const [Cat, setCat] = useState([]);

  const [Count, setCount] = useState([]);

  const [Count1, setCount1] = useState([]);

  const [productid, Setproductid] = useState([]);

  const { product_id } = useParams();

  const getProduct = async (page) => {
    try {
      const response = await http.get(`/shop?page=${page}`);

      const data = response.data;

      console.log(data.product.links);

      setProduct(data.product.data);

      setLinks(data.product.links);

      setBrand(data.brand);

      setCat(data.cat);

      setCount(data.count);

      setCount1(data.count1);

      setLoading(false);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const GetproductId = (pro_id) => {
    http.get(`/add-to-cart/${pro_id}`).then((res) => {
      console.log(res.data.cart);
      alert(res.data.msg);});

    
  };

  const getWishlistId = (pro_id) => {
    http.get(`/add-to-wishlist/${pro_id}`).then((res) => {
      console.log(res.data);
      alert(res.data.msg);
    });
  };

  useEffect(() => {
    getProduct(page);
  }, [page]);

  return (
    <>
      <h1>Product List</h1>

      <div>
        <div
          id="header-carousel"
          className="carousel slide align-center"
          data-ride="carousel"
          style={{ marginTop: "200px" }}
        >
          <div className="carousel-inner">
            <div className="img">
              <img
                src="https://img.freepik.com/free-photo/notebook-with-tomatoes-wooden-bottom_23-2148505641.jpg?w=2000"
                style={{
                  height: "300px", // Adjust the height as needed
                  width: "100%",
                  opacity: "0.9",
                  color: "green",
                }}
                className="d-block w-100"
                alt="Carousel Image"
              />
              <div className="carousel-caption d-flex flex-column align-items-center justify-content-center h-100">
                <div
                  className="container  text-dark font-weight-bold"
                  style={{ marginLeft: "-200px" }}
                >
                  <h1 style={{ fontWeight: "bold", fontSize: "35px" }}>
                    View All Product
                  </h1>
                  <h3 style={{ fontWeight: "normal", fontSize: "30px" }}>
                    <Link to="/" style={{ color: "black" }}>
                      Home
                    </Link>
                    /<b> View All Product</b>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/ Product Section Begin /}
        <section className="product spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-5">
                <div className="sidebar border-1">
                  <h4>Filter By Category</h4>
                  <div
                    className="sidebar__item bg-warning rounded-2 text-bg-success"
                    style={{ maxHeight: "300px", overflowY: "auto" }}
                  >
                    {Cat.map((cat) => (
                      <div key={cat.category_id} className="category">
                        <label className="btn btn-danger category-label">
                          <input
                            type="checkbox"
                            className="category-checkbox"
                            // onClick={() => toggleCategory(cat.category_id)}
                          />
                          {cat.category_name}
                        </label>

                        {/* {expandedCategory === cat.category_id && (
                          <ul className="subcategory-list">
                            {Sub.filter(
                              (subcategory) =>
                                subcategory.subcategory_category_id ===
                                cat.category_id
                            ).map((subcategory) => (
                              <li
                                key={subcategory.subcategory_id}
                                className="subcategory"
                              >
                                <Link
                                  to={`/subcatview/${cat.category_id}/${subcategory.subcategory_id}`}
                                  className="subcategory-name"
                                >
                                  {subcategory.subcategory_name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )} */}
                      </div>
                    ))}
                  </div>
                  <h4>Filter By Brand</h4>
                  <div
                    className="sidebar__item bg-info rounded-2"
                    style={{ maxHeight: "300px", overflowY: "auto" }}
                  >
                    {Brand.map((brand) => (
                      <ul>
                        <li
                          className="btn btn-success"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "180px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <input
                            type="checkbox"
                            style={{ marginRight: "10px" }}
                          />
                          <Link
                            to={`/brands/${brand.brand_id}`}
                            style={{ flex: "1" }}
                          >
                            {brand.brand_name}
                          </Link>
                        </li>
                      </ul>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-md-7 ps-1">
                <div className="product__discount">
                  <div className="section-title product__discount__title">
                    <h2>Sale Off</h2>
                  </div>

                  <div className="row">
                    <Carousel interval={3000}>
                      {Product.map((item, index) => {
                        if (index % 3 === 0) {
                          return (
                            <Carousel.Item key={index}>
                              <div className="row">
                                {Product.slice(index, index + 3).map(
                                  (item, subIndex) => (
                                    <div
                                      className="col-lg-4 col-lg-3 col-md-4 col-sm-4 mt-4 mb-3"
                                      key={index + subIndex}
                                    >
                                      <div
                                        className="product__discount__item"
                                        style={{
                                          transform: "skewY(-1deg)",
                                          border: "2px solid orange",
                                          borderRadius: "10px",
                                        }}
                                      >
                                        <div
                                          className="product__discount__item__pic set-bg ms-1"
                                          data-setbg="img/product/discount/pd-1.jpg"
                                          style={{
                                            backgroundImage: `url(${item.product_image})`,
                                            border: "none",
                                            width: "300px",
                                            borderRadius: "10px",
                                          }}
                                        >
                                          <div className="product__discount__percent">
                                            <button className="btn btn-primary  text-white">
                                              <i className="fa fa-inr"></i>
                                              {item.mrp_price - item.sale_price}
                                              Off
                                            </button>
                                          </div>
                                          <ul className="product__item__pic__hover">
                                            {/* <li>
                                              <a href="#">
                                                <i className="fa fa-heart" />
                                              </a>
                                            </li> */}
                                            <li>
                                              <a
                                                to={`/all_prodshop/${item.product_id}`}
                                              >
                                                {token ? (
                                                  <button
                                                    className="btn"
                                                    onClick={() =>
                                                      getWishlistId(
                                                        item.product_id
                                                      )
                                                    }
                                                  >
                                                    <i className="fa fa-heart"></i>
                                                    {/ Add the icon here /}
                                                  </button>
                                                ) : (
                                                  <Link to="/login">
                                                    <i className="fa fa-heart"></i>
                                                  </Link>
                                                )}
                                              </a>
                                            </li>
                                            <li>
                                              <a href="#">
                                                <i className="fa fa-retweet" />
                                              </a>
                                            </li>
                                            <li>
                                              <a
                                                to={`/all_prodshop/${item.product_id}`}
                                              >
                                                {token ? (
                                                  <button
                                                    className="btn"
                                                    onClick={() =>
                                                      GetproductId(
                                                        item.product_id
                                                      )
                                                    }
                                                  >
                                                    <i className="fa fa-shopping-cart"></i>
                                                    {/ Add the icon here /}
                                                  </button>
                                                ) : (
                                                  <Link to="/login">
                                                    <i className="fa fa-shopping-cart"></i>
                                                  </Link>
                                                )}
                                              </a>
                                            </li>
                                          </ul>
                                        </div>
                                        <div className="product__discount__item__text">
                                          <span>{item.category_name}</span>
                                          <h5>
                                            <a href="#">{item.english_name}</a>
                                          </h5>
                                          <h6 class="feature-price">
                                            <b>
                                              MRP
                                              <del className="text-danger">
                                                {item.mrp_price}
                                              </del>
                                              <span className="text-success">
                                                {item.sale_price}
                                                <small>/only</small>
                                              </span>
                                            </b>
                                          </h6>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </Carousel.Item>
                          );
                        }
                        return null;
                      })}
                    </Carousel>
                  </div>
                  <div className="filter__item">
                    <div className="row">
                      <div className="col-lg-4 col-md-5">
                        <div className="filter__sort">
                          <span>Sort By</span>
                          <select>
                            <option value={0}>Default</option>
                            <option value={0}>Default</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4">
                        <div className="filter__found">
                          <h6>
                            <span>{Product.length}</span> Products found
                          </h6>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-3">
                        <div className="filter__option">
                          <span className="icon_grid-2x2" />
                          <span className="icon_ul" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    {Product.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="col-lg-4 col-lg-3 col-md-4 col-sm-4"
                        >
                          <div
                            className="product__discount__item mt-5 mb-3"
                            style={{
                              transform: "skewY(-3deg)",
                              border: "1px solid #FF0000",
                              width: "100%",
                              borderRadius: "20px",
                              boxShadow: "0px 4px 6px rgba(255, 105, 180, 0.9)",
                            }}
                          >
                            <div
                              className="product__discount__item__pic set-bg ms-1 mt-1"
                              data-setbg="img/product/discount/pd-1.jpg"
                              style={{
                                backgroundImage: `url(${item.product_image})`,
                                border: "none",
                                width: "300px",
                                borderRadius: "10px",
                              }}
                            >
                              <div className="product__discount__percent">
                                <button className="btn btn-primary  text-white">
                                  <i className="fa fa-inr"></i>
                                  {item.mrp_price - item.sale_price} Off
                                </button>
                              </div>
                              <ul className="product__item__pic__hover">
                                {/* <li>
                                  <a href="#">
                                    <i className="fa fa-heart" />
                                  </a>
                                </li> */}
                                <li>
                                  <a to={`/all_prodshop/${item.product_id}`}>
                                    {token ? (
                                      <button
                                        className="btn"
                                        onClick={() =>
                                          getWishlistId(item.product_id)
                                        }
                                      >
                                        <i className="fa fa-heart"></i>
                                        {/ Add the icon here /}
                                      </button>
                                    ) : (
                                      <Link to="/login">
                                        <i className="fa fa-heart"></i>
                                      </Link>
                                    )}
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <i className="fa fa-retweet" />
                                  </a>
                                </li>
                                <li>
                                  <a to={`/all_prodshop/${item.product_id}`}>
                                    {token ? (
                                      <button
                                        className="btn"
                                        onClick={() =>
                                          GetproductId(item.product_id)
                                        }
                                      >
                                        <i className="fa fa-shopping-cart"></i>{" "}
                                        {/ Add the icon here /}
                                      </button>
                                    ) : (
                                      <Link to="/login">
                                        <i className="fa fa-shopping-cart"></i>
                                      </Link>
                                    )}
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <div className="product__discount__item__text">
                              <span>{item.category_name}</span>
                              <h5>
                                <a href="#">{item.english_name}</a>
                              </h5>
                              <h6 class="feature-price">
                                <b>
                                  MRP
                                  <del className="text-danger">
                                    {item.mrp_price}
                                  </del>
                                  <span className="text-success">
                                    {item.sale_price}
                                    <small>/only</small>
                                  </span>
                                </b>
                              </h6>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <hr />
                    <div className="product__pagination">
                      {Links.map((items, index) => {
                        const linkStyle = {
                          color: items.active ? "green" : "black",
                        };

                        return (
                          <Link
                            to={`/all_prodshop/${items.label}`}
                            key={index}
                            style={linkStyle}
                          >
                            {items.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/ Product Section End /}
      </div>
      <ToastContainer />
    </>
  );
};

export default All_ProdShop;
