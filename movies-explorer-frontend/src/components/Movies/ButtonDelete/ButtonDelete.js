import React from "react";

function ButtonDelete(props) {
  const { handleLikeToggle } = props;
  return (
    <button className="btn-delete" onClick={handleLikeToggle}></button>
  );
}

export default ButtonDelete;
