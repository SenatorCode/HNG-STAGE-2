# Invoice Management App

A responsive invoice management application built with React that supports full invoice lifecycle management (create, read, update, delete), draft flow, payment status updates, filtering, dark mode, and local persistence.

## Live Demo

- Live URL: `https://hng-stage-2-nu-amber.vercel.app/`
- GitHub Repository: `https://github.com/SenatorCode/HNG-STAGE-2`

## Setup Instructions

1. Clone the repository
   - `git clone https://github.com/SenatorCode/HNG-STAGE-2`
2. Enter project directory
   - `cd HNG-STAGE-2`
3. Install dependencies
   - `npm install`
4. Start development server
   - `npm run dev`
5. Build for production
   - `npm run build`

## Architecture Overview

### Folder Structure

```
src/
├── components/
│   ├── invoice/
│   │   ├── InvoiceCard.jsx
│   │   ├── InvoiceDetail.jsx
│   │   └── InvoiceForm.jsx
│   ├── layout/
│   │   ├── Sidebar.jsx
│   │   └── ThemeToggle.jsx
│   └── ui/
│       ├── Button.jsx
│       ├── DeleteModal.jsx
│       ├── EmptyState.jsx
│       └── StatusBadge.jsx
├── data/
│   └── seedData.js
├── pages/
│   ├── Home.jsx
│   └── InvoiceDetailPage.jsx
├── store/
│   ├── invoiceStore.js
│   └── themeStore.js
├── utils/
│   ├── formatCurrency.js
│   ├── formatDate.js
│   └── generateId.js
├── App.jsx
└── main.jsx
```

### State Management

- Zustand is used for global app state.
- `invoiceStore` handles invoice CRUD, status transitions, filtering, totals, and payment due calculation.
- `themeStore` handles theme mode and persistence.

### Routing

- React Router is used for two core routes:
  - `/` → invoice list page
  - `/invoices/:id` → invoice detail page

## Implemented Features

- Create invoice (pending or draft)
- Read invoice list and invoice detail
- Update existing invoice
- Delete invoice with confirmation modal
- Mark pending invoice as paid
- Filter invoices by all/draft/pending/paid
- Light/dark theme toggle with persistence
- Responsive layouts for mobile, tablet, desktop
- Hover and focus states on interactive components

## Libraries Used (and Why)

- `react-router-dom`: Client-side routing.
- `zustand`: Lightweight global state and actions.
- `zustand/middleware persist`: localStorage persistence.
- `react-hook-form`: Performant form state/validation.
- `@radix-ui/react-dialog`: Accessible confirmation modal.
- `@radix-ui/react-dropdown-menu`: Accessible filter menu.
- `date-fns`: Date parsing/formatting and due-date calculations.
- `lucide-react`: Icon set used in actions and UI controls.
- `tailwindcss` (v4): Utility-first styling and theme variants.

## Trade-offs

- Used localStorage persistence instead of backend to satisfy persistence requirements quickly and keep the app fully client-side.
- Implemented the invoice form as a drawer for better parity with the provided UI designs.
- Kept validation and business logic in store/form boundaries to reduce coupling between pages and UI components.

## Accessibility Notes

- Semantic interactive elements (`button` for clickable actions).
- Labeled form controls via `label` + `htmlFor`.
- Validation errors are announced with `role="alert"` and `aria-live="polite"`.
- Radix Dialog provides focus trap and ESC/outside-close behavior for deletion confirmation.
- Keyboard navigable dropdown and focus-visible states across controls.
- Color choices follow the provided design palette with light/dark adaptation.

## Final QA Checklist

- [x] CRUD behavior implemented
- [x] Validation blocks invalid save/send and save changes
- [x] Draft/pending/paid status flow implemented
- [x] Filter behavior implemented
- [x] Theme persistence implemented
- [x] Responsive behavior implemented (mobile/tablet/desktop)
- [x] Hover/focus states implemented
- [x] Lint/build passing

## Improvements Beyond Minimum

- Mobile detail actions moved to fixed bottom action bar for better usability.
- Invoice detail mobile item list restructured to avoid horizontal overflow.
- Additional overflow hardening for long text across mobile/tablet layouts.
