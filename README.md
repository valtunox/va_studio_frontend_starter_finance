# VA Studio Frontend Starter

Vite + React starter with three templates for vibe coding (Lovable/Replit-style).

## Templates

| Template | Path | Use case |
|----------|------|----------|
| **Portfolio** | `templates/portfolio/` | Personal portfolio, projects, skills, contact |
| **SaaS** | `templates/saas/` | Dashboard, sidebar, stats cards, data tables |
| **E-commerce** | `templates/ecommerce/` | Store, product grid, cart, checkout flow |
| **Blog** | `templates/blog/` | Post list, tags, search, archive |
| **CRM** | `templates/crm/` | Contacts, companies, leads, pipeline |
| **ERP** | `templates/erp/` | Inventory, procurement, orders, finance, reports |

Change `src/App.jsx` to re-export the template you want:

```js
export { default } from '../templates/portfolio/App.jsx'
export { default } from '../templates/saas/App.jsx'
export { default } from '../templates/ecommerce/App.jsx'
export { default } from '../templates/blog/App.jsx'
export { default } from '../templates/crm/App.jsx'
export { default } from '../templates/erp/App.jsx'
```

## UI Stack

- **Tailwind CSS** – base styling
- **shadcn/ui** – Button, Card, Input, Label, Dialog (`src/components/ui/`)
- **Headless UI** – Menu, accessible dropdowns
- **Lucide React** – Icons

## Auth Components

Ready-to-use login, register, OAuth, reset password:

```js
import { LoginForm, RegisterForm, OAuthButtons, AuthModals } from '@/components/auth'

// Inline form
<LoginForm onSubmit={handleLogin} onOAuth={handleOAuth} onForgotPassword={() => setMode('reset')} />

// Modal with login/register/reset
<AuthModals open={showAuth} onOpenChange={setShowAuth} mode={mode} onModeChange={setMode} onLogin={...} onRegister={...} onOAuth={...} />
```

## Run

```bash
npm install
npm run dev
```

## Component Index

See `templates/COMPONENT_INDEX.md` for AI context and component discovery.
