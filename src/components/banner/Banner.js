import "./Banner.css";
import { useNavigate } from "react-router-dom";
import banner from "./banner1.jpg";

const Banner = () => {
  const navigate = useNavigate();
  const clickHandler = (e) => {
    navigate("/shop");
  };
  return (
    <div className="banner_container">
      <img src={banner} alt="banner" className="banner_img" />
      <div className="banner_sale">
        <p>NEW INSPIRATION 2022</p>
        <h2>20% OFF ON NEW SEASON</h2>
        <button type="button" onClick={clickHandler}>
          Brose Collections
        </button>
      </div>
    </div>
  );
};
export default Banner;
