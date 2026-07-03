# 🚀 Quick Start Guide

## Get Started in 3 Steps

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Start Development Server
```bash
npm run dev
```

### 3️⃣ Open in Browser
Navigate to: **http://localhost:5173**

---

## 🎨 Customize Your Workshop

### Change Workshop Name
Find and replace "Elite Auto Workshop" in:
- `src/components/Navbar.jsx` (line 39)
- `src/components/Footer.jsx` (line 19)
- `index.html` (line 7)

### Update Contact Info
Edit these files:
- `src/components/BookingForm.jsx` (lines 178-192)
- `src/components/Footer.jsx` (lines 83-95)

Replace with your:
- 📍 Address
- 📞 Phone number
- ✉️ Email address
- 🕐 Business hours

### Modify Services
Edit `src/components/Services.jsx` (lines 13-62) to change:
- Service names
- Descriptions
- Pricing
- Icons

### Change Colors
Edit `src/index.css` (lines 9-15):
```css
:root {
  --primary: #ff6b35;    /* Your brand color */
  --secondary: #004e89;  /* Secondary color */
  --accent: #ffd700;     /* Accent highlights */
}
```

---

## 📦 Build for Production

### Create production build:
```bash
npm run build
```

Files will be in the `dist/` folder - ready to deploy!

### Preview production build:
```bash
npm run preview
```

---

## 🌐 Deploy Options

### Netlify (Recommended)
1. Connect your GitHub repo
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy!

### Vercel
1. Import your project
2. Framework: Vite
3. Deploy!

### GitHub Pages
```bash
npm run build
# Copy dist folder to gh-pages branch
```

---

## 🎯 What's Included

✅ Modern dark-themed design  
✅ Interactive 3D car showcase  
✅ 10 service offerings  
✅ Customer testimonials  
✅ Booking form (front-end)  
✅ Fully responsive  
✅ Smooth animations  

---

## 💡 Next Steps

1. **Customize content** - Add your business details
2. **Test on mobile** - Ensure responsiveness
3. **Connect backend** - Hook up booking form to your server/email
4. **Add analytics** - Track visitor behavior
5. **SEO optimization** - Add meta tags and descriptions
6. **Deploy** - Launch your site!

---

## 📚 Need Help?

- Check `README.md` for full documentation
- See `FEATURES.md` for complete feature list
- Review component files for implementation details

---

**Ready to impress your customers? Let's go! 🚗💨**
