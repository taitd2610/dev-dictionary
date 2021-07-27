import "./App.css";
import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Col,
  Container,
  Row,
  Alert,
} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import axios from "axios";

const URL =
  "https://sheet.best/api/sheets/e34ee050-727f-4e23-ae2f-61febdcfff69";

function App() {
  const [vocabulary, setVocabulary] = useState({
    eng: "",
    vi: "",
  });

  const [vocabularyList, setVocabularyList] = useState([]);
  const [show, setShow] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data from API
  const fetchData = async () => {
    const response = await axios.get(URL);
    setVocabularyList(response.data);
  };

  // Sort data
  vocabularyList.sort((v1, v2) => v1.eng.localeCompare(v2.eng));

  // Show modal add vocabulary
  const handleShowModal = () => setShow(true);

  // Hide modal add vocabulary
  const handleCloseModal = () => setShow(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (vocabulary.eng === "" || vocabulary.vi === "") {
      return <Alert></Alert>;
    } else {
      console.log(vocabulary.eng);
      console.log(vocabulary.vi);

      axios.post(URL, vocabulary).then((res) => {
        console.log(res);
      });

      setVocabulary({ eng: "", vi: "" });
    }
  };

  const columns = [
    {
      dataField: "eng",
      text: "Eng",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "vi",
      text: "Vi",
      sort: true,
      filter: textFilter(),
    },
  ];

  return (
    <Container>
      <Row className="mb-3">
        <Col>
          <h1>Dev Dictionary</h1>
        </Col>
        <Col>
          <Button variant="primary" onClick={handleShowModal}>
            Thêm từ mới
          </Button>
        </Col>
      </Row>

      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm từ mới</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nhập từ tiếng Anh</Form.Label>
              <Form.Control
                type="text"
                placeholder="Example..."
                value={vocabulary.eng}
                onChange={(e) => {
                  setVocabulary((prevState) => {
                    return { ...prevState, eng: e.target.value };
                  });
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nhập nghĩa tiếng Việt</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ví dụ..."
                value={vocabulary.vi}
                onChange={(e) => {
                  setVocabulary((prevState) => {
                    return { ...prevState, vi: e.target.value };
                  });
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <BootstrapTable
        keyField="id"
        data={vocabularyList}
        columns={columns}
        filter={filterFactory()}
        pagination={paginationFactory()}
      />
    </Container>
  );
}

export default App;
