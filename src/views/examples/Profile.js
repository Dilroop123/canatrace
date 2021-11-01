import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import axios from "axios";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import baseUrl from "../../assets/constants/baseUrl";
import placeholder from "../../assets/img/icons/common/placeholder.png";

const Profile = () => {
  const [profile, setProfile] = React.useState();
  const [avatar, setAvatar] = React.useState();
  const [state, setState] = React.useState();

  const userId = localStorage.getItem("pk");
  const token = localStorage.getItem("token");

  React.useEffect(() => {
    let isMounted = true;
    (async () => {
      // if (!profile.pk || !profile.token) return;

      try {
        const { data } = await axios.get(
          `${baseUrl.url}assets/${userId}/?key=avatar`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        setAvatar(data);
      } catch (e) {
        console.error(e);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        axios({
          method: "get",
          headers: {
            Authorization: `Token ${token}`,
          },
          url: `${baseUrl.url}userinfo/`,
        })
          .then(function (response) {
            const apiResponse = response.data.results;

            setProfile(response.data.results);

            setState({
              phone_number:
                apiResponse?.length > 0 && apiResponse[0]?.phone_number,
              first_name: apiResponse?.length > 0 && apiResponse[0]?.first_name,
              last_name: apiResponse?.length > 0 && apiResponse[0]?.last_name,
              email: apiResponse?.length > 0 && apiResponse[0]?.email,
              dob: apiResponse?.length > 0 && apiResponse[0]?.dob,
            });
          })
          .catch(function (thrown) {
            if (axios.isCancel(thrown)) {
              console.error("Request canceled", thrown.message);
            } else {
              console.error(thrown.message);
            }
          });
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async () => {
    try {
      // const uid = await AsyncStorage.getItem('pk');
      // const token = await AsyncStorage.getItem('token');

      const { data } = await axios.put(
        `${baseUrl.url}userinfo/${userId}/`,
        state,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      alert("Proile is updated");
      setProfile([state]);
    } catch (e) {
      console.error(e);
    }
  };

  const onUpload = async (e) => {
    const formData = new FormData();
    console.log(e.target.files[0]);
    formData.append("file", e.target.files[0]);
    formData.append("key", "avatar");

    await axios({
      // Endpoint to send files
      url: `${baseUrl.url}assets/${userId}/`,
      method: "PUT",
      headers: {
        Authorization: `Token ${token}`,
      },
      // Attaching the form data
      data: formData,
    })
      .then((res) => {
        alert("Proile photo uploaded");
        setAvatar(URL.createObjectURL(e.target.files[0]));
      }) // Handle the response from backend here
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <UserHeader name={profile?.length > 0 && profile[0]?.first_name} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt=""
                        width="200"
                        height="200"
                        className="rounded-circle"
                        onError={(e) => (e.currentTarget.src = placeholder)}
                        src={!!avatar ? avatar : placeholder}
                      />
                    </a>
                  </div>
                </Col>
              </Row>

              <CardBody>
                {profile?.length > 0 && (
                  <div className="text-center" style={{ marginTop: 120 }}>
                    <Input
                      className="h5 font-weight-300"
                      onChange={onUpload}
                      type="file"
                      accept="image/*"
                    />
                    <h3>
                      {profile[0]?.first_name + " " + profile[0]?.last_name}
                      {/* <span className="font-weight-light">, 27</span> */}
                    </h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      {profile[0]?.email}
                    </div>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      {profile[0]?.phone_number}
                    </div>
                    {/* <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Solution Manager - Creative Tim Officer
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    University of Computer Science
                  </div> */}
                    <hr className="my-4" />
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={updateProfile}
                      size="sm"
                    >
                      Update
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Phone Number
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="phone_number"
                            value={state?.phone_number}
                            placeholder="Phone Number"
                            type="number"
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            defaultValue={state?.email}
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            First name
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={state?.first_name}
                            name="first_name"
                            placeholder="First name"
                            type="text"
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Last name
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={state?.last_name}
                            name="last_name"
                            placeholder="Last name"
                            type="text"
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Date of Birth
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={state?.dob}
                            name="dob"
                            placeholder="Date of Birth"
                            type="date"
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  {/* <h6 className="heading-small text-muted mb-4">
                    Contact information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Address
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                            id="input-address"
                            placeholder="Home Address"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            City
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="New York"
                            id="input-city"
                            placeholder="City"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Country
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="United States"
                            id="input-country"
                            placeholder="Country"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Postal code
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-postal-code"
                            placeholder="Postal code"
                            type="number"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div> */}
                  {/* <hr className="my-4" /> */}
                  {/* Description */}
                  {/* <h6 className="heading-small text-muted mb-4">About me</h6> */}
                  {/* <div className="pl-lg-4">
                    <FormGroup>
                      <label>About Me</label>
                      <Input
                        className="form-control-alternative"
                        placeholder="A few words about you ..."
                        rows="4"
                        defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and
                        Open Source."
                        type="textarea"
                      />
                    </FormGroup>
                  </div> */}
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
