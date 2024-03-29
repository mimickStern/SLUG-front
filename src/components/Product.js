import React, { useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from "./Rating";
import { Store } from "../Store";

const Product = (props) => {
  const { product } = props;

  const {state, dispatch: ctxDispatch} = useContext(Store);
  const {cart: {cartItems},} = state;
  console.log({cartItems})

  const addToCartHandler = async (item) => {
    console.log({item})
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    const {data} = await axios.get(`/api/products/product/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry :( Product is out of stock');
      return;
    }

    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: {...item, quantity}
    });
  };

  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} alt={product.name} className="card-img-top"/>
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        {product.countInstock === 0 ? (
          <Button variant="light" disabled>
            Out Of Stock
          </Button>
        ) :
        (
        <Button onClick={() => addToCartHandler(product)}>Add To Cart</Button>
        )
        }
        
      </Card.Body>
    </Card>
  );
};

export default Product;
