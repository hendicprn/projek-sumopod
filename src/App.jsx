import { useState } from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import "./App.css";


const workflowSteps = [
  {
    id: 1,
    label: "Trigger",
    title: "Lead Baru Masuk",
    description: "Memulai workflow saat ada lead baru dari form landing page.",
  },
  {
    id: 2,
    label: "WhatsApp",
    title: "Kirim Pesan Welcome",
    description:
      "Mengirim pesan WhatsApp otomatis berisi ucapan selamat datang dan informasi awal.",
  },
  {
    id: 3,
    label: "Delay",
    title: "Tunggu 1 Hari",
    description: "Memberi jeda 1 hari sebelum follow up berikutnya.",
  },
  {
    id: 4,
    label: "Condition",
    title: "Cek Respon Pelanggan",
    description: "Jika pelanggan membalas, arahkan ke tim sales.",
  },
  {
    id: 5,
    label: "Payment",
    title: "Kirim Link Pembayaran",
    description:
      "Mengirim link pembayaran ke pelanggan yang sudah tertarik paketnya.",
  },
];

const whatsappContacts = [
  {
    id: 1,
    name: "Ahmad Fauzi",
    tag: "Lead Baru",
    phone: "+62 812-3456-7890",
    status: "Belum dihubungi",
    lastMessage: "Assalamualaikum, saya mau tanya paket Umrah.",
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    tag: "Prospek Hangat",
    phone: "+62 813-1111-2222",
    status: "Sudah di-follow up",
    lastMessage: "InsyaAllah berangkat bulan depan, mohon info detail.",
  },
  {
    id: 3,
    name: "Budi Santoso",
    tag: "Customer",
    phone: "+62 815-9999-0000",
    status: "Sudah DP",
    lastMessage: "Sudah saya transfer DP, mohon konfirmasi ya.",
  },
];

