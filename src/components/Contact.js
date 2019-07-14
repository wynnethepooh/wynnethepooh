import React from 'react';
import '../App.css';

class Contact extends React.Component {
  render() {
    return (
        <div className="page">
            <h1>contact</h1>
            <form method="POST">
              <div className="contact-form">
                <label htmlFor="name">name</label>
                <input className="contact-field" type="text" name="name" />
              </div>
              <div className="contact-form">
                <label htmlFor="email">email</label>
                <input className="contact-field" type="email" name="email" />
              </div>
              <div className="contact-form">
                <label htmlFor="message">message</label>
                <textarea className="contact-field" name="message" rows="7"></textarea>
              </div>
              <div className="contact-form">
                <input className="submit-button" type="submit" />
              </div>
            </form>
        </div>
    );
  }
}
export default Contact