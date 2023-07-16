import { redirect } from "react-router-dom";

export const getTokenDuration = function () {
	const storedExpirationDate = localStorage.getItem("expiration");
	const expirationDate = new Date(storedExpirationDate);
	const now = new Date();
	const duration = expirationDate.getTime() - now.getTime();

	return duration;
};

export const getAuthToken = function () {
	const token = localStorage.getItem("token");

	if (!token) return null;

	const tokenDuration = getTokenDuration();

	if (tokenDuration < 0) return "EXPIRED";

	return token;
};

export const tokenLoader = function () {
	const token = getAuthToken();
	return token;
};

export const checkAuthLoader = function () {
	const token = getAuthToken();

	if (!token) return redirect("/auth");

	return null;
};
