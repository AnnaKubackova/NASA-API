import { render, fireEvent } from '@testing-library/react';
import Form from './Form';

it("formInputRenderCheck", () => {
    const { queryByTitle } = render(<Form />);
    const inputName = queryByTitle("inputName");
    expect(inputName).toBeTruthy();
});

it("formSubmitRenderCheck", () => {
    const { queryByTitle } = render(<Form />);
    const inputSubmit = queryByTitle("inputSubmit");
    expect(inputSubmit).toBeTruthy();
});

it("usernameRenderCheck", () => {
    const { queryByTitle } = render(<Form />);
    const username = queryByTitle("username");
    expect(username).toBeTruthy();
});

describe("changeInput", () => {
    it("onChange", () => {
        const { queryByTitle } = render(<Form />);
        const inputName = queryByTitle("inputName");
        fireEvent.change(inputName, { target: { value: "testName" } });
        expect(inputName.value).toBe("testName");
    });
});

describe("submitForm", () => {
    it("onSubmit", () => {
        const { queryByTitle } = render(<Form />);

        const inputName = queryByTitle("inputName");
        const inputSubmit = queryByTitle("inputSubmit");
        const username = queryByTitle("username");

        expect(username.innerHTML).toBe("Welcome ");
        fireEvent.change(inputName, { target: { value: "testName" } });
        fireEvent.click(inputSubmit);
        expect(username.innerHTML).toBe("Welcome testName");
    });
});