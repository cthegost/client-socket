import * as React from "react";
import styles from "../styles/Messages.module.css";
import classNames from "classnames";

export const Messages = ({ messages, name }) => {
  return (
    <div className={styles.messages}>
      {messages.map(({ message, user }, index) => {
        const me = user.name.trim().toLowerCase() === name.trim().toLowerCase();
        const className = me ? styles.me : styles.user;

        return (
          <div className={classNames(styles.message, className)} key={index}>
            <span className={styles.user}>{user.name}</span>
            <div className={styles.text}>{message}</div>
          </div>
        );
      })}
    </div>
  );
};
