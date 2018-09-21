import React from "react";
import { Container, Row, Col, Table } from "reactstrap";

const document = {
  articleElements: [
    {
      type: "h2",
      content: "Skills"
    },
    {
      type: "skills",
      skillRows: [
        {
          stars: 1,
          content:
            "<strong>Beginner</strong> - at least 1 task complete in professional career"
        },
        {
          stars: 2,
          content:
            "<strong>Intermediate</strong> - help by a mentor is highly appreciated"
        },
        {
          stars: 3,
          content:
            "<strong>Adept</strong> - can complete complex tasks independently"
        },
        {
          stars: 4,
          content:
            "<strong>Expert</strong> - understands advanced concepts, shows proficiency and superior skill level"
        }
      ]
    },
    {
      type: "h4",
      content: "Programming and scripting languages"
    },
    {
      type: "skills",
      skillRows: [
        { stars: 4, content: "C#" },
        { stars: 3, content: "PHP" },
        { stars: 3, content: "Javascript" },
        { stars: 2, content: "Typescript" },
        { stars: 2, content: "Java" },
        { stars: 1, content: "Python" },
        { stars: 1, content: "C++" }
      ]
    },
    {
      type: "h4",
      content: "Web development"
    },
    {
      type: "skills",
      skillRows: [
        { stars: 4, content: "ASP .NET Web-Forms" },
        { stars: 2, content: "ASP .NET MVC" },
        { stars: 2, content: "Angular" },
        { stars: 2, content: "React.js" },
        { stars: 1, content: "Node.js" },
        { stars: 3, content: "MS SQL" },
        { stars: 2, content: "MySQL" },
        { stars: 1, content: "MongoDB" },
        { stars: 4, content: "HTML" },
        { stars: 3, content: "Bootstrap" },
        { stars: 3, content: "CSS" },
        { stars: 2, content: "Ajax" },
        { stars: 2, content: "Umbraco" },
        { stars: 1, content: "Magento" },
        { stars: 2, content: "Joomla" }
      ]
    },
    {
      type: "h4",
      content: "Mobile development"
    },
    {
      type: "skills",
      skillRows: [
        { stars: 3, content: "Windows Store Apps" },
        { stars: 1, content: "Android" }
      ]
    },
    {
      type: "h4",
      content: "Development related"
    },
    {
      type: "skills",
      skillRows: [
        { stars: 3, content: "Git" },
        { stars: 3, content: "SourceTree" },
        { stars: 3, content: "Microsoft Visual Studio" },
        { stars: 3, content: "Visual Studio Code" },
        { stars: 2, content: "Sublime Text" },
        { stars: 1, content: "Unity" },
        { stars: 1, content: "Marmalade" },
        { stars: 3, content: "Jenkins" },
        { stars: 3, content: "Powershell" },
        { stars: 2, content: "Linux terminal" },
        { stars: 2, content: "LAMP stack" },
        { stars: 2, content: "MEAN stack" }
      ]
    },
    {
      type: "h3",
      content: "Languages"
    }
  ]
};

