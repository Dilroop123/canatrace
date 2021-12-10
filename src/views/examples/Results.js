import React from "react";

import { Document, Page, pdfjs } from "react-pdf";

import axios from "axios";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Table,
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import FlatList from "flatlist-react";
import QRCode from "qrcode.react";

import baseUrl from "../../assets/constants/baseUrl";

import vectorlogo from "../../assets/img/brand/vectorLogo.png";

const Results = () => {
  const [patientDetails, setPatientDetails] = React.useState();
  const [resultList, setResultList] = React.useState([]);
  const [userId, setUserId] = React.useState();
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  React.useEffect(() => {
    setResultList([
      {
        id: 9.0,
        name: "Spartan Cube",
        setting: {
          swab_methods: [
            "NP (Nasopharyngeal)",
            "Mid Nasal",
            "Saliva",
            "Ministry Approved",
          ],
          test_type: "RT-PCR (Polymerase Chain Reaction)",
        },
      },
      {
        id: 10.0,
        name: "Songbird Hyris bCUBE",
        setting: {
          swab_methods: [
            "NP (Nasopharyngeal)",
            "Mid Nasal",
            "Saliva",
            "Ministry Approved",
          ],
          test_type: "RT-PCR (Polymerase Chain Reaction)",
        },
      },
      {
        id: 11.0,
        name: "London Health Sciences Lab",
        setting: {
          swab_methods: [
            "NP (Nasopharyngeal)",
            "Mid Nasal",
            "Saliva",
            "Ministry Approved",
          ],
          test_type: "RT-PCR (Polymerase Chain Reaction)",
        },
      },
      {
        id: 12.0,
        name: "Abbott ID NOW",
        setting: {
          swab_methods: [
            "NP (Nasopharyngeal)",
            "Mid Nasal",
            "Saliva",
            "Ministry Approved",
          ],
          test_type: "NAT/RT-PCR (Polymerase Chain Reaction)",
        },
      },
      {
        id: 13.0,
        name: "Luminex Aries",
        setting: {
          swab_methods: [
            "NP (Nasopharyngeal)",
            "Mid Nasal",
            "Saliva",
            "Ministry Approved",
          ],
          test_type: "RT-PCR (Polymerase Chain Reaction)",
        },
      },
      {
        id: 14.0,
        name: "Abbott PANBIO",
        setting: {
          swab_methods: ["Nasal"],
          test_type: "Antigen Test",
        },
      },
      {
        id: 15.0,
        name: "BD Veritor Plus Analyzer SARS-CoV-2",
        setting: {
          swab_methods: ["Nasal"],
          test_type: "Antigen Test",
        },
      },
      {
        id: 16.0,
        name: "Test Kit",
        setting: {},
      },
    ]);
  }, []);

  const getResultList = async (id) => {
    const response = await fetch(
      "https://consumer-dev-booking.vertoengage.com/engage/api/api/patients/collection/encounters",
      {
        method: "POST",
        credentials: "include",
        headers: new Headers({
          Authorization:
            "Bearer a4e2f16f867c1668bfc5501b35da3c3f2a9b9e9424a63a5b9fb4ddc7dbc4f8df3b020405e1a6a0258ef6fa520e51126b7cd284c3b1e5ed10981e7608a127ad3f",
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          patient_id: id,
        }),
      }
    );

    const resData = await response.json();
    setResultList(resData?.resource_types);
  };

  const getDemographicDetail = async () => {
    const response = await fetch(
      "https://consumer-dev-booking.vertoengage.com/engage/api/api/patients/collection/",
      {
        method: "POST",
        credentials: "include",
        headers: new Headers({
          Authorization:
            "Bearer a4e2f16f867c1668bfc5501b35da3c3f2a9b9e9424a63a5b9fb4ddc7dbc4f8df3b020405e1a6a0258ef6fa520e51126b7cd284c3b1e5ed10981e7608a127ad3f",
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          email: "tvalverde@verto.ca",
        }),
      }
    );

    const resData = await response.json();
    setPatientDetails(resData?.patients[0]);
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     getDemographicDetail();
  //   }, []),
  // );

  React.useEffect(() => {
    patientDetails?.id && getResultList(patientDetails?.id);
  }, [patientDetails]);

  const renderPerson = (result, idx) => {
    return (
      <div
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          marginTop: "2%",
          display: "flex",
          marginLeft: "5%",
          marginRight: "5%",
          paddingLeft: 30,
          paddingRight: 30,
          paddingTop: 8,
          paddingBottom: 8,
          borderRadius: 25,
          borderLeftWidth: 5,
          borderRightWidth: 0,
          borderTopWidth: 0,
          borderBottomWidth: 0,
          borderColor: result?.setting?.test_type?.includes("Antigen")
            ? "orange"
            : "teal",
          borderStyle: "solid",
        }}
      >
        <div>
          <p style={{ color: "black" }}>{result?.name}</p>
          <p>{result?.setting?.test_type}</p>
        </div>
        <div
          style={{
            justifyContent: "flex-end",
            flexGrow: 1,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <button
            style={{
              height: 30,
              width: 80,
              backgroundColor: "#ffffff",
              borderRadius: 25,
              marginTop: 20,
            }}
            onClick={() => setIsOpenModal(true)}
          >
            Open
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <Container style={{ maxWidth: "none" }}>
        <Modal isOpen={isOpenModal} toggle={() => setIsOpenModal(false)}>
          <ModalHeader toggle={() => setIsOpenModal(false)}>
            Your Result
          </ModalHeader>
          <ModalBody>
            <div
              style={{
                flex: 1,
                paddingTop: 10,
                flexDirection: "column",
                display: "flex",
              }}
            >
              <div
                style={{
                  height: 150,
                  width: "100%",
                  paddingTop: 20,
                  alignItems: "flex-start",
                  flexDirection: "row",
                  backgroundColor: "#000",
                }}
              >
                <img
                  style={{
                    marginLeft: 20,
                  }}
                  height={60}
                  width={140}
                  src={vectorlogo}
                />
                <div
                  style={{
                    flexDirection: "column",
                    flexGrow: 1,
                    marginRight: 20,
                  }}
                >
                  <p
                    style={{
                      color: "#f",
                      textAlign: "right",
                      fontSize: 11,
                    }}
                  >
                    Licensed under Med Chem Health Care Ltd.
                  </p>
                  <p
                    style={{
                      color: "#fff",
                      textAlign: "right",
                      fontSize: 11,
                    }}
                  >
                    Ontario Lab License #5697
                  </p>
                  <p
                    style={{
                      fontFamily: "Archivo-Bold",
                      color: "white",
                      fontSize: 22,
                      textAlign: "right",
                      marginTop: 10,
                    }}
                  >
                    July 06, 2021
                  </p>
                </div>
              </div>
              <div
                style={{
                  padding: 10,
                  backgroundColor: "#fff",
                  borderRadius: 5,
                  marginTop: -50,
                  alignSelf: "center",
                }}
              >
                <QRCode value="http://awesome.link.qr" />
              </div>
              <div
                style={{
                  marginTop: 20,
                  paddingLeft: 15,
                  paddingRight: 15,
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontSize: 13,
                      marginBottom: 3,
                      color: "#888",
                    }}
                  >
                    Client Name
                  </p>

                  <p
                    style={{
                      fontFamily: "Archivo-Bold",
                      fontWeight: "bold",
                      fontSize: 15,
                    }}
                  >
                    {/* {patientDetails?.first_name + ' ' + patientDetails?.last_name} */}
                    {"John Doe"}
                  </p>
                </div>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontSize: 13,
                      marginBottom: 3,
                      color: "#888",
                    }}
                  >
                    Date of Birth
                  </p>
                  <p
                    style={{
                      fontFamily: "Archivo-Bold",
                      fontWeight: "bold",
                      fontSize: 15,
                    }}
                  >
                    {/* {patientDetails?.dob || 'NA'} */}
                    {"2020-02-20"}
                  </p>
                </div>
              </div>
              <div
                style={{
                  marginTop: 20,
                  paddingLeft: 15,
                  paddingRight: 15,
                  flexDirection: "row",
                  display: "flex",
                }}
              >
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontSize: 13,
                      marginBottom: 3,
                      color: "#888",
                    }}
                  >
                    Phone Number
                  </p>
                  <p
                    style={{
                      fontFamily: "Archivo-Bold",
                      fontWeight: "bold",
                      fontSize: 15,
                    }}
                  >
                    {/* {patientDetails?.phone_number || 'NA'} */}
                    {"416-000-0000"}
                  </p>
                </div>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontSize: 13,
                      marginBottom: 3,
                      color: "#888",
                    }}
                  >
                    E-mail
                  </p>
                  <p
                    style={{
                      fontFamily: "Archivo-Bold",
                      fontWeight: "bold",
                      fontSize: 15,
                    }}
                  >
                    {/* {patientDetails?.email} */}
                    {"johndoe@gmail.com"}
                  </p>
                </div>
              </div>

              <div
                style={{
                  marginTop: 20,
                  paddingLeft: 15,
                  paddingRight: 15,
                  flexDirection: "row",
                  display: "flex",
                  paddingBottom: 30,
                  borderBottomWidth: 2,
                  borderBottomColor: "#e0dddc",
                }}
              >
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontSize: 13,
                      marginBottom: 3,
                      color: "#888",
                    }}
                  >
                    Home Address
                  </p>
                  <p
                    style={{
                      fontFamily: "Archivo-Bold",
                      fontWeight: "bold",
                      fontSize: 15,
                    }}
                  >
                    {/* {patientDetails?.address_one || 'NA'} */}
                    {"99 John Doe Street, Toronto, ON M3M3M3"}
                  </p>
                </div>
              </div>

              <div
                style={{
                  paddingLeft: 15,
                  paddingRight: 15,
                  flexDirection: "row",
                  display: "flex",
                }}
              >
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontSize: 13,
                      marginBottom: 3,
                      color: "#888",
                    }}
                  >
                    Date of Sample Collection
                  </p>
                  <p
                    style={{
                      fontFamily: "Archivo-Bold",
                      fontWeight: "bold",
                      fontSize: 15,
                    }}
                  >
                    July 06, 2021 9:00 am
                  </p>
                </div>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontSize: 13,
                      marginBottom: 3,
                      color: "#888",
                    }}
                  >
                    Date of Result
                  </p>
                  <p
                    style={{
                      fontFamily: "Archivo-Bold",
                      fontWeight: "bold",
                      fontSize: 15,
                    }}
                  >
                    July 07, 2021 9:00 am
                  </p>
                </div>
              </div>

              <div
                style={{
                  flex: 1,
                  flexGrow: 1,
                  display: "flex",
                  width: "100%",
                  marginTop: 20,
                  paddingLeft: 15,
                  paddingRight: 15,
                  justifyContent: "center",
                }}
              >
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontSize: 13,
                      marginBottom: 3,
                      color: "#888",
                    }}
                  >
                    The result of your test was:
                  </p>
                  {true ? (
                    <div
                      style={{
                        flexDirection: "row",
                        flex: 1,
                        alignItems: "center",
                      }}
                    >
                      {/* <CheckIcon style={styles.checkIcon} fill={'#18851d'} /> */}
                      <p
                        style={{
                          fontSize: 24,
                          fontFamily: "Archivo-Bold",
                          fontWeight: "bold",
                        }}
                      >
                        Negative
                      </p>
                    </div>
                  ) : (
                    <div
                      style={{
                        flexDirection: "row",
                        flex: 1,
                        alignItems: "center",
                      }}
                    >
                      {/* <CrossIcon style={styles.checkIcon} fill={'#9c2611'} /> */}
                      <p
                        style={{
                          fontSize: 24,
                          fontFamily: "Archivo-Bold",
                          fontWeight: "bold",
                        }}
                      >
                        Positive
                      </p>
                    </div>
                  )}
                  <div
                    style={{
                      marginTop: 20,
                      marginBottom: 50,
                    }}
                  >
                    <p
                      style={{
                        color: "#000",
                        fontSize: 12,
                        marginBottom: 20,
                      }}
                    >
                      Your results do not detect SARS-Cov-2, the virus that
                      causes coronavirus disease (also called COVID-19), a
                      respiratory illness. A negative test means that the virus
                      was not present in the sample we collected. Your results
                      suggest you were negative at the time of testing. Although
                      the possibility is low, a false negative result should be
                      considered if you have had recent exposure to the virus
                      along with symptoms consistent with COVID-19. If you
                      require further information, please visit the City of
                      Toronto Public Health:
                      https://www.toronto.ca/home/covid-19
                    </p>
                    <p
                      style={{
                        color: "#000",
                        fontSize: 12,
                        marginBottom: 20,
                      }}
                    >
                      If you have further questions or concerns you can contact
                      Vector Health at info@vectorhealth.ca
                    </p>
                    <p
                      style={{
                        color: "#000",
                        fontSize: 12,
                        marginBottom: 20,
                      }}
                    >
                      This document contains personal identifiable information
                      that must be treated confidentially. Any unauthorized use
                      or disclosure is prohibited.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => setIsOpenModal(false)}>
              Okay
            </Button>
          </ModalFooter>
        </Modal>
        <div
          style={{
            height: 100,
            backgroundColor: "blue",
            marginBottom: 50,
            borderRadius: 15,
            marginTop: 10,
          }}
        ></div>
        <div>
          <FlatList
            list={resultList}
            renderItem={renderPerson}
          // keyExtractor={item => item.id.toString()}
          />
        </div>
      </Container>
    </>
  );
};

export default Results;
