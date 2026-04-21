import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import Home from './pages/Home'
import InvoiceDetailPage from './pages/InvoiceDetailPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen overflow-x-hidden bg-[#F8F8FB] text-[#0C0E16] dark:bg-[#141625] dark:text-white">
        <Sidebar />
        <main className="min-h-screen pt-18 md:pl-20 md:pt-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/invoices/:id" element={<InvoiceDetailPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
