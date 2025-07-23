import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { teamMembers } from '../data';

const TeamCard = () => {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Takımımız</h2>
      <Row className="g-4">
        {teamMembers.map((member, index) => (
          <Col md={4} key={index}>
            <Card className="h-100 shadow-sm border-0 team-card">
              <Card.Img variant="top" src={member.image} className="rounded-top h-[500px] w-full object-cover" />
              <Card.Body>
                <Card.Title>{member.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{member.title}</Card.Subtitle>
                <Card.Text>{member.description}</Card.Text>
              </Card.Body>
              <Card.Footer className="bg-white border-0 d-flex justify-content-center gap-3 pb-3">
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-primary">
                  <FaLinkedin size={22} />
                </a>
                <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-dark">
                  <FaGithub size={22} />
                </a>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TeamCard;
