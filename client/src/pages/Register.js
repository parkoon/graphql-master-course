import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { Form } from "semantic-ui-react";
import useForm from "../hooks/useForm";
function Register(props) {
  const [errors, setErrors] = useState({});

  const { values, onChange, onSubmit } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      console.log(result);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} className={loading ? "loading" : ""}>
        <Form.Input
          fluid
          label="Username"
          placeholder="Username..."
          name="username"
          type="text"
          value={values.username}
          error={!!errors.username}
          onChange={onChange}
        />

        <Form.Input
          fluid
          label="Email"
          placeholder="Email..."
          name="email"
          type="email"
          value={values.email}
          error={!!errors.email}
          onChange={onChange}
        />

        <Form.Input
          fluid
          label="Password"
          placeholder="Password..."
          name="password"
          type="password"
          value={values.password}
          error={!!errors.password}
          onChange={onChange}
        />

        <Form.Input
          fluid
          label="Confirm Password"
          placeholder="Confirm Password..."
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          error={!!errors.confirmPassword}
          onChange={onChange}
        />
        <Form.Button>Submit</Form.Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      createdAt
      token
    }
  }
`;

export default Register;
