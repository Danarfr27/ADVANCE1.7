# WORM AI - Cyber Intelligence Interface v2.0

## 🚀 Professional & Elegant OSINT Platform

WORM AI adalah interface intelijen siber yang canggih dengan kemampuan OSINT (Open Source Intelligence) terintegrasi. Versi ini telah dioptimalkan untuk akses langsung tanpa login dengan tampilan yang lebih profesional dan elegan.

## ✨ Fitur Utama

### 🔓 Direct Access Mode
- **Tanpa Login** - Akses langsung ke aplikasi
- **Session Tracking** - Pelacakan sesi untuk analitik
- **Device Identification** - Identifikasi perangkat unik

### 🎯 Advanced OSINT Tools

| Command | Deskripsi | Contoh |
|---------|-----------|--------|
| `/whois` | Domain registration info | `/whois example.com` |
| `/ipgeo` | IP geolocation | `/ipgeo 8.8.8.8` |
| `/email` | Email intelligence | `/email user@example.com` |
| `/username` | Username tracker | `/username johndoe` |
| `/phone` | Phone lookup | `/phone +1234567890` |
| `/social` | Social media analysis | `/social instagram johndoe` |
| `/dns` | DNS enumeration | `/dns example.com` |
| `/subdomain` | Subdomain discovery | `/subdomain example.com` |
| `/tech` | Technology detection | `/tech https://example.com` |
| `/breach` | Data breach check | `/breach user@example.com` |
| `/portscan` | Port scanner | `/portscan example.com` |

### 🎨 UI/UX Enhancements

- **Lightweight Custom Cursor** - Efek kursor yang ringan
- **Elegant Glitch Intro** - Animasi boot yang profesional
- **Cyberpunk Theme** - Tema gelap dengan aksen neon
- **Responsive Design** - Mendukung desktop dan mobile

## 📁 Struktur File

```
output/
├── index.html              # Entry point (no auth)
├── js/
│   ├── auth.js            # Auth module (lite version)
│   ├── auth-guard.js      # Auth guard (direct access)
│   ├── config.js          # OSINT configuration
│   └── osint-tools.js     # OSINT engine
├── components/
│   ├── App.tsx            # Main app (no auth check)
│   ├── CustomCursor.tsx   # Lightweight cursor
│   └── GlitchIntro.tsx    # Elegant intro
├── lib/
│   └── api.ts             # API client with OSINT
└── README.md              # Documentation
```

## 🛠️ Instalasi

1. **Copy file ke project:**
   ```bash
   cp -r output/* /path/to/your/project/
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build project:**
   ```bash
   npm run build
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

## ⚙️ Konfigurasi

### Environment Variables

```env
# Gemini API
GEMINI_API_KEYS=key1,key2,key3
GEMINI_MODEL=gemini-2.5-flash

# System Prompt
SYSTEM_PROMPT=your_custom_prompt
```

### OSINT Configuration

Edit `js/config.js` untuk menyesuaikan:
- OSINT tools
- Response templates
- Persona AI

## 🎮 Penggunaan

### Menggunakan OSINT Commands

1. **Ketik command di chat:**
   ```
   /whois google.com
   ```

2. **Lihat hasil:**
   ```
   ╔══════════════════════════════════════════════════════════════╗
   ║  WHOIS Lookup Results                                        ║
   ╠══════════════════════════════════════════════════════════════╣
   ║  Domain        : google.com                                  ║
   ║  Registrar     : MarkMonitor Inc.                            ║
   ║  Created       : 1997-09-15                                  ║
   ║  Expires       : 2028-09-14                                  ║
   ╚══════════════════════════════════════════════════════════════╝
   ```

### Regular Chat

Tanyakan apa saja seperti chat AI biasa:
```
Bagaimana cara melakukan reconnaissance?
```

## 🔧 Customization

### Menambah OSINT Tool Baru

1. **Tambah definisi di `config.js`:**
   ```javascript
   newtool: {
     name: 'New Tool',
     description: 'Description',
     icon: '🔧',
     command: '/newtool',
     params: ['param1'],
     example: '/newtool value'
   }
   ```

2. **Tambah template di `config.js`:**
   ```javascript
   newtool: (data) => ({
     type: 'newtool',
     title: 'New Tool Results',
     fields: [
       { label: 'Field', value: data.field }
     ]
   })
   ```

3. **Implementasi di `osint-tools.js`:**
   ```javascript
   async newTool(param) {
     // Implementation
   }
   ```

## 📊 Performance

- **Bundle Size:** Optimized
- **Load Time:** < 1s
- **Cursor FPS:** 60fps (lightweight)
- **Cache:** 5 minutes expiry

## 🔒 Security Notes

- OSINT tools hanya mengakses informasi publik
- Tidak ada penyimpanan data sensitif
- Session tracking anonim
- Compliance dengan etika keamanan siber

## 📝 Changelog

### v2.0.0
- ✅ Hapus login requirement
- ✅ Direct access mode
- ✅ Advanced OSINT tools (12 commands)
- ✅ Lightweight custom cursor
- ✅ Elegant glitch intro
- ✅ Professional code structure
- ✅ Session tracking

## 🤝 Contributing

1. Fork repository
2. Buat branch fitur
3. Commit perubahan
4. Push ke branch
5. Buat Pull Request

## 📄 License

MIT License - See LICENSE file

## 👨‍💻 Author

WORM AI Development Team

---

**Note:** Platform ini dirancang untuk tujuan keamanan siber yang etis dan legal. Pengguna bertanggung jawab atas penggunaan yang sesuai hukum.
