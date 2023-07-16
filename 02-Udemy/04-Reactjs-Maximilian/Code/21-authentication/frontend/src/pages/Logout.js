import { redirect } from "react-router-dom";

export const action = function () {
	localStorage.removeItem("token");
	localStorage.removeItem("expiration");
	return redirect("/");
};
