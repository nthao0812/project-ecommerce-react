import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { dataAction } from "../store/dataSlide";

const useFetch = () => {
  const dispatch = useDispatch();
  const url =
    "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74";

  const sendRequest = useCallback(async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("không thể kết nối 404");
      }
      const data = await response.json();
      //save to local
      // console.log("-----------  fetched  -----------");
      dispatch(dataAction.setData(data));
    } catch (err) {
      console.error(err.message);
    }
  }, []);

  return { sendRequest };
};

export default useFetch;
