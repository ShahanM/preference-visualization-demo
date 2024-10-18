import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
	const navigate = useNavigate();
	return (
		<Container>
			<Row className="header-row">
				<h2>Movie Preference Visualizations</h2>
			</Row>
			<Row className="content-row">
				<p>
					There two types of displays: implicit and explicit.
				</p>
				<ul className="home-nav">
					<li>
						<Button onClick={() =>
							navigate("ratemovies",
								{ state: { type: "implicit" } },
								{ replace: true })} disabled>
							Implicit
						</Button>
					</li>
					<li>
						<Button onClick={() =>
							navigate("ratemovies",
								{ state: { type: "explicit" } },
								{ replace: true })} >
							Explicit
						</Button>
					</li>
				</ul>
				{/* <p> */}
				Each type has 4 different visualizations.
				<ol>
					<li>Continuous Coupled</li>
					<li>Continuous Decoupled</li>
					<li>Discreet Coupled</li>
					<li>Discreet Decoupled</li>
				</ol>
				{/* </p> */}
			</Row>
			<Row className="footer-row">

			</Row>
		</Container>
	)
}