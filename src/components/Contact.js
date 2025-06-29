import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.png";
import "./Contact.css";
import TrackVisibility from "react-on-screen";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

export const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [buttonText, setButtonText] = useState('Submit');

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10 digits';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setButtonText('Sending...');
    try {
      await axios.post('https://formspree.io/f/xwpboywr', formData);
      toast.success('Thank You for Your Response We will Get Back to You Soon!', { position: 'bottom-right' });
      setFormData({ firstName: '', lastName: '', email: '', phoneNumber: '', message: '' });
    } catch (error) {
      toast.error('An error occurred. Please try again.', { position: 'bottom-right' });
    } finally {
      setButtonText('Submit');
    }
  };

  return (
    <section className="contact" id="connect">
      <Container>
        <Toaster position="bottom-right" reverseOrder={false} /> {/* ✅ Add this once */}
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
              <img src={contactImg} alt="Contact Us" />
            </TrackVisibility>
          </Col>
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Get In Touch</h2>
                  <form onSubmit={handleSubmit} noValidate>
                    <Row>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          name="firstName"
                          type="text"
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={handleChange}
                        />
                        {errors.firstName && <p className="text-danger">{errors.firstName}</p>}
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          name="lastName"
                          type="text"
                          placeholder="Last Name"
                          value={formData.lastName}
                          onChange={handleChange}
                        />
                        {errors.lastName && <p className="text-danger">{errors.lastName}</p>}
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          name="email"
                          type="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={handleChange}
                        />
                        {errors.email && <p className="text-danger">{errors.email}</p>}
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          name="phoneNumber"
                          type="tel"
                          placeholder="Phone Number"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                        />
                        {errors.phoneNumber && <p className="text-danger">{errors.phoneNumber}</p>}
                      </Col>
                      <Col size={12} className="px-1">
                        <textarea
                          name="message"
                          rows="6"
                          placeholder="Message"
                          value={formData.message}
                          onChange={handleChange}
                        ></textarea>
                        {errors.message && <p className="text-danger">{errors.message}</p>}

                        <button className="btn-dark" type="submit">
                          <span>{buttonText}</span>
                        </button>
                      </Col>
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
};
