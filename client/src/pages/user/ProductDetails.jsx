import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../style/ProductDetails.css";
import { IoMdShare } from "react-icons/io";
import { FcLike } from "react-icons/fc";
import { CiHeart } from "react-icons/ci";

import UserService from "../../services/user-api-service/UserService";

function ProductDetails() {


  const {getProductById} = UserService ();

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [likedItems, setLikedItems] = useState([]);
  const [wishItem, setwishItem] = useState([]);
  const [qty, setQty] = useState(1);



 useEffect(() => {


  const fetchProducts = async () => {
    try {
      // const res = await fetch("http://localhost:5000/api/products");
      // const data = await res.json();

       const res = await getProductById(id); 

      setProduct(res);

    } catch (error) {
      console.log(error);
    }
  };

  fetchProducts();
}, [id]);



  const onHandleLike = (value) => {
    if (likedItems.includes(value._id)) {
      setLikedItems(likedItems.filter(item => item !== value._id));
      setwishItem(wishItem.filter(item => item._id !== value._id));
    } else {
      setLikedItems([...likedItems, value._id]);
      setwishItem([...wishItem, value]);
    }
  };

const dec = () => {
  setQty(prev => (prev > 1 ? prev - 1 : 1));
};


 const inc = () => {
  setQty(prev => prev + 1);
};

  if (!product) return <h2>Loading...</h2>;

  return (
    <div className="product-details">

      <div className="product-main">
                             <img
  src={`http://localhost:5000/uploads/${product.images[0]}`}
  alt="" width="200"
/>

        <div className="like-icon">
          <button onClick={() => onHandleLike(product)}>
            {likedItems.includes(product._id) ? <FcLike /> : <CiHeart />}
          </button>
          </div>

          <div className="share-icon">
          <button><IoMdShare /></button>
          </div>
          <div className="purchase-btn">
          <button>Purchase Now</button>
          </div>
          <div className="cart-btn-detail">
          <button>Add to Cart</button>
          </div>
        

        
      </div>

      <div className="product-deep">

      <h1>{product.title}</h1>
      <h2> ₹ {product.price}</h2>
      {/* <div className="qty-box"> 
  <button className="btn" onClick={dec}>-</button>

  <div className="count-circle">{qty}</div>

  <button className="btn" onClick={inc}>+</button>
</div> */}
       <p> Offer - {product.offer}</p>
      <p>{product.description}</p>
     
      </div>

    </div>
  );
}

export default ProductDetails;