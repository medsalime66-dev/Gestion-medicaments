import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ListePage from './pages/ListePage';
import FormPage from './pages/FormPage';
import StockFaiblePage from './pages/StockFaiblePage';
import VentesPage from './pages/VentesPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="navbar-brand"> Gestion des Médicaments</div>
          <div className="navbar-links">
            <Link to="/">Stock</Link>
            <Link to="/stock-faible">Stock faible</Link>
            <Link to="/ventes">Ventes</Link>
          </div>
        </nav>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ListePage />} />
            <Route path="/stock-faible" element={<StockFaiblePage />} />
            <Route path="/ventes" element={<VentesPage />} />
            <Route path="/add" element={<FormPage />} />
            <Route path="/edit/:id" element={<FormPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;