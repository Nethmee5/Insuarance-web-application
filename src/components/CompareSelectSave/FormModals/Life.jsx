import React from "react";
import { Form, FloatingLabel } from "react-bootstrap";

const Life = ({user, setUser}) => {
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

      <FloatingLabel
          controlId="cName"
          className={`${user.type ? "has-content" : "no-content"}`}
          label="Select Insurance Type*"
        >
        <Form.Select
          value={user.type}
          onChange={(e) => {
            setUser({
              ...user,
              type: e.target.value,
            });
          }}
          required
        >
          <option value=""></option>
          <option value="Health">Health plan</option>
          <option value="Retirement">Retirement plan</option>
          <option value="Education">Education plan</option>
          <option value="Protection">Protection plan</option>
          <option value="Investment">Investment plan</option>
          <option value="Group Life"> Group life plan</option>
          <option value="Mortgage Protection">Mortgage protection plan (DTA)</option>
          <option value="Other">
            Other
          </option>
        </Form.Select>
      </FloatingLabel>
    </div>
  )
}

export default Life