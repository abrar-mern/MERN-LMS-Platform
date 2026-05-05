import React from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, useLocation } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { CiShoppingCart } from "react-icons/ci";
import ProfileDropdown from "../core/Auth/ProfileDropdown";
import { useState, useEffect } from "react";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { IoMdArrowDropdown } from "react-icons/io";


const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();
  const [subLinks, setSubLinks] = useState();

  const fetchSubLinks = async() => {
    try{
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("CATEGORIES => ", result);
      setSubLinks(result.data.data);
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(()=> {
    fetchSubLinks();
  }, [])
  function matchRoute(route) {
    return window.location.pathname === route;
  }
  const slugify = (value) =>
    value?.trim().toLowerCase().split(" ").filter(Boolean).join("-") || "";

  return (
    <div className="w-full flex h-14 items-center justify-center border-b-[2px] border-richblack-700 transition-all duration-200">
      <div className="flex flex-row w-11/12 max-w-[1260px] items-center justify-between">
        <Link to="/">
          {/*<img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
          */}
          <h1 className="text-white text-3xl font-bold">CODEGYAANI</h1>
        </Link>
            
        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((element, index) => {
              return (
                <li key={index}>
                  {element.title === "Catalog" ? (
                    <div className="flex flex-row items-center gap-x-1 cursor-pointer group relative">
                      <p>{element.title}</p>
                      <IoMdArrowDropdown />
                      <div className="invisible absolute top-12 group-hover:visible bg-richblack-800 p-4 rounded-md shadow-md z-10 transition-all duration-200 lg:w-[300px] translate-x-[-40%]">
                        {/* Diamond Shape */}
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-richblack-800 rotate-45"></div>
                        {
                          subLinks && subLinks.length ? (
                            subLinks.map((subLink, index) => (
                              <Link to={`/catalog/${slugify(subLink.name)}`} key={index}>
                                <p className="text-richblack-25 py-2 hover:text-yellow-25">
                                  {subLink.name}
                                </p>
                              </Link>
                            ))
                          ) : (
                            <div></div>
                          )
                        }
                      </div>
                    </div>
                  ) : (
                    <Link to={element?.path}>
                      <p
                        className={`${
                          matchRoute(element?.path)
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }`}
                      >
                        {element.title}
                      </p>
                      
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Login SignUp Dashboard */}
        <div className="flex gap-x-4 items-center ">
          {user && user?.accountType === "Student" && (
            <Link to="/dashboard/cart" className="relative">
              <CiShoppingCart className="text-2xl" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-25 text-richblack-900 text-[12px] w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <>
              <Link to="/login">
                <button className="bg-richblack-800 text-richblack-25 px-4 py-1 rounded-md border border-richblack-700 hover:bg-richblack-700 transition-all duration-200">
                  Log In
                </button>
              </Link>

              <Link to="/signup">
                <button className="bg-yellow-25 text-richblack-900 px-4 py-1 rounded-md border border-yellow-25 hover:bg-yellow-50 transition-all duration-200">
                  Sign Up
                </button>
              </Link>
            </>
          )}
          {
            token !== null && <ProfileDropdown />
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
