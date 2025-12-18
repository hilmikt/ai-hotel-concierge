import React, { useState } from 'react';
import LandingScreen from './components/LandingScreen';
import ConciergeView from './components/ConciergeView';

function App() {
  const [hasAccess, setHasAccess] = useState(false);

  // Simple view transition
  if (!hasAccess) {
    return <LandingScreen onEnter={() => setHasAccess(true)} />;
  }

  return <ConciergeView />;
}

export default App;
