import { useState, useEffect } from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import "./App.css";
import avatar from "./assets/avatar.jpg";


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

const paymentProfiles = [
  {
    id: "sg",
    country: "Singapore",
    currency: "SGD",
    gateway: "Hitpay",
    fees: "3.2% + SGD 0.50",
    settlement: "T+2 (2 hari kerja)",
    description:
      "Cocok untuk market Singapura dengan dukungan kartu dan PayNow.",
    methods: [
      { type: "Card", label: "Visa / Mastercard", status: "Active" },
      { type: "Wallet", label: "PayNow", status: "Active" },
      { type: "Bank", label: "Local Bank Transfer", status: "Active" },
    ],
  },
  {
    id: "id",
    country: "Indonesia",
    currency: "IDR",
    gateway: "Midtrans / Xendit",
    fees: "2.9% + IDR 2.000",
    settlement: "T+1 (1 hari kerja)",
    description:
      "Fokus ke pembayaran lokal Indonesia dengan VA dan QRIS.",
    methods: [
      { type: "VA", label: "Virtual Account (BCA, BNI, Mandiri)", status: "Active" },
      { type: "QR", label: "QRIS", status: "Active" },
      { type: "Card", label: "Kartu Kredit Lokal", status: "Planned" },
    ],
  },
  {
    id: "sa",
    country: "Saudi Arabia",
    currency: "SAR",
    gateway: "HyperPay",
    fees: "3.5% + SAR 0.50",
    settlement: "T+3 (3 hari kerja)",
    description:
      "Cocok untuk jamaah yang membayar langsung menggunakan mata uang SAR.",
    methods: [
      { type: "Card", label: "Visa / Mastercard / Mada", status: "Active" },
      { type: "Wallet", label: "Local Wallet", status: "Planned" },
      { type: "Cash", label: "Cash on Arrival", status: "Manual" },
    ],
  },
];

const umrahPackages = [
  {
    id: 1,
    name: "Umrah Reguler Hemat",
    price: 28000000,
    airline: "Garuda Indonesia",
    duration: "9 Hari",
    city: "Jakarta",
    vendor: "Barokah Travel",
    hotel: "Hotel bintang 3 dekat Masjid Nabawi",
    departure: "15 Januari 2025",
    seatsLeft: 8,
    status: "Tersedia",
    highlights: [
      "Sudah termasuk makan 3x sehari",
      "City tour Madinah",
      "Pembimbing ustadz berpengalaman",
    ],
  },
  {
    id: 2,
    name: "Umrah Premium Plus Turki",
    price: 42000000,
    airline: "Turkish Airlines",
    duration: "12 Hari",
    city: "Surabaya",
    vendor: "Nurul Huda Tour",
    hotel: "Hotel bintang 4 di Makkah & Madinah",
    departure: "20 Februari 2025",
    seatsLeft: 5,
    status: "Promo",
    highlights: [
      "Transit & city tour Istanbul",
      "Hotel dekat Masjidil Haram",
      "Group kecil, max 25 jamaah",
    ],
  },
  {
    id: 3,
    name: "Umrah Eksekutif VIP",
    price: 55000000,
    airline: "Saudi Airlines",
    duration: "10 Hari",
    city: "Jakarta",
    vendor: "Makkah First Travel",
    hotel: "Hotel bintang 5 view Ka'bah",
    departure: "10 Maret 2025",
    seatsLeft: 2,
    status: "Tersedia",
    highlights: [
      "Business class (optional upgrade)",
      "Handling bagasi full oleh tim",
      "Kamar hanya 2 orang / kamar",
    ],
  },
  {
    id: 4,
    name: "Umrah Plus Dubai",
    price: 49000000,
    airline: "Emirates",
    duration: "11 Hari",
    city: "Medan",
    vendor: "Al Hijaz Wisata",
    hotel: "Hotel bintang 4 di Makkah & Madinah",
    departure: "5 April 2025",
    seatsLeft: 0,
    status: "Penuh",
    highlights: [
      "City tour Dubai & Burj Khalifa (photo stop)",
      "Kunjungan desert safari",
      "Cocok untuk keluarga",
    ],
  },
];


