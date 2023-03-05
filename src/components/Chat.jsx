import * as React from "react";
import io from "socket.io-client";
import {useLocation, useNavigate} from "react-router-dom";
import styles from "../styles/Chat.module.css";
import icon from "../images/emoji.svg";
import EmojiPicker from "emoji-picker-react";
import { Messages } from "./Messages";

const socket = io.connect("https://server-chat-nrkj.onrender.com");

export const Chat = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [state, setState] = React.useState([]);
  const [params, setParams] = React.useState({ room: "", user: "" });
  const [message, setMessage] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [users, setUsers] = React.useState(0);

  React.useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
    socket.emit("join", searchParams);
  }, [search]);

  React.useEffect(() => {
    socket.on("message", ({ data }) => {
      setState((_state) => [..._state, data]);
    });
  }, []);

  React.useEffect(() => {
    socket.on("room", ({ data: { users } }) => {
      setUsers(users.length);
    });
  }, []);

  const handeLeftRoom = () => {
    socket.emit("leftRoom", { params });
    navigate('/')
  };
  const handleChange = ({ target: { value } }) => {
    setMessage(value);
  };
  const onEmojiClick = ({ emoji }) => {
    setMessage(`${message} ${emoji}`);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message) {
      return;
    }

    socket.emit("sendMessage", { message, params });

    setMessage("");
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.title}>{params.room}</div>
        <div className={styles.users}>{users} Users in the room</div>
        <button className={styles.left} onClick={handeLeftRoom}>
          Left the room
        </button>
      </div>

      <div className={styles.messages}>
        <Messages messages={state} name={params.name} />
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.input}>
          <input
            type="text"
            onChange={handleChange}
            autoComplete={"off"}
            placeholder={"What do you want to say?"}
            name={"message"}
            value={message}
            required
          />
        </div>

        <div className={styles.emoji}>
          <img onClick={() => setIsOpen(!isOpen)} src={icon} alt="" />

          {isOpen && (
            <div className={styles.emojies}>
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>

        <div className={styles.button}>
          <input type="submit" value="Send a message" onSubmit={handleSubmit} />
        </div>
      </form>
    </div>
  );
};
