import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { gql, useLazyQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";

import "../../node_modules/font-awesome/css/font-awesome.min.css";

import { useAuthDispatch } from "../context/auth";

const LOGIN_USER = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      email
      createdAt
      token
    }
  }
`;

export default function Login(props) {
  const [variables, setVariables] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const dispatch = useAuthDispatch();

  const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
    onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
    onCompleted(data) {
      dispatch({ type: "LOGIN", payload: data.login });
      window.location.href = "/";
    },
  });

  const historyy = useHistory();
  const goRegister = () => historyy.push("/Register");

  const submitLoginForm = (e) => {
    e.preventDefault();

    loginUser({ variables });
  };

  return (
    <Container className="pt-5 contt">
      <Container className="bg-white py-5 px-6 justify-content-center">
        <Row>
          <Col>
            <h1 className="text-center tittle">Login</h1>

            <Form onSubmit={submitLoginForm}>
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

              <div className="text-center btn-content">
                <Button
                  variant="primary"
                  type="submit"
                  className="btn-regist"
                  disabled={loading}
                >
                  {loading ? "loading ..." : "Login"}
                </Button>
              </div>
              <span className="text-hintt">
                <div className="text-line"></div>
                <p className="text-hintt-p">I don't have an account</p>
              </span>
              <div className="text-center min-bot">
                <Button
                  variant="success"
                  className="btn-regist"
                  onClick={goRegister}
                >
                  Register
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
