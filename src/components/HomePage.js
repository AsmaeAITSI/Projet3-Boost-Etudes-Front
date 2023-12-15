import React from 'react';
import { Container } from 'react-bootstrap';

function HomePage() {
  return (
    <Container className="mt-4">
      
      <h1 className="text-center">Bienvenue sur Boost Etudes</h1>
      <p className="text-center">Découvrez nos services de cours particuliers et d'aide aux devoirs.</p>
      <img
        src="/pictures/homepage.jpg"  // Remplacez cela par le chemin réel de votre grande photo
        alt="Bienvenue sur Boost Etudes"
        style={{ width: '100%', height: 'auto' }}
      />
    </Container>
  );
}

export default HomePage;
