import { useSelector } from "react-redux";
import Item from "./Item";
import "./Products.css";
const Products = (props) => {
  //if category props is not undifined then data will be all product that has same category
  const data = useSelector((state) => state.data.data);

  const cat = props.category;
  const dataArr =
    cat === undefined || cat === "all"
      ? data
      : data.filter((product) => product.category === cat);
  
  // Khi hiển thị danh sách các sản phẩm, bạn sẽ cần chú ý các điều sau:

  // -Chỉ hiển thị tối đa 8 phần tử đầu tiên của danh sách trả về từ API.
  const displayLength = dataArr.length >= 8 ? 8 : dataArr.length;
  // -Hình ảnh để hiển thị ở danh sách sẽ là thuộc tính img1.
  // -price sẽ ở kiểu số, bạn sẽ cần chuyển đổi thành dạng chuỗi vào bổ
  // sung các dấu chấm ngăn cách giữa các đơn vị. Ví dụ "10999000" sẽ

  // thành "10.999.000".
  const classes = `shoppage_container ${props.className}`;
  return (
    <div className={classes}>
      {dataArr.length > 0 &&
        dataArr.map(
          (product, i) =>
            i < displayLength && <Item data={product} key={product._id.$oid} />
        )}
    </div>
  );
};
export default Products;
