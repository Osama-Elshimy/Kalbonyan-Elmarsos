import { render, screen } from "@testing-library/react";

import Async from "./Async";

describe("Async Component", () => {
	test("renders posts if request succeeds", async () => {
		// mock the response from the API
		const mockPosts = [
			{ id: 1, title: "Mock post 1" },
			{ id: 2, title: "Mock post 2" },
		];

		jest.spyOn(global, "fetch").mockResolvedValueOnce({
			json: async () => mockPosts,
		});

		// render the component
		render(<Async />);

		// wait for the component to update with the API response
		const post1 = await screen.findByText("Mock post 1");
		const post2 = await screen.findByText("Mock post 2");

		// assert that the posts are rendered correctly
		expect(post1).toBeInTheDocument();
		expect(post2).toBeInTheDocument();

		// restore the original global fetch function
		global.fetch.mockRestore();
	});
});
