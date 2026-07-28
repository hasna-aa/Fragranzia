import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../../style/wishlist.css";
import { FaHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import WishlistService from "../../services/user-api-service/WishlistService";
import CartService from "../../services/user-api-service/CartService";

const Wishlist = () => {

  const [wishlist, setWishlist] = useState([]);

  const navigate = useNavigate();

  const {
    getWishlist,
    removeFromWishlist,
  } = WishlistService();


  const {
    addToCart,
  } = CartService();


  // GET WISHLIST
  const fetchWishlist = async () => {
    try {

      const data = await getWishlist();
        

      setWishlist(data || []);

    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      toast.info("Please Login First");
      navigate("/login");
      return;
    }

    fetchWishlist();

  }, [navigate]);



  // REMOVE WISHLIST
  const removeWishlist = async (id) => {

    try {

      await removeFromWishlist(id);

      fetchWishlist();

    } catch(error){

      console.log(error);

    }

  };



  // ADD TO CART
  const handleAddToCart = async (productId) => {

    try {

      await addToCart(productId,1);

      toast.info("Added to cart 🛒");

    } catch(error){

      console.log(error);

    }

  };


  return (

    <div className="wishlist-page">

      <div className="wishlist-container">


        <div className="wishlist-header">

          <h2>
            My Wishlist
          </h2>

          <p>
            {wishlist.length} Items
          </p>

        </div>



        {
          wishlist.length > 0 ? (

            <div className="wishlist-grid">


             {wishlist.map((item, index)=>(
  <div 
    className="wishlist-card"
    key={`${item._id}-${index}`}
  >
                    <div className="wishlist-heart">

                      <FaHeart
                        onClick={() =>
                          removeWishlist(item._id)
                        }
                      />

                    </div>



                    <img
                      src={`http://localhost:5000/uploads/${item.images[0]}`}
                      alt={item.title}
                    />



                    <h3>
                      {item.title}
                    </h3>



                    <div className="wishlist-price">

                      <h4>
                        ₹ {item.salePrice}
                      </h4>

                      <p>
                        ₹ {item.price}
                      </p>

                    </div>



                    <span className="wishlist-offer">
                      {item.offer} OFF
                    </span>



                    <div className="wishlist-btns">


                      <button
                        className="cart-btn"
                        onClick={() =>
                          handleAddToCart(item._id)
                        }
                      >
                        Add To Cart
                      </button>



                      <button
                        className="remove-btn"
                        onClick={() =>
                          removeWishlist(item._id)
                        }
                      >

                        <MdDelete />

                      </button>


                    </div>


                  </div>


                ))
              }


            </div>


          ) : (


            <div className="empty-wishlist">

              <h2>
                Wishlist is Empty
              </h2>

              <p>
                Save your favourite perfumes
              </p>

            </div>


          )
        }



      </div>

    </div>

  );

};


export default Wishlist;