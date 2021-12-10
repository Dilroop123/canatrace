import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";
import baseUrl from ".././../assets/constants/baseUrl";
import placeholder from "../../assets/img/icons/common/placeholder.png";

const AdminNavbar = (props) => {
  const [avatar, setAvatar] = React.useState();

  const userId = localStorage.getItem("pk");
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

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

  const logOut = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("pk");
    window.localStorage.removeItem("username");
    props.history.push("/auth");
  };

  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            {props.brandText}
          </Link>
          {/* <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <FormGroup className="mb-0">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search" type="text" />
              </InputGroup>
            </FormGroup>
          </Form> */}
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      height={40}
                      width={40}
                      src={avatar}
                      onError={(e) => (e.currentTarget.src = placeholder)}
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {username}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My Profile</span>
                </DropdownItem>
                <DropdownItem to="/admin/documents" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>Documents</span>
                </DropdownItem>
                <DropdownItem to="/admin/results" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>Test Results</span>
                </DropdownItem>
                <DropdownItem href="#pablo" onClick={() => logOut()}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
