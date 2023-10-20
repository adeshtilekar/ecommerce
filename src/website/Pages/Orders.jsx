import React from 'react'
import Authuser from '../Authentication/Authuser';
import { useState } from 'react';
import { useEffect } from 'react';
import './orderlist.css';
const Orders = () => {
  const { http, user, token } = Authuser();
  const [Myorder, setMyorder] = useState([]);

  const [Order, setOrder] = useState([]);

  const [activePanel, setActivePanel] = useState(0);

  const togglePanel = (index) => {
    setActivePanel(index === activePanel ? -1 : index);
  };
  console.log(Order);

  const getMyOrder = () => {
    http.get(`/get_all_orders`)
      .then((res) => {
        setMyorder(res.data.myOrder.data);
        setOrder(res.data.myOrderproduct);
        // console.log(res.data);
      }).catch((e) => {
        console.log(e);
      });



  }
  useEffect(() => {
    getMyOrder();
  }, [token]);
  return (
    <div>
      <section className="inner-section single-banner" style={{ background: 'url(images/single-banner.jpg) no-repeat center' }}>
        <div className="container">
          <h2>Order History</h2>
          <h4 className="text-white">
            <ol className="breadcrumb">
              <i className="fas fa-home" /> &nbsp;<li className="breadcrumb-item"><a href="/">Home</a></li>
              /<li aria-current="page"> View Orders</li>
            </ol>
          </h4>
        </div>
      </section>
      <section className="inner-section orderlist-part">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {Myorder.map((item, index) => (
                <div className="orderlist">
                  <div className="orderlist-head" onClick={() => togglePanel(index + 1)}>
                    <h5>order#{item.ordermaster_id}</h5>
                  </div>
                  <div className="orderlist-body" style={{ display: activePanel === index + 1 ? 'block' : 'none' }}>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="order-track">
                          {item.ordermaster_order_status == 1 ? (
                            <ul className="order-track-list">

                              <li className="order-track-item active"><i className="icofont-check" /><span>order Pending</span></li>
                              <li className="order-track-item "><i className="icofont-close" /><span>order
                                Accepted</span></li>
                              <li className="order-track-item"><i className="icofont-close" /><span>order
                                Shipped</span></li>
                              <li className="order-track-item"><i className="icofont-close" /><span>order
                                Transporting</span></li>
                              <li className="order-track-item"><i className="icofont-close" /><span>order
                                delivered</span></li>
                              <li className="order-track-item "><i className="icofont-close" /><span>order
                                Rejected</span></li>


                            </ul>
                          ) : item.ordermaster_order_status == 2 ? (
                            <ul className="order-track-list">

                              <li className="order-track-item active"><i className="icofont-check" /><span>order Pending</span></li>
                              <li className="order-track-item active"><i className="icofont-close" /><span>order
                                Accepted</span></li>
                              <li className="order-track-item "><i className="icofont-close" /><span>order
                                Shipped</span></li>
                              <li className="order-track-item"><i className="icofont-close" /><span>order
                                Transporting</span></li>
                              <li className="order-track-item"><i className="icofont-close" /><span>order
                                delivered</span></li>
                              <li className="order-track-item "><i className="icofont-close" /><span>order
                                Rejected</span></li>


                            </ul>
                          ) : item.ordermaster_order_status == 3 ? (
                            <ul className="order-track-list">

                              <li className="order-track-item active"><i className="icofont-check" /><span>order Pending</span></li>
                              <li className="order-track-item active"><i className="icofont-close" /><span>order
                                Accepted</span></li>
                              <li className="order-track-item active"><i className="icofont-close" /><span>order
                                Shipped</span></li>
                              <li className="order-track-item"><i className="icofont-close" /><span>order
                                Transporting</span></li>
                              <li className="order-track-item"><i className="icofont-close" /><span>order
                                delivered</span></li>
                              <li className="order-track-item "><i className="icofont-close" /><span>order
                                Rejected</span></li>


                            </ul>
                          ) : item.ordermaster_order_status == 4 ? (
                            <ul className="order-track-list">

                              <li className="order-track-item active"><i className="icofont-check" /><span>order Pending</span></li>
                              <li className="order-track-item active"><i className="icofont-close" /><span>order
                                Accepted</span></li>
                              <li className="order-track-item active"><i className="icofont-close" /><span>order
                                Shipped</span></li>
                              <li className="order-track-item active"><i className="icofont-close" /><span>order
                                Transporting</span></li>
                              <li className="order-track-item"><i className="icofont-close" /><span>order
                                delivered</span></li>
                              <li className="order-track-item "><i className="icofont-close" /><span>order
                                Rejected</span></li>


                            </ul>
                          ) : item.ordermaster_order_status == 5 ? (
                            <ul className="order-track-list">

                              <li className="order-track-item active"><i className="icofont-check" /><span>order Pending</span></li>
                              <li className="order-track-item active"><i className="icofont-close" /><span>order
                                Accepted</span></li>
                              <li className="order-track-item active"><i className="icofont-close" /><span>order
                                Shipped</span></li>
                              <li className="order-track-item active"><i className="icofont-close" /><span>order
                                Transporting</span></li>
                              <li className="order-track-item active"><i className="icofont-close" /><span>order
                                delivered</span></li>
                              <li className="order-track-item "><i className="icofont-close" /><span>order
                                Rejected</span></li>


                            </ul>
                          ) : item.ordermaster_order_status == 6 ? (
                            <ul className="order-track-list">

                              <li className="order-track-item active"><i className="icofont-check" /><span>order Pending</span></li>
                              <li className="order-track-item active"><i className="icofont-close" /><span>order
                                Accepted</span></li>
                              <li className="order-track-item active"><i className="icofont-close" /><span>order
                                Shipped</span></li>
                              <li className="order-track-item active"><i className="icofont-close" /><span>order
                                Transporting</span></li>
                              <li className="order-track-item active"><i className="icofont-close" /><span>order
                                delivered</span></li>
                              <li className="order-track-item active"><i className="icofont-close" /><span>order
                                Rejected</span></li>


                            </ul>
                          ) : item.ordermaster_order_status != 6 ? (
                            <ul className="order-track-list">

                              <li className="order-track-item active"><i className="icofont-check" /><span>order Pending</span></li>
                              <li className="order-track-item active"><i className="icofont-close" /><span>order
                                Accepted</span></li>
                              <li className="order-track-item active"><i className="icofont-close" /><span>order
                                Shipped</span></li>
                              <li className="order-track-item active"><i className="icofont-close" /><span>order
                                Transporting</span></li>
                              <li className="order-track-item active"><i className="icofont-close" /><span>order
                                delivered</span></li>
                              <li className="order-track-item active"><i className="icofont-close" /><span>order Completed</span></li>


                            </ul>
                          ) :
                            null
                          }
                        </div>
                      </div>
                      <div className="col-lg-5">
                        <ul className="orderlist-details">
                          <li>
                            <h6>order id</h6>
                            <p>{item.ordermaster_id}</p>
                          </li>
                          <li>
                            <h6>Total Item</h6>
                            <p>{item.ordermaster_total_product}</p>
                          </li>
                          <li>
                            <h6>Order Time</h6>
                            <p>{item.created_at}</p>
                          </li>
                          <li>
                            <h6>Delivery Time</h6>
                            <p> After Accepted Order Required Minimum 2 Days To Place Order</p>
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-4">
                        <ul className="orderlist-details">
                          <li>
                            <h6>Cash Transaction Mode</h6>
                            {item.ordermaster_paymentmode == 1 ? (<p>

                              Cash on Delivery

                            </p>
                            ) : item.ordermaster_paymentmode == 2 ? (
                              <p>

                                Online payment Transfer

                              </p>
                            ) : null}
                          </li>
                          <li>
                            <h6>delivery fee</h6>
                            <p>Free Of Cost Delivery</p>
                          </li>
                          <li>
                            <h6>Total<small>(Incl.TAX)</small></h6>
                            <p>₹{item.ordermaster_total_amount}</p>
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-3">
                        <div className="orderlist-deliver">
                          <h6>Delivery location</h6>
                          <p>{item.address}</p>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="table-scroll">
                          <table className="table-list">
                            <thead>
                              <tr>
                                <th scope="col">Serial</th>
                                <th scope="col">Product</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">brand</th>
                                <th scope="col">quantity</th>
                                <th scope="col">Return Order</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Order.filter((item1) => item1.sales_join_id === item.ordermaster_join_id).map((item1, index) => (

                                <tr>
                                  <td className="table-serial">
                                    <h6>{index + 1}</h6>
                                  </td>
                                  <td className="table-image">
                                    <img src={'https://vsmart.ajspire.com/uploads/product_image/' + item1.product_image} alt="product" style={{ width: 100, height: 100 }} />
                                  </td>
                                  <td className="table-name">
                                    <h6>{item1.english_name}</h6>
                                  </td>
                                  <td className="table-price">
                                    <h6>₹{item1.sales_product_price}<small>/{item1.unit_name}</small>
                                    </h6>
                                  </td>
                                  <td className="table-brand">
                                    <h6>{item1.brand_name}</h6>
                                  </td>
                                  <td className="table-quantity">
                                    <h6>{item1.sales_product_qty}</h6>
                                  </td><td>
                                    <i className="badge bg-warning">Retained </i>
                                  </td>
                                </tr>
                              ))}

                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Orders
