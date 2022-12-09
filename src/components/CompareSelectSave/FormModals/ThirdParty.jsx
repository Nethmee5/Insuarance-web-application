import React from "react";
import { Form, FloatingLabel } from "react-bootstrap";

const ThirdParty = ({user, setUser}) => {
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
    </div>
  )
}

export default ThirdParty