# Prepaid Debit Card Frontend

A modern, responsive React application for managing prepaid debit cards, built with TypeScript, Redux Toolkit, and Tailwind CSS.

## 🚀 Features

- **Authentication System**: Secure login/register with JWT tokens
- **Card Management**: Create, view, and manage virtual/physical debit cards
- **Transaction History**: View and filter transaction history
- **Dashboard**: Overview of account balance, spending, and recent activity
- **Profile Management**: Update personal information and account settings
- **Responsive Design**: Mobile-first design that works on all devices
- **Real-time Updates**: Live data synchronization with backend API

## 🛠️ Technology Stack

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Redux Toolkit** - Predictable state management
- **RTK Query** - Data fetching and caching
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form management with validation
- **Zod** - Schema validation
- **Heroicons** - Beautiful SVG icons
- **React Hot Toast** - Toast notifications
- **Vite** - Fast build tool and dev server

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Basic UI components (Button, Input, Card, etc.)
│   ├── forms/           # Form components
│   └── layout/          # Layout components (Header, Sidebar, etc.)
├── features/            # Feature-based modules
│   ├── auth/            # Authentication feature
│   ├── cards/           # Card management feature
│   ├── transactions/    # Transaction feature
│   ├── profile/         # User profile feature
│   └── dashboard/       # Dashboard feature
├── pages/               # Page components
├── store/               # Redux store configuration
├── services/            # API services
│   ├── api/             # RTK Query API definitions
│   ├── auth/            # Authentication services
│   └── storage/         # Local storage utilities
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── types/               # TypeScript type definitions
└── styles/              # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running on `http://localhost:8000`

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PrepaidDebitCardFrontEnd
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update the environment variables in `.env.local`:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api/v1
   VITE_APP_VERSION=1.0.0
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## 🎨 Design System

The application follows a consistent design system with:

- **Colors**: Primary blue theme with semantic colors for success, warning, and error states
- **Typography**: Inter font family with consistent sizing scale
- **Spacing**: 4px base unit with consistent spacing scale
- **Components**: Reusable UI components with consistent styling
- **Responsive**: Mobile-first design with breakpoints at 640px, 768px, 1024px, 1280px, and 1536px

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Route-level authentication guards
- **Input Validation**: Client-side validation with Zod schemas
- **XSS Protection**: Sanitized inputs and outputs
- **CSRF Protection**: Cross-site request forgery protection
- **Secure Storage**: Encrypted local storage for sensitive data

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px  
- **Desktop**: 1024px - 1279px
- **Large Desktop**: 1280px+

## 🔌 API Integration

The frontend integrates with the backend API through RTK Query:

- **Authentication**: Login, register, logout, password reset
- **Cards**: CRUD operations for debit cards
- **Transactions**: View transaction history and statistics
- **Users**: Profile management and settings
- **Real-time**: Live updates and synchronization

## 🧪 Testing

The application includes comprehensive testing:

- **Unit Tests**: Component and utility function tests
- **Integration Tests**: API integration and user flow tests
- **E2E Tests**: End-to-end user journey tests
- **Accessibility Tests**: WCAG 2.1 AA compliance testing

## 🚀 Deployment

### Production Build

```bash
npm run build
```

### Environment Variables

Set the following environment variables for production:

```env
VITE_API_BASE_URL=https://api.prepaidcards.com/api/v1
VITE_APP_VERSION=1.0.0
VITE_SENTRY_DSN=your-sentry-dsn
```

### Docker Deployment

```bash
# Build Docker image
docker build -t prepaid-card-frontend .

# Run container
docker run -p 3000:3000 prepaid-card-frontend
```

## 📊 Performance

The application is optimized for performance:

- **Code Splitting**: Route-based code splitting
- **Lazy Loading**: Component lazy loading
- **Bundle Optimization**: Tree shaking and minification
- **Caching**: RTK Query caching and invalidation
- **Image Optimization**: Optimized images and lazy loading

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@prepaidcards.com or join our Slack channel.

## 🔄 Changelog

### v1.0.0 (2024-01-15)
- Initial release
- Authentication system
- Card management
- Transaction history
- Dashboard
- Profile management
- Responsive design