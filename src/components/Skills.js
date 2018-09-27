import React from "react";
import { Container, Row } from "reactstrap";
import { Skill } from "./Skill/Skill";

const article = {
	content: [
		{
			type: "h2",
			key: "h2-skills",
			content: "Skills"
		},
		{
			type: "p",
			key: "p-intro",
			content:
				"I am well-versed in full-stack of Microsoft's web technologies. Lately, I am pivoting my focus towards front-end web development (Javascript, Angular, React.js, etc.). In my professional career I've been introduced to the following technologies and tools:"
		},
		{
			type: "h4",
			key: "h4-web-development",
			content: "Web development"
		},
		{
			type: "Row",
			key: "row-web-development",
			content: [
				{
					type: "Skill",
					key: "skill-asp-net",
					logoSrc: "/assets/images/logo-dotnet.svg",
					content: "ASP.NET"
				},
				{
					type: "Skill",
					key: "skill-angular",
					logoSrc: "/assets/images/logo-angular.svg",
					content: "Angular"
				},
				{
					type: "Skill",
					key: "skill-react",
					logoSrc: "/assets/images/logo-react.svg",
					content: "React.js"
				},
				{
					type: "Skill",
					key: "skill-nodejs",
					logoSrc: "/assets/images/logo-nodejs.svg",
					content: "Node.js"
				},
				{
					type: "Skill",
					key: "skill-mssql",
					logoSrc: "/assets/images/logo-mssql.svg",
					content: "MS SQL"
				},
				{
					type: "Skill",
					key: "skill-mysql",
					logoSrc: "/assets/images/logo-mysql.svg",
					content: "MySQL"
				},
				{
					type: "Skill",
					key: "skill-mongodb",
					logoSrc: "/assets/images/logo-mongodb.svg",
					content: "MongoDB"
				},
				{
					type: "Skill",
					key: "skill-html5",
					logoSrc: "/assets/images/logo-html5.svg",
					content: "HTML"
				},
				{
					type: "Skill",
					key: "skill-bootstrap",
					logoSrc: "/assets/images/logo-bootstrap.svg",
					content: "Bootstrap"
				},
				{
					type: "Skill",
					key: "skill-css3",
					logoSrc: "/assets/images/logo-css3.svg",
					content: "CSS"
				},
				{
					type: "Skill",
					key: "skill-ajax",
					logoSrc: "/assets/images/logo-ajax.svg",
					content: "Ajax"
				},
				{
					type: "Skill",
					key: "skill-umbraco",
					logoSrc: "/assets/images/logo-umbraco.svg",
					content: "Umbraco"
				},
				{
					type: "Skill",
					key: "skill-magento",
					logoSrc: "/assets/images/logo-magento.svg",
					content: "Magento"
				},
				{
					type: "Skill",
					key: "skill-joomla",
					logoSrc: "/assets/images/logo-joomla.svg",
					content: "Joomla"
				}
			]
		},
		{
			type: "h4",
			key: "h4-mobile-development",
			content: "Mobile development"
		},
		{
			type: "Row",
			key: "row-mobile-development",
			content: [
				{
					type: "Skill",
					key: "skill-windows-store-apps",
					logoSrc: "/assets/images/logo-winrt.svg",
					content: "Windows Store Apps"
				},
				{
					type: "Skill",
					key: "skill-android",
					logoSrc: "/assets/images/logo-android.svg",
					content: "Android"
				}
			]
		},
		{
			type: "h4",
			key: "h4-programming-and-scripting-languages",
			content: "Programming and scripting languages"
		},
		{
			type: "Row",
			key: "row-programming-and-scripting-languages",
			content: [
				{
					type: "Skill",
					key: "skill-csharp",
					logoSrc: "/assets/images/logo-csharp.svg",
					content: "C#"
				},
				{
					type: "Skill",
					key: "skill-php",
					logoSrc: "/assets/images/logo-php.svg",
					content: "PHP"
				},
				{
					type: "Skill",
					key: "skill-javascript",
					logoSrc: "/assets/images/logo-javascript.svg",
					content: "Javascript"
				},
				{
					type: "Skill",
					key: "skill-typescript",
					logoSrc: "/assets/images/logo-typescript.svg",
					content: "Typescript"
				},
				{
					type: "Skill",
					key: "skill-java",
					logoSrc: "/assets/images/logo-java.svg",
					content: "Java"
				},
				{
					type: "Skill",
					key: "skill-python",
					logoSrc: "/assets/images/logo-python.svg",
					content: "Python"
				},
				{
					type: "Skill",
					key: "skill-cpp",
					logoSrc: "/assets/images/logo-cpp.svg",
					content: "C++"
				}
			]
		},
		{
			type: "h4",
			key: "h4-related",
			content: "Related"
		},
		{
			type: "Row",
			key: "row-related",
			content: [
				{
					type: "Skill",
					key: "skill-git",
					logoSrc: "/assets/images/logo-git.svg",
					content: "Git"
				},
				{
					type: "Skill",
					key: "skill-sourcetree",
					logoSrc: "/assets/images/logo-sourcetree.svg",
					content: "SourceTree"
				},
				{
					type: "Skill",
					key: "skill-visualstudio",
					logoSrc: "/assets/images/logo-visualstudio.svg",
					content: "Microsoft Visual Studio"
				},
				{
					type: "Skill",
					key: "skill-visualstudiocode",
					logoSrc: "/assets/images/logo-visualstudiocode.svg",
					content: "Visual Studio Code"
				},
				{
					type: "Skill",
					key: "skill-sublime",
					logoSrc: "/assets/images/logo-sublime.svg",
					content: "Sublime Text"
				},
				{
					type: "Skill",
					key: "skill-unity",
					logoSrc: "/assets/images/logo-unity.svg",
					content: "Unity"
				},
				{
					type: "Skill",
					key: "skill-marmalade",
					logoSrc: "/assets/images/logo-marmalade.svg",
					content: "Marmalade"
				},
				{
					type: "Skill",
					key: "skill-jenkins",
					logoSrc: "/assets/images/logo-jenkins.svg",
					content: "Jenkins"
				},
				{
					type: "Skill",
					key: "skill-powershell",
					logoSrc: "/assets/images/logo-powershell.svg",
					content: "Powershell"
				},
				{
					type: "Skill",
					key: "skill-linuxterminal",
					logoSrc: "/assets/images/logo-linuxterminal.svg",
					content: "Linux terminal"
				},
				{
					type: "Skill",
					key: "skill-lamp",
					logoSrc: "/assets/images/logo-lamp.svg",
					content: "LAMP stack"
				},
				{
					type: "Skill",
					key: "skill-mean",
					logoSrc: "/assets/images/logo-nodejs.svg",
					content: "MEAN stack"
				}
			]
		}
	]
};

const renderContent = content => {
	return (
		<React.Fragment>
			{content.map(section => {
				if (section.type === "p") {
					return <p key={section.key}>{section.content}</p>;
				}
				if (section.type === "h1") {
					return <h1 key={section.key}>{section.content}</h1>;
				}
				if (section.type === "h2") {
					return <h2 key={section.key}>{section.content}</h2>;
				}
				if (section.type === "h3") {
					return <h3 key={section.key}>{section.content}</h3>;
				}
				if (section.type === "h4") {
					return <h4 key={section.key}>{section.content}</h4>;
				}
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
				return null;
			})}
		</React.Fragment>
	);
};

export const Skills = () => {
	return <Container>{renderContent(article.content)}</Container>;
};
