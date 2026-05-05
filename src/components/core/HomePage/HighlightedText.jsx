import React from "react";
function Highlighted(props) {
  return <span className="font-semibold  bg-gradient-to-r 
  from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] 
  bg-clip-text text-transparent"> {props.text}</span>;
}

export default Highlighted;
