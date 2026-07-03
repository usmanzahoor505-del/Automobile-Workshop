# 🚗 Elite Auto Workshop - Modern Car Workshop Website

A stunning, fully responsive car workshop website built with React, Framer Motion, and Three.js. Features an interactive 3D car showcase, smooth scroll animations, and a complete booking system.

![Car Workshop Website](https://img.shields.io/badge/React-19.x-blue) ![Vite](https://img.shields.io/badge/Vite-8.x-brightgreen) ![Three.js](https://img.shields.io/badge/Three.js-3D-orange)

## ✨ Features

- **🎨 Modern Design**: Dark theme with vibrant gradients and smooth animations
- **🚀 Interactive 3D Car Tour**: Real-time 3D car model with color customization using Three.js
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **🎭 Smooth Animations**: Page transitions and scroll animations with Framer Motion
- **📋 Booking System**: Complete service booking form with validation
- **⚡ Fast Performance**: Built with Vite for lightning-fast development and builds
- **🎯 Modern UI/UX**: Intuitive navigation and user-friendly interface

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite 8** - Build tool and dev server
- **Three.js** - 3D graphics
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for React Three Fiber
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

## 📦 Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd car-workshop-website
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:5173`

## 🏗️ Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## 📂 Project Structure

```
car-workshop-website/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Navigation bar
│   │   ├── Hero.jsx             # Hero section
│   │   ├── Car3DTour.jsx        # 3D car showcase
│   │   ├── Services.jsx         # Services grid
│   │   ├── About.jsx            # About section
│   │   ├── Testimonials.jsx    # Customer reviews
│   │   ├── BookingForm.jsx      # Booking form
│   │   └── Footer.jsx           # Footer
│   ├── App.jsx                  # Main app component
│   ├── index.css                # Global styles
│   └── main.jsx                 # Entry point
├── index.html
└── package.json
```

## 🎨 Customization

### Change Workshop Name

Replace "Elite Auto Workshop" throughout the files with your workshop name:
- `src/components/Navbar.jsx`
- `src/components/Footer.jsx`
- `index.html` (title tag)

### Update Services

Edit the `services` array in `src/components/Services.jsx` to match your offerings.

### Modify Colors

Update the color variables in `src/index.css`:
```css
:root {
  --primary: #ff6b35;      /* Main brand color */
  --secondary: #004e89;    /* Secondary color */
  --accent: #ffd700;       /* Accent color */
  --dark: #0a0e27;        /* Background dark */
  --light: #f7f9fc;       /* Text light */
  --gray: #6b7280;        /* Gray text */
}
```

### Update Contact Information

Edit `src/components/BookingForm.jsx` and `src/components/Footer.jsx` to add your:
- Address
- Phone number
- Email
- Business hours

## 📱 Sections

1. **Hero** - Eye-catching landing section with call-to-action
2. **3D Car Tour** - Interactive 3D model with color selection
3. **Services** - Grid of services with pricing
4. **About** - Workshop information and features
5. **Testimonials** - Customer reviews
6. **Booking Form** - Complete appointment booking system
7. **Footer** - Contact info and links

## 🎯 Key Features Explained

### 3D Car Showcase
- Drag to rotate the car model
- Zoom in/out with scroll
- Real-time color changes
- Smooth lighting and shadows

### Booking Form
- Personal information capture
- Vehicle details
- Service selection
- Date and time picker
- Success confirmation animation

### Animations
- Scroll-triggered animations
- Hover effects on cards
- Smooth page transitions
- Interactive elements

## 🚀 Performance

- Optimized 3D rendering
- Lazy loading of components
- Minimized bundle size
- Fast page load times

## 📝 License

This project is open source and available for personal and commercial use.

## 🤝 Support

For questions or support, contact:
- Email: info@eliteauto.com
- Phone: (555) 123-4567

---

Built with ❤️ using React, Three.js, and Framer Motion
