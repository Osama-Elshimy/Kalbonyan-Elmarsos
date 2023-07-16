import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Greetings from "./Greetings";

describe("Greetings Component", () => {
	test("renders 'Hello World' as a text", () => {
		render(<Greetings />);

		const helloWorldElement = screen.getByText(/Hello World!/i);
		expect(helloWorldElement).toBeInTheDocument();
	});

	test("renders 'It's nice to meet you' if the button was NOT clicked", () => {
		render(<Greetings />);

		const outputElement = screen.getByText("It's nice to meet you!");
		expect(outputElement).toBeInTheDocument();
	});

	test("renders 'Changed!' if the button was clicked", () => {
		render(<Greetings />);

		const buttonElement = screen.getByRole("button");
		userEvent.click(buttonElement);

		const outputElement = screen.getByText("Changed!");
		expect(outputElement).toBeInTheDocument();
	});

	test("deos NOT render 'It's nice to meet you' if the button was clicked", () => {
		render(<Greetings />);

		const buttonElement = screen.getByRole("button");
		userEvent.click(buttonElement);

		const outputElement = screen.queryByText("It's nice to meet you!");
		expect(outputElement).toBeNull();
	});
});

// getByText: return true if the text is in the component and false otherwise
// queryByText: return true if the text is in the component and null otherwise
