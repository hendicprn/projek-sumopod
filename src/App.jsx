import { NavLink, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <aside className="sidebar">
        <h1 className="logo">Sumopod Clone</h1>
        <p className="subtitle">Marketing automation demo</p>

        <nav className="nav">
          <NavLink to="/" end className="nav-link">
            Dashboard
          </NavLink>
          <NavLink to="/workflows" className="nav-link">
            Workflow Builder
          </NavLink>
          <NavLink to="/whatsapp-crm" className="nav-link">
            WhatsApp CRM
          </NavLink>
          <NavLink to="/payments" className="nav-link">
            Payment Gateway
          </NavLink>
          <NavLink to="/umrah-marketplace" className="nav-link">
            Marketplace Umrah
          </NavLink>
        </nav>
      </aside>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/workflows" element={<WorkflowBuilder />} />
          <Route path="/whatsapp-crm" element={<WhatsAppCRM />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/umrah-marketplace" element={<UmrahMarketplace />} />
        </Routes>
      </main>
    </div>
  );
}

// ====== Halaman-halaman dasar (nanti kita isi lebih dalam) ======

function Dashboard() {
  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      <p className="page-description">
        Ini adalah contoh platform otomatisasi pemasaran mirip Sumopod.
        Gunakan menu di samping untuk melihat Workflow Builder, WhatsApp CRM,
        Payment Gateway, dan Marketplace Umrah.
      </p>

      <div className="card-grid">
        <div className="card">
          <h3>Workflow Builder</h3>
          <p>Bangun alur automation seperti n8n untuk kampanye marketing.</p>
        </div>
        <div className="card">
          <h3>WhatsApp CRM</h3>
          <p>Kelola kontak dan percakapan WhatsApp pelanggan kamu.</p>
        </div>
        <div className="card">
          <h3>Payment Gateway</h3>
          <p>Atur metode pembayaran multi negara seperti Hitpay.</p>
        </div>
        <div className="card">
          <h3>Marketplace Umrah</h3>
          <p>Tampilkan paket Umrah dari berbagai penyedia seperti Safaraya.</p>
        </div>
      </div>
    </div>
  );
}

function WorkflowBuilder() {
  return (
    <div>
      <h2 className="page-title">Workflow Builder</h2>
      <p className="page-description">
        Di sini nanti kita buat tampilan visual node-node automation
        (misalnya: Trigger &rarr; WhatsApp &rarr; Payment).
        Untuk sekarang, ini baru layout dasar dulu.
      </p>
    </div>
  );
}

function WhatsAppCRM() {
  return (
    <div>
      <h2 className="page-title">WhatsApp CRM</h2>
      <p className="page-description">
        Halaman ini akan berisi daftar kontak, status, dan chat WhatsApp
        (dummy data dulu untuk portofolio).
      </p>
    </div>
  );
}

function Payments() {
  return (
    <div>
      <h2 className="page-title">Payment Gateway</h2>
      <p className="page-description">
        Di sini nanti kita buat konfigurasi payment multi negara, mata uang,
        dan metode pembayaran.
      </p>
    </div>
  );
}

function UmrahMarketplace() {
  return (
    <div>
      <h2 className="page-title">Marketplace Umrah</h2>
      <p className="page-description">
        Halaman ini akan menampilkan daftar paket Umrah beserta harga,
        maskapai, dan vendor. Cocok untuk demo marketplace travel.
      </p>
    </div>
  );
}

export default App;
