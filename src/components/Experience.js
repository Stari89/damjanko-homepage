import React from "react";
import { Container, Row, Col } from "reactstrap";

export const Experience = () => {
  return (
    <Container>
      <h2>Experience</h2>
      <EmploymentPanel
        companyLogoSrc="/assets/images/logo-agitavit.png"
        titleAndCompanyName="Software Developer, Agitavit Solutions d.o.o."
        companyAddressAndDuration="Letališka cesta 33F, 1000 Ljubljana Slovenia — August 2017 -
              present"
      />
      <h4>Responsibilities</h4>
      <p>Full-stack development on Sandoz SPIRIT project.</p>
      <h4>Key technologies and tools</h4>
      <ul>
        <li>ASP .NET (C#) Web Forms and MVC,</li>
        <li>Web (HTML, CSS, Javascript, Ajax, …),</li>
        <li>MS SQL,</li>
        <li>Microsoft Visual Studio, Team Foundation Server</li>
      </ul>
      <hr />
      <EmploymentPanel
        companyLogoSrc="/assets/images/logo-5ka.png"
        titleAndCompanyName="Software Developer, 5ka digitalni svet (Aljoša Motore s.p.)"
        companyAddressAndDuration="Artiče 49c, 8253 Artiče Slovenia — October 2016 - July 2017"
      />
      <h4>Responsibilities</h4>
      <p>
        Development of websites for final customers which includes web stores
        based on
        <a
          href="https://magento.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Magento
        </a>
        . Development of a PHP and MySQL based invoicing and management solution
        (2017 roadmap top priority project).
      </p>
      <h4>Key technologies and tools</h4>
      <ul>
        <li>PHP, MySQL</li>
        <li>Front end Web (HTML, CSS, Javascript, Ajax, …),</li>
        <li>Magento, Joomla</li>
        <li>Git, SourceTree, Sublime Text, Visual Studio Code, Photoshop,</li>
        <li>
          Development and production deployment (Linux CentOS, Apache, Jenkins)
        </li>
      </ul>
      <h4>Employment recommendation</h4>
      <p>Contact is available upon request.</p>
      <hr />
      <EmploymentPanel
        companyLogoSrc="/assets/images/logo-outfit7.png"
        titleAndCompanyName="Software Architect, Ekipa2 d.o.o. (Outfit7 subsidiary)"
        companyAddressAndDuration="Ameriška ulica 8, 1000 Ljubljana Slovenia — October 2014 - August
		2016"
      />
      <h4>Responsibilities</h4>
      <p>
        Game and supporting libraries development for Windows platforms. I was
        also responsible for build automation and deployment and have basic
        experience with game engines (Unity, Marmalade). From time to time I
        submitted packages to Windows Store.
      </p>
      <h4>Projects</h4>
      <p>
        I worked on all games released by Outfit7 for Windows Store. I’ve had
        most fun with following selection:
      </p>
      <Outfit7ProjectPanel
        projectHref="https://www.microsoft.com/en-us/store/p/talking-tom/9nblggh0x47s"
        imgSrc="/assets/images/talking-tom.png"
        projectTitle="Talking Tom"
        projectDescription="Game that made Outfit7 a billion dollar business"
        projectLinkText="Talking Tom on Windows Store"
      />
      <Outfit7ProjectPanel
        projectHref="https://www.microsoft.com/en-us/store/p/my-talking-angela/9wzdncrddfhw"
        imgSrc="/assets/images/my-talking-angela.png"
        projectTitle="My Talking Angela"
        projectDescription="Tamagotchi-style-app with mini-games featuring Talking Angela"
        projectLinkText="My Talking Angela on Windows Store"
      />
      <Outfit7ProjectPanel
        projectHref="https://www.microsoft.com/en-us/store/p/talking-tom-gold-run/9nblggh4ql6t"
        imgSrc="/assets/images/talking-tom-gold-run.png"
        projectTitle="Talking Tom Gold Run"
        projectDescription="Runner game featuring all talking friends"
        projectLinkText="Talking Tom Gold Run on Windows Store"
      />
      <h4>Key technologies and tools</h4>
      <ul>
        <li>
          Windows Store Apps
          <ul>
            <li>Windows Phone 8.0 (Silverlight)</li>
            <li>Windows Phone 8.1 (Windows Runtime)</li>
            <li>Windows 8.1 (Windows Runtime)</li>
            <li>Windows 10, both mobile and desktop (Windows Runtime)</li>
          </ul>
        </li>
        <li>Unity, Marmalade</li> <li>Jenkins, Powershell</li>
        <li>Microsoft Visual Studio</li>
        <li>Git, SourceTree, Jira, Review Board</li>
      </ul>
      <h4>Employment recommendation</h4>
      <p>Contact is available upon request.</p>
      <hr />
      <EmploymentPanel
        companyLogoSrc="/assets/images/logo-net-informatika.png"
        titleAndCompanyName="Programmer / developer .NET C#, NET Informatika d.o.o."
        companyAddressAndDuration="Cesta Toneta Kralja 8, 1290 Grosuplje Slovenia — December 2012 -
		October 2014"
      />
      <h4>Projects</h4>
      <ul>
        <li>
          <a href="http://netcab.eu" target="_blank" rel="noopener noreferrer">
            NetCab
          </a>
          - complete dispatching solution for any taxi fleet,
        </li>
        <li>
          <a
            href="http://www.zavarovalnimojster.si/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Zavarovalni mojster
          </a>
          - web-based insurance broking software,
        </li>
        <li>
          <a
            href="http://www.simprisk.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Simprisk
          </a>
          - web-based risk management application,
        </li>
        <li>
          <a
            href="http://www.insurancelex.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            insuranceLex
          </a>
          - online insurance document library,
        </li>
        <li>
          many Umbraco based web pages (
          <a href="http://inles.net/" target="_blank" rel="noopener noreferrer">
            Inles
          </a>
          ,
          <a
            href="http://www.zuzemberk.si/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Občina Žužemberk
          </a>
          ,
          <a
            href="http://www.changhsing-ent.si/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chang Hsing
          </a>
          ,
          <a href="http://dekora.si/" target="_blank" rel="noopener noreferrer">
            Dekora
          </a>
          , ...)
        </li>
        <li>Other projects</li>
      </ul>
      <h4>Key technologies and platforms</h4>
      <ul>
        <li>ASP .NET (C#),</li> <li>Web (HTML, CSS, Javascript, Ajax, …),</li>
        <li>Windows Forms (C#),</li> <li>MS SQL,</li> <li>Umbraco,</li>
        <li>Windows Store Apps (Windows Runtime, C#),</li> <li>Android</li>
      </ul>
      <hr />
      <EmploymentPanel
        companyLogoSrc="/assets/images/logo-italia.png"
        titleAndCompanyName="Delivery driver (student), Restaurant and pizzeria LaItalia d.o.o."
        companyAddressAndDuration="Borštnikova 10, 8250 Brežice Slovenia — July 2010 - December 2012"
      />
      <h4>Responsibilities</h4>
      <ul>
        <li>Food delivery and general help in kitchen,</li>
        <li>
          Web page development -
          <a
            href="http://www.pizzeria-italia.si/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pizzeria Italia
          </a>
          (PHP, MySQL)
        </li>
      </ul>
      <hr />
      <h2>Education</h2>
      <h4>Gimnazija Brežice</h4>
      <p>Splošna matura - 2008</p>
      <h4>Osnovna Šola Brežice</h4>
      <p>Primary school - 2004</p>
      <h5>Highlights</h5>
      <p>
        8 years of perfect grades in primary school, 3 gold awards in logic
        competition during primary and secondary school.
      </p>
    </Container>
  );
};

const EmploymentPanel = props => {
  return (
    <Container className="py-2 my-2 bg-light rounded shadow-sm">
      <Row className="flex-lg-row-reverse justify-content-center">
        <Col xs="6" lg="3" className="my-3 my-lg-1 text-center">
          <img
            className="img-fluid"
            src={props.companyLogoSrc}
            alt={props.titleAndCompanyName}
          />
        </Col>
        <Col xs="12" lg="9" className="text-lg-left text-center">
          <h3 className="text-secondary font-weight-normal">
            {props.titleAndCompanyName}
          </h3>
          <p className="text-secondary">{props.companyAddressAndDuration}</p>
        </Col>
      </Row>
    </Container>
  );
};

const Outfit7ProjectPanel = props => {
  return (
    <Container className="bg-light py-2 my-2 rounded shadow-sm">
      <Row className="flex-lg-row justify-content-center">
        <Col xs="12" lg="3" className="text-lg-left text-center">
          <a href={props.projectHref} target="_blank" rel="noopener noreferrer">
            <img
              className="huge img-fluid rounded-circle"
              src={props.imgSrc}
              alt={props.projectTitle}
            />
          </a>
        </Col>
        <Col
          xs="12"
          lg="9"
          className="py-2 text-lg-left text-center text-secondary"
        >
          <strong>{props.projectTitle}</strong>
          <br />
          {props.projectDescription}
          <br />
          <a href={props.projectHref} target="_blank" rel="noopener noreferrer">
            {props.projectLinkText}
          </a>
        </Col>
      </Row>
    </Container>
  );
};
