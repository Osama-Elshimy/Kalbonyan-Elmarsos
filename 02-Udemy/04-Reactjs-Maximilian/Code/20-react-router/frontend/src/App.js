import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import EventsRootLayout from "./pages/EventsRootLayout";
import ErrorPage from "./pages/Error";

import HomePage from "./pages/Home";
import EditEventPage from "./pages/EditEvent";
import NewEventPage from "./pages/NewEvent";

import EventDetailPage, {
	loader as eventDetailLoader,
	action as deleteEventAction,
} from "./pages/EventDetail";
import EventsPage, { loader as eventsLoader } from "./pages/Events";
import { action as customFormAction } from "./components/EventForm";
import NewsletterPage, { action as newsletterAction } from "./pages/Newsletter";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <HomePage /> },
			{
				path: "events",
				element: <EventsRootLayout />,
				children: [
					{
						index: true,
						element: <EventsPage />,
						loader: eventsLoader,
					},
					{
						path: ":eventId",
						id: "event-detail",
						loader: eventDetailLoader,
						children: [
							{
								index: true,
								element: <EventDetailPage />,
								action: deleteEventAction,
							},
							{
								path: "edit",
								element: <EditEventPage />,
								action: customFormAction,
							},
						],
					},
					{
						path: "new",
						element: <NewEventPage />,
						action: customFormAction,
					},
				],
			},
			{
				path: "newsletter",
				element: <NewsletterPage />,
				action: newsletterAction,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
