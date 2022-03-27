import React, { useEffect } from "react";
import { useState } from "react";
export default function Invoice(props) {
  return (
    <div className="invoice">
      <h1>Download Invoice : </h1>
      <a href={props.link} target="_blank">
        &nbsp; &nbsp;Click Here
      </a>
    </div>
  );
}
