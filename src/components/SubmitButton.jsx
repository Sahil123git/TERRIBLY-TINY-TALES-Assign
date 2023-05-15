import styles from "./submitButton.module.css";
import { useState } from "react";

const SubmitButton = ({ fetchData, setClicked, setLoading }) => {
  const [toggle, setToggle] = useState(1);
  return (
    <div
      className={
        toggle === 1 ? styles.showButtonContainer : styles.hideButtonContainer
      }
    >
      <button
        className={styles.button}
        onClick={() => {
          setToggle(0);
          setClicked(1);
          setLoading(1);
          fetchData();
        }}
      >
        Submit
      </button>
    </div>
  );
};
export default SubmitButton;
