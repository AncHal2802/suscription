import React from 'react';
import "../components/footer.css"


const Footer = () => {
  return (
    
    <footer>
      <div className="footer">
        <div className="row">
          <a href="https://www.instagram.com/a.n.c.h.a.l_28?utm_source=qr&igsh=YjE5NDMyY2FhOQ=="><i className="fa-brands fa-instagram"></i></a>
          <a href="#"><i className="fa-brands fa-facebook"></i></a>
          <a href="#"><i className="fa-brands fa-twitter"></i></a>
        </div>

        <div className="row">
          <ul>
            <li><a href="#">Contact us</a></li>
            <li><a href="#">Our Services</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Career</a></li>
          </ul>
        </div>

        <div className="row">
          TheNewsPortal Copyright © 2024 The News Portal - All rights reserved 
        </div>
      </div>
    </footer>
  );
};

export default Footer;
