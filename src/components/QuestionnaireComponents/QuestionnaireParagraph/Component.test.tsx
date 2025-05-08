import {render, screen} from "@testing-library/react";
import Component from "./Component";
import '@testing-library/jest-dom';

test("default properties", () => {
    render(<Component/>)
    const span = screen.getByText("A row of paragraphs")
    expect(span).toBeInTheDocument()
})

test("property passing", () => {
    render(<Component text="hello" isCenter={true}/>)
    const span = screen.getByText("hello")
    expect(span).toBeInTheDocument()

    const p = span.parentElement
    expect(p).not.toBeNull()

    const style = p!.style
    expect(style.textAlign).toBe("center")
})

test("multi-line text", () => {
    render(<Component text="a\nb\nc"/>)
    const span = screen.getByText("a")
    expect(span).toBeInTheDocument()
    expect(span).toHaveTextContent("a")
    expect(span).not.toHaveTextContent("abc")
})