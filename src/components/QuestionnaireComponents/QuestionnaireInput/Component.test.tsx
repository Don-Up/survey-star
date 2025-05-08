import {render, screen} from "@testing-library/react";
import Component from "./Component";
import '@testing-library/jest-dom';

test("default property", () => {
    render(<Component/>)
    const p = screen.getByText("Please enter a title")
    expect(p).toBeInTheDocument()

    const input = screen.getByPlaceholderText("Please enter the content")
    expect(input).toBeInTheDocument()
})

test("property passing", () => {
    render(<Component title="hello" placeholder="test"/>)
    const p = screen.getByText("hello")
    expect(p).toBeInTheDocument()

    const input = screen.getByPlaceholderText("test")
    expect(input).toBeInTheDocument()
})