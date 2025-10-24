# Microservices - Nx Monorepo

This folder contains 7 NestJS microservices managed as an Nx monorepo with shared dependencies.

## 🚀 Quick Start

```bash
# Install dependencies (first time only)
npm install

# Start all services
npm run start:all

# Start individual service
npm run start:auth
```

## 📋 Services

| Service                  | Port | Description                    |
| ------------------------ | ---- | ------------------------------ |
| **auth-service**         | 3001 | Authentication & authorization |
| **user-service**         | 3002 | User management                |
| **lead-service**         | 3003 | Lead operations & management   |
| **call-service**         | 3004 | Call tracking & management     |
| **media-service**        | 3005 | Media & file management        |
| **notification-service** | 3007 | Notifications & alerts         |
| **telecaller-service**   | 3006 | Telecaller management          |

## 🛠️ Available Commands

### Start Services

```bash
# All services in parallel
npm run start:all

# Individual services
npm run start:auth
npm run start:user
npm run start:lead
npm run start:call
npm run start:media
npm run start:notification
npm run start:telecaller
```

### Build Services

```bash
# Build all services
npm run build:all

# Build specific service
npx nx build auth-service
```

### Testing

```bash
# Test specific service
npx nx test auth-service

# Test all services
npx nx run-many -t test
```

### Nx Commands

```bash
# View project graph
npm run graph

# List all projects
npx nx show projects

# See what's affected by changes
npx nx affected:graph

# Run task for affected projects only
npx nx affected -t build
```

## 📦 Architecture

### Nx Monorepo Benefits

- **Shared Dependencies**: All services share the same `node_modules`
- **Code Reusability**: Easy to create shared libraries
- **Task Orchestration**: Run tasks across multiple services efficiently
- **Dependency Graph**: Visualize and understand service relationships
- **Incremental Builds**: Only rebuild what changed

### Project Structure

```
Microservices/
├── package.json              # Root package with all dependencies
├── nx.json                   # Nx workspace configuration
├── tsconfig.base.json        # Base TypeScript config
├── node_modules/             # Shared dependencies
│
├── auth-service/
│   ├── package.json          # Service-specific scripts
│   ├── project.json          # Nx project configuration
│   ├── nest-cli.json         # NestJS CLI config
│   ├── tsconfig.json         # Service TypeScript config
│   └── src/
│
├── user-service/
├── lead-service/
├── call-service/
├── media-service/
├── notification-service/
└── Telecaller-service/
```

## 🔄 Adding Shared Libraries

Create shared libraries for common code across services:

```bash
# Create shared library for authentication utilities
npx nx generate @nx/node:library shared/auth-utils --directory=libs/shared/auth-utils

# Create shared library for database models
npx nx generate @nx/node:library shared/database --directory=libs/shared/database

# Create shared library for common utilities
npx nx generate @nx/node:library shared/common --directory=libs/shared/common
```

### Example Shared Library Usage

```typescript
// In any service, import from shared library
import { JwtGuard } from "@microservices/shared/auth-utils";
import { UserSchema } from "@microservices/shared/database";
import { formatDate } from "@microservices/shared/common";
```

## 🔧 Configuration

Each service can be configured through:

- **Environment Variables**: `.env` files in service directories
- **Port Configuration**: Set in `src/main.ts` of each service
- **Nx Configuration**: `project.json` for build/serve options

## 📈 Performance

- **Parallel Execution**: Run multiple services simultaneously
- **Incremental Builds**: Only rebuild changed services
- **Cache**: Nx caches task results for faster rebuilds
- **Smart Rebuilds**: Nx understands dependencies between services

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Find process using port (e.g., 3001)
netstat -ano | findstr :3001

# Kill the process
taskkill /PID <process_id> /F
```

### Clear Nx Cache

```bash
npx nx reset
```

### Reinstall Dependencies

```bash
rm -rf node_modules
npm install
```

## 📚 Documentation

- [Nx Documentation](https://nx.dev)
- [NestJS Documentation](https://docs.nestjs.com)
- [Nx NestJS Plugin](https://nx.dev/packages/nest)
