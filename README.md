# Kiple Mockup Generator

A web-based mockup builder to customize and generate branded screen designs for the KiplePay e-wallet app.

## Features

- **Customizable Branding**: Upload logos, banners, and customize colors
- **Typography Options**: 7 Google Fonts to choose from (Inter, Roboto, Poppins, Montserrat, Open Sans, Lato, Nunito)
- **Multiple Screens**: Splash, Login, Home, Onboarding, eKYC, and more
- **Real-time Preview**: See changes instantly with device frame
- **Export Options**: Download individual screens or batch export as ZIP
- **Editable Content**: Customize all text labels and UI elements
- **Module Toggle**: Show/hide features like Transfer, Remittance, VISA, etc.

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **html-to-image** - Screen export
- **Google Fonts** - Typography

## Getting Started

First, install dependencies:

```bash
npm install
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the mockup generator.

## Available Screens

- Splash & Welcome
- Authentication (Login, Biometric)
- Onboarding
- eKYC Verification
- Home Screen

## Build

To create a production build:

```bash
npm run build
npm start
```

## Deploy on Vercel

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/booyen/kiple-assets-generator)

## License

Private
