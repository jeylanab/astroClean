import React, { useState } from 'react';
import { pricingData } from '../data/pricingConfig';

const Home = () => {
  const [step, setStep] = useState(0); // 0 is the "Start" screen
  const [data, setData] = useState({
    property: null,
    beds: null,
    access: null,
    frequency: '2-monthly',
    contact: { name: '', email: '', phone: '', address: '' }
  });

  const next = () => setStep(s => s + 1);

  return (
    <div className="typeform-container">
      {/* Progress Bar at Top */}
      <div className="progress-bar"><div className="fill" style={{width: `${(step/8)*100}%`}}></div></div>

      <div className="question-wrap">
        {step === 0 && (
          <div className="hero-step">
            <h1>Answer a few quick questions about your property and we'll calculate a bespoke price for you instantly</h1>
            <button className="start-btn" onClick={next}>Start</button>
          </div>
        )}

        {step === 1 && (
          <div className="options-step">
            <label>1. What type of property do you have?</label>
            <div className="image-grid">
              {pricingData.properties.map(p => (
                <div key={p.id} className={`image-card ${data.property?.id === p.id ? 'selected' : ''}`} onClick={() => {setData({...data, property: p}); next();}}>
                  <img src={p.img} alt={p.title} />
                  <span>{p.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="list-step">
            <label>2. Number of bedrooms?*</label>
            {pricingData.bedrooms.map(b => (
              <button key={b.id} className="list-item" onClick={() => {setData({...data, beds: b}); next();}}>
                {b.title}
              </button>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="access-step">
            <label>3. Are we able to reach windows from ground level?*</label>
            <button className="list-item" onClick={next}>Yes</button>
            <button className="list-item" onClick={next}>No</button>
          </div>
        )}

        {step === 5 && (
          <div className="contact-step">
            <label>6. Your contact details*</label>
            <input type="text" placeholder="First name" required />
            <input type="tel" placeholder="Phone number" required />
            <input type="email" placeholder="Email" required />
            <button className="ok-btn" onClick={next}>OK</button>
          </div>
        )}

        {step === 7 && (
          <div className="success-step">
            <h2>Thank you for joining the Astroclean family!</h2>
            <p>We'll be in touch within 24 hours.</p>
            <button className="start-btn">Check out our website!</button>
          </div>
        )}
      </div>
      
      {/* Footer Nav seen in screenshots */}
      <div className="step-nav">
        <button onClick={() => setStep(s => s - 1)} disabled={step === 0}>▲</button>
        <button onClick={() => setStep(s => s + 1)} disabled={step === 7}>▼</button>
      </div>
    </div>
  );
};

export default Home;