import React from "react";
import { Container, Row, Col, Badge } from "reactstrap";
import "./Experience.css";

export const Experience = () => {
  return (
    <Container>
      <h2>Experience</h2>
      <EmploymentPanel
        startedDate="August 2017"
        companyName="Agitavit Solutions d.o.o."
        companyPosition="Software developer"
        companyLogoSrc="/assets/images/logo-agitavit.png"
      >
        <EmploymentTag name="C#" />
        <EmploymentTag name="ASP .NET Web Forms" />
        <EmploymentTag name="ASP .NET MVC" />
        <EmploymentTag name="MS SQL" />
        <EmploymentTag name="Javascript" />
        <EmploymentTag name="Microsoft Visual Studio" />
        <EmploymentTag name="Microsoft TFS" />
        <EmploymentTag name="Ajax" />
        <EmploymentTag name="HTML" />
        <EmploymentTag name="CSS" />
      </EmploymentPanel>
      <EmploymentPanel
        startedDate="October 2016"
        companyName="5ka digitalni svet (Aljoša Motore s.p.)"
        companyPosition="Software developer"
        companyLogoSrc="/assets/images/logo-5ka.png"
      >
        <EmploymentTag name="PHP" />
        <EmploymentTag name="MySQL" />
        <EmploymentTag name="HTML" />
        <EmploymentTag name="CSS" />
        <EmploymentTag name="Ajax" />
        <EmploymentTag name="Magento" />
        <EmploymentTag name="Joomla" />
        <EmploymentTag name="Git" />
        <EmploymentTag name="Linux Terminal" />
        <EmploymentTag name="Apache" />
        <EmploymentTag name="Sublime Text" />
        <EmploymentTag name="Photoshop" />
      </EmploymentPanel>
      <EmploymentPanel
        startedDate="October 2014"
        companyName="Ekipa2 d.o.o. (Outfit7 subsidiary)"
        companyPosition="Software Architect"
        companyLogoSrc="/assets/images/logo-outfit7.png"
      >
        <EmploymentTag name="Talking Tom" />
        <EmploymentTag name="C#" />
        <EmploymentTag name="Windows Store Apps" />
        <EmploymentTag name="Windows Phone" />
        <EmploymentTag name="Unity" />
        <EmploymentTag name="Marmalade" />
        <EmploymentTag name="Jenkins" />
        <EmploymentTag name="Powershell" />
        <EmploymentTag name="Microsoft Visual Studio" />
        <EmploymentTag name="Git" />
        <EmploymentTag name="SourceTree" />
        <EmploymentTag name="Jira" />
        <EmploymentTag name="Review Board" />
      </EmploymentPanel>
      <EmploymentPanel
        startedDate="December 2012"
        companyName="NET Informatika d.o.o."
        companyPosition="Programmer / developer .NET C#"
        companyLogoSrc="/assets/images/logo-net-informatika.png"
      >
        <EmploymentTag name="C#" />
        <EmploymentTag name="ASP .NET Web Forms" />
        <EmploymentTag name="HTML" />
        <EmploymentTag name="CSS" />
        <EmploymentTag name="Javascript" />
        <EmploymentTag name="Ajax" />
        <EmploymentTag name="Windows Forms" />
        <EmploymentTag name="MS SQL" />
        <EmploymentTag name="Umbraco" />
        <EmploymentTag name="Windows Store Apps" />
        <EmploymentTag name="Android" />
      </EmploymentPanel>
      <EmploymentPanel
        startedDate="July 2010"
        companyName="Restaurant and pizzeria LaItalia d.o.o."
        companyPosition="Delivery driver (student)"
        companyLogoSrc="/assets/images/logo-italia.png"
      >
        <EmploymentTag name="Food delivery" />
        <EmploymentTag name="PHP" />
        <EmploymentTag name="MySQL" />
        <EmploymentTag name="Apache" />
      </EmploymentPanel>
    </Container>
  );
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
      {props.name}
    </Badge>
  );
};
