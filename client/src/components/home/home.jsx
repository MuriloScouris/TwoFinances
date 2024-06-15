import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./home.css"

function HomeFun() {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(feedback);
    setFeedback('');
  };

  return (
    <Container className="mt-5">
      <Row className="text-center mb-5">
        <Col>
          <h2 className="text-primary">Bem-vindo ao Nosso Site de Gestão Financeira</h2>
          <p className="text-muted">Melhore suas finanças pessoais com nossas dicas e recursos.</p>
        </Col>
      </Row>
      <Row className="mb-5 align-items-center">
        <Col md={6} className="d-flex justify-content-center">
          <img className='shadow-lg' src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3WHc3nCutd7wlk8okNw2xmx-tubte3-ATznGq9SMGJxQdna7nJVmC2XwX8g&s " alt="" />
        </Col>
        <Col md={6}>
          <h3 className="text-primary mt-3">Algumas dicas para melhorar sua gestão financeira:</h3>
          <ul className="list-unstyled text-muted">
            <br />
            <li><i className="bi bi-check-circle-fill text-success me-2"></i>Corte gastos desnecessários.</li>
            <br />
            <li><i className="bi bi-check-circle-fill text-success me-2"></i>Crie um fundo de emergência.</li>
            <br />
            <li><i className="bi bi-check-circle-fill text-success me-2"></i>Analise seus gastos mensais.</li>
            <br />
          </ul>
        </Col>
      </Row>
      <Row className="mb-5 align-items-center">
        <Col md={6} className="d-flex justify-content-center">
          <Image className='shadow-lg' src="data:image/jpeg;base64,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"  fluid rounded />
        </Col>
        <Col md={6}>
          <h3 className="text-primary mt-3">Confira esses recursos para aprender mais sobre finanças pessoais:</h3>
          <br />
          <p className="text-muted">
          <ul className="list-unstyled">
            <li><i className="bi bi-link-45deg text-info me-2"></i>Artigo: Como economizar dinheiro todos os meses.</li>
            <br />
            <li><i className="bi bi-link-45deg text-info me-2"></i>Podcast: Dicas de investimento para iniciantes.</li>
            <br />
            <li><i className="bi bi-link-45deg text-info me-2"></i>Curso: Finanças pessoais 101.</li>
          </ul>
          </p>
        </Col>
      </Row>     
    </Container>
    
  );
}

export default HomeFun;
