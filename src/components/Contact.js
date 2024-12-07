import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.png";
import "./Contact.css";
import TrackVisibility from "react-on-screen";
import axios from "axios";

export const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [status, setStatus] = useState({})
  const [buttonText, setButtonText] = useState('Submit');

  const handleSubmit = async (e) => {
    console.log(e,'checking value of e')
    return
    e.preventDefault();
    try {
      const response= await axios.post('/api/submitFormData', formData);
      setStatus({ success: true, message: response.data });
    } catch (error) {
      setStatus({ success: false, message: 'An error occurred while submitting the form. Please try again.' });
    }
    finally {
      setButtonText('Submit');
    }
  };

  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
              <img src={contactImg} alt="Contact Us" />
            </TrackVisibility>
          </Col>
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <h2>Get In Touch</h2>
                  <form onSubmit={handleSubmit}>
                    <Row>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          name = 'firstName'
                          type="text"
                          value={formData.firstName || undefined}
                          placeholder="First Name"
                          onChange={handleChange}
                        />
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input
                        name = 'lastName'
                          type="text"
                          value={formData.lastName  || undefined}
                          placeholder="Last Name"
                        onChange={handleChange}
                        />
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          name='email'
                          type="email"
                          value={formData.email  || undefined}
                          placeholder="Email Address"
                          onChange={handleChange}
                        />
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          name='phoneNumber'
                          type="tel"
                          value={formData.phoneNumber  || undefined}
                          placeholder="Phone No."
                          onChange={handleChange}
                        />
                      </Col>
                      <Col size={12} className="px-1">
                        <textarea
                          name='message'
                          rows="6"
                          value={formData.message  || undefined}
                          placeholder="Message"
                          onChange={handleChange}
                        ></textarea>
                        <button className="btn-dark " type="submit">
                          <span>{buttonText}</span>
                        </button>
                      </Col>
                      {status.message && (
                        <Col>
                          <p
                            className={
                              status.success === false ? "danger" : "success"
                            }
                          >
                            {status.message}
                          </p>
                        </Col>
                      )}
                    </Row>
                  </form>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );

}
