
import React from "react";
import "./PageButton.css"

const PageButton = ({ onClick, children  }) => (
  <div className="search-button">
    <button onClick={onClick}>{children}</button>
  </div>
)

export default PageButton;