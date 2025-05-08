import {render, screen} from "@testing-library/react";
import Component from "./Component";
import '@testing-library/jest-dom';

test("default properties", () => {
    render(<Component/>)
    const h = screen.getByText("A row of headers")
    expect(h).toBeInTheDocument()
})

test("property passing", () => {
    render(<Component level={2} text="hello" isCenter={true}/>)
    const h = screen.getByText("hello")
    expect(h).toBeInTheDocument()

    expect(h.matches("h2")).toBeTruthy()

    const style = h.style
    expect(style.textAlign).toBe("center")
})