import React from "react";

function ButtonMore(props) {
  const { handleAddMore } = props;
  return (
    <button className="btn-more" onClick={handleAddMore}>
      Еще
    </button>
  );
}

export default ButtonMore;
