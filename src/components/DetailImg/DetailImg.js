import { useState } from "react";
import "./DetailImg.css";
const DetailImg = (prosp) => {
  const imgArr = prosp.imgArr;
  const [mainImg, setMainImg] = useState(imgArr[0]);

  const changeMainImgHandler = (e) => {
    const main = mainImg;
    setMainImg(e.target.src);
    e.target.src = main;
  };

  return (
    <div className="detailimg_container">
      <div className="sm-left">
        <img src={imgArr[1]} alt="img2" onClick={changeMainImgHandler}></img>
        <img src={imgArr[2]} alt="img3" onClick={changeMainImgHandler}></img>
        <img src={imgArr[3]} alt="img4" onClick={changeMainImgHandler}></img>
      </div>
      <img className="lg-right" src={mainImg} alt="img"></img>
    </div>
  );
};
export default DetailImg;
