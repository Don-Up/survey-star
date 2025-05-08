import Component from "./Component";
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';


test("default property", () => {
    render(<Component/>)
    const p = screen.getByText("Please select (single)")
    expect(p).toBeInTheDocument()

    for (let i = 1; i <= 3; i++) {
        const radio = screen.getByDisplayValue(i.toString())
        expect(radio).toBeInTheDocument()
        const label = screen.getByText(`Op ${i}`)
        expect(label).toBeInTheDocument()
    }
})

test("property passing", () => {
    const options = [
        {value: "v1", text: "t1", },
        {value: "v2", text: "t2", },
        {value: "v3", text: "t3", },
    ]

    render(<Component title="hello" options={options} value={"v2"}/>)

    const p = screen.getByText("hello")
    expect(p).toBeInTheDocument()

    for (let i = 1; i <= 3; i++) {
        const currentValue = options[i - 1].value
        const radio = screen.getByDisplayValue(currentValue)
        expect(radio).toBeInTheDocument()
        const label = screen.getByText(options[i - 1].text)
        expect(label).toBeInTheDocument()

        if(currentValue === "v2"){
            expect(radio).toBeChecked()
        }
    }
})