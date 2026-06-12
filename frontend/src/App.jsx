import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ListePage from './pages/ListePage';
import FormPage from './pages/FormPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="navbar-brand"> Gestion des Médicaments</div>
          <div className="navbar-links">
            <Link to="/">Liste</Link>
            <Link to="/add">Ajouter</Link>
          </div>
        </nav>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ListePage />} />
            <Route path="/add" element={<FormPage />} />
            <Route path="/edit/:id" element={<FormPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;