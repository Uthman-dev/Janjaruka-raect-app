# JanjarukaApp

**Course:** BIT 4107 - Mobile App Development  
**Framework:** React Native (Expo)

## What is JanjarukaApp?

Mobile app that helps Kenyans understand local bylaws by county. Users sign in, select their county, and access regional regulations.

## Key Features

- Sign in/Sign up with email or social login
- Browse all 47 Kenyan counties
- Search counties in real-time
- Clean, intuitive UI

## Tech Stack

- **React Native** 0.85.3
- **Expo** ~56.0.8
- **React Navigation** ^7.2.5
- **React** 19.2.3

## Project Structure

```
JanjarukaApp/
├── App.js                     # Navigation & routing
├── screens/
│   ├── LandingScreen.js       # Welcome
│   ├── AuthScreen.js          # Login
│   ├── BriefIntroScreen.js    # About app
│   └── LocaleScreen.js        # Select county
├── assets/                    # Icons & images
├── app.json                   # Expo config
└── package.json               # Dependencies
```

## Quick Start

```bash
# Install
npm install

# Run
npm start

# Choose platform
npm run android    # Android
npm run ios        # iOS
npm run web        # Web browser
```

## App Flow

Landing → Auth → Intro → Select County

## Colors

- Yellow: #ffd649 (Primary)
- Dark Blue: #003055 (Text)
- White: #fff (Background)

## Next Steps

- Backend API integration
- User profiles & favorites
- Bylaws database
- Offline support

**Course**: BIT 4107 | **Last Updated**: June 2026
