import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Button, Col, Container, Form, ListGroup, Row } from 'react-bootstrap';
import { BsStar, BsStarFill, BsPencil, BsXLg } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {
  const [conversations, setConversations] = useState([]);
  const [conversation, setConversation] = useState(null);
  const [comment, setComment] = useState('');
  const [author, setAuthor] = useState('alice');
  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + '/conversations').then((res) => {
      if (res.data.ok) {
        setConversations(res.data.conversations);
      }
    })
  }, []);
  const deleteConversation = (id) => {
    axios.delete(process.env.REACT_APP_API_URL + '/deleteconversations/' + id).then((res) => {
      if (res.data.ok) {
        setConversations(conversations.filter((conv) => conv.id !== id));
      }
    })
  }
  const editConversation = (item) => {
    setConversation(item);
    setComment(item.text);
  }
  const changeConversation = (e) => {
    setComment(e.target.value);
  }
  const changeAuthor = (e) => {
    setAuthor(e.target.value);
  }
  return (
    <Container className="App p-3 ">
      <h3>Conversations {author}</h3>
      <div className="conversations">
        <ListGroup as="ol">
          { conversations.map((conversation, index) => 
            <ListGroup.Item
              as="li"
              key={index}
              className="
                d-flex 
                justify-content-between 
                align-items-center 
                conversation-item"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{conversation.text}</div>
              </div>
              <div>
                <Button 
                  variant="outline-primary" 
                  className="me-2"
                >
                  <BsStar />
                </Button>
                <Button 
                  variant="outline-primary" 
                  className="me-2"
                  onClick={() => editConversation(conversation)}
                >
                  <BsPencil />
                </Button>
                <Button 
                  variant="outline-danger" 
                  onClick={() => deleteConversation(conversation.id)}
                >
                  <BsXLg />
                </Button>
              </div>
            </ListGroup.Item>
          )}
        </ListGroup>
      </div>
      <Row className="align-items-end">
        <Col lg={2}>
          <Form.Select size="lg" onChange={changeAuthor}>
            <option value="alice">Alice</option>
            <option value="bob">Bob</option>
          </Form.Select>
        </Col>
        <Col>
         <Form.Control 
            size="lg" 
            type="text" 
            placeholder="Conversation"
            onChange={changeConversation}
            value={comment}
          />
        </Col>
        <Col lg={1}>
          <Button variant="primary" size="lg">Save</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
