import {render, screen} from "@testing-library/react";
import Component from "./Component";
import '@testing-library/jest-dom';

test('default property', () => {
    render(<Component/>)
    const p = screen.getByText("Please select (multiple)")
    expect(p).toBeInTheDocument()

    for (let i = 1; i <= 3; i++) {
        const checkbox = screen.getByDisplayValue(i.toString())
        expect(checkbox).toBeInTheDocument()
        const label = screen.getByText(`Op ${i}`)
        expect(label).toBeInTheDocument()

        // expect(checkbox).not.toBeChecked()
        expect(checkbox.getAttribute("checked")).toBeNull()
    }

})

test("property passing", () => {
    render(<Component title="hello" list={[
        {text: "Op 1", value: "1", checked: false},
        {text: "Op 2", value: "2", checked: true},
        {text: "Op 3", value: "3", checked: true},
    ]}/>)
    const p = screen.getByText("hello")
    expect(p).toBeInTheDocument()

    for (let i = 1; i <= 3; i++) {
        const checkbox = screen.getByDisplayValue(i.toString())
        expect(checkbox).toBeInTheDocument()
        const label = screen.getByText(`Op ${i}`)
        expect(label).toBeInTheDocument()
        expect(Object.is(checkbox.getAttribute("checked"), i === 2 || i === 3 ? "true" : null))
    }
})