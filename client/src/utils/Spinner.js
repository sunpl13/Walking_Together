import React from "react";
import Loader from "react-loader-spinner";
import "../styles/spinner.scss";

function Spinner(props) {
  const { show } = props;

  return (
    <div className="Spinner_Wraper" style={{ opacity: show ? "1" : "0" }}>
      <div className="spinner">
        <Loader type="Oval" color="#e2e2e2" height={30} width={30} />
      </div>
    </div>
  );
}

export default Spinner;
