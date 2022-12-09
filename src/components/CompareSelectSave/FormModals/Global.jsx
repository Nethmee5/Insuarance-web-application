import React, { useState, useRef } from "react";
import { Form, FloatingLabel } from "react-bootstrap";
import { BiCalendarAlt } from "react-icons/bi";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Global = ({user, setUser, dates, setDates}) => {

  const DatepickerInput = React.forwardRef(({ value, onClick }, ref) => (
    <button
      className="form-control w-100 d-block"
      onClick={onClick}
      ref={ref}
      type={"button"}
    >
      {value}
    </button>
  ));

  return (
    <div>
      <FloatingLabel controlId="cName" label="Your name*">
        <Form.Control
          type="text"
          placeholder="Your name*"
          required
          value={user.name}
          onChange={(e) => {
            setUser({
              ...user,
              name: e.target.value,
            });
          }}
        />
      </FloatingLabel>

      <FloatingLabel controlId="cssMobile" label="Your mobile number*">
        <Form.Control
          type="tel"
          pattern="[0-9]{10}"
          placeholder="Your mobile number*"
          required
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
          onInvalid={(e) =>
            e.target.setCustomValidity(
              "Mobile number should be 10 digits (ex: 0777 117 117)"
            )
          }
          onInput={(e) => e.target.setCustomValidity("")}
        />
      </FloatingLabel>

      <FloatingLabel controlId="cssEmail" label="Your email address*">
        <Form.Control
          type="email"
          placeholder="Your email address*"
          required
          value={user.email}
          onChange={(e) => {
            setUser({
              ...user,
              email: e.target.value,
            });
          }}
        />
      </FloatingLabel>

      <div
        className={`form-floating dates ${
          dates.dob ? "has-content" : "no-content"
        }`}
      >
        <Datepicker
          selected={dates.dob}
          value={dates.dob}
          id="dob"
          className="form-control"
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          maxDate={new Date()}
          onChange={(value) => {
            setDates({...dates, dob: value})
          }}
          customInput={<DatepickerInput />}
        />
        <label htmlFor="dob">Date of birth*</label>
        <span className="calendar">
          <BiCalendarAlt />
        </span>
      </div>
    </div>
  )
}

export default Global