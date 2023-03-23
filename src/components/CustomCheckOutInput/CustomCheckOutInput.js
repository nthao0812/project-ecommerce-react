import "./CustomCheckOutInput.css";

const CustomCheckOutInput = (props) => {
  return (
    <div className="CustomChck">
      <p>{`${props.title}:`}</p>
      <input
        className="customchckout_input"
        type="text"
        placeholder={`Enter your ${props.title} here!`}
      ></input>
    </div>
  );
};
export default CustomCheckOutInput;
