import React from 'react';
import Landing from './features/Landing/Landing';
import { cn } from '@bem-react/classname';

import './App.css';

const cnApp = cn('App');

const App = () => {
  return (
    <div className={cnApp()}>
      <Landing/>
    </div>
  );
};

export default App;
