import React from "react";
import { Container, Row, Col, Badge } from "reactstrap";
import { Article } from "./../Article";
import "./Experience.css";

const article = {
  content: [
    {
      type: "h2",
      key: "h2-experience",
      content: "Experience"
    },
    {
      type: "EmploymentPanel",
      key: "employment-panel-agitavit",
      startedDate: "August 2017",
      companyName: "Agitavit Solutions d.o.o.",
      companyPosition: "Software developer",
      companyLogoSrc: "/assets/images/logo-agitavit.png",
      content: [
        {
          type: "EmploymentTag",
          key: "tag-csharp",
          content: "C#"
        },
        {
          type: "EmploymentTag",
          key: "tag-web-forms",
          content: "ASP .NET Web Forms"
        },
        {
          type: "EmploymentTag",
          key: "tag-mvc",
          content: "ASP .NET MVC"
        },
        {
          type: "EmploymentTag",
          key: "tag-mssql",
          content: "MS SQL"
        },

        {
          type: "EmploymentTag",
          key: "tag-javascript",
          content: "Javascript"
        },
        {
          type: "EmploymentTag",
          key: "tag-visual-studio",
          content: "Microsoft Visual Studio"
        },
        {
          type: "EmploymentTag",
          key: "tag-tfs",
          content: "Microsoft TFS"
        },
        {
          type: "EmploymentTag",
          key: "tag-ajax",
          content: "Ajax"
        },
        {
          type: "EmploymentTag",
          key: "tag-html",
          content: "HTML"
        },
        {
          type: "EmploymentTag",
          key: "tag-css",
          content: "CSS"
        }
      ]
    },
    {
      type: "EmploymentPanel",
      key: "employment-panel-5ka",
      startedDate: "October 2016",
      companyName: "5ka digitalni svet (Aljoša Motore s.p.)",
      companyPosition: "Software developer",
      companyLogoSrc: "/assets/images/logo-5ka.png",
      content: [
        {
          type: "EmploymentTag",
          key: "tag-PHP",
          content: "PHP"
        },
        {
          type: "EmploymentTag",
          key: "tag-MySQL",
          content: "MySQL"
        },
        {
          type: "EmploymentTag",
          key: "tag-HTML",
          content: "HTML"
        },
        {
          type: "EmploymentTag",
          key: "tag-css",
          content: "CSS"
        },
        {
          type: "EmploymentTag",
          key: "tag-Ajax",
          content: "Ajax"
        },
        {
          type: "EmploymentTag",
          key: "tag-Magento",
          content: "Magento"
        },
        {
          type: "EmploymentTag",
          key: "tag-Joomla",
          content: "Joomla"
        },
        {
          type: "EmploymentTag",
          key: "tag-Git",
          content: "Git"
        },
        {
          type: "EmploymentTag",
          key: "tag-Linux Terminal",
          content: "Linux Terminal"
        },
        {
          type: "EmploymentTag",
          key: "tag-Apache",
          content: "Apache"
        },
        {
          type: "EmploymentTag",
          key: "tag-Sublime Text",
          content: "Sublime Text"
        },
        {
          type: "EmploymentTag",
          key: "tag-Photoshop",
          content: "Photoshop"
        }
      ]
    },
    {
      type: "EmploymentPanel",
      key: "employment-panel-outfit7",
      startedDate: "October 2014",
      companyName: "Ekipa2 d.o.o. (Outfit7 subsidiary)",
      companyPosition: "Software Architect",
      companyLogoSrc: "/assets/images/logo-outfit7.png",
      content: [
        {
          type: "EmploymentTag",
          key: "tag-Talking Tom",
          content: "Talking Tom"
        },
        {
          type: "EmploymentTag",
          key: "tag-csharp",
          content: "C#"
        },
        {
          type: "EmploymentTag",
          key: "tag-Windows Store Apps",
          content: "Windows Store Apps"
        },
        {
          type: "EmploymentTag",
          key: "tag-Windows Phone",
          content: "Windows Phone"
        },
        {
          type: "EmploymentTag",
          key: "tag-Unity",
          content: "Unity"
        },
        {
          type: "EmploymentTag",
          key: "tag-Marmalade",
          content: "Marmalade"
        },
        {
          type: "EmploymentTag",
          key: "tag-Jenkins",
          content: "Jenkins"
        },
        {
          type: "EmploymentTag",
          key: "tag-Powershell",
          content: "Powershell"
        },
        {
          type: "EmploymentTag",
          key: "tag-Microsoft Visual Studio",
          content: "Microsoft Visual Studio"
        },
        {
          type: "EmploymentTag",
          key: "tag-Git",
          content: "Git"
        },
        {
          type: "EmploymentTag",
          key: "tag-SourceTree",
          content: "SourceTree"
        },
        {
          type: "EmploymentTag",
          key: "tag-Jira",
          content: "Jira"
        },
        {
          type: "EmploymentTag",
          key: "tag-Review Board",
          content: "Review Board"
        }
      ]
    },
    {
      type: "EmploymentPanel",
      key: "employment-panel-net-informatika",
      startedDate: "December 2012",
      companyName: "NET Informatika d.o.o.",
      companyPosition: "Programmer / developer .NET C#",
      companyLogoSrc: "/assets/images/logo-net-informatika.png",
      content: [
        {
          type: "EmploymentTag",
          key: "tag-csharp",
          content: "C#"
        },
        {
          type: "EmploymentTag",
          key: "tag-ASP .NET Web Forms",
          content: "ASP .NET Web Forms"
        },
        {
          type: "EmploymentTag",
          key: "tag-HTML",
          content: "HTML"
        },
        {
          type: "EmploymentTag",
          key: "tag-CSS",
          content: "CSS"
        },
        {
          type: "EmploymentTag",
          key: "tag-Jira",
          content: "Jira"
        },
        {
          type: "EmploymentTag",
          key: "tag-Javascript",
          content: "Javascript"
        },
        {
          type: "EmploymentTag",
          key: "tag-Ajax",
          content: "Ajax"
        },
        {
          type: "EmploymentTag",
          key: "tag-Windows Forms",
          content: "Windows Forms"
        },
        {
          type: "EmploymentTag",
          key: "tag-MS SQL",
          content: "MS SQL"
        },
        {
          type: "EmploymentTag",
          key: "tag-Umbraco",
          content: "Umbraco"
        },
        {
          type: "EmploymentTag",
          key: "tag-Windows Store Apps",
          content: "Windows Store Apps"
        },
        {
          type: "EmploymentTag",
          key: "tag-Android",
          content: "Android"
        }
      ]
    },
    {
      type: "EmploymentPanel",
      key: "employment-panel-italia",
      startedDate: "July 2010",
      companyName: "Restaurant and pizzeria LaItalia d.o.o.",
      companyPosition: "Delivery driver (student)",
      companyLogoSrc: "/assets/images/logo-italia.png",
      content: [
        {
          type: "EmploymentTag",
          key: "tag-Food delivery",
          content: "Food delivery"
        },
        {
          type: "EmploymentTag",
          key: "tag-PHP",
          content: "PHP"
        },
        {
          type: "EmploymentTag",
          key: "tag-MySQL",
          content: "MySQL"
        },
        {
          type: "EmploymentTag",
          key: "tag-CSS",
          content: "CSS"
        },
        {
          type: "EmploymentTag",
          key: "tag-HTML",
          content: "HTML"
        },
        {
          type: "EmploymentTag",
          key: "tag-Apache",
          content: "Apache"
        }
      ]
    }
  ]
};

