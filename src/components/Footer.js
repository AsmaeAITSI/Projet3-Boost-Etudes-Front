import React from 'react';

function Footer() {
  return (
    <footer className="footer-container">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            {/* Ajoutez l'icône de téléphone Bootstrap */}
            <i className="bi bi-telephone"></i> Contactez-nous : +33 600000000
          </div>
          <div className="col-md-6">
            {/* Ajoutez l'icône d'e-mail Bootstrap */}
            <i className="bi bi-envelope"></i> Email : contact@boost-etudes.com
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

