import React, { useEffect } from "react";
import loading from "../assets/Loading.gif";
const Loading = () => {
  useEffect(() => {
    console.log("Component rendered");
  }, []);
  return (
    <div>
      <img src={loading} alt="Loading Animation" />
    </div>
  );
};
export default Loading;
