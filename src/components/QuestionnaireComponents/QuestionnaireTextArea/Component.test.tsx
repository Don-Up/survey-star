import {render, screen} from "@testing-library/react";
import Component from "./Component";
import '@testing-library/jest-dom';

test("default property", () => {
    render(<Component/>)
    const p = screen.getByText("Please enter a text")
    expect(p).toBeInTheDocument()

    const textarea = screen.getByPlaceholderText("Please enter the content")
    expect(textarea).toBeInTheDocument()
})

test("property passing", () => {
    render(<Component title="hello" placeholder="test"/>)
    const p = screen.getByText("hello")
    expect(p).toBeInTheDocument()

    const textarea = screen.getByPlaceholderText("test")
    expect(textarea).toBeInTheDocument()
})