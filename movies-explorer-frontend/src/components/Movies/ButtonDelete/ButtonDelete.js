import React from "react";

function ButtonDelete(props) {
  const { handleClickLikedToggle } = props;
  return (
    <button className="btn-delete" onClick={handleClickLikedToggle}></button>
  );
}

export default ButtonDelete;
