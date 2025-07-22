import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const teamMembers = [
  {
    name: 'Utku Erdoğan',
    role: 'Frontend Developer',
    image: 'https://picsum.photos/id/1011/300/300',
    bio: 'React ve UI konusunda uzmanlaşmış, kullanıcı deneyimine odaklı geliştirici.',
    linkedin: 'https://www.linkedin.com/in/utku-erdo%C4%9Fan-b602051a8/',
    github: 'https://github.com/utkerdogan',
  },
  {
    name: 'Hilal Çakmak',
    role: 'Backend Developer',
    image: 'https://picsum.photos/id/1005/300/300',
    bio: 'Node.js, Express ve veri tabanı yönetimi konusunda tecrübeli backend geliştirici.',
    linkedin: 'https://www.linkedin.com/in/hilal-cakmak-aaabb9225/',
    github: 'https://github.com/hilalcakmak',
  },
  {
    name: 'Harun Can Akkurt',
    role: 'UX Designer',
    image: 'https://picsum.photos/id/1001/300/300',
    bio: 'Kullanıcı odaklı tasarımlarla arayüzleri daha etkili hale getiriyor.',
    linkedin: 'https://www.linkedin.com/in/harun-can-akkurt-b243702a2/',
    github: 'https://github.com/lushakaa',
  },
];

const TeamCard = () => {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Takımımız</h2>
      <Row className="g-4">
        {teamMembers.map((member, index) => (
          <Col md={4} key={index}>
            <Card className="h-100 shadow-sm border-0 team-card">
              <Card.Img variant="top" src={member.image} className="rounded-top" />
              <Card.Body>
                <Card.Title>{member.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{member.role}</Card.Subtitle>
                <Card.Text>{member.bio}</Card.Text>
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
