import React from "react";

export const Article = props => {
  if (props.section.type === "p") {
    return <p>{props.section.content}</p>;
  }
  if (props.section.type === "h1") {
    return <h1>{props.section.content}</h1>;
  }
  if (props.section.type === "h2") {
    return <h2>{props.section.content}</h2>;
  }
  if (props.section.type === "h3") {
    return <h3>{props.section.content}</h3>;
  }
  if (props.section.type === "h4") {
    return <h4>{props.section.content}</h4>;
  }
  if (props.section.type === "h5") {
    return <h5>{props.section.content}</h5>;
  }
  if (props.section.type === "h6") {
    return <h6>{props.section.content}</h6>;
  }
  return null;
};
