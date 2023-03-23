import { useSelector } from "react-redux";
import useFormat from "../../hook/useFormat";
import "./CheckOutItem.css";

const CheckOutItem = (props) => {
  const { format } = useFormat();
  const item = props.item;
  const { id, quan } = item;
  const data = useSelector((state) => state.data.data);
  const product = data.find((prd) => prd._id.$oid === id);
  
  const { name, price } = product;
   const formatPrice = format(price);
  return (
    <div className="chkoutitem">
      <h6>{name}</h6>
      <p>{`${formatPrice} VND`}</p>
      <p>{`x${quan}`}</p>
    </div>
  );
};
export default CheckOutItem;
