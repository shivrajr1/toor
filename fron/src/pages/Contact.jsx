
import React from 'react';
import './Contact.css'

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>If you have any questions or need assistance, feel free to reach out to us.</p>

      <div className="contact-info">
        <h2>Our Office</h2>
        <p>123 Main Street, Suite 100, City, Country</p>

        <h2>Email</h2>
        <p>Email: <a href="mailto:info@ourcompany.com">info@ourcompany.com</a></p>

        <h2>Phone</h2>
        <p>Phone: (123) 456-7890</p>

        <h2>Social Media</h2>
        <p>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> | 
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"> Twitter</a> | 
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"> Instagram</a>
        </p>
      </div>
    </div>
  );
};

export default Contact;
