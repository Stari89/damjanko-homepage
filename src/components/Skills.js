import React from "react";
import { Container, Row } from "reactstrap";
import { Skill } from "./Skill/Skill";
import { Article } from "./Article";
import data from "./../data";

const renderContent = content => {
  return (
    <React.Fragment>
      {content.map(section => {
        if (section.type === "Row") {
          return <Row key={section.key}>{renderContent(section.content)}</Row>;
        }
        if (section.type === "Skill") {
          return (
            <Skill
              key={section.key}
              logoSrc={section.logoSrc}
              content={section.content}
            />
          );
        }
        return <Article key={section.key} section={section} />;
      })}
    </React.Fragment>
  );
};

export const Skills = () => {
  return <Container>{renderContent(data.skills.content)}</Container>;
};
