# 🏥 MediTrack - Professional Medication Management System

<div align="center">

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![React](https://img.shields.io/badge/React-19.1.1-blue)
![NestJS](https://img.shields.io/badge/NestJS-10.x-red)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**A modern, full-stack medication tracking and management system**

[Features](#features) • [Demo](#demo) • [Installation](#installation) • [Usage](#usage) • [Tech Stack](#tech-stack)

</div>

---

## ✨ Features

### 📊 **Analytics Dashboard**
- **Real-time Statistics**: Total medications, low stock alerts, today's doses, and active warnings
- **7-Day Trend Chart**: Visualize medication stock levels over time with interactive charts
- **Today's Schedule**: See all medications due today with time-based status indicators
- **Smart Alerts**: Visual warnings for low-stock medications with quick refill options

### 💊 **Advanced Medication Management**
- **Smart Search**: Real-time search across all medications
- **Intelligent Filtering**: Filter by status (All / Low Stock / In Stock)
- **Visual Progress Bars**: See pill quantities at a glance
- **One-Click Actions**: Take dose, refill, or delete with single clicks
- **Side Effects Tracking**: Document and view medication side effects

### ⏰ **Schedule Management**
- **Flexible Scheduling**: Set intake times with custom frequencies
- **Visual Timeline**: See today's medications in chronological order
- **Status Indicators**: Know which doses are due vs upcoming
- **Dosage Tracking**: Automatic pill deduction when taking medications

### ⚠️ **Drug Interaction Alerts**
- **Interaction Warnings**: Track potential drug interactions
- **Severity Levels**: Color-coded alerts (Low, Moderate, High, Critical)
- **Custom Messages**: Add detailed interaction information

### 🎨 **Modern UI/UX**
- **Professional Design**: Clean, modern interface with smooth animations
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Icons**: Feather Icons for clean, professional look
- **Accessibility**: WCAG 2.1 compliant with keyboard navigation

### 🔐 **Security**
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt encryption for user passwords
- **Protected Routes**: Role-based access control
- **Secure API**: CORS and Helmet security headers

---

## 🚀 Quick Start

### Prerequisites
```bash
Node.js >= 18.x
PostgreSQL >= 14.x
npm or yarn
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/meditrack.git
cd meditrack
```

2. **Install dependencies**
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd api-nest
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. **Setup Database**
```bash
# Create PostgreSQL database
createdb meditrack

# Run database schema
psql meditrack < api-nest/database/schema.sql
```

4. **Configure Environment**
```bash
# Backend (.env in api-nest directory)
cp api-nest/.env.example api-nest/.env

# Edit api-nest/.env with your configuration:
PORT=4000
NODE_ENV=development
PGHOST=localhost
PGPORT=5432
PGDATABASE=meditrack
PGUSER=postgres
PGPASSWORD=your_password
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=1h
```

5. **Start Development Servers**

```bash
# Terminal 1 - Backend
cd api-nest
npm run start:dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

6. **Access the Application**
```
Frontend: http://localhost:5173
Backend API: http://localhost:4000/api
GraphQL Playground: http://localhost:4000/graphql
```

---

## 📖 Usage

### Creating Your First Medication

1. **Register/Login** to your account
2. Click **"Add Medication"** from the dashboard or medications page
3. Fill in the details:
   - Medication name
   - Dosage (mg)
   - Pills per box
   - Current pills
   - Low stock threshold
   - Side effects (optional)
4. Click **"Add Medication"**

### Setting Up a Schedule

1. Navigate to **Schedules**
2. Click **"Create Your First Schedule"**
3. Select medication
4. Set intake time
5. Choose frequency (Daily, Twice Daily, Weekly, As Needed)
6. Set dose quantity
7. Click **"Create Schedule"**

### Taking Your Medication

#### From Dashboard:
- View today's schedule in the "Today's Schedule" widget
- Doses marked as "Due" need immediate attention

#### From Medications Page:
- Click the **"Take"** button on any medication card
- Pills are automatically deducted based on schedule

### Managing Stock

- **Refill**: Click "Refill" button to restore to full capacity
- **Low Stock Alerts**: Automatically shown on dashboard when below threshold
- **Visual Indicators**: Progress bars show stock levels at a glance

---

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - UI library
- **Redux Toolkit** - State management
- **React Bootstrap 5.3** - UI components
- **Recharts** - Data visualization
- **React Icons** - Icon library
- **date-fns** - Date formatting
- **Vite** - Build tool
- **Apollo Client** - GraphQL client

### Backend
- **NestJS 10.x** - Node.js framework
- **TypeORM** - ORM for PostgreSQL
- **GraphQL** - Query language
- **Apollo Server** - GraphQL server
- **Passport JWT** - Authentication
- **bcrypt** - Password hashing
- **class-validator** - Input validation

### Database
- **PostgreSQL 14+** - Relational database

---

## 📁 Project Structure

```
meditrack/
├── api-nest/                # Backend (NestJS)
│   ├── database/
│   │   └── schema.sql      # Database schema
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/       # Authentication module
│   │   │   ├── users/      # Users management
│   │   │   ├── medications/ # Medications CRUD
│   │   │   ├── schedules/  # Schedules management
│   │   │   ├── alerts/     # Interaction alerts
│   │   │   └── health/     # Health checks
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── .env                # Environment variables
│   └── package.json
├── frontend/               # Frontend (React)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── common/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── store/          # Redux store
│   │   ├── hooks/          # Custom hooks
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json
├── docs/                   # Documentation
├── ENHANCEMENTS.md         # Enhancement details
└── README.md               # This file
```

---

## 🎨 Key Components

### Dashboard Components
- `StatsCard` - Displays key metrics with icons
- `MedicationTrendChart` - 7-day area chart visualization
- `UpcomingDoses` - Today's schedule widget
- `LowStockAlert` - Warning cards for low stock items

### Medication Components
- `MedicationList` - Grid view with search and filters
- `MedicationForm` - Add/edit medication form
- `MedicationCard` - Individual medication display
- `SearchBar` - Reusable search component

### Shared Components
- `LoadingSpinner` - Loading state indicator
- `NotificationBanner` - Alert messages
- `ProtectedRoute` - Authentication wrapper

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login        - Login user
```

### Medications
```
GET    /api/medications                      - Get all medications
GET    /api/medications/:id                  - Get medication by ID
GET    /api/medications/user/:userId         - Get user's medications
GET    /api/medications/user/:userId/low-stock - Get low stock medications
POST   /api/medications                      - Create medication
PUT    /api/medications/:id                  - Update medication
POST   /api/medications/:id/deduct           - Deduct pills
DELETE /api/medications/:id                  - Delete medication
```

### Schedules
```
GET    /api/schedules                    - Get all schedules
GET    /api/schedules/:id                - Get schedule by ID
GET    /api/schedules/user/:userId       - Get user's schedules
POST   /api/schedules                    - Create schedule
PUT    /api/schedules/:id                - Update schedule
DELETE /api/schedules/:id                - Delete schedule
```

### Alerts
```
GET    /api/alerts                  - Get all alerts
GET    /api/alerts/user/:userId     - Get user's alerts
POST   /api/alerts                  - Create alert
PUT    /api/alerts/:id              - Update alert
DELETE /api/alerts/:id              - Delete alert
```

---

## 🌟 Highlights

### What Makes MediTrack Special

1. **Data-Driven Insights**: See your medication usage trends over time
2. **Smart Automation**: Automatic pill deduction and refill reminders
3. **Time-Aware**: Shows what's due now vs later in the day
4. **Search & Filter**: Find any medication instantly
5. **Visual Feedback**: Progress bars, colors, and animations guide you
6. **Mobile-First**: Designed for use on-the-go
7. **Professional UI**: Looks and feels like a production app
8. **Fast & Smooth**: Optimized performance with smooth 60fps animations

---

## 📱 Screenshots

### Dashboard
> Modern dashboard with charts, stats, and today's schedule

### Medications
> Grid view with search, filters, and quick actions

### Schedule Management
> Easy scheduling with visual timeline

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Icons by [Feather Icons](https://feathericons.com/)
- Charts by [Recharts](https://recharts.org/)
- UI Components by [React Bootstrap](https://react-bootstrap.github.io/)

---

## 📧 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/yourusername/meditrack](https://github.com/yourusername/meditrack)

---

<div align="center">

**Made with ❤️ by your development team**

[⬆ back to top](#meditrack---professional-medication-management-system)

</div>
