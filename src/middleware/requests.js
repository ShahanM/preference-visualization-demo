export const API = process.env.NODE_ENV === "production" ? "https://rssa.recsys.dev/rssa/api/"
	: "http://localhost:8000/rssa/api/";

export const CORSHeaders = {
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Headers': '*',
	'Access-Control-Allow-Methods': 'OPTIONS,PUT,POST,GET'
};

function getHeaders(userdata) {
	let headers = CORSHeaders;
	if (userdata) {
		headers = {
			...CORSHeaders,
			'study-id': userdata.study_id
		}
	}
	return headers;
}

export function post(path: string, data: any, userdata) {
	return bodyRequest('POST', path, data, getHeaders(userdata));
}

export function get(path: string, userdata) {
	return fetch(API + path, {
		method: 'GET',
		headers: getHeaders(userdata)
	});
}

function bodyRequest(method: string, path: string, data: any, headers) {
	return fetch(API + path, {
		method: method,
		headers: headers,
		body: JSON.stringify(data)
	});
}

export const imgurl = (identifier) => {
	if (identifier === undefined || identifier === null) {
		return 'https://rssa.recsys.dev/movie/poster/default_movie_icon.svg';
	}
	return 'https://rssa.recsys.dev/movie/poster/' + identifier;
}
