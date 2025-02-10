import React from 'react';
import './About.css'

const About = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>
        Welcome to our website! We are a passionate team committed to delivering high-quality solutions and services.
        Our goal is to make your experience seamless, efficient, and enjoyable. With a strong focus on innovation and customer satisfaction,
        we strive to meet the evolving needs of our users and clients.
      </p>
      
      <h2>Our Mission</h2>
      <p>
        Our mission is to provide cutting-edge technology that helps people and businesses achieve their full potential.
        We aim to create tools that simplify complex processes and bring value to our users.
      </p>

      <h2>Our Team</h2>
      <p>
        We are a diverse group of professionals with expertise in design, development, and business strategy. Our team members are dedicated to working collaboratively and always staying ahead of the curve in the ever-changing tech landscape.
      </p>
      
      <h2>Get in Touch</h2>
      <p>
        Feel free to contact us if you have any questions or want to learn more about our services.
        <br />
        Email: <a href="#">info@ourcompany.com</a>
      </p>
    </div>
  );
}

export default About;
