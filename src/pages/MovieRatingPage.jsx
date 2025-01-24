import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { get, post } from '../middleware/requests';
import MovieGrid from '../components/MovieGrid';

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { useLocation, useNavigate } from 'react-router-dom';

export default function MovieRatingPage(props) {
	const itemsPerPage = 24;

	const navigate = useNavigate();
	const { state } = useLocation();

	const [ratedMoviesData, setRatedMoviesData] = useState([]);
	const [buttonDisabled, setButtonDisabled] = useState(true);

	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);


	const [movieIds, setMovieIds] = useState([]);

	const [moviesToFetch, setMoviesToFetch] = useState([]);


	function handleNavigate(recType, ratedMoviesData, viztype) {
		navigate("/viz/",
			{
				state: {
					recType: recType,
					ratings: ratedMoviesData,
					type: viztype
				}
			},
			{ replace: true });
	}

	useEffect(() => {
		const getAllMovieIds = async () => {
			get('v1/ers/movies/ids/')
				.then((response): Promise<movie[]> => response.json())
				.then((newmovies: movie[]) => {
					setMovieIds(newmovies);
				})
				.catch((error) => console.log(error));
		}
		getAllMovieIds();
	}, []);

	useEffect(() => {
		setButtonDisabled(ratedMoviesData < 10);
	}, [ratedMoviesData])

	const submitHandler = (recType) => {
		setLoading(true);

		if (ratedMoviesData.length > 0) {
			handleNavigate(recType, ratedMoviesData, state.type);
		}
	}

	const loadingMsg = 'Please wait while the system ' +
		'prepares your recommendations'

	return (
		<>
			<Row className="header-row">
				<h2>Movie Gallery</h2>
			</Row>
			{loading ?
				<LoadingScreen loading={loading} loadingMessage={loadingMsg} />
				:
				<Container>
					<Row className="content-row">
						<MovieGrid
							dataCallback={setRatedMoviesData}
							movieIds={movieIds}
							itemsPerPage={itemsPerPage} />
					</Row>
					<Row className="footer-row">
						<div className="jumbotron jumbotron-footer"
							style={{ display: "flex" }}>
							<RankHolder count={ratedMoviesData.length} />
							<NextButton disabled={buttonDisabled && !loading}
								loading={loading}
								onClick={() => submitHandler(0)} />
						</div>
					</Row>
				</Container>
			}
		</>
	);
}

const RankHolder = (props) => {
	return (
		<div className="rankHolder">
			<span> Ranked Movies: </span>
			<span><i>{props.count}</i></span>
			<span><i>of {10}</i></span>
		</div>
	)
}


export const LoadingScreen = ({ loading, loadingMessage, loadingByline }) => {

	return (
		<>
			{loading &&
				<div style={{
					position: "absolute", width: "100%",
					height: "100%", zIndex: "999",
					backgroundColor: "rgba(255, 255, 255, 1)",
					margin: "18px auto auto auto"
				}}>
					<h2 style={{
						margin: "300px auto 3px auto",
						color: "black"
					}}>
						{loadingMessage}
						<div className="loaderStage">
							<div className="dot-floating" style={{
								margin: "1.5em auto"
							}}></div>
						</div>
					</h2>
					{loadingByline &&
						<p>{loadingByline}</p>
					}
				</div>
			}
		</>
	)
}

export const NextButton = ({ variant, disabled, loading, onClick }) => {

	variant = variant || "ers";

	return (
		<Button variant={variant} size="lg" className="nextButton footer-btn"
			disabled={disabled} onClick={onClick}>
			{!loading ? 'Next'
				:
				<>
					<Spinner
						as="span"
						animation="grow"
						size="sm"
						role="status"
						aria-hidden="true"
					/>
					Loading...
				</>
			}
		</Button>
	)
}