import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import InvoiceDetailPage from './pages/InvoiceDetailPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/invoices/:id" element={<InvoiceDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}