export const Skills = () => {
  return (
    <Container>
      <h2>Skills</h2>
      <Container>
        <SkillRow stars="1">
          <strong>Beginner</strong> - at least 1 task complete in professional
          career
        </SkillRow>
        <SkillRow stars="2">
          <strong>Intermediate</strong> - help by a mentor is highly appreciated
        </SkillRow>
        <SkillRow stars="3">
          <strong>Adept</strong> - can complete complex tasks independently
        </SkillRow>
        <SkillRow stars="4">
          <strong>Expert</strong> - understands advanced concepts, shows
          proficiency and superior skill level
        </SkillRow>
      </Container>
      <h4>Programming and scripting languages</h4>
      <Container>
        <SkillRow stars="4">C#</SkillRow>
        <SkillRow stars="3">PHP</SkillRow>
        <SkillRow stars="3">Javascript</SkillRow>
        <SkillRow stars="2">Typescript</SkillRow>
        <SkillRow stars="2">Java</SkillRow>
        <SkillRow stars="1">Python</SkillRow>
        <SkillRow stars="1">C++</SkillRow>
      </Container>
      <h4>Web development</h4>
      <Container>
        <SkillRow stars="4">ASP .NET Web-Forms</SkillRow>
        <SkillRow stars="2">ASP .NET MVC</SkillRow>
        <SkillRow stars="2">Angular</SkillRow>
        <SkillRow stars="2">React.js</SkillRow>
        <SkillRow stars="1">Node.js</SkillRow>
        <SkillRow stars="3">MS SQL</SkillRow>
        <SkillRow stars="2">MySQL</SkillRow>
        <SkillRow stars="1">MongoDB</SkillRow>
        <SkillRow stars="4">HTML</SkillRow>
        <SkillRow stars="3">Bootstrap</SkillRow>
        <SkillRow stars="3">CSS</SkillRow>
        <SkillRow stars="2">Ajax</SkillRow>
        <SkillRow stars="2">Umbraco</SkillRow>
        <SkillRow stars="1">Magento</SkillRow>
        <SkillRow stars="2">Joomla</SkillRow>
      </Container>
      <h4>Mobile development</h4>
      <Container>
        <SkillRow stars="3">Windows Store Apps</SkillRow>
        <SkillRow stars="1">Android</SkillRow>
      </Container>
      <h4>Development related</h4>
      <Container>
        <SkillRow stars="3">Git</SkillRow>
        <SkillRow stars="3">SourceTree</SkillRow>
        <SkillRow stars="3">Microsoft Visual Studio</SkillRow>
        <SkillRow stars="3">Visual Studio Code</SkillRow>
        <SkillRow stars="2">Sublime Text</SkillRow>
        <SkillRow stars="1">Unity</SkillRow>
        <SkillRow stars="1">Marmalade</SkillRow>
        <SkillRow stars="3">Jenkins</SkillRow>
        <SkillRow stars="3">Powershell</SkillRow>
        <SkillRow stars="2">Linux terminal</SkillRow>
        <SkillRow stars="2">LAMP stack</SkillRow>
        <SkillRow stars="2">MEAN stack</SkillRow>
      </Container>
      <h3>Languages</h3>
      <p>
        Native language: <strong>Slovenian</strong>
      </p>
      <p>
        Self-evaluated non-native languages in accordance with{" "}
        <a
          href="http://www.coe.int/t/dg4/linguistic/CADRE1_EN.asp"
          target="_blank"
          rel="noopener noreferrer"
        >
          Common European Framework of Reference for Languages
        </a>
        :
      </p>
      <Table className="table-stripped table-small">
        <thead>
          <tr>
            <th scope="col" />
            <th scope="col" colSpan="2">
              <span>Understanding</span>
            </th>
            <th scope="col" colSpan="2">
              <span>Speaking</span>
            </th>
            <th scope="col" rowSpan="2" className="rotate">
              <div>
                <span>Writing</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th />
            <th className="rotate">
              <div>
                <span>Listening</span>
              </div>
            </th>
            <th className="rotate">
              <div>
                <span>Reading</span>
              </div>
            </th>
            <th className="rotate">
              <div>
                <span>Interaction</span>
              </div>
            </th>
            <th className="rotate">
              <div>
                <span>Production</span>
              </div>
            </th>
          </tr>
          <tr>
            <th className="rotate">
              <div>
                <span>English</span>
              </div>
            </th>
            <td className="align-middle">C2</td>
            <td className="align-middle">C2</td>
            <td className="align-middle">C1</td>
            <td className="align-middle">C1</td>
            <td className="align-middle">C2</td>
          </tr>
          <tr>
            <th className="rotate">
              <div>
                <span>Croatian</span>
              </div>
            </th>
            <td className="align-middle">C1</td>
            <td className="align-middle">B2</td>
            <td className="align-middle">B2</td>
            <td className="align-middle">B2</td>
            <td className="align-middle">B2</td>
          </tr>
          <tr>
            <th className="rotate">
              <div>
                <span>German</span>
              </div>
            </th>
            <td className="align-middle">A2</td>
            <td className="align-middle">A2</td>
            <td className="align-middle">A1</td>
            <td className="align-middle">A1</td>
            <td className="align-middle">A1</td>
          </tr>
        </tbody>
      </Table>
      <br />
      <h3>Other</h3>
      <ul>
        <li>B-category driving licence</li>
        <li>Hobbies: LEGO, RC airplanes, bass guitar</li>
        <li>Member of Mensa Slovenia</li>
        <li>
          Assessed as <strong className="text-success">GREEN</strong> on{" "}
          <a
            href="http://corestrengths.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            The Core SDI Experience
          </a>{" "}
          workshop
        </li>
      </ul>
    </Container>
  );
};

const SkillRow = props => {
  return (
    <Row>
      <Col xs="2">
        <SkillStarIndicator stars={props.stars} />
      </Col>
      <Col xs="10">
        <span>{props.children}</span>
      </Col>
    </Row>
  );
};

const SkillStarIndicator = props => {
  const intermediate = props.stars > 1;
  const adept = props.stars > 2;
  const expert = props.stars > 3;

  return (
    <Container className="px-0">
      <Row>
        <SkillStar on={true} />
        <SkillStar on={intermediate} />
        <SkillStar on={adept} />
        <SkillStar on={expert} />
      </Row>
    </Container>
  );
};

const SkillStar = props => {
  return (
    <img
      className="col-3 px-0 h-25"
      alt=""
      src={
        props.on
          ? "/assets/images/ico-star-light.svg"
          : "/assets/images/ico-star-dark.svg"
      }
    />
  );
};
