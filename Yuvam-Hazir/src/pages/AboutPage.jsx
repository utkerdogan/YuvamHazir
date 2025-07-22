import React from 'react';
import { Container } from 'react-bootstrap';
import TeamCard from '../components/TeamCard';
import '../App.css';

const AboutPage = () => {
  return (
    <div className="about-page py-5 bg-light">
      <Container className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary mb-3">Hakkımızda</h1>
        <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
          Biz üç tutkulu hayvanseveriz. Teknolojiyi, tasarımı ve kullanıcı deneyimini birleştirerek hayvan dostlarımız için daha güzel bir dünya inşa etmeye çalışıyoruz. Evcilleştirme değil, dostluk kurma derdindeyiz. Sevgi, sabır ve biraz da kodla her şey mümkün!
        </p>
      </Container>

      <TeamCard />
    </div>
  );
};

export default AboutPage;
