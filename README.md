# 🚀 Xaitboyev Javlonbek — Portfolio Website

A premium, futuristic personal portfolio website built with React.js, Tailwind CSS, and Framer Motion.

## ✨ Features

- 🎨 Dark modern UI with neon blue/purple gradients
- ⚡ Smooth animations with Framer Motion & GSAP
- 🌊 Particle background with canvas WebGL
- 🖱️ Custom cursor with hover effects
- 📊 Scroll progress bar
- ⌨️ Animated typing effect
- 💎 Glassmorphism design
- 📱 Fully responsive (mobile, tablet, desktop)
- 🌙 Dark/Light mode toggle
- 📬 EmailJS contact form
- 🎠 Swiper testimonials slider
- 🔢 Animated statistics with CountUp
- 🏷️ Project filtering system
- ⏱️ Loading screen animation
- 🎯 SEO optimized

## 🛠️ Tech Stack

- **React.js** — UI library
- **Vite** — Build tool
- **Tailwind CSS** — Utility-first styling
- **Framer Motion** — Animations
- **React Icons** — Icon library
- **Swiper.js** — Testimonials slider
- **React Fast Marquee** — Tech stack marquee
- **React CountUp** — Animated numbers
- **EmailJS** — Contact form
- **React Scroll** — Smooth scrolling

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure EmailJS

1. Go to [emailjs.com](https://emailjs.com) and create a free account
2. Create a new service and email template
3. In `src/components/sections/Contact.jsx`, replace:
   - `'YOUR_SERVICE_ID'` with your EmailJS service ID
   - `'YOUR_TEMPLATE_ID'` with your template ID
   - `'YOUR_PUBLIC_KEY'` with your public key

### 3. Customize your data

Edit `src/data/index.js` to update:
- Personal info (name, email, bio, social links)
- Skills and proficiency levels
- Projects (title, description, tech stack, links)
- Services
- Testimonials

### 4. Run development server

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
```

### 6. Preview production build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx        # Navigation
│   │   └── Footer.jsx        # Footer
│   ├── sections/
│   │   ├── Hero.jsx          # Landing/hero section
│   │   ├── About.jsx         # About me + timeline
│   │   ├── Skills.jsx        # Skills showcase
│   │   ├── Projects.jsx      # Projects with filtering
│   │   ├── Services.jsx      # Services offered
│   │   ├── Testimonials.jsx  # Client testimonials
│   │   └── Contact.jsx       # Contact form
│   └── ui/
│       ├── CustomCursor.jsx  # Custom cursor effect
│       ├── LoadingScreen.jsx # Animated loading screen
│       ├── ParticleBackground.jsx # Canvas particles
│       └── ScrollProgress.jsx # Scroll progress bar
├── data/
│   └── index.js              # All portfolio content
├── App.jsx                   # Root component
├── main.jsx                  # Entry point
└── index.css                 # Global styles
```

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Drag & drop the `dist` folder to netlify.com
```

## 📝 License

MIT — Free to use and customize.

---

**Built with ❤️ by Xaitboyev Javlonbek**

I have successfully updated the application styling and layout structure to align with the proposed Immersive UI design system.
Here is a summary of the conceptual design choices and implementation outcomes:
Global Canvas Alignment: Configured the global viewport and document background with a dark slate background (#020205). This provides deep contrast and functions as a stable backdrop for interactive nodes.
Translucent Navigation Systems: Transformed the top floating header using a customized, glassmorphic layout. In dark mode, it operates with subtle borders and blurred translucency, framing the brand identifier and section indicators.
Aesthetic Content Blocks:
Hero and Social Ribbons: Structured interactive status badges and social action buttons with translucent backgrounds and highly precise outer boundaries.
Geographical Layout Cards: Styled structural coordinates cards and embedded interactive maps with dark filter contrasts and glowing overlays to match the design language.
Service & Capabilites Panels: Overlaid colorful, low-opacity gradient layers atop glass surfaces on individual service blocks, maintaining visual hierarchy while keeping background noise to a minimum.
Interactive Review Frames: Refitted client feedback slider elements to use consistent negative padding, glass border properties, and clean pagination dots to ensure readable content delivery.
Glassmorphic Input Controls: Customized inputs, selectors, and textareas inside contact forms to feature fine borders that respond to hover states and focus triggers.
All components have been thoroughly verified, compiled, and linted successfully. The interface remains fully responsive, accessible, and ready for use.
