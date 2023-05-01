import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// Router
import { Route, Routes, BrowserRouter } from 'react-router-dom'

// Pages
import Home from './pages/Home/Home'
import Repos from './pages/Repos/Repos'

// Components
import Footer from './components/Footer/Footer'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:user" element={<Home />} />
      <Route path="/repos/:user" element={<Repos />} />
    </Routes>
    <Footer />
    </BrowserRouter>
  </React.StrictMode>,
)
