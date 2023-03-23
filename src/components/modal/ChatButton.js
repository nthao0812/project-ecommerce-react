import { useDispatch } from "react-redux";
import { ChatActions } from "../../store/chat-actions";
import "./ChatButton.css";

const ChatButton = () => {
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(ChatActions.toggle());
  };
  return <div className="chatbutton" onClick={clickHandler}></div>;
};
export default ChatButton;
