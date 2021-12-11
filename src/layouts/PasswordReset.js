
import React from "react";
import axios from "axios";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components

import {
  Button,
  Card,
  CardHeader,
  Container,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Alert,
} from "reactstrap";

const PasswordReset = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
  const [password, setPassword] = React.useState("");
  const [token, setToken] = React.useState();

  React.useEffect(() => {
    document.body.classList.add("bg-default");
    return () => {
      document.body.classList.remove("bg-default");
    };
  }, []);


  React.useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    setToken(urlParams.get('token'))
  }, []);

  const updatePassword = () => {
    axios({
      method: "post",
      url: "http://3.212.59.178/api/password_reset/confirm/",
      data: {
        token: token,
        password: password,

      },
    })
      .then(function ({ data }) {

        if (data?.status === "OK") {
          alert("Cheers !! Your password has been updated");
        }
        // dispatch({ type: "LOGIN", id: username, token: data.token });
      })
      .catch(function (thrown) {
        if (axios.isCancel(thrown)) {
          console.error("Request canceled", thrown.message);
        } else {
          alert(thrown);
        }
      });
  }

  return (
    <>
      <div className="main-content" ref={mainContent}>

        <div className="header bg-gradient-info py-7 py-lg-8">
          <Container>
            <div className="header-body text-center mb-7">
              <Row className="justify-content-center">
                <Col lg="5" md="6">
                  <h1 className="text-white">Welcome!</h1>
                  <p className="text-lead text-light">
                    Update your account password
                  </p>
                </Col>
              </Row>
            </div>
          </Container>
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </div>
        {/* Page content */}
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col lg="5" md="7">
              <Card className="bg-secondary shadow border-0">
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <small>Enter your new password</small>
                  </div>
                  <Form role="form">

                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </InputGroup>
                    </FormGroup>

                    <div className="text-center">
                      <Button
                        className="my-4"
                        color="primary"
                        type="button"
                        onClick={() => updatePassword()}
                      >
                        Update
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>

            </Col>
          </Row>
        </Container>
      </div>

    </>
  );
};

export default PasswordReset;
