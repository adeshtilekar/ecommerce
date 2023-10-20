import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Homeslider from "./Homeslider";
import Dropdown from 'react-bootstrap/Dropdown';

const Navbar = () => {
  const [catg, setcatg] = useState([]);
  const [showMegaMenu, setShowMegaMenu] = useState(false);

  useEffect(() => {
    fetch("https://vsmart.ajspire.com/api/categories")
      .then((response) => response.json())
      .then((data) => {
        setcatg(data.categories);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  
  const handleMouseEnter = () => {
    setShowMegaMenu(true);
  };

  const handleMouseLeave = () => {
    setShowMegaMenu(false);
  };

  return (
    <div>
      <div className="container-fluid mb-5">
        <div className="row border-top px-xl-5">
          <div style={{ width: "100%" }}>
            <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
              <a href="" className="text-decoration-none d-block d-lg-none">
                <h1 className="m-0 display-5 font-weight-semi-bold">
                  <span className="text-primary font-weight-bold border px-3 mr-1">
                    E
                  </span>
                  Shopper
                </h1>
              </a>
              <button
                type="button"
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarCollapse"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse " id="navbarCollapse">
                <div className="navbar-nav mr-auto py-0">
                  <Link to="/" className="nav-item nav-link active">
                    Home
                  </Link>

                  <Link to="/shopping" className="nav-item nav-link">
                    Shopping
                  </Link>

                 

                  <li className="navbar-item dropdown-megamenu">
                  <Link to="/shopping" className="nav-item nav-link" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  Categories
                  </Link>
                  
                    <Dropdown show={showMegaMenu} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                      
                        
                      
                      <Dropdown.Menu className="mega-menu" style={{ height: 'auto', width: '1000px', marginLeft: '-220px' }}>
                        <div className="row">
                          {
                            catg.slice(0, 10).map((el) => (
                              <div key={el.category_id} className="col-sm-3">
                              <a href="">
                              <h5 className='font-weight-bold'>{el.category_name}</h5>
                              </a>
                               <a href="">
                               <ul>
                                  <li>vishaka</li>
                                  <li>Tanaya</li>
                                  <li>Harsha</li>
                                </ul>
                               </a>
                               
                              </div>
                            ))
                          }
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>
                  </li>
                </div>

                <div className="navbar-nav ml-auto py-0">
                  <a href="" className="nav-item nav-link">
                    Login
                  </a>
                  <a href="" className="nav-item nav-link">
                    Register
                  </a>
                </div>
              </div>
            </nav>
            <Homeslider />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Navbar;