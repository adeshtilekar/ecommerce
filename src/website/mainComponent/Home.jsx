import React, { useEffect, useState } from 'react'
import axios from "axios";
const Home = () => {
  const [Product, setProduct] = useState([]);

  useEffect(() => {
    axios.get(`https://vsmart.ajspire.com/api/products`)
      .then((res) => {
        setProduct(res.data.products.data);
        console.log(res.data.products.data);
        // return res.json();
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div>
      <div className="row">
        {
          Product.map((item) => (
            <div className="col-lg-3 col-md-6 col-sm-6 d-flex">
              <div className="card w-100 my-2 shadow-2-strong">
                <img src={item.product_image} className="card-img-top" style={{ aspectRatio: '1 / 1' }} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.english_name}</h5>
                  <p className="card-text">${item.english_name}</p>
                  <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                    <a href="#!" className="btn btn-primary shadow-0 me-1">Add to cart</a>
                    <a href="#!" className="btn btn-light border px-2 pt-2 icon-hover"><i className="fas fa-heart fa-lg text-secondary px-1" /></a>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>

  )
}

export default Home