function App() {
  // ========== THEME MODE SYSTEM ==========
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  // =======================================
  return (
    <div className="app-container">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <h1 className="logo">Sumopod Clone</h1>
        <p className="subtitle">Marketing automation</p>

        <nav className="nav">
          <NavLink to="/" end className="nav-link">Dashboard</NavLink>
          <NavLink to="/workflows" className="nav-link">Workflow Builder</NavLink>
          <NavLink to="/whatsapp-crm" className="nav-link">WhatsApp CRM</NavLink>
          <NavLink to="/payments" className="nav-link">Payment Gateway</NavLink>
          <NavLink to="/umrah-marketplace" className="nav-link">Marketplace Umrah</NavLink>
        </nav>
      </aside>


      {/* ============================
          CONTENT WRAPPER (baru)
         ============================ */}
      <div className="content-wrapper">

        {/* HEADER */}
        <header className="app-header">
          <h2 className="header-title">Sumopod Clone</h2>

          <div className="header-right">
            {/* <button className="theme-toggle" onClick={toggleTheme}>
              {theme === "dark" ? "🌞" : "🌙"}
            </button> */}

            <div className="header-user">
              <img src={avatar} className="header-avatar" />
              <span className="header-username">Hendi</span>
            </div>
          </div>
        </header>


        {/* MAIN CONTENT */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/workflows" element={<WorkflowBuilder />} />
            <Route path="/whatsapp-crm" element={<WhatsAppCRM />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/umrah-marketplace" element={<UmrahMarketplace />} />
          </Routes>
        </main>


        {/* FOOTER */}
        <footer className="mega-footer">
          <div className="footer-section">
            <h4>Platform</h4>
            <a href="#">Dashboard</a>
            <a href="#">Automation</a>
            <a href="#">WhatsApp CRM</a>
            <a href="#">Payments</a>
            <a href="#">Marketplace</a>
          </div>

          <div className="footer-section">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Press</a>
            <a href="#">Contact</a>
          </div>

          <div className="footer-section">
            <h4>Support</h4>
            <a href="#">Help Center</a>
            <a href="#">Documentation</a>
            <a href="#">FAQ</a>
            <a href="#">API Status</a>
          </div>

          <div className="footer-bottom">
            © 2025 Sumopod Clone — All Rights Reserved
          </div>
        </footer>




      </div> {/* END WRAPPER */}
    </div>
  );
}


// ====== Halaman-halaman dasar (nanti kita isi lebih dalam) ======

function Dashboard() {
  // Dummy stats
  const stats = [
    { label: "Leads Baru Hari Ini", value: 24 },
    { label: "Pesan Masuk", value: 112 },
    { label: "Pembayaran Masuk", value: 7 },
    { label: "Paket Terjual", value: 3 },
  ];

  // Dummy mini chart (jumlah chat 7 hari)
  const chatActivity = [12, 18, 14, 22, 30, 25, 19];

  return (
    <div className="dashboard-wrapper fade-in">
      <h2 className="page-title">Dashboard</h2>
      <p className="page-description">
        Ringkasan aktivitas marketing automation & CRM kamu.
      </p>

      {/* ========== Statistik Cards ========== */}
      <div className="stats-grid">
        {stats.map((item, idx) => (
          <div key={idx} className="stat-card slide-up">
            <div className="stat-value">{item.value}</div>
            <div className="stat-label">{item.label}</div>
          </div>
        ))}
      </div>

      {/* ========== Mini Chart ========== */}
      <div className="chart-card slide-up">

        <div className="chart-header">
          <div>
            <h3 className="chart-title">Aktivitas Chat Masuk (7 Hari)</h3>
            <p className="chart-subtitle">Total chat minggu ini: 140</p>
          </div>
        </div>

        <div className="mini-chart small-chart">
          {chatActivity.map((v, i) => (
            <div
              key={i}
              className="mini-bar"
              style={{ height: `${v * 3}px` }}
            ></div>
          ))}
        </div>
      </div>


      {/* Card fitur lama */}
      <h3 className="section-title mt-30">Modul Utama</h3>

      <div className="dashboard-grid">
        {[
          {
            id: 1,
            title: "Workflow Builder",
            desc: "Bangun alur automation seperti n8n.",
            icon: "⚙️",
            link: "/workflows",
          },
          {
            id: 2,
            title: "WhatsApp CRM",
            desc: "Kelola kontak dan percakapan.",
            icon: "💬",
            link: "/whatsapp-crm",
          },
          {
            id: 3,
            title: "Payment Gateway",
            desc: "Atur pembayaran multi negara.",
            icon: "💳",
            link: "/payments",
          },
          {
            id: 4,
            title: "Marketplace Umrah",
            desc: "Jual paket Umrah profesional.",
            icon: "🕋",
            link: "/umrah-marketplace",
          },
        ].map((f) => (
          <a key={f.id} href={f.link} className="dashboard-card fade-in">
            <div className="dashboard-icon">{f.icon}</div>
            <div>
              <h3 className="dashboard-title">{f.title}</h3>
              <p className="dashboard-desc">{f.desc}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function WorkflowBuilder() {
  return (
    <div>
      <h2 className="page-title">Workflow Builder</h2>
      <p className="page-description">
        Workflow ini
        menggambarkan alur otomatisasi pemasaran: mulai dari lead baru,
        kirim WhatsApp, cek respon, sampai kirim link pembayaran.
      </p>

      {/* ============================================
          WORKFLOW LAYOUT (3 ROW)
      ============================================= */}
      <div className="workflow-layout-vertical">

        {/* =======================
            ROW 1 — NODE LIBRARY
        ======================== */}
        <section className="workflow-row">
          <h3 className="section-title">Node Library</h3>
          <p className="section-subtitle">
            node ini ke canvas untuk membangun
            automation.
          </p>

          <div className="node-list-horizontal">

            <div className="node-item node-trigger">
              <span className="node-label pill pill-trigger">Trigger</span>
              <p>Lead baru dari form, webhook, atau integrasi lain.</p>
            </div>

            <div className="node-item node-whatsapp">
              <span className="node-label pill pill-whatsapp">WhatsApp</span>
              <p>Kirim pesan broadcast, template, atau balasan otomatis.</p>
            </div>

            <div className="node-item node-condition">
              <span className="node-label pill pill-condition">Condition</span>
              <p>Cek apakah user membalas, klik link, atau memenuhi syarat.</p>
            </div>

            <div className="node-item node-delay">
              <span className="node-label pill pill-delay">Delay</span>
              <p>Tunda beberapa menit/jam/hari sebelum step berikutnya.</p>
            </div>

            <div className="node-item node-payment">
              <span className="node-label pill pill-payment">Payment</span>
              <p>
                Kirim link pembayaran atau cek status transaksi pelanggan.
              </p>
            </div>

          </div>
        </section>

        {/* =======================
            ROW 2 — CANVAS WORKFLOW
        ======================== */}
        <section className="workflow-row">
          <h3 className="section-title">Canvas Workflow</h3>
          <p className="section-subtitle">
            Ilustrasi alur otomatisasi pemasaran. Di versi production,
            user bisa mengatur posisi node, menghubungkan garis, dan
            menjalankan workflow.
          </p>

          <div className="workflow-canvas-horizontal">
            {workflowSteps.map((step, index) => (
              <div key={step.id} className="workflow-step-horizontal">

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

              </div>
            ))}
          </div>
        </section>

        {/* =======================
            ROW 3 — DETAIL WORKFLOW
        ======================== */}
        <section className="workflow-row">
          <h3 className="section-title">Detail Workflow</h3>
          <p className="section-subtitle">
            Ringkasan konfigurasi workflow.
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
            <h4>Tujuan</h4>
            <p className="detail-text">
              Menunjukkan penjelasan secara detil.
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

  const selectedContact = whatsappContacts.find(c => c.id === selectedId);
  const messages = chatsByContact[selectedId] || [];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMessage = {
      from: "agent",
      text: messageInput.trim(),
      time: "Sekarang",
    };

    setChatsByContact(prev => ({
      ...prev,
      [selectedId]: [...prev[selectedId], newMessage]
    }));

    setMessageInput("");
  };

  return (
    <div>
      <h2 className="page-title">WhatsApp CRM</h2>
      <p className="page-description">
        Tampilan WhatsApp CRM untuk mengelola kontak dan percakapan WhatsApp.
      </p>

      <div className="wacr-layout">
        
        {/* ======================== SIDEBAR KONTAK ======================== */}
        <aside className="wacr-sidebar">

          <div className="wacr-sidebar-header">
            <h3 className="section-title">Kontak</h3>
            <p className="section-subtitle">
              Daftar lead dan customer yang terhubung via WhatsApp.
            </p>
          </div>

          <input
            type="text"
            placeholder="🔍 Cari nama atau nomor..."
            className="wacr-search"
          />

          <div className="wacr-contact-list">
            {whatsappContacts.map(contact => (
              <button
                key={contact.id}
                onClick={() => setSelectedId(contact.id)}
                className={
                  "wacr-contact-item" +
                  (selectedId === contact.id ? " active" : "")
                }
              >
                <div>
                  <div className="wacr-contact-name">{contact.name}</div>
                  <div className="wacr-contact-last">{contact.lastMessage}</div>
                </div>

                <div className="wacr-contact-meta">
                  <span className={"wacr-tag tag-" + contact.tag.replace(" ", "").toLowerCase()}>
                    {contact.tag}
                  </span>
                  <span className="wacr-status">{contact.status}</span>
                </div>
              </button>
            ))}
          </div>

        </aside>

        {/* ======================== CHAT AREA ======================== */}
        <section className="wacr-chat">

          <header className="wacr-chat-header">
            <div>
              <div className="wacr-chat-name">{selectedContact.name}</div>
              <div className="wacr-chat-info">
                {selectedContact.phone} • {selectedContact.tag}
              </div>
            </div>
            <div className="chat-status-pill">Online</div>
          </header>

          <div className="wacr-chat-body">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={
                  "wacr-chat-row " +
                  (msg.from === "agent" ? "agent" : "customer")
                }
              >
                <div className="wacr-bubble">
                  <div className="wacr-text">{msg.text}</div>
                  <div className="wacr-time">{msg.time}</div>
                </div>
              </div>
            ))}
          </div>

          <form className="wacr-input-area" onSubmit={handleSendMessage}>
            <input
              type="text"
              className="wacr-input"
              placeholder="Ketik pesan..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <button className="wacr-send">Kirim</button>
          </form>

        </section>
      </div>
    </div>
  );
}


function Payments() {
  const [selectedProfileId, setSelectedProfileId] = useState("sg");

  const selectedProfile =
    paymentProfiles.find((p) => p.id === selectedProfileId) ||
    paymentProfiles[0];

  return (
    <div>
      <h2 className="page-title">Payment Gateway</h2>
      <p className="page-description">
        Halaman ini menunjukkan bagaimana platform mengatur negara, mata
        uang, dan metode pembayaran untuk bisnis Umrah.
      </p>

      <div className="payments-layout">
        {/* Kolom kiri: pilih negara / profile */}
        <section className="payments-column">
          <h3 className="section-title">Profil Negara</h3>
          <p className="section-subtitle">
            Pilih negara untuk melihat konfigurasi payment gateway dan
            metode pembayaran yang aktif.
          </p>

          <div className="payment-profile-list">
            {paymentProfiles.map((profile) => (
              <button
                key={profile.id}
                className={
                  "payment-profile-item" +
                  (profile.id === selectedProfileId
                    ? " payment-profile-item-active"
                    : "")
                }
                onClick={() => setSelectedProfileId(profile.id)}
              >
                <div className="payment-profile-main">
                  <div className="payment-profile-country">
                    {profile.country}
                  </div>
                  <div className="payment-profile-gateway">
                    Gateway: {profile.gateway}
                  </div>
                </div>
                <div className="payment-profile-meta">
                  <span className="payment-pill">
                    Currency: {profile.currency}
                  </span>
                  <span className="payment-fees">{profile.fees}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Kolom tengah: detail konfigurasi untuk negara terpilih */}
        <section className="payments-column">
          <h3 className="section-title">
            Konfigurasi {selectedProfile.country}
          </h3>
          <p className="section-subtitle">{selectedProfile.description}</p>

          <div className="payment-detail-card">
            <div className="payment-detail-row">
              <span className="detail-label">Gateway Utama</span>
              <span className="detail-value">{selectedProfile.gateway}</span>
            </div>
            <div className="payment-detail-row">
              <span className="detail-label">Mata Uang</span>
              <span className="detail-value">
                {selectedProfile.currency}
              </span>
            </div>
            <div className="payment-detail-row">
              <span className="detail-label">Biaya</span>
              <span className="detail-value">{selectedProfile.fees}</span>
            </div>
            <div className="payment-detail-row">
              <span className="detail-label">Settlement</span>
              <span className="detail-value">
                {selectedProfile.settlement}
              </span>
            </div>
          </div>

          <div className="payment-info-note">
            Catatan: di sistem production, halaman ini biasanya terhubung ke
            API gateway (Hitpay, Midtrans, HyperPay, dll) untuk mengaktifkan
            atau menonaktifkan metode pembayaran secara real-time.
          </div>
        </section>

        {/* Kolom kanan: metode pembayaran */}
        <section className="payments-column">
          <h3 className="section-title">Metode Pembayaran</h3>
          <p className="section-subtitle">
            Daftar metode pembayaran yang dikonfigurasi untuk negara ini.
          </p>

          <div className="payment-method-list">
            {selectedProfile.methods.map((method, index) => (
              <div key={index} className="payment-method-item">
                <div className="payment-method-main">
                  <span className="payment-method-type">
                    {method.type}
                  </span>
                  <span className="payment-method-label">
                    {method.label}
                  </span>
                </div>
                <span
                  className={
                    "payment-method-status payment-method-status-" +
                    method.status.toLowerCase()
                  }
                >
                  {method.status}
                </span>
              </div>
            ))}
          </div>

          <div className="payment-info-note">
            Status:
            <br />
            <strong>Active</strong> = sudah bisa digunakan oleh pelanggan.
            <br />
            <strong>Planned</strong> = dalam tahap pengembangan.
            <br />
            <strong>Manual</strong> = proses masih dilakukan secara manual
            (cash on arrival).
          </div>
        </section>
      </div>
    </div>
  );
}


function UmrahMarketplace() {
  const [cityFilter, setCityFilter] = useState("All");
  const [selectedId, setSelectedId] = useState(umrahPackages[0].id);

  const filteredPackages = umrahPackages.filter(
    (pkg) => cityFilter === "All" || pkg.city === cityFilter
  );

  const selectedPackage =
    filteredPackages.find((pkg) => pkg.id === selectedId) ||
    filteredPackages[0] ||
    umrahPackages[0];

  return (
    <div>
      <h2 className="page-title">Marketplace Umrah</h2>
      <p className="page-description">
        Pilih paket di sebelah kiri dan
        untuk melihat detail lengkap di panel kanan.
      </p>

      <div className="umrah-layout">
        {/* Kiri: filter + daftar paket */}
        <section className="umrah-list">
          <div className="umrah-filter-bar">
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="umrah-select"
            >
              <option value="All">Semua Kota</option>
              <option value="Jakarta">Jakarta</option>
              <option value="Surabaya">Surabaya</option>
              <option value="Medan">Medan</option>
            </select>
          </div>

          <div className="umrah-grid">
            {filteredPackages.map((pkg) => (
              <button
                key={pkg.id}
                className={
                  "umrah-card" +
                  (pkg.id === selectedId ? " umrah-card-active" : "")
                }
                onClick={() => setSelectedId(pkg.id)}
              >
                <div className="umrah-card-body">
                  <h3 className="umrah-name">{pkg.name}</h3>
                  <p className="umrah-price">
                    Rp {pkg.price.toLocaleString("id-ID")}
                  </p>
                  <p className="umrah-info">
                    ✈️ {pkg.airline} · ⏱ {pkg.duration}
                  </p>
                  <p className="umrah-city">📍 {pkg.city}</p>
                  <span
                    className={
                      "umrah-status " +
                      (pkg.status === "Tersedia"
                        ? "umrah-status-tersedia"
                        : pkg.status === "Promo"
                        ? "umrah-status-promo"
                        : "umrah-status-penuh")
                    }
                  >
                    {pkg.status}
                  </span>
                </div>
              </button>
            ))}

            {filteredPackages.length === 0 && (
              <p className="umrah-empty">
                Tidak ada paket untuk filter ini. Coba pilih kota lain.
              </p>
            )}
          </div>
        </section>

        {/* Kanan: detail paket yang dipilih */}
        <section className="umrah-detail">
          <h3 className="section-title">Detail Paket</h3>
          <p className="section-subtitle">
            Ringkasan detail paket yang sedang dipilih.
          </p>

          <div className="umrah-detail-card">
            <h2 className="umrah-detail-name">{selectedPackage.name}</h2>
            <p className="umrah-detail-price">
              Rp {selectedPackage.price.toLocaleString("id-ID")}
            </p>

            <div className="umrah-detail-row">
              <span className="detail-label">Vendor</span>
              <span className="detail-value">{selectedPackage.vendor}</span>
            </div>
            <div className="umrah-detail-row">
              <span className="detail-label">Maskapai</span>
              <span className="detail-value">{selectedPackage.airline}</span>
            </div>
            <div className="umrah-detail-row">
              <span className="detail-label">Durasi</span>
              <span className="detail-value">{selectedPackage.duration}</span>
            </div>
            <div className="umrah-detail-row">
              <span className="detail-label">Kota Berangkat</span>
              <span className="detail-value">{selectedPackage.city}</span>
            </div>
            <div className="umrah-detail-row">
              <span className="detail-label">Hotel</span>
              <span className="detail-value">{selectedPackage.hotel}</span>
            </div>
            <div className="umrah-detail-row">
              <span className="detail-label">Tanggal Berangkat</span>
              <span className="detail-value">
                {selectedPackage.departure}
              </span>
            </div>
            <div className="umrah-detail-row">
              <span className="detail-label">Sisa Kursi</span>
              <span className="detail-value">
                {selectedPackage.seatsLeft > 0
                  ? `${selectedPackage.seatsLeft} kursi`
                  : "Penuh"}
              </span>
            </div>

            <div className="umrah-detail-highlights">
              <h4>Poin Unggulan Paket</h4>
              <ul>
                {selectedPackage.highlights.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}



export default App;