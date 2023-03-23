import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItem from "../../components/CartItem/CartItem";
import useFormat from "../../hook/useFormat";

import Layout from "../../Layout/Layout";
import { activeActions } from "../../store/active-action";
import "./Cart.css";
const Cart = () => {
  const dispatch = useDispatch();
  const { format } = useFormat();
  const navigate = useNavigate();

  const items = useSelector((state) => state.cart.items);
  const data = useSelector((state) => state.data.data);

  const getPrice = (id) => {
    const resulst = data.find((item) => item._id.$oid === id)?.price;
    return +resulst;
  };
  // return number type need to format to string with numberic style
  const subtotal = items.reduce(
    (total, item) => item.quan * getPrice(item.id) + total,
    0
  );

  const continueHandler = () => {
    navigate("/shop");
    dispatch(activeActions.active("shop"));
  };
  const checkOutHandler = () => {
    navigate("/checkout");
  };

  return (
    <Layout>
      <div className="cart_container">
        <div className="top_32">
          <div className="left_70">
            <h1>Cart</h1>
            <h3>Shoping Cart</h3>
            <div>
              <div className="cart_title">
                <h5 className="h5_14">IMAGE</h5>
                <h5 className="longger_h5">PRODUCT</h5>
                <h5 className="h5_14">PRICE</h5>
                <h5 className="h5_14">QUANTITY</h5>
                <h5 className="h5_14">TOTAL</h5>
                <h5 className="h5_14">REMOVE</h5>
              </div>

              {data.length>0 && items.map((item) => (
                <CartItem data={item} key={item.id} />
              ))}
            </div>
          </div>

          <div className="right_30">
            <div>
              <p>CART</p>
            </div>
            <div>
              <h3>CART TOTAL</h3>
            </div>
            <div className="row_cart">
              <h5>SUBTOTAL</h5>
              <p>{`${format(subtotal + "")} VND`}</p>
            </div>
            <div className="row_cart">
              <h5>TOTAL</h5> <h3>{`${format(subtotal + "")} VND`}</h3>
            </div>
            <input type="text" placeholder="Enter your coupon" />
            <button>🎁Apply coupon</button>
          </div>
        </div>
        <div className="bottom_32">
          <button
            type="button"
            onClick={continueHandler}
            className="continueshoping"
          >
            ⬅ Continue Shopping
          </button>
          <button
            type="button"
            onClick={checkOutHandler}
            className="prccheckout"
          >
            Proceed to checkout ➡
          </button>
        </div>
      </div>
    </Layout>
  );
};
export default Cart;
