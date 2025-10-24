# Lead Management System

A comprehensive lead management system built with React frontend and NestJS microservices.

## 🏗️ Architecture

- **Frontend**: React application (Port: 3000)
- **Backend**: 7 NestJS microservices

## 📦 Setup & Configuration

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Quick Start

.

1. **Clone and Install Dependencies**

   ```bash
   git clone <repository-url>
   cd Lead-Management
   npm install
   ```

2. **Start Frontend**

   ```bash
   cd client
   npm install
   npm start
   ```

3. **Start All Microservices**

   ```bash
   cd Microservices
   # Option 1: Use the convenience script
   npm install
   npm run start:all

   # Option 2: Start individually
   cd auth-service && npm install && npm run start:dev
   cd ../user-service && npm install && npm run start:dev
   # ... repeat for each service
   ```

## 🚀 Services & Ports

| Service                  | Port | Description                    |
| ------------------------ | ---- | ------------------------------ |
| **Frontend**             | 3000 | React client application       |
| **Auth Service**         | 3001 | Authentication & authorization |
| **User Service**         | 3002 | User management                |
| **Lead Service**         | 3003 | Lead operations & management   |
| **Call Service**         | 3004 | Call tracking & management     |
| **Export Service**       | 3005 | Data export functionality      |
| **Settings Service**     | 3006 | Application settings           |
| **Notification Service** | 3007 | Notifications & alerts         |

## 📁 Project Structure

```
Lead-Management/
├── client/                 # React frontend
│   ├── package.json
│   └── src/
├── Microservices/          # NestJS microservices (Nx monorepo)
│   ├── package.json        # Nx workspace with shared node_modules
│   ├── nx.json             # Nx configuration
│   ├── tsconfig.base.json  # Base TypeScript config
│   ├── node_modules/       # Shared dependencies for all services
│   ├── auth-service/
│   │   ├── package.json
│   │   ├── project.json    # Nx project config
│   │   └── src/
│   ├── user-service/
│   ├── lead-service/
│   ├── call-service/
│   ├── media-service/
│   ├── notification-service/
│   └── Telecaller-service/
└── README.md
```

## 🔧 Development

### Microservices Architecture (Nx Monorepo)

All 7 microservices are managed as an **Nx monorepo** inside the `Microservices/` folder:

- **Shared `node_modules`**: All dependencies are hoisted to `Microservices/node_modules`
- **Individual `package.json`**: Each service has its own with build/run scripts
- **Nx orchestration**: Build, test, and serve tasks managed by Nx

### Running Services

**From Microservices folder:**

```bash
cd Microservices

# Start all services in parallel
npm run start:all

# Start individual services
npm run start:auth          # Port 3001
npm run start:user          # Port 3002
npm run start:lead          # Port 3003
npm run start:call          # Port 3004
npm run start:media         # Port 3005
npm run start:notification  # Port 3007
npm run start:telecaller    # Port 3006

# Build all services
npm run build:all

# View dependency graph
npm run graph
```

**Using Nx directly:**

```bash
cd Microservices

# Serve a specific service
npx nx serve auth-service

# Build a specific service
npx nx build lead-service

# Run tests
npx nx test user-service

# Run multiple tasks in parallel
npx nx run-many -t build -p auth-service user-service lead-service

# See all available projects
npx nx show projects
```

### Adding Shared Libraries (Optional)

To create shared libraries for common code:

```bash
cd Microservices

# Create a shared library
npx nx generate @nx/node:library shared/auth-utils --directory=libs/shared/auth-utils

# Create a shared library for database models
npx nx generate @nx/node:library shared/database --directory=libs/shared/database
```

Suggested shared library structure:

```
Microservices/
└── libs/
    └── shared/
        ├── auth-utils/      # JWT helpers, guards, decorators
        ├── database/        # Mongoose schemas, DTOs
        ├── common/          # Shared utilities, constants
        └── types/           # TypeScript interfaces
```

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **API Services**: http://localhost:3001-3007

All services run independently and can be started/stopped individually.
