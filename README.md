# Tracibility Application

## Development

To run the application in development mode:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

This will start the application with nodemon for auto-reloading.

## Building for Production

To build the application for production:

```bash
# Build the application
npm run build:prod
```

This will:
1. Clean the build directory
2. Process and minify CSS
3. Concatenate and minify JavaScript
4. Optimize images
5. Copy views, server files, and environment variables
6. Create a production-specific app.js file

## Running in Production

To run the application in production mode:

```bash
# Start the production server
npm run start:prod
```

This will start the application from the build directory.

## Project Structure

- `app.js` - Main application file for development
- `build-app.js` - Production-specific application file
- `build/` - Production build directory
  - `public/` - Static assets (CSS, JS, images, fonts)
  - `views/` - EJS templates
  - `routes/` - Express routes
  - `controllers/` - Route controllers
  - `models/` - Data models
  - `middleware/` - Express middleware
  - `config/` - Configuration files
  - `helper/` - Helper functions
  - `app.js` - Production application entry point
  - `.env` - Environment variables

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for development
- `npm run watch` - Watch for file changes and rebuild
- `npm run clean` - Clean the build directory
- `npm run build:prod` - Build the application for production
- `npm run start:prod` - Start the application in production mode 