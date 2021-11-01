import React from "react";

import { Document, Page, pdfjs } from 'react-pdf';

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
  ModalFooter
} from "reactstrap";

import baseUrl from "../../assets/constants/baseUrl";

import pdfImage from "../../assets/img/icons/common/pdf.png";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Documents = () => {

  const [selectedDocument, setSelectedDocument] = React.useState();

  const isDocumentModalOpen = !!selectedDocument

  const [documents, setDocuments] = React.useState();
  const userId = localStorage.getItem("pk");
  const getDocumentList = async () => {
    try {
      await axios({
        method: "get",

        url: `${baseUrl.url}wallet_files/?userId=${userId}`,
      })
        .then(function (response) {
          setDocuments(response.data.results);
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
  };

  React.useEffect(() => {
    getDocumentList();
  }, []);

  const onUpload = async (e) => {
    let formData = new FormData();

    //Adding files to the formdata
    formData.append("file", e.target.files[0]);
    formData.append("name", "fileName");
    formData.append("userId", userId);

    await axios({
      // Endpoint to send files
      url: `${baseUrl.url}wallet_files/`,
      method: "POST",

      // Attaching the form data
      data: formData,
    })
      .then((res) => {
        console.log(res);
      }) // Handle the response from backend here
      .catch((err) => {
        console.log(err);
      });
    getDocumentList();
  };

  const onDeletePress = async (id) => {
    const response = await fetch(`${baseUrl.url}wallet_files/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: false,
      }),
    });

    const resData = await response.json();
    setDocuments(documents?.filter((doc) => doc.id != id));
  };

  const showDeleteAlert = (id) => {
    var answer = window.confirm("Save data?");
    if (answer) {
      onDeletePress(id);
    } else {
      console.log("no");
    }
  };

  const TableBody = () => {
    return documents?.map(function (item, i) {
      var splitByDot = item?.file?.split("/");
      var name = splitByDot?.slice(-1)[0];

      return (
        <tr key={item?.id}>
          <th scope="row">
            <img
              src={
                item?.file?.split(".").pop() === "pdf" ? pdfImage : item?.file
              }
              height={30}
              width={30}
            />
          </th>
          <td>{name}</td>
          <td>
            <Button onClick={() => setSelectedDocument(item)}>
              Open
            </Button>
          </td>
          <td>
            <Button
              onClick={() => showDeleteAlert(item?.id)}
              href="javascript:void(0)"
              className="delete"
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      {/* Page content */}
      <Container style={{maxWidth: "none"}}>
        <Modal isOpen={isDocumentModalOpen} toggle={() => setSelectedDocument('')}>
          <ModalHeader toggle={() => setSelectedDocument('')}>
            {selectedDocument?.file?.split("/")?.slice(-1)[0]}
          </ModalHeader>
          <ModalBody>
            {!!selectedDocument &&
              selectedDocument?.file?.split('.').pop() === 'pdf' ? (
            <object
              width="100%"
              height="400"
              data={selectedDocument?.file}
              type="application/pdf"
            ></object>
          ) : (
            <img
              resizeMode="contain"
              src={selectedDocument?.file}
              height="400"
              width="400"
            />
          )}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => setSelectedDocument('')}>Okay</Button>
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
        <Col className="mb-5 mb-xl-0" xl="8">
          <Card className="shadow">
            <CardHeader className="border-0">
              <Row className="align-items-center">
                <div className="col">
                  <h3 className="mb-0">Upload Documents</h3>
                </div>
                <div className="col text-right">
                  <Input
                    className="form-control-alternative"
                    onChange={onUpload}
                    type="file"
                    accept="image/*,application/pdf"
                  />
                </div>
              </Row>
            </CardHeader>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">Preview</th>
                  <th scope="col">File name</th>
                  <th scope="col">Open</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>{TableBody()}</tbody>
            </Table>
          </Card>
        </Col>
      </Container>
    </>
  );
};

export default Documents;
