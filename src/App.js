import "./App.css";
import { Button, Container, Form, Header } from "semantic-ui-react";
import { useState, useEffect } from "react";
import axios from "axios";

const URL =
  "https://sheet.best/api/sheets/e34ee050-727f-4e23-ae2f-61febdcfff69";

function App() {
  const [vocabulary, setVocabulary] = useState({
    eng: "",
    vi: "",
  });

  const [vocabularyList, setVocabularyList] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data from API
  const fetchData = async () => {
    const response = await axios.get(URL);

    setVocabularyList(response.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (vocabulary.eng === "" || vocabulary.vi === "") {
      alert("Vui lòng nhập từ Tiếng Anh và nghĩa tiếng Việt!");
    } else {
      console.log(vocabulary.eng);
      console.log(vocabulary.vi);

      axios.post(URL, vocabulary).then((res) => {
        console.log(res);
      });
      alert("Đã đăng ký thành công!");

      setVocabulary({ eng: "", vi: "" });
    }
  };

  return (
    <Container fluid className="container">
      <Header as="h2">Từ điển Tiếng Anh chuyên ngành</Header>

      <div class="ui search">
        <div class="ui icon input">
          <input
            class="prompt"
            type="text"
            placeholder="Nhập từ cần search..."
          ></input>
          <i class="search icon"></i>
        </div>
        <div class="results"></div>
      </div>

      {/* Display data from API */}
      <div className="books">
        {vocabularyList &&
          vocabularyList.map((vocabulary, index) => {
            return (
              <div className="vocabulary" key={index}>
                <h3>
                  {index + 1}: {vocabulary.eng} : {vocabulary.vi}
                </h3>
              </div>
            );
          })}
      </div>

      <Form className="form" onSubmit={handleSubmit}>
        <Form.Field>
          <label>Tiếng Anh</label>
          <input
            placeholder="Nhập từ tiếng Anh"
            type="text"
            name="name"
            value={vocabulary.eng}
            onChange={(e) => {
              setVocabulary((prevState) => {
                return { ...prevState, eng: e.target.value };
              });
            }}
          />
        </Form.Field>
        <Form.Field>
          <label>Tiếng Việt</label>
          <input
            placeholder="Nhập nghĩa tiếng Việt"
            type="text"
            value={vocabulary.vi}
            onChange={(e) => {
              setVocabulary((prevState) => {
                return { ...prevState, vi: e.target.value };
              });
            }}
          />
        </Form.Field>

        <Button color="blue" type="submit">
          Đăng ký
        </Button>
      </Form>
    </Container>
  );
}

export default App;
