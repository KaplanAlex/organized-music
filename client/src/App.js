import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const App = () => {
  return (
    <Container fluid={true}>
      <Row>Lets start tagging!</Row>
      <Row>
        <Button
          onClick={() =>
            window.location.replace("http://localhost:5000/auth/login")
          }
        >
          Login with spotify
        </Button>
      </Row>
    </Container>
  );
};

export default App;
