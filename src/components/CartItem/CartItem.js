
import { useDispatch, useSelector } from "react-redux";
import useFormat from "../../hook/useFormat";
import { cartActions } from "../../store/cart-actions";

import CustomInput from "../CustomInput/CustomInput";

import "./CartItem.css";

const CartItem = (props) => {
  const owner = useSelector((state) => state.login.userName);
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const { format } = useFormat();

  const item = props.data;
  const { id } = item;
  // find number to render input < number >
  const num = items.find((i) => i.id === id).quan;
  const data = useSelector((state) => state.data.data);

  //handler update quantity when input field click in CustomIntput compunent
  const updateQuan = (num) => {
    dispatch(cartActions.updateCart({ id: id, quan: num }));
    //updateLocal store
    const localData = JSON.parse(localStorage.getItem(owner));
    const exist = localData.find((item) => item.id === id);
    exist.quan = num;
    localStorage.setItem(owner, JSON.stringify(localData));
  };

  const removeHandler = () => {
    if (window.confirm("❌❌❌  DELETE  ❓❓❓")) {
      dispatch(cartActions.deleteCart(id));
      //remove in local
      const localItems = JSON.parse(localStorage.getItem(owner));
      const index = localItems.findIndex((item) => item.id === id);
      localItems.splice(index, 1);
      localStorage.setItem(owner, JSON.stringify(localItems));
    }
  };

  const product = data.find((prd) => prd._id.$oid === id);
  //   console.log(product);
  const money = format(product?.price);

  const total = format((+num * +product.price).toString());

  return (
    <div className="cartitem_container">
      <img src={product.img1} alt={product.name} />
      <p className="cartitem_name">{product.name}</p>
      <p className="cartitem_container_p wrap">{`${money} VND`}</p>
      <CustomInput
        value={num}
        min={1}
        className="cartitem_container_p"
        getNumber={updateQuan}
      />
      <p className="cartitem_container_p wrap">{`${total} VND`}</p>
      <p className="cartitem_container_p unselected" onClick={removeHandler}>
        ❌
      </p>
    </div>
  );
};

export default CartItem;
