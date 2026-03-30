# 🌟 Akshitha Kandagatla — Personal Portfolio Website

A fully responsive, modern personal portfolio website showcasing skills, projects, and experience.

---

## 🚀 How to Run Locally

### Option 1 — Open directly (simplest)
1. Double-click **`index.html`** — it will open in your default browser.

### Option 2 — Live Server (recommended for development)
If you have **VS Code**:
1. Install the **Live Server** extension
2. Right-click `index.html` → **"Open with Live Server"**

### Option 3 — Python HTTP Server
```bash
cd "c:\Acchu Portfolio"
python -m http.server 3000
# Then open: http://localhost:3000
```

### Option 4 — Node.js `serve`
```bash
cd "c:\Acchu Portfolio"
npx serve .
```

---

## 📁 Project Structure

```
Acchu Portfolio/
├── index.html          # Main HTML file (all sections)
├── css/
│   └── style.css       # Complete stylesheet
├── js/
│   └── main.js         # Animations, form logic, radar chart
├── assets/
│   ├── profile.jpg     # ← PUT YOUR PHOTO HERE (rename to profile.jpg)
│   └── profile.svg     # Auto-generated SVG fallback avatar
└── README.md
```

---

## 📸 Adding Your Profile Photo

1. Copy your profile photo into the **`assets/`** folder
2. Rename it to **`profile.jpg`** (or `.png`)
3. If using `.png`, update the `src` in `index.html`:
   ```html
   <img src="assets/profile.png" ... />
   ```

The SVG avatar (`assets/profile.svg`) is used as a fallback if `profile.jpg` is not found.

---

## ✏️ Customising Content

All personal content is in **`index.html`**. Search for these sections:

| Section | What to edit |
|---|---|
| **Hero** | Name, title, bio, social links |
| **About** | Summary, highlights, info grid |
| **Skills** | Skill bars, percentages, tags |
| **Projects** | Title, description, tech stack, GitHub links |
| **Experience** | Internship, education, certifications |
| **Contact** | Email, LinkedIn, GitHub URLs |

---

## 🎨 Design System

| Token | Value |
|---|---|
| Background | `#F3F3F3` |
| Text | `#111111` |
| Accent Yellow | `#FFCB05` |
| Accent Coral | `#FF5959` |
| Accent Teal | `#80CED7` |
| Font | Poppins + Space Grotesk |

---

## 📱 Responsive Breakpoints

- **Desktop** — ≥ 1024px (full two-column layout)
- **Tablet** — 768px–1023px (condensed layout)
- **Mobile** — ≤ 768px (single column, hamburger nav)

---

## 🔗 Features

- ✅ Sticky navigation with active section highlighting
- ✅ Smooth scroll animations (custom AOS)
- ✅ Animated skill bars (triggered on viewport entry)
- ✅ Radar/Spider chart for skill overview
- ✅ Typing effect for hero subtitle
- ✅ Parallax mouse-track on hero image
- ✅ Contact form with validation feedback
- ✅ Back-to-top button
- ✅ Mobile hamburger menu
- ✅ Photo fallback (SVG avatar)
- ✅ Zero external JS dependencies

---

Built with ❤️ — HTML · CSS · Vanilla JS
