# Fleet Management System

A MERN-based Fleet Management System for managing vehicles, drivers, maintenance, fuel logs, trips, expenses, and PDF reports.

## Project Structure

- `backend/`: Express API, MongoDB models, auth middleware, and report generation
- `frontend/`: React app with dashboard UI, routing, forms, and responsive pages

## Prerequisites

- Node.js 14+
- MongoDB local server or MongoDB Atlas

## Environment Setup

Create `backend/.env` from `backend/.env.example` and make sure it contains:

```env
MONGO_URI=mongodb://127.0.0.1:27017/fleet_management
JWT_SECRET=your_jwt_secret
PORT=5000
```

If you use MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string.

## Install Dependencies

Open a terminal in the project root:

```powershell
cd c:\Users\Divyash\Downloads\fleet_management
```

Install backend dependencies:

```powershell
cd backend
npm.cmd install
```

Install frontend dependencies:

```powershell
cd ..\frontend
npm.cmd install
```

## Run The Project

Use two terminals.

### Terminal 1: Run Backend

```powershell
cd c:\Users\Divyash\Downloads\fleet_management\backend
node server.js
```

Backend runs at:

```text
http://localhost:5000
```

### Terminal 2: Run Frontend

```powershell
cd c:\Users\Divyash\Downloads\fleet_management\frontend
npm.cmd start
```

Frontend runs at:

```text
http://localhost:3000
```

## Quick Copy-Paste Run Commands

Backend:

```powershell
cd c:\Users\Divyash\Downloads\fleet_management\backend
node server.js
```

Frontend:

```powershell
cd c:\Users\Divyash\Downloads\fleet_management\frontend
npm.cmd start
```

## Build Frontend

```powershell
cd c:\Users\Divyash\Downloads\fleet_management\frontend
npm.cmd run build
```

## Current UI Highlights

- Fixed dark sidebar with responsive mobile toggle
- Refreshed Reports dashboard layout
- Updated Drivers page UI
- Updated Maintenance page UI
- Updated Fuel Logs page UI
- PDF download buttons in Reports for `vehicle`, `trip`, and `expense` reports

## API Connection

Frontend API configuration is in:

- [frontend/src/services/api.js](C:/Users/Divyash/Downloads/fleet_management/frontend/src/services/api.js)

Default API base URL:

```text
http://localhost:5000/api
```

## Common Issues

- `npm` blocked in PowerShell:
  Use `npm.cmd` instead of `npm`
- MongoDB connection error:
  Make sure MongoDB is running or your Atlas URI is correct
- `ERR_NETWORK` in frontend:
  Confirm backend is running on port `5000`
- Login/token issues:
  Clear `fleetToken` and `fleetUser` from browser local storage and log in again

## Reports

PDF reports are generated from:

- `backend/controllers/reportController.js`

Supported report types:

- `vehicle`
- `trip`
- `expense`
