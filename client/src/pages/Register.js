import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "../../node_modules/font-awesome/css/font-awesome.min.css";

import { gql, useMutation } from "@apollo/client";

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      username
      email
      createdAt
    }
  }
`;

export default function Register(props) {
  const [variables, setVariables] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update: (_, __) => props.history.push('/login'),
    onError: (err) =>setErrors(err.graphQLErrors[0].extensions.errors),
  });

  const historyy = useHistory();
  const goLogin = () => historyy.push('/login');

  const submitRegisterForm = (e) => {
    e.preventDefault();

    registerUser({ variables });
  };
  return (
    <Container className="pt-5 contt">
      <Container className="bg-white py-5 px-6 justify-content-center">
        <Row>
          <Col>
            <h1 className="text-center tittle">Register</h1>

            <Form onSubmit={submitRegisterForm}>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text box-icon" id="basic-addon">
                    <i className="fa fa-envelope prefix"></i>
                  </span>
                </div>
                <input
                  type="email"
                  className="form-control form-control-md radius-me-right"
                  placeholder="Email"
                  aria-label="Email"
                  aria-describedby="basic-addon"
                  value={variables.email}
                  onChange={(e) =>
                    setVariables({ ...variables, email: e.target.value })
                  }
                />
              </div>
              <div className="input-spacee"></div>
              <span className={errors.email && "text-danger error-msg"}>
                {errors.email ?? ""}
              </span>

              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text box-icon" id="basic-addon">
                    <i className="fa fa-user prefix p-pass"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control form-control-md radius-me-right"
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon"
                  value={variables.username}
                  onChange={(e) =>
                    setVariables({ ...variables, username: e.target.value })
                  }
                />
              </div>
              <div className="input-spacee"></div>
              <span className={errors.username && "text-danger error-msg"}>
                {errors.username ?? ""}
              </span>
              
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text box-icon" id="basic-addon">
                    <i className="fa fa-unlock-alt prefix p-pass"></i>
                  </span>
                </div>
                <input
                  type="password"
                  className="form-control form-control-md radius-me-right"
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="basic-addon"
                  value={variables.password}
                  onChange={(e) =>
                    setVariables({ ...variables, password: e.target.value })
                  }
                />
              </div>
              <div className="input-spacee"></div>
              <span className={errors.password && "text-danger error-msg"}>
                {errors.password ?? " "}
              </span>
              
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text box-icon" id="basic-addon">
                    <i className="fa fa-unlock-alt prefix p-pass"></i>
                  </span>
                </div>
                <input
                  type="password"
                  className="form-control form-control-md radius-me-right"
                  placeholder="Confirm Password"
                  aria-label="Confirm Password"
                  aria-describedby="basic-addon"
                  value={variables.confirmPassword}
                  onChange={(e) =>
                    setVariables({
                      ...variables,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
              <div className="input-spacee"></div>
              <span
                className={errors.confirmPassword && "text-danger error-msg"}
              >
                {errors.confirmPassword ?? " "}
              </span>

              <div className="text-center btn-content">
                <Button
                  variant="success"
                  type="submit"
                  className="btn-regist"
                  disabled={loading}
                >
                  {loading ? "loading ..." : "Register"}
                </Button>
              </div>
              <span className="text-hintt">
                <div className="text-line"></div>
                <p className="text-hintt-p">I alredy have an account</p>
              </span>
              <div className="text-center min-bot">
                <Button variant="primary" className="btn-regist" onClick={goLogin}>
                  Login
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
