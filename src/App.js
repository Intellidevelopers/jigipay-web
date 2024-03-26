import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './App.css';
import logo from './assets/logo.png';
import pana from './assets/pana.png';

function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 6000); // Simulate loading for 6 seconds

    return () => clearTimeout(timer); // Cleanup function to clear the timer
  }, [onFinish]);

  return (
    <div className="screen">
      <img src={logo} alt="Logo" />
      <CircularProgress color="primary" />
    </div>
  );
}

function OnboardingScreen({ onNext, index }) {
  const descriptions = [
    "Welcome to JIGIPAY! Let's get started by setting up your profile.",
    "Learn how to use JIGIPAY in just a few simple steps.",
    "Almost there! One more step to go before you can start using JIGIPAY."
  ];

  const handleNext = () => {
    onNext();
  };

  return (
    <><div className="screen1">
      <img className='pana' src={pana} alt="Logo" />
      <br />
      <br />
      <br />
      <h2>Budgeting Redefined!</h2>
      <p>{descriptions[index +1]}</p>
      <p className='bd-text'>Take control of your spending, set goals, and watch your financial dreams come to life.
        Our intuitive budgeting feature empowers you to manage your money with precision.</p>
    </div>
    <div className='btns'>
        <a href='next'>
          Skip
        </a>
        <button className='btn-next' onClick={handleNext}>Next</button>
      </div></>
  );
}

function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');

  const handleFinishSplash = () => {
    setCurrentScreen('onboarding');
  };

  const handleNextOnboarding = () => {
    if (currentScreen === 'onboarding3') {
      // Navigate to next screen after onboarding
      console.log("Navigating to next screen");
    } else {
      // Proceed to next onboarding screen
      const nextScreen = currentScreen === 'onboarding' ? 'onboarding2' : 'onboarding3';
      setCurrentScreen(nextScreen);
    }
  };

  return (
    <div className="App">
      {currentScreen === 'splash' && <SplashScreen onFinish={handleFinishSplash} />}
      {currentScreen.startsWith('onboarding') && (
        <OnboardingScreen
          onNext={handleNextOnboarding}
          index={parseInt(currentScreen.replace('onboarding', '')) - 1}
        />
      )}
    </div>
  );
}

export default App;
