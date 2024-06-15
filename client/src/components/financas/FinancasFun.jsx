import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import { PieChart, Pie, Cell } from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';
import './financas.css';

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042',
  '#A28CFE', '#FF6291', '#FF6361', '#FFA600',
  '#BC5090', '#58508D', '#003F5C', '#FFA07A',
  '#8A2BE2', '#5F9EA0', '#7FFF00', '#D2691E',
  '#FF7F50', '#6495ED', '#DC143C', '#00FFFF',
  '#00008B', '#008B8B', '#B8860B', '#A9A9A9'
];

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function FinancasFun() {
  const [salary, setSalary] = useState(0);
  const [fixedExpenses, setFixedExpenses] = useState([]);
  const [variableExpenses, setVariableExpenses] = useState([]);

  const addExpense = (name, value, type) => {
    if (salary <= 0) {
      alert('Por favor, insira o valor do salário antes de adicionar uma despesa.');
      return;
    }

    const expense = { name, value: Number(value) };
    if (type === 'fixed') {
      setFixedExpenses([...fixedExpenses, expense]);
    } else {
      setVariableExpenses([...variableExpenses, expense]);
    }
  };

  const deleteExpense = (index, type) => {
    if (type === 'fixed') {
      setFixedExpenses(fixedExpenses.filter((_, i) => i !== index));
    } else {
      setVariableExpenses(variableExpenses.filter((_, i) => i !== index));
    }
  };

  const totalExpenses = fixedExpenses.reduce((acc, curr) => acc + curr.value, 0) +
                        variableExpenses.reduce((acc, curr) => acc + curr.value, 0);

  const data = [
    { name: 'Salário Restante', value: salary - totalExpenses },
    ...fixedExpenses.map(expense => ({ name: capitalizeFirstLetter(expense.name), value: expense.value })),
    ...variableExpenses.map(expense => ({ name: capitalizeFirstLetter(expense.name), value: expense.value }))
  ];

  return (
    <div className="financas-page">
      <Container fluid className="p-4">
        <Row className="mb-4">
          <Col>
            <h1 className="text-center">Gerenciamento de Salário</h1>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={6} lg={4} className="mb-4">
            <div className="border-grid shadow-lg">
              <h4>Despesas Fixas</h4>
              <ListGroup className="rounded">
                {fixedExpenses.map((expense, index) => (
                  <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center rounded">
                    {capitalizeFirstLetter(expense.name)} - R${expense.value}
                    <Button variant="danger" size="sm" className="rounded" onClick={() => deleteExpense(index, 'fixed')}>
                      X
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </Col>
          <Col md={6} lg={4} className="mb-4">
            <div className="border-grid shadow-lg">
              <h4>Despesas Pontuais</h4>
              <ListGroup className="rounded">
                {variableExpenses.map((expense, index) => (
                  <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center rounded">
                    {capitalizeFirstLetter(expense.name)} - R${expense.value}
                    <Button variant="danger" size="sm" className="rounded" onClick={() => deleteExpense(index, 'variable')}>
                      X
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </Col>
          <Col md={12} lg={4} className="mb-4">
            <div className="border-grid shadow-lg">
              <h4>Distribuição de Despesas</h4>
              <div className="d-flex justify-content-center">
                <PieChart width={300} height={300}>
                  <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value">
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={12} lg={6} className='margin-none mb-4'>
            <Form>
              <Form.Group className="mb-3">
                <div className="border-grid shadow-lg">
                <Form.Label><h4>Adicionar Despesa Fixa</h4></Form.Label>
                <Form.Control type="text" placeholder="Nome da despesa" id="fixedExpenseName" className="rounded" />
                <Form.Control type="number" placeholder="Valor" id="fixedExpenseValue" className="mt-2 rounded" />
                <Button
                  className="mt-2 rounded"
                  onClick={() =>
                    addExpense(
                      document.getElementById('fixedExpenseName').value,
                      document.getElementById('fixedExpenseValue').value,
                      'fixed'
                    )
                  }
                >
                  
                  Adicionar 
                </Button>
                </div>
              </Form.Group>
              
              <Form.Group className="mb-3">
              <div className="border-grid shadow-lg">
                <Form.Label><h4>Adicionar Despesa Pontual</h4></Form.Label>
                <Form.Control type="text" placeholder="Nome da despesa" id="variableExpenseName" className="rounded" />
                <Form.Control type="number" placeholder="Valor" id="variableExpenseValue" className="mt-2 rounded" />
                <Button
                  className="mt-2 rounded"
                  onClick={() =>
                    addExpense(
                      document.getElementById('variableExpenseName').value,
                      document.getElementById('variableExpenseValue').value,
                      'variable'
                    )
                  }
                >
                  Adicionar
                </Button>
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
              <div className="height-sal border-grid shadow-lg margin-none">
                <Form.Label><h4>Seu Salário:</h4></Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Digite o valor do salário"
                  value={salary}
                  onChange={e => setSalary(Number(e.target.value))}
                  className="rounded"
                />
                </div>
              </Form.Group>
            
            </Form>
          </Col>
          <Col md={12} lg={6}>
            <div className="border-grid shadow-lg">
              <h4>% de cada despesa referente ao salário</h4>
              <ListGroup className="rounded">
                {data.slice(1).map((expense, index) => (
                  <ListGroup.Item key={index} className="rounded">
                    {expense.name}: {((expense.value / salary) * 100).toFixed(2)}%
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default FinancasFun;
