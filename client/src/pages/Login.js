import React, { useContext, useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { Form } from "semantic-ui-react";
import useForm from "../hooks/useForm";
import { AuthContext } from "../context/auth";

function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { values, onSubmit, onChange } = useForm(loginUserCallback, {
    username: "",
    email: "",
  });

  const [addUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: user } }) {
      context.login(user);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
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
          label="Password"
          placeholder="Password..."
          name="password"
          type="password"
          value={values.password}
          error={!!errors.password}
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

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      createdAt
      token
    }
  }
`;

export default Login;
