import "./Detail.css";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Layout/Layout";
import { modalActions } from "../../store/modal-actions";
import DetailImg from "../../components/DetailImg/DetailImg";
import useFormat from "../../hook/useFormat";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import RelatedProduct from "../../components/RelatedProduct/RelatedProduct";
import { cartActions } from "../../store/cart-actions";

import useScrollToTop from "../../hook/useScrollToTop";

const Detail = () => {
  const { format } = useFormat();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // set display on redux state modal = false !!!!!
  dispatch(modalActions.hidePopup());

  const products = useSelector((state) => state.data.data);

  const owner = useSelector((state) => state.login.userName);
  const isLogin = useSelector((state) => state.login.isLogin);
  const [value, setValue] = useState(0);

  const params = useParams();
  const id = params._id;
  const data = products?.find((prd) => prd._id.$oid === id);

  //get the value in input field to render button disable or not. =0? disalbe : enable
  const getNumber = (num) => {
    setValue(num);
  };

  // get data to the related product on bottom
  const relatedData = products.filter(
    (prd) => prd.category === data.category && prd._id.$oid !== data._id.$oid
  );

  const addToCardHandler = () => {
    if (!isLogin) {
      alert("You must LOGIN!!");
      return;
    }
    const item = { id: data._id.$oid, quan: value };

    //update store redux
    dispatch(cartActions.addCart(item));
    //save cart to localstore
    const localCart = JSON.parse(localStorage.getItem(owner));
    if (localCart === null) {
      localStorage.setItem(owner, JSON.stringify([item]));
    } else {
      const exist = localCart.find((item) => item.id === data._id.$oid);
      if (!exist) {
        localCart.push(item);
        localStorage.setItem(owner, JSON.stringify(localCart));
      } else {
        exist.quan += value;
        localStorage.setItem(owner, JSON.stringify(localCart));
      }
    }

    navigate("/shop");
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <Layout>
      <div className="this_is_other_way">
        {data && (
          <DetailImg imgArr={[data.img1, data.img2, data.img3, data.img4]} />
        )}
        <div className="text-right-detail">
          {data && <h2>{data.name}</h2>}

          {data && <p>{`${format(data?.price)} VND`}</p>}

          {data && <p>{data.short_desc}</p>}
          <div className="category-detail">
            <p className="lg-text-detail">Category: </p>
            {data && <p>{data.category}</p>}
          </div>

          <div className="add-to-cart-container">
            <p>Quantity</p>
            <CustomInput getNumber={getNumber} />
            <button
              className="add-to-cart-btn"
              onClick={addToCardHandler}
              disabled={value === 0}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      <div className="other_div">
        <button className="sh">Description</button>
        <h4>Product Description</h4>
        {data && <p>{data.long_desc}</p>}
      </div>
      {data && <RelatedProduct data={relatedData} />}
    </Layout>
  );
};
export default Detail;
