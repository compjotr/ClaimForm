import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import { shallow } from "enzyme";
import FormClaim from "../components/formClaim";

describe("Form field tests", () => {
  const wrapper = shallow(<FormClaim />);
  it("should have input for policy number and name", () => {
    //Email and password input field should be present
    expect(wrapper.find("input#polNum")).toHaveLength(1);
    expect(wrapper.find("input#name")).toHaveLength(1);
    expect(wrapper.find("input#flightNumber")).toHaveLength(1);
    expect(wrapper.find("input#flightDate")).toHaveLength(1);
    //expect(wrapper.find("input#delayTime")).toHaveLength(1);
    //expect(wrapper.find("input#newFlightNum")).toHaveLength(1);
  });
  const { getByTestId } = render(
    <form>
      <label>
        <input
          type="radio"
          data-testid="claimOption"
          name="claimOption"
          value="Delay"
        />
      </label>
      <label>
        <input
          type="radio"
          data-testid="claimOption2"
          name="claimOption"
          value="Cancellation"
        />
      </label>
    </form>
  );

  const radio = getByTestId("claimOption");
  fireEvent.change(radio, { target: { value: "Cancellation" } });
  expect(radio.value).toBe("Cancellation");
  const radio2 = getByTestId("claimOption2");
  fireEvent.change(radio2, { target: { value: "Delay" } });
  expect(radio2.value).toBe("Delay");
});
