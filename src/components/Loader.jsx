import React from "react";
import { RotatingLines } from "react-loader-spinner";

const Loader = () => {
  return (
    <RotatingLines
      visible={true}
      height="25"
      width="25"
      strokeColor="white"
      strokeWidth="5"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default Loader;
