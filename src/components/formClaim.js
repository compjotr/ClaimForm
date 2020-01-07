import React from "react";
import "./form.css";

/* eslint-disable */
class FormClaim extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      polNum: "",
      name: "",
      flightNumber: "",
      flightDate: "",
      newFlightNum: "",
      newFlightDate: "",
      addInf: "",
      delayTime: "",
      claimOption: "",
      interuptReason: "",
      isSubmitted: false,
      interuptList: [
        "Weather",
        "Technical/Mechanical",
        "Staffing",
        "Security",
        "Other"
      ],
      file: null,
      files: []
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  storeLocalData = () => {
    const dataObject = {
      "Policy number": this.state.polNum,
      name: this.state.name,
      "flight number": this.state.flightNumber,
      flightDate: this.state.flightDate,
      "claim option": this.state.claimOption,
      "interupt reason": this.state.interuptReason,
      "delay time": this.state.delayTime,
      "new date": this.state.newFlightDate,
      "new flight number": this.state.newFlightNum,
      "file:": this.state.file,
      files: this.state.files
    };

    localStorage.setItem("data", JSON.stringify(dataObject));
  };
  emptyStorage = () => {
    localStorage.clear();
  };

  readyToSubmit = () => {
    const mutualStateArray = [
      this.state.polNum.length,
      this.state.name.length,
      this.state.flightNumber.length,
      this.state.flightDate.length,
      this.state.claimOption.length,
      this.state.interuptReason.length
    ];
    if (!mutualStateArray.includes(0)) {
      if (
        this.state.claimOption === "Delay" &&
        this.state.delayTime.length > 0
      ) {
        this.storeLocalData();
        alert("Suksess! skjema er sendt.");
      }
      if (
        this.state.claimOption == "Cancellation" &&
        this.state.newFlightDate.length > 0 &&
        this.state.newFlightNum.length > 0
      ) {
        this.storeLocalData();
        alert("Suksess! skjema er sendt.");
      }
    } else {
      alert("please completed the red boxes!");
    }
  };

  handleSubmit = event => {
    this.setState({ isSubmitted: true });

    event.preventDefault();
    if (this.state.interuptReason === "Technical/Mechanical") {
      alert(
        "Technical/Mechanical issues is not covered, and the form will not be sent! "
      );
    } else {
      this.readyToSubmit();
    }
  };

  validateField = valueElem => {
    if (this.state.valueElem.length < 1) {
      return <font color="red">Please complete the {valueElem} Field </font>;
    }
  };

  getFile = file => {
    this.setState({ file: file });
  };
  removeFile = f => {
    this.setState({ files: this.state.files.filter(x => x !== f) });
  };

  onChangeFile = e => {
    this.setState({ files: [...this.state.files, e.target.files] });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>
            PolicyNumber:
            <input
              id="polNum"
              className={
                this.state.polNum.length == 0 && this.state.isSubmitted
                  ? "error"
                  : ""
              }
              type="text"
              name="polNum"
              value={this.state.polNum}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Name:
            <input
              id="name"
              className={
                this.state.name.length == 0 && this.state.isSubmitted
                  ? "error"
                  : ""
              }
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <label>
            FlightNumber:
            <input
              className={
                this.state.flightNumber.length == 0 && this.state.isSubmitted
                  ? "error"
                  : ""
              }
              type="text"
              name="flightNumber"
              id="flightNumber"
              value={this.state.flightNumber}
              onChange={this.handleChange}
            />
          </label>
        </div>

        <label>
          Date of Original Flight:
          <input
            className={
              this.state.flightDate.length == 0 && this.state.isSubmitted
                ? "error"
                : ""
            }
            type="date"
            name="flightDate"
            id="flightDate"
            onChange={this.handleChange}
          />
        </label>

        <label>
          Select Flight interruption reason:
          <select
            className={
              this.state.interuptReason.length == 0 && this.state.isSubmitted
                ? "error"
                : ""
            }
            name="interuptReason"
            id="interuptReason"
            value={this.state.interuptReason}
            onChange={this.handleChange}
          >
            {this.state.interuptList.map(listElem => (
              <option key={listElem} value={listElem}>
                {listElem}
              </option>
            ))}
          </select>
        </label>
        {this.state.interuptReason === "Technical/Mechanical" ? (
          <div className="alertText">
            <font color="red">
              Technical/Mechanical issues are not covered by the insurance
            </font>
          </div>
        ) : null}

        <div className="form-check">
          <p>Select flight interruption consequence: </p>
          <label>
            radio1
            <input
              type="radio"
              name="claimOption"
              id="claimOption"
              value="Delay"
              checked={this.state.claimOption === "Delay"}
              onChange={this.handleChange}
              className="form-check-input"
            />
            Delay
          </label>
        </div>

        <div className="form-check">
          <label>
            radio2
            <input
              type="radio"
              name="claimOption"
              id="claimOption"
              value="Cancellation"
              checked={this.state.claimOption === "Cancellation"}
              onChange={this.handleChange}
              className="form-check-input"
            />
            Cancellation
          </label>
        </div>
        {this.state.claimOption === "" && this.state.isSubmitted ? (
          <font color="red">Please Select an option</font>
        ) : null}
        {this.state.claimOption === "Cancellation" ? (
          <React.Fragment>
            <label>
              New Flight Number:
              <input
                className={
                  this.state.newFlightNum.length == 0 && this.state.isSubmitted
                    ? "error"
                    : ""
                }
                type="text"
                name="newFlightNum"
                id="newFlightNum"
                onChange={this.handleChange}
              />
            </label>
            <label>
              Date of New Flight:
              <input
                type="date"
                name="newFlightDate"
                id="newFlightDate"
                className={
                  this.state.newFlightDate.length == 0 && this.state.isSubmitted
                    ? "error"
                    : ""
                }
                onChange={this.handleChange}
              />
            </label>
          </React.Fragment>
        ) : null}
        {this.state.claimOption === "Delay" ? (
          <label>
            Delay Time:
            <input
              className={
                this.state.delayTime.length == 0 && this.state.isSubmitted
                  ? "error"
                  : ""
              }
              type="text"
              name="delayTime"
              id="delayTime"
              onChange={this.handleChange}
            />
          </label>
        ) : null}
        <label>
          Additional Information:
          <p className={"optional"}>-Optional</p>
          <input type="text" name="addInf" />
        </label>
        <label>
          <input type="file" multiple onChange={this.onChangeFile} />
        </label>
        <p className={"optional"}>-Optional</p>

        <input type="submit" value="Submit" onClick={this.saveData} />
      </form>
    );
  }
}
export default FormClaim;
