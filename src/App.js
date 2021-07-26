import "./App.css";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
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
  // const [vocabulary, setVocabulary] = useState({
  //   eng: "",
  //   vi: "",
  // });

  const [vocabularyList, setVocabularyList] = useState([]);

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

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (vocabulary.eng === "" || vocabulary.vi === "") {
  //     alert("Vui lòng nhập từ Tiếng Anh và nghĩa tiếng Việt!");
  //   } else {
  //     console.log(vocabulary.eng);
  //     console.log(vocabulary.vi);

  //     axios.post(URL, vocabulary).then((res) => {
  //       console.log(res);
  //     });
  //     alert("Đã đăng ký thành công!");

  //     setVocabulary({ eng: "", vi: "" });
  //   }
  // };

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
      <h1>Dev Dictionary</h1>
      <BootstrapTable
        keyField="id"
        data={vocabularyList}
        columns={columns}
        filter={filterFactory()}
        pagination={paginationFactory()}
      />
    </Container>

    // {/* <Form className="form" onSubmit={handleSubmit}>
    //   <Form.Field>
    //     <label>Tiếng Anh</label>
    //     <input
    //       placeholder="Nhập từ tiếng Anh"
    //       type="text"
    //       name="name"
    //       value={vocabulary.eng}
    //       onChange={(e) => {
    //         setVocabulary((prevState) => {
    //           return { ...prevState, eng: e.target.value };
    //         });
    //       }}
    //     />
    //   </Form.Field>
    //   <Form.Field>
    //     <label>Tiếng Việt</label>
    //     <input
    //       placeholder="Nhập nghĩa tiếng Việt"
    //       type="text"
    //       value={vocabulary.vi}
    //       onChange={(e) => {
    //         setVocabulary((prevState) => {
    //           return { ...prevState, vi: e.target.value };
    //         });
    //       }}
    //     />
    //   </Form.Field>

    //   <Button color="blue" type="submit">
    //     Đăng ký
    //   </Button>
    // </Form> */}
  );
}

export default App;
