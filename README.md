# Immoby - Real Estate Management Platform

## About the Project

Immoby is a modern real estate management platform built with the latest web technologies, designed to simplify property management and real estate transactions. It combines a public-facing marketing site (listings, property details, pricing, FAQ) with a full management dashboard (properties, leases, tenants, accounting, support).

**Author**: Akrem Belkahla  
**Agency**: InfinityWeb  
**Website**: [InfinityWeb.tn](https://InfinityWeb.tn)

## Features

### Marketing site
- Landing page with hero search, featured properties, categories, steps, services, popular cities and FAQ
- Rental catalog (`/location`) with search, city/type filters, price slider and pagination
- Property detail pages (`/location/:id`) with image gallery, amenities, contact form and similar properties
- Responsive design, sticky header, mobile drawer navigation
- Dark mode with theme-aware design tokens

### Management dashboard
- Dashboard with KPIs, charts (Recharts) and activity tables
- Properties, leases, tenants, inspections
- Owners and revenue per property
- Support: tickets (Kanban), interventions, contractors
- Accounting: entries, invoices, payments, export
- Documents, reports, calendar and settings
- Data persisted in `localStorage` (seed data, resettable from the Properties page)

### Technical
- Modern UI components with shadcn/ui + Radix UI
- Theming via CSS variables (light/dark) and Plus Jakarta Sans typography
- Interactive maps with Leaflet
- Type-safe with TypeScript
- Fast development with Vite

## Prerequisites

- Node.js (v18 or later) & npm
- Git

## Getting Started

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/AkremBelkahla/immoby.git
   ```

2. Navigate to the project directory:
   ```sh
   cd immoby
   ```

3. Install dependencies:
   ```sh
   npm install
   ```

### Development

Start the development server:
```sh
npm run dev
```

### Building for Production

Create a production build:
```sh
npm run build
```

Preview the production build locally:
```sh
npm run preview
```

### Lint

```sh
npm run lint
```

## Project Structure

```
src/
├── components/     # Shared UI (layouts, carousel, chatbot, dropdowns, ui/)
├── hooks/          # Custom hooks (useLocalStore, ...)
├── lib/            # Types, seed data, storage, rental catalog data
├── pages/          # Marketing pages + dashboard pages
└── assets/         # Images, logos, icons
```

## Technologies Used

- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - TypeScript is a typed superset of JavaScript
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [React Router](https://reactrouter.com/) - Routing for React
- [TanStack Query](https://tanstack.com/query) - Data fetching and caching
- [Recharts](https://recharts.org/) - Charts for the dashboard
- [Leaflet](https://leafletjs.com/) - Interactive maps
- [Lucide](https://lucide.dev/) - Icons

## Deployment

This project can be deployed to any static hosting service like Netlify, Vercel, or GitHub Pages.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Akrem Belkahla - [@akrembelkahla](https://github.com/AkremBelkahla)

Project Link: [https://github.com/AkremBelkahla/immoby](https://github.com/AkremBelkahla/immoby)
