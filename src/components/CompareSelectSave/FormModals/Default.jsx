import React from "react";
import { Form, FloatingLabel } from "react-bootstrap";
import get from "lodash/get";

const DefaultForm = ({user, setUser, data}) => {
  return (
    <div>
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
          {get(data, "icon_blocks", []).map((block, idx) => {
            return (
              <option
                value={get(block, "description", "")}
                key={idx + 1}
              >
                {get(block, "form_field", "")}
              </option>
            );
          })}
          <option value="Other">
            Other
          </option>
        </Form.Select>
      </FloatingLabel>

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
          placeholder="*"
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

      <FloatingLabel controlId="cssCompany" label="Company name*">
        <Form.Control
          type="text"
          placeholder="Company name*"
          required
          value={user.company}
          onChange={(e) => {
            setUser({
              ...user,
              company: e.target.value,
            });
          }}
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="cssMessage"
        className="css-teaxtarea"
        label="Your message"
      >
        <Form.Control
          as="textarea"
          placeholder="Your message"
          rows={3}
          value={user.message}
          onChange={(e) => {
            setUser({
              ...user,
              message: e.target.value,
            });
          }}
        />
      </FloatingLabel>
    </div>
  )
}

export default DefaultForm