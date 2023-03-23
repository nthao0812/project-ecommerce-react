import { Navigate, Route, Routes } from "react-router-dom";
import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginActions } from "./store/login-action";
import "./App.css";
import useFetch from "./hook/useFetch";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import { cartActions } from "./store/cart-actions";
import Chat from "./components/modal/Chat";
import ChatButton from "./components/modal/ChatButton";

const SignUp = React.lazy(() => import("./pages/SignUp/SignUp"));
const ShopPage = React.lazy(() => import("./pages/Shop/ShopPage"));
const SignIn = React.lazy(() => import("./pages/SignIn/SignIn"));
const Detail = React.lazy(() => import("./pages/Detail/Detail"));
const Signout = React.lazy(() => import("./pages/Signout/Signout"));
const Cart = React.lazy(() => import("./pages/Cart/Cart"));
const CheckOut = React.lazy(() => import("./pages/Checkout/Checkout"));

function App() {
  const { sendRequest } = useFetch();
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  const dispatch = useDispatch();
  //-------------load  user name & cart from local--------------
  const emailLogin = JSON.parse(localStorage.getItem("Login_user_email"));
  const allUser = JSON.parse(localStorage.getItem("List_User"));
  if (emailLogin !== null) {
    const userLogin = allUser.filter((user) => user.email === emailLogin);

    dispatch(loginActions.onLogin(userLogin[0].name));
    const userCart = JSON.parse(localStorage.getItem(userLogin[0].name));
    if (userCart !== null) {
      dispatch(cartActions.setItems(userCart));
    }
  }
  //----------------------------------------------------------

  return (
    <div className="App">
      <Suspense
        fallback={
          <div>
            <h1>Loading...</h1>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />}>
            <Route path="*" element={<Home />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:_id" element={<Detail />}></Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="signout" element={<Signout />}></Route>
          <Route path="/detail" element={<Detail />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Chat />
        <ChatButton />
      </Suspense>
    </div>
  );
}
export default App;
