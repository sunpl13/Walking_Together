import React from "react";
import "../styles/app.scss";

function Comment(props) {
  const { sub, main } = props;

  const Item = ({ text }) => {
    return <div className="mainWrap">
      {text.split("\n").map((txt,i) => (
          <p key={i}>
            {txt}
            <br />
          </p>
        ))}
    </div>;
  };

  return (
    <div>
      <p className="sub_comment" id="sub_comment">{sub}</p>
      <div className="main_comment" id="main_comment">
        <Item text={main} />
      </div>
    </div>
  );
}

export default Comment;
