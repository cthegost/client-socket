import * as React from "react";
import styles from "../styles/Main.module.css";
import { Link } from "react-router-dom";

const FIELDS = {
  userName: "userName",
  room: "room",
};

const Main = () => {
  const { userName, room } = FIELDS;
  const [values, setValues] = React.useState({ [userName]: "", [room]: "" });

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleClick = (e) => {
    const isDisabled = Object.values(values).some((value) => !value);

    if (isDisabled) {
      e.preventDefault();
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Join</h1>
        <form className={styles.form}>
          <div className={styles.group}>
            <input
              type="text"
              onChange={handleChange}
              autoComplete={"off"}
              placeholder={"userName"}
              name={"userName"}
              value={values[userName]}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.group}>
            <input
              type="text"
              onChange={handleChange}
              autoComplete={"off"}
              placeholder={"Room"}
              name={"room"}
              value={values[room]}
              className={styles.input}
              required
            />
          </div>
          <Link
            className={styles.group}
            to={`/chat?name=${values[userName]}&room=${values[room]}`}
          >
            <button
              onClick={handleClick}
              className={styles.button}
              type={"submit"}
            >
              Sign in
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Main;
