# 🇸🇾 SyriFX Website

> الموقع الرسمي لبوت سيري إف إكس - أسعار الصرف السورية

[![Deploy](https://img.shields.io/github/actions/workflow/status/yafatek/syrifx-website/deploy.yaml?label=deploy)](https://github.com/yafatek/syrifx-website/actions)
[![Website](https://img.shields.io/badge/website-syrifx.com-green)](https://syrifx.com)

## 🎯 Overview

A beautiful, RTL-first Arabic landing page for the Syrian Exchange Rate Bot. Built with modern web technologies and following billion-dollar company design principles.

### Design Principles Applied

| Principle | Implementation |
|-----------|---------------|
| **Clarity** | Single clear message per section |
| **Visual Hierarchy** | Bold headlines → Supporting text → CTAs |
| **Social Proof** | Stats, trust indicators |
| **Performance** | Optimized assets, code splitting |
| **Mobile-First** | Responsive design for all devices |
| **Localization** | Full RTL support, Arabic typography |

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + CSS Variables
- **Components**: Radix UI primitives + Shadcn/ui patterns
- **Animation**: Framer Motion
- **Typography**: Tajawal (Arabic font)
- **Hosting**: AWS S3 + CloudFront

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
website/
├── public/
│   └── favicon.svg          # Site favicon
├── src/
│   ├── components/
│   │   └── ui/              # Reusable UI components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── badge.tsx
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   ├── App.tsx              # Main application
│   ├── index.css            # Global styles
│   └── main.tsx             # Entry point
├── index.html               # HTML template
├── tailwind.config.js       # Tailwind configuration
├── vite.config.ts           # Vite configuration
└── package.json
```

## 🎨 Design System

### Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Syrian Green | `#006847` | Primary color |
| Golden | `#D4AF37` | Accent, CTAs |
| Dark Background | `hsl(220 20% 4%)` | Background |

### Typography

- **Primary Font**: Tajawal (Arabic)
- **Monospace**: IBM Plex Mono (for prices/numbers)

### Animations

- Fade-in on scroll
- Staggered reveals
- Floating elements
- Shimmer effects

## 🚢 Deployment

### Environments

| Environment | URL | Trigger |
|-------------|-----|---------|
| Staging | `stg.syrifx.com` | Push to `main` |
| Production | `syrifx.com` | Create tag `v*` |

### Deploy to Staging

```bash
git push origin main
```

### Deploy to Production

```bash
git tag v1.0.0
git push origin v1.0.0
```

### Infrastructure

The infrastructure is managed by Terraform in the main repository:

```bash
cd ../infra

# Deploy staging
terraform workspace select staging
terraform apply

# Deploy production
terraform workspace select prod
terraform apply
```

## 📝 Adding Content

### Update Exchange Rates Display

Edit `src/App.tsx` and modify the demo data in the phone mockup section.

### Add New Features

1. Add feature to the `features` array in `src/App.tsx`
2. Include icon from `lucide-react`
3. Set appropriate colors

### Add New Commands

Add to the `commands` array in `src/App.tsx`:

```tsx
{ cmd: "/newcmd", desc: "Description", alias: "/أمر_جديد" }
```

## 🧪 Development

```bash
# Run linter
npm run lint

# Type check
npx tsc --noEmit

# Format code
npx prettier --write .
```

## 📄 License

MIT License - Built with ❤️ for Syria 🇸🇾
