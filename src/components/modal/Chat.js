import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatActions } from "../../store/chat-actions";
import { useDrag } from "react-use-gesture";
import { animated, useSpring } from "@react-spring/web";

import "./Chat.css";

const Chat = () => {
  const dispatch = useDispatch();
  const display = useSelector((state) => state.chat.isDisplay);
  const [message, setMessage] = useState("");
  const messages = useSelector((state) => state.chat.content);

  const [{ x, y }, api] = useSpring(() => ({
    x: 0,
    y: 0,
  }));

  const bindDrag = useDrag(({ offset }) => {
    api({
      x: offset[0],
      y: offset[1],
    });
  });

  const inputChangeHandler = (e) => {
    setMessage(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setMessage("");
    dispatch(ChatActions.sendMessage(message));
  };

  const classes = `chat_container ${display ? "on" : "off"}`;
  return (
    <animated.div className={classes} style={{ x, y }} {...bindDrag()}>
      <div>
        <div>
          <h2>Customer Support</h2>
        </div>
        <div className="chat_box_container">
          {messages.length > 0 &&
            messages.map((mes) => (
              <p className="chattext_style" key={Math.random()}>
                {`🌵: ${mes}`}
              </p>
            ))}
        </div>
        <form className="chat_input_container" onSubmit={submitHandler}>
          <p>👨🏽‍✈️</p>
          <input
            type="text"
            value={message}
            placeholder="Enter Message!"
            onChange={inputChangeHandler}
          />
          <button type="button">🔗</button>
          <button type="button">😀</button>
          <button type="submit">🚀</button>{" "}
        </form>
      </div>
      <div></div>
    </animated.div>
  );
};
export default Chat;