const renderContent = content => {
  return (
    <React.Fragment>
      {content.map(section => {
        if (section.type === "Row") {
          return <Row key={section.key}>{renderContent(section.content)}</Row>;
        }
        if (section.type === "EmploymentPanel") {
          return (
            <EmploymentPanel
              key={section.key}
              startedDate={section.startedDate}
              companyName={section.companyName}
              companyPosition={section.companyPosition}
              companyLogoSrc={section.companyLogoSrc}
            >
              {renderContent(section.content)}
            </EmploymentPanel>
          );
        }
        if (section.type === "EmploymentTag") {
          return <EmploymentTag key={section.key} content={section.content} />;
        }
        return <Article key={section.key} section={section} />;
      })}
    </React.Fragment>
  );
};

export const Experience = () => {
  return <Container>{renderContent(article.content)}</Container>;
};

const EmploymentPanel = props => {
  return (
    <Row className="justify-content-center">
      <Col
        xs="6"
        md="3"
        className="my-3 my-md-1 text-center order-2 order-md-3"
      >
        <img
          className="img-fluid"
          src={props.companyLogoSrc}
          alt={props.companyName}
        />
      </Col>
      <Col
        xs="12"
        md="7"
        className="text-md-left text-center employment order-3 order-md-2"
      >
        <h4>{props.companyPosition}</h4>
        <p>{props.companyName}</p>
        <p>{props.children}</p>
        <hr className="py-3" />
      </Col>
      <Col xs="12" md="2" className="text-md-right text-center order-1">
        {props.startedDate}
      </Col>
    </Row>
  );
};

const EmploymentTag = props => {
  return (
    <Badge color="info" className="mr-1">
      {props.content}
    </Badge>
  );
};
