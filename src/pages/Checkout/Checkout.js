import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckOutItem from "../../components/CheckOutItem/CheckOutItem";
import CustomCheckOutInput from "../../components/CustomCheckOutInput/CustomCheckOutInput";
import useFormat from "../../hook/useFormat";
import Layout from "../../Layout/Layout";
import "./Checkout.css";
const CheckOut = () => {
  const dispatch = useDispatch();
  const { format } = useFormat();
  const navigate = useNavigate();

  const items = useSelector((state) => state.cart.items);
  const data = useSelector((state) => state.data.data);

  const getPrice = (id) => {
    const resulst = data.find((item) => item._id.$oid === id)?.price;
    return +resulst;
  };

  const subtotal = items.reduce(
    (total, item) => item.quan * getPrice(item.id) + total,
    0
  );

  return (
    <Layout>
      <div className="chkout_container">
        <div className="chkout_left">
          <h1>CHECK OUT</h1>
          <h3>BILLING DETAILS</h3>
          <CustomCheckOutInput title="Full Name" />
          <CustomCheckOutInput title="Email" />
          <CustomCheckOutInput title="Phone Number" />
          <CustomCheckOutInput title="Address" />
          <button className="chkout_btn">Place Order</button>
        </div>
        <div className="chkout_right">
          <div className="chkout_nav">
            <button type="button" onClick={() => {}}>
              HOME
            </button>
            /
            <button type="button" onClick={() => {}}>
              CART
            </button>
            /
            <button type="button" onClick={() => {}}>
              CHECKOUT
            </button>
          </div>
          <div className="chkout_order">
            <h3>YOUR ORDER</h3>
            {data.length > 0 &&
              items.map((item) => <CheckOutItem item={item} key={item.id} />)}
            <div className="chkout_subtotal">
              <h4>TOTAL</h4>
              <p>{`${format(subtotal + "")} VND`}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default CheckOut;
