import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './styles/index.scss';

import { App } from './App';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Router>
    <App />
  </Router>,
);
