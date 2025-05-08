import React from "react"
import Component from "./Component";
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';


test("default property", () => {
    render(<Component/>) // render the component
    const h = screen.getByText("A questionnaire")
    expect(h).toBeInTheDocument()
})

test("property passing", () => {
    render(<Component title="hello" desc="test"/>)
    const h = screen.getByText("hello")
    expect(h).toBeInTheDocument()

    const p = screen.getByText("test")
    expect(p).toBeInTheDocument()
})

test("multi-line text", () => {
    render(<Component desc="hello\ntest"/>)
    const span = screen.getByText("hello")
    expect(span).toBeInTheDocument()
    expect(span).toHaveTextContent("hello")
    expect(span).not.toHaveTextContent("hellotest")
})