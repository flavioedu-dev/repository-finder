import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// Router
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'

// Pages
import Home from './pages/Home/Home'
import Repos from './pages/Repos/Repos'

// Components
import Footer from './components/Footer/Footer'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/repository-finder" />} />
      <Route path="/repository-finder" element={<Home />} />
      <Route path="/repository-finder/:user" element={<Home />} />
      <Route path="/repository-finder/repos/:user" element={<Repos />} />
    </Routes>
    <Footer />
    </BrowserRouter>
  </React.StrictMode>,
)
