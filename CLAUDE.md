# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Rainmaker is a full-stack application consisting of:
- **Server**: Spring Boot 3.5 backend (Java 21) with JPA, Security, and REST capabilities
- **WMS Client**: Next.js 16 frontend (React 19, TypeScript) with Tailwind CSS 4

## Architecture

### Server (Spring Boot)
- **Base Package**: `com.rainmaker.server`
- **Stack**: Spring Boot 3.5.10-SNAPSHOT, Java 21, Gradle
- **Dependencies**: Spring Data JPA, Spring Security, Spring Validation, Lombok
- **Database**: MySQL (primary), H2 (testing/development)
- **Docker**: Uses Docker Compose for MySQL service

### WMS Client (Next.js)
- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS 4 with PostCSS
- **Package Manager**: Yarn Berry 4.12.0
- **Node Version**: 20.18.1 (managed via nvm, see `.nvmrc`)
- **Port**: Runs on http://localhost:3000
- **Architecture**: Interface-Driven Development (IDD)

#### Interface-Driven Development (IDD) Guidelines

The frontend follows IDD principles where interfaces define contracts before implementation:

1. **Define interfaces first**: Create TypeScript interfaces/types for all data structures, API responses, component props, and service contracts
2. **Type safety**: All functions, components, and modules must be strongly typed
3. **Contract-first API integration**: Define API response/request interfaces before implementing fetch logic
4. **Component props interfaces**: Every component must have explicit prop type definitions
5. **Service layer interfaces**: Abstract external dependencies (API calls, storage, etc.) behind interfaces
6. **Mock implementations**: Use interface-based mocks for testing and development

**Directory structure for IDD**:
```
wms-client/
├── app/                    # Next.js app router pages
├── components/             # React components with typed props
├── interfaces/             # TypeScript interfaces and types
│   ├── api/               # API request/response interfaces
│   ├── models/            # Domain model interfaces
│   └── services/          # Service contract interfaces
├── services/              # Service implementations
│   ├── api/              # API client implementations
│   └── ...
└── lib/                   # Utility functions and helpers
```

## Common Commands

### Server
```bash
cd server

# Run the application (with Docker Compose for MySQL)
./gradlew bootRun

# Build the project
./gradlew build

# Run tests
./gradlew test

# Run single test class
./gradlew test --tests com.rainmaker.server.ClassName

# Clean build
./gradlew clean build
```

### WMS Client
```bash
cd wms-client

# Install dependencies
yarn install

# Run development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start

# Run linter
yarn lint
```

### Database (Docker Compose)
The server includes Docker Compose support that automatically starts MySQL when using Spring Boot DevTools.

Manual Docker Compose commands:
```bash
cd server
docker compose up -d
docker compose down
```

**MySQL Configuration** (from compose.yaml):
- Database: `mydatabase`
- User: `myuser`
- Password: `secret`
- Root Password: `verysecret`
- Port: 3306
