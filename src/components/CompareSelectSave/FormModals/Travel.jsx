import React, { useState, useRef } from "react";
import { Form, FloatingLabel, Overlay, Popover } from "react-bootstrap";
import { BiCalendarAlt } from "react-icons/bi";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Travel = ({ user, setUser, showPopup, setShowPopup, dates, setDates }) => {
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShowPopup(true);
    setTarget(event.target);
  };

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
    <div role={"presentation"} onClick={() => setShowPopup(false)}>
      <FloatingLabel controlId="cName" label="Your name*">
        <Form.Control
          type="text"
          placeholder="Your name*"
          value={user.name}
          onChange={(e) => {
            setUser({
              ...user,
              name: e.target.value,
            });
          }}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="cssMobile" label="Your mobile number*">
        <Form.Control
          type="tel"
          pattern="[0-9]{10}"
          placeholder="Your mobile number*"
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
          onInvalid={(e) =>
            e.target.setCustomValidity(
              "Mobile number should be 10 digits (ex: 0777 117 117)"
              )
            }
          onInput={(e) => e.target.setCustomValidity("")}
          required 
        />
      </FloatingLabel>

      <FloatingLabel controlId="cssEmail" label="Your email address*">
        <Form.Control
          type="email"
          placeholder="Your email address*"
          value={user.email}
          onChange={(e) => {
            setUser({
              ...user,
              email: e.target.value,
            });
          }}
          required
        />
      </FloatingLabel>

      <div
        className={`form-floating dates ${
          dates.departure ? "has-content" : "no-content"
        }`}
      >
        <Datepicker
          selected={dates.departure}
          value={dates.departure}
          id="departure"
          className="form-control"
          minDate={new Date()}
          onChange={(value) => {
            setDates({...dates, departure: value})
          }}
          customInput={<DatepickerInput />}
          required
        />
        <label htmlFor="departure">Departure Date*</label>
        <span className="calendar">
          <BiCalendarAlt />
        </span>
      </div>

      {dates.departure && (
        <div
          className={`form-floating dates ${
            dates.arrival ? "has-content" : "no-content"
          }`}
        >
          <Datepicker
            selected={dates.arrival}
            value={dates.arrival}
            id="arrival"
            className="form-control"
            minDate={dates.departure}
            onChange={(value) => {
              setDates({...dates, arrival: value})
            }}
            customInput={<DatepickerInput />}
            required
          />
          <label htmlFor="arrival">Arrival Date*</label>
          <span className="calendar">
            <BiCalendarAlt />
          </span>
        </div>
      )}


      {/* MISSING DEPARTURE FIELD */}
      {!dates.departure && (
        <FloatingLabel
          controlId="cArrival"
          label="Arrival date*"
          className="no-departure"
          ref={ref}
          onClick={(e) => e.stopPropagation()}
        >
          <span>
            <BiCalendarAlt />
          </span>
          <Form.Control
            type="text"
            placeholder="Arrival date*"
            className="read-only"
            value={user.arrival_date}
            min={user.departure_date}
            onClick={handleClick}
            readOnly
            required
          />
          <Overlay
            show={showPopup}
            target={target}
            placement="bottom"
            container={ref}
            containerPadding={20}
          >
            <Popover id="popover-contained">
              Please Enter Departure Date First
            </Popover>
          </Overlay>
        </FloatingLabel>
      )}
      {/* END OF MISSING DEPARTURE FIELD */}

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
          required
        />
        <label htmlFor="dob">Date of birth*</label>
        <span className="calendar">
          <BiCalendarAlt />
        </span>
      </div>

      <FloatingLabel controlId="cPassport" label="Your passport number*">
        <Form.Control
          type="text"
          placeholder="Your passport number*"
          value={user.passport}
          onChange={(e) => {
            setUser({
              ...user,
              passport: e.target.value,
            });
          }}
          required
        />
      </FloatingLabel>
    </div>
  );
};

export default Travel;
