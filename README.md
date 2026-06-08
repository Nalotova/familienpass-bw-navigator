# Landesfamilienpass BW Navigator

## 🎯 Overview

**Landesfamilienpass BW Navigator** is a private, non-commercial CivicTech prototype designed to help families in Baden-Württemberg use the **Landesfamilienpass** more practically.

The application is not an official government service and does not process applications for the Landesfamilienpass. Instead, it acts as an orientation and planning tool: families can browse eligible places, filter destinations, track visited locations, manage the six flexible museum coupons, and plan trips based on weather, distance, and suitability for children or teenagers.

The project was built as a practical UX prototype for families who receive the Landesfamilienpass but still need a simple way to understand: **where they can go, what type of coupon applies, what is still unused, and which destinations are realistic for a family trip.**

## 🧭 Product Concept

Many public benefit programs are administratively clear, but difficult for families to use in everyday life. Information is spread across PDF lists, official pages, provider websites, and paper coupons. This prototype translates that information into a more usable digital interface.

The product focuses on four practical questions:

1. **Which places can we visit with the Landesfamilienpass?**
2. **Which entries are free and which require a special coupon or discount?**
3. **Which coupons have we already used?**
4. **What is suitable for our family, our location, the weather, and our children’s age?**

The result is a lightweight, privacy-friendly tool that can be shown as a concept for a municipal information service, a family support initiative, or a portfolio project in public-sector digitalization.

## ✨ Key Features

- **Multilingual UI:** Russian, German, and English interface support.
- **Destination catalog:** Family-friendly overview of museums, castles, monasteries, parks, and cultural sites in Baden-Württemberg.
- **Smart filters:** Filter by type, coupon condition, usage status, bad-weather suitability, and teen suitability.
- **Coupon tracking:** Track usage of the six flexible museum coupons locally.
- **Visited-place tracking:** Mark places as used or unused.
- **Personal notes:** Add private notes per destination.
- **Trip ideas:** Grouped destination ideas to support easier family planning.
- **Google Maps links:** Direct navigation links for each destination.
- **Privacy-first storage:** All personal usage data is stored only in the browser via `localStorage`.
- **PWA-ready structure:** Includes manifest and app icon references for installable-app behavior.

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS utility classes
- **Icons:** Lucide React
- **State Management:** Lightweight custom React hook with local persistence
- **Persistence:** Browser `localStorage`
- **Build Tooling:** Vite, TypeScript, ESBuild
- **Deployment-ready:** Static frontend architecture suitable for GitHub Pages, Vercel, Netlify, or municipal web hosting

## ⚙️ Technical Overview

The application is intentionally lightweight. It does not require user accounts, a backend database, server-side sessions, or external personal data storage.

Application state is handled through a custom store hook:

```ts
const INITIAL_STATE: UserState = {
  usedPlaces: [],
  notes: {},
  couponsUsed: [],
  language: 'ru',
};
```

The state is persisted locally:

```ts
localStorage.setItem('lfp-state', JSON.stringify(state));
```

This means that marked places, coupon usage, notes, and language preference remain available on the same device/browser, but are not sent to any external server.

## 🗂️ Data Model

The destination catalog is based on a typed `Place[]` structure. Each destination includes:

- unique ID
- name and city
- destination type
- short description
- coupon type and coupon information
- estimated distance and travel time
- indoor/outdoor/weather suitability
- suitability for teenagers
- photo reference
- website link
- Google Maps link

This structure makes the application easy to extend: new places can be added directly to the data file without changing the UI logic.

## 🔐 Privacy & Data Protection

This prototype is designed to be privacy-friendly by default.

- No login is required.
- No personal data is transmitted to a city, municipality, or external database.
- Notes, marked visits, and coupon history are stored only in the browser of the user’s device.
- The project does not implement analytics, tracking, or server-side profiling.
- Clearing the browser storage also clears the locally saved app data.

This makes the project suitable as a low-risk prototype for public-sector discussion, family support, or digital service design.

## 🏛️ Administrative Disclaimer

This application is a **private, non-commercial prototype** and an orientation aid for families.

It is **not** an official service of the State of Baden-Württemberg, a city, a municipality, or any public authority. It does not replace official advice, legal assessment, or the formal application process.

The application for the Landesfamilienpass, the verification of eligibility, and the decision on issuance remain exclusively within the responsibility of the competent city or municipal administration.

Information on opening hours, admission conditions, coupon rules, and participating institutions should always be checked directly with the respective provider or the official public authority before a visit.

**Source status:** June 2026. Information provided without warranty.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/Nalotova/familienpass-bw-navigator.git
cd familienpass-bw-navigator
npm install
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Type Check

```bash
npm run lint
```

## 📌 Possible Next Improvements

- Add a German-first onboarding screen for municipal presentation.
- Add official source links per destination.
- Add optional export/print view for families.
- Add accessibility pass according to WCAG basics.
- Add a dedicated “For municipalities” information page.
- Replace static distance values with dynamic user-location-based routing.
- Add a versioned data-source file for easier administrative review.

## 👩‍💻 Author

Created by **Tetiana Nalotova** as a CivicTech and public-service UX prototype focused on family support, digital orientation, and practical use of public benefits.

Professional focus: AI automation, process optimization, user-centered digital tools, and workflow design for small organizations and public-facing services.

## 📜 License

Private prototype / portfolio project. Reuse, publication, or official deployment requires explicit permission from the author.
