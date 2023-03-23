import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { cartActions } from "../../store/cart-actions";
import { loginActions } from "../../store/login-action";

const Signout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginActions.onLogout());
    localStorage.removeItem("Login_user_email");
    //reset cart
    dispatch(cartActions.reset());
    navigate("/home");
  }, [dispatch]);

  return <Layout></Layout>;
};
export default Signout;
