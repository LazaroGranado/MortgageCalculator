/* eslint-disable */

import React, { useEffect, useState } from "react";
import "./App.css";
import Input from "./components/Input";
import ScrollButton from "./components/ScrollButton";

export default function App() {
  const [balance, setBalance] = useState("");
  const [rate, setRate] = useState("");
  const [loanTerm, setLoanTerm] = useState(30);
  const [width, setWidth] = useState(window.innerWidth);

  const [monthlyPaymentSchedule, setMonthlyPaymentSchedule] = useState([]);

  const loanTermMultipliedBy12 = loanTerm * 12;
  const monthlyRate = rate / 12 / 100;
  const updatedRate = 1 + monthlyRate;
  var newBalance = balance;
  const monthlyTotalPayment =
    (balance * [monthlyRate * Math.pow(updatedRate, loanTermMultipliedBy12)]) /
    [Math.pow(updatedRate, loanTermMultipliedBy12) - 1];
  const monthlyPaymentArray = [];
  var monthlyPayment = {};

  const [divToLowerTable, setDivToLowerTable] = useState(
    window.innerWidth > 820 ? (
      <div style={{ marginBottom: "5.92rem" }}></div>
    ) : (
      <div style={{ marginBottom: "10rem" }}></div>
    )
  );

  function addToArray() {
    const monthlyInterestPaid = newBalance * monthlyRate;
    const monthlyPrincipalPaid = monthlyTotalPayment - monthlyInterestPaid;

    if (monthlyPaymentArray.length < loanTermMultipliedBy12) {
      monthlyPayment = {
        total: monthlyTotalPayment,
        interestPaid: monthlyInterestPaid,
        principalPaid: monthlyPrincipalPaid,
      };

      monthlyPaymentArray.push(monthlyPayment);
      newBalance = newBalance - monthlyPrincipalPaid;

      addToArray();
    }
  }

  addToArray();

  // Code bellow is to keep monthly payment at 0 prior to entering both balance and rate, otherwise it will display NaN
  if (balance < 1 || rate < 1) {
    monthlyPayment.total = 0;
  }

  let interestInput = (
    <Input
      style={{ color: "#7E7E7E" }}
      onChange={handleChangeRate}
      className="form-control  bg-dark border border-secondary"
      placeholder="5"
      value={rate}
    />
  );
  let balanceInput = (
    <Input
      style={{ color: "#7E7E7E" }}
      onChange={handleChangeBalance}
      className="form-control  bg-dark border border-secondary"
      placeholder="240,000"
      value={balance}
    />
  );

  function setInputValidation() {
    if (balance > 50000 && rate < 1) {
      interestInput = (
        <Input
          style={{ color: "#7E7E7E" }}
          onChange={handleChangeRate}
          className="form-control  bg-dark is-invalid border border-secondary"
          placeholder="5"
          value={rate}
        />
      );
    } else if (balance < 1 && rate > 0) {
      balanceInput = (
        <Input
          style={{ color: "#7E7E7E" }}
          onChange={handleChangeBalance}
          className="form-control  bg-dark is-invalid border border-secondary"
          placeholder="240,000"
          value={balance}
        />
      );
    }
  }
  setInputValidation();

  var loanAmountDiv = (
    <div className="form-group col-md-6" style={{ marginBottom: "40px" }}>
      <label>Loan amount</label>
      {balanceInput}
      <div
        style={{
          height: "0px",
          margin: "0px",
          position: "relative",
          top: ".25rem",
        }}
        className="invalid-feedback"
      >
        Enter a loan amount
      </div>
    </div>
  );
  if (window.innerWidth < 821) {
    loanAmountDiv = (
      <div
        className={
          width > 820
            ? "form-group col-md-2 "
            : "form-group col-md-12 form-control-lg "
        }
      >
        <label>Loan amount</label>
        {balanceInput}
        <div
          style={{ fontSize: ".85rem", height: "0px", margin: "0px" }}
          className="invalid-feedback"
        >
          Enter a loan amount
        </div>
      </div>
    );
  }

  function handleChangeBalance(event) {
    const value = event.target.value;

    setBalance(value);
  }

  function handleChangeRate(event) {
    const value = event.target.value;

    setRate(value);
  }

  function handleChangeTerm(e) {
    const value = e.target.value;

    setLoanTerm(value);
  }

  useEffect(() => {
    setMonthlyPaymentSchedule(monthlyPaymentArray);
  }, [balance]);

  useEffect(() => {
    setMonthlyPaymentSchedule(monthlyPaymentArray);
  }, [rate]);

  useEffect(() => {
    setMonthlyPaymentSchedule(monthlyPaymentArray);
  }, [loanTerm]);

  function getWidth() {
    window.addEventListener("resize", function () {
      setWidth(window.innerWidth);
    });

    if (width < 821 && width > 413) {
      loanAmountDiv = (
        <div
          className={
            width > 820
              ? "form-group col-md-6 "
              : "form-group col-md-12 form-control-lg "
          }
        >
          <label>Loan amount</label>
          {balanceInput}
          <div className="invalid-feedback">Enter a loan amount</div>
        </div>
      );

      setDivToLowerTable(<div style={{ marginBottom: "20rem" }}></div>);
      setMonthlyPaymentOutput(
        <div
          style={{
            display: "flex",
            width: "20rem",
            padding: "0rem",
            position: "absolute",
            left: "-1rem",
            top: "33rem",
          }}
        >
          <h5
            style={{
              width: "16rem",
              float: "right",
              paddingLeft: "3.5rem",
              position: "absolute",
            }}
          >
            Monthly payment{" "}
            <h4 className="moneySignMedium">
              $
              <h1 className="paymentOutputMedium">
                {monthlyPayment.total.toFixed(2)}
              </h1>
            </h4>
          </h5>
        </div>
      );
    } else if (width > 820) {
      setDivToLowerTable(<div style={{ marginBottom: "9.92rem" }}></div>);

      setMonthlyPaymentOutput(
        <div
          style={{
            display: "flex",
            width: "20.5rem",
            padding: "0rem",
            position: "relative",
            left: "5rem",
            top: "-4rem",
          }}
        >
          <div
            style={{
              borderLeftWidth: "thin",
              borderLeftColor: "rgb(101, 101, 101)",
              borderLeftStyle: "solid",
              height: "7rem",
              position: "absolute",
              top: "0rem",
              right: "21rem",
            }}
          ></div>
          <h5
            style={{
              width: "16rem",
              float: "right",
              paddingLeft: "3.5rem",
              position: "absolute",
            }}
          >
            Monthly payment{" "}
            <h4 className="moneySignDesktop">
              $
              <h1 className="paymentOutputDesktop">
                {monthlyPayment.total.toFixed(2)}
              </h1>
            </h4>
          </h5>
        </div>
      );
    } else if (width < 414) {
      setDivToLowerTable(<div style={{ marginBottom: "20rem" }}></div>);
      setMonthlyPaymentOutput(
        <div className="paymentOutputDivSmall">
          <h5
            style={{
              width: "16rem",
              float: "right",
              paddingLeft: "3.5rem",
              position: "absolute",
            }}
          >
            Monthly payment{" "}
            <h4 className="moneySignSmall">
              $
              <h1 className="paymentOutputSmall">
                {monthlyPayment.total.toFixed(2)}
              </h1>
            </h4>
          </h5>
        </div>
      );
    }
    console.log(width);
  }

  const [monthlyPaymentOutput, setMonthlyPaymentOutput] = useState(
    window.innerWidth < 821 ? (
      <div
        style={{
          display: "flex",
          width: "18rem",
          padding: "0rem",
          position: "absolute",
          left: "3.5rem",
          top: "25rem",
        }}
      >
        <h5
          style={{
            width: "16rem",
            float: "right",
            paddingLeft: "3.5rem",
            position: "absolute",
          }}
        >
          Monthly payment{" "}
          <h4 style={{ marginTop: "1rem", paddingTop: "1rem" }}>
            $
            <h1
              style={{
                position: "relative",
                marginBottom: "2rem",
                left: "1rem",
                bottom: "2.4rem",
              }}
            >
              {monthlyPayment.total}
            </h1>
          </h4>
        </h5>
      </div>
    ) : (
      <div
        style={{
          display: "flex",
          width: "20.8rem",
          padding: "0rem",
          position: "absolute",
          left: "35rem",
          top: "14rem",
        }}
      >
        <div
          style={{
            borderLeftWidth: "thin",
            borderLeftColor: "rgb(101, 101, 101)",
            borderLeftStyle: "solid",
            height: "7rem",
            position: "absolute",
            top: "0rem",
            right: "21rem",
          }}
        ></div>
        <h5
          style={{
            width: "16rem",
            float: "right",
            paddingLeft: "3.5rem",
            position: "absolute",
          }}
        >
          Monthly payment{" "}
          <h4 style={{ marginTop: "1rem", paddingTop: "1rem" }}>
            $
            <h1
              style={{
                position: "relative",
                marginBottom: "2rem",
                left: "1rem",
                bottom: "2.4rem",
              }}
            >
              {monthlyPayment.total.toFixed(2)}
            </h1>
          </h4>
        </h5>
      </div>
    )
  );

  useEffect(() => {
    if (window.innerWidth < 821) {
      setMonthlyPaymentOutput(
        <div
          style={{
            display: "flex",
            width: "19.5rem",
            padding: "0rem",
            position: "absolute",
            left: "3.5rem",
            top: "25rem",
            marginTop: "2rem",
          }}
        >
          <h5
            style={{
              width: "16rem",
              float: "right",
              paddingLeft: "3.5rem",
              position: "absolute",
            }}
          >
            Monthly payment{" "}
            <h4 style={{ marginTop: "1rem", paddingTop: "1rem" }}>
              $
              <h1
                style={{
                  position: "relative",
                  marginBottom: "2rem",
                  left: "1rem",
                  bottom: "2.4rem",
                }}
              >
                {monthlyPayment.total.toFixed(2)}
              </h1>
            </h4>
          </h5>
        </div>
      );
    } else if (window.innerWidth > 820) {
      setMonthlyPaymentOutput(
        <div
          style={{
            display: "flex",
            width: "20.7rem",
            padding: "0rem",
            position: "absolute",
            left: "35rem",
            top: "14rem",
          }}
        >
          <div
            style={{
              borderLeftWidth: "thin",
              borderLeftColor: "rgb(101, 101, 101)",
              borderLeftStyle: "solid",
              height: "7rem",
              position: "absolute",
              top: "0rem",
              right: "21rem",
            }}
          ></div>
          <h5
            style={{
              width: "16rem",
              float: "right",
              paddingLeft: "3.5rem",
              position: "absolute",
            }}
          >
            Monthly payment{" "}
            <h4 style={{ marginTop: "1rem", paddingTop: "1rem" }}>
              $
              <h1
                style={{
                  position: "relative",
                  marginBottom: "2rem",
                  left: "1rem",
                  bottom: "2.4rem",
                }}
              >
                {monthlyPayment.total.toFixed(2)}
              </h1>
            </h4>
          </h5>
        </div>
      );
    }

    getWidth();
  }, [balance, rate, width, loanTerm]);

  function Table() {
    if (balance > 0 && rate > 0) {
      return (
        <div>
          {" "}
          <h3
            style={{
              position: "relative",
              top: "-.2rem",
              textAlign: "center",
              color: "rgb(101, 101, 101)",
            }}
          >
            Amortization schedule breakdown
          </h3>
          <div
            className={width > 413 && width < 821 ? "dottedLineMedium" : null}
          ></div>
          <div
            style={
              width < 414
                ? {
                    borderBottomWidth: ".6rem",
                    borderBottomColor: "#394046",
                    borderStyle: "none none dotted",
                    width: "17%",
                    position: "relative",
                    margin: "auto",
                    bottom: "5.7rem",
                  }
                : null
            }
          ></div>
          <table
            style={{ color: "#656565" }}
            className="table table-sm table-dark table-striped"
          >
            <thead>
              <tr class="header">
                <th className="tdWidth ps-2" scope="col">
                  Month
                </th>
                <th className="tdWidth" scope="col">
                  Total{" "}
                </th>
                <th className="tdWidth" scope="col">
                  Interest
                </th>
                <th className="tdWidth" scope="col">
                  Principal
                </th>
              </tr>
            </thead>
            <tbody>
              {monthlyPaymentSchedule.map((payment, index) => {
                return (
                  <tr style={{ color: "#656565" }} key={index}>
                    <th className="ps-2" scope="row">
                      {index + 1}
                    </th>
                    <td>{payment.total.toFixed(2)}</td>
                    <td>{payment.interestPaid.toFixed(2)}</td>
                    <td>{payment.principalPaid.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
  }

  return (
    <div>
      <form style={{ color: "#656565" }}>
        <div
          className="row "
          style={
            width > 413
              ? { margin: "115px 20px 10px" }
              : { margin: "100px 20px 10px" }
          }
        >
          <h1
            className={width < 540 ? "titleSizeForPhone" : "titleSize"}
            style={{ marginBottom: "40px" }}
          >
            Mortgage calculator
          </h1>
          {loanAmountDiv}

          <div></div>

          <div
            className={
              width > 820
                ? "form-group col-md-4 "
                : "form-group col-md-12 form-control-lg "
            }
          >
            <label>Loan term</label>
            <select
              style={{ color: "#7E7E7E" }}
              onChange={handleChangeTerm}
              className="form-control bg-dark border border-secondary"
            >
              <option value="30">30-yr fixed</option>
              <option value="20">20-yr fixed</option>
              <option value="15">15-yr fixed</option>
            </select>
          </div>
          <div
            className={
              width > 820
                ? "form-group col-md-2 "
                : "form-group col-md-12 form-control-lg "
            }
          >
            <label>Interest</label>
            {interestInput}
            <div
              style={{ margin: "0px", position: "relative", top: ".25rem" }}
              className="invalid-feedback"
            >
              <p
                style={{
                  fontSize: ".84rem",
                  width: "8.2rem",
                  height: "0px",
                  margin: "0px",
                }}
              >
                {" "}
                Enter an interest rate
              </p>
            </div>
          </div>

          {/*/////////////////////////////////////////////////////// MONTHLY PAYMENT///////////////////////////////////////////////////  */}
          {monthlyPaymentOutput}

          <div
            style={
              width > 820
                ? {
                    borderBottomWidth: "thin",
                    borderBottomColor: "rgb(101, 101, 101)",
                    borderBottomStyle: "solid",
                    width: "85%",
                    position: "relative",
                    top: "4rem",
                    left: ".8rem",
                  }
                : null
            }
          ></div>
        </div>
      </form>
      {divToLowerTable}

      <Table />

      <ScrollButton />
    </div>
  );
}
