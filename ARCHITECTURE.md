# Architecture

## Stack

- **Presentation**: React Native screens
- **Navigation**: React Navigation stack
- **State**: React Hooks (useState)
- **API**: TBD (backend planned)

## Component Hierarchy

```
App (Navigation)
├── LandingScreen
├── AuthScreen (state: isSignup)
├── BriefIntroScreen
└── LocaleScreen (state: searchText, selectedCounty)
```

## Data Flow

User Inputs → Component State → UI Updates

## Navigation

Landing → Auth → BriefIntro → Locale

## Colors & Styling

Use `StyleSheet.create()` for all styles.

- Primary: #ffd649 (yellow)
- Dark: #003055 (blue)
- Accent: #88bfb8 (teal)

## Performance

- FlatList for county list
- SafeAreaView for notches
- StyleSheet optimization