const initialChatsByContact = {
  1: [
    {
      from: "customer",
      text: "Assalamualaikum, saya mau tanya paket Umrah untuk 2025.",
      time: "09:10",
    },
    {
      from: "agent",
      text: "Waalaikumsalam Pak Ahmad, siap. Bapak berangkat dari kota mana?",
      time: "09:12",
    },
  ],
  2: [
    {
      from: "customer",
      text: "Halo kak, saya tertarik paket Umrah Plus Turki.",
      time: "14:02",
    },
    {
      from: "agent",
      text: "Baik Bu Siti, kami punya beberapa pilihan paket yang cocok.",
      time: "14:05",
    },
  ],
  3: [
    {
      from: "customer",
      text: "DP sudah saya transfer barusan.",
      time: "19:30",
    },
    {
      from: "agent",
      text: "Alhamdulillah, kami akan kirimkan invoice dan itinerary lengkap.",
      time: "19:35",
    },
  ],
};


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
        Contoh tampilan workflow automation seperti n8n. Workflow ini
        menggambarkan alur otomatisasi pemasaran: mulai dari lead baru,
        kirim WhatsApp, cek respon, sampai kirim link pembayaran.
      </p>

      <div className="workflow-layout">
        {/* Panel kiri: library node */}
        <section className="workflow-column">
          <h3 className="section-title">Node Library</h3>
          <p className="section-subtitle">
            Drag & drop (secara konsep) node ini ke canvas untuk membangun
            automation. Di sini kita tampilkan sebagai daftar contoh.
          </p>

          <div className="node-list">
            <div className="node-item node-trigger">
              <span className="node-label">Trigger</span>
              <p>Lead baru dari form, webhook, atau integrasi lain.</p>
            </div>
            <div className="node-item node-whatsapp">
              <span className="node-label">WhatsApp</span>
              <p>Kirim pesan broadcast, template, atau balasan otomatis.</p>
            </div>
            <div className="node-item node-condition">
              <span className="node-label">Condition</span>
              <p>Cek apakah user membalas, klik link, atau memenuhi syarat.</p>
            </div>
            <div className="node-item node-delay">
              <span className="node-label">Delay</span>
              <p>Tunda beberapa menit/jam/hari sebelum step berikutnya.</p>
            </div>
            <div className="node-item node-payment">
              <span className="node-label">Payment</span>
              <p>Kirim link pembayaran atau cek status transaksi.</p>
            </div>
          </div>
        </section>

        {/* Canvas tengah: visual workflow */}
        <section className="workflow-column">
          <h3 className="section-title">Canvas Workflow</h3>
          <p className="section-subtitle">
            Ilustrasi alur otomatisasi pemasaran. Di versi production,
            user bisa mengatur posisi node, menghubungkan garis, dan
            menjalankan workflow. Di sini kita tampilkan contoh statis
            untuk portofolio.
          </p>

          <div className="workflow-canvas">
            {workflowSteps.map((step, index) => (
              <div key={step.id} className="workflow-step">
                <div className="workflow-step-header">
                  <span className={`node-label pill pill-${step.label.toLowerCase()}`}>
                    {step.label}
                  </span>
                  <span className="step-number">Step {index + 1}</span>
                </div>
                <h4 className="workflow-step-title">{step.title}</h4>
                <p className="workflow-step-description">
                  {step.description}
                </p>
                {index < workflowSteps.length - 1 && (
                  <div className="workflow-arrow">↓</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Panel kanan: detail workflow */}
        <section className="workflow-column">
          <h3 className="section-title">Detail Workflow</h3>
          <p className="section-subtitle">
            Ringkasan konfigurasi workflow untuk ditunjukkan ke HR / client
            bahwa kamu paham konsep marketing automation.
          </p>

          <div className="detail-card">
            <h4>Contoh Use Case</h4>
            <ul className="detail-list">
              <li>Lead mengisi form landing page promosi Umrah.</li>
              <li>Otomatis masuk ke sistem sebagai lead baru.</li>
              <li>Sistem mengirim pesan WhatsApp welcome + katalog paket.</li>
              <li>
                Jika user tertarik, sistem follow up dan mengirim link
                pembayaran.
              </li>
            </ul>
          </div>

          <div className="detail-card">
            <h4>Tujuan Fitur</h4>
            <p className="detail-text">
              Menunjukkan kemampuan kamu sebagai web developer untuk
              mendesain UI workflow builder yang mirip n8n / Make, dengan
              konsep node dan step yang jelas.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

function WhatsAppCRM() {
  const [selectedId, setSelectedId] = useState(whatsappContacts[0].id);
  const [chatsByContact, setChatsByContact] = useState(initialChatsByContact);
  const [messageInput, setMessageInput] = useState("");

  const selectedContact = whatsappContacts.find(
    (c) => c.id === selectedId
  );

  const messages = chatsByContact[selectedId] || [];

  const handleSendMessage = (e) => {
    e.preventDefault();
    const trimmed = messageInput.trim();
    if (!trimmed) return;

    const newMessage = {
      from: "agent",
      text: trimmed,
      time: "Sekarang",
    };

    setChatsByContact((prev) => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] || []), newMessage],
    }));

    setMessageInput("");
  };

  return (
    <div>
      <h2 className="page-title">WhatsApp CRM</h2>
      <p className="page-description">
        Contoh tampilan CRM untuk mengelola kontak dan percakapan WhatsApp.
        Ini hanya data dummy, tapi cukup untuk mendemokan fitur ke HR / client.
      </p>

      <div className="whatsapp-layout">
        {/* Sidebar kontak */}
        <section className="whatsapp-sidebar">
          <div className="whatsapp-sidebar-header">
            <h3 className="section-title">Kontak</h3>
            <p className="section-subtitle">
              Daftar lead dan customer yang terhubung via WhatsApp.
            </p>
          </div>

          <input
            type="text"
            placeholder="Cari nama atau nomor..."
            className="whatsapp-search"
          />

          <div className="whatsapp-contact-list">
            {whatsappContacts.map((contact) => (
              <button
                key={contact.id}
                className={
                  "contact-item" +
                  (contact.id === selectedId ? " contact-item-active" : "")
                }
                onClick={() => setSelectedId(contact.id)}
              >
                <div className="contact-main">
                  <div className="contact-name">{contact.name}</div>
                  <div className="contact-last-message">
                    {contact.lastMessage}
                  </div>
                </div>
                <div className="contact-meta">
                  <span className="contact-tag">{contact.tag}</span>
                  <span className="contact-status">{contact.status}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Area chat */}
        <section className="whatsapp-chat">
          <div className="whatsapp-chat-header">
            <div>
              <div className="chat-contact-name">
                {selectedContact?.name}
              </div>
              <div className="chat-contact-info">
                {selectedContact?.phone} · {selectedContact?.tag}
              </div>
            </div>
            <div className="chat-status-pill">Online</div>
          </div>

          <div className="whatsapp-chat-body">
            {messages.length === 0 && (
              <div className="chat-empty">
                Belum ada percakapan. Mulai kirim pesan ke pelanggan ini.
              </div>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  "chat-bubble-row " +
                  (msg.from === "agent"
                    ? "chat-bubble-row-agent"
                    : "chat-bubble-row-customer")
                }
              >
                <div
                  className={
                    "chat-bubble " +
                    (msg.from === "agent"
                      ? "chat-bubble-agent"
                      : "chat-bubble-customer")
                  }
                >
                  <div className="chat-text">{msg.text}</div>
                  <div className="chat-time">{msg.time}</div>
                </div>
              </div>
            ))}
          </div>

          <form
            className="whatsapp-chat-input-area"
            onSubmit={handleSendMessage}
          >
            <input
              type="text"
              className="whatsapp-chat-input"
              placeholder="Ketik pesan untuk pelanggan..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <button type="submit" className="whatsapp-send-button">
              Kirim
            </button>
          </form>
        </section>
      </div>
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
