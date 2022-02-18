import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './assets/styles/styles.css'
import { TodoApp } from './TodoApp';

const rootElement = document.getElementById('root');

render(
  <React.StrictMode>
    <BrowserRouter>
      <TodoApp />
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
