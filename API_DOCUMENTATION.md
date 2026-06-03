# Components & API

## Screens

### LandingScreen
- Welcome page
- "Get Started" button → navigates to Auth
- No state

### AuthScreen
- Sign in / Sign up form
- State: `isSignup` (boolean)
- Navigate to BriefIntro on submit

### BriefIntroScreen
- App introduction text
- "Continue" button → navigates to Locale
- No state

### LocaleScreen
- Displays 47 Kenyan counties
- State: `searchText`, `selectedCounty`
- Search/filter functionality
- FlatList for performance

## Navigation

```javascript
<Stack.Navigator initialRouteName="Landing">
  <Stack.Screen name="Landing" component={LandingScreen} />
  <Stack.Screen name="Auth" component={AuthScreen} />
  <Stack.Screen name="BriefIntro" component={BriefIntroScreen} />
  <Stack.Screen name="Locale" component={LocaleScreen} />
</Stack.Navigator>
```

## Styling

All components use `StyleSheet.create()` for optimization.

**Colors**:
- Yellow: #ffd649
- Blue: #003055
- Teal: #88bfb8

**FontSizes**: 16, 18, 20, 28, 48px

## State Management

- Currently using React Hooks (useState)
- Future: Consider Redux/Context API for global state

## Data

Kenyan counties: 47 total (list in LocaleScreen.js)

## Future APIs

```
POST /auth/signin
POST /auth/signup
GET /bylaws?county={id}
GET /bylaws/search?q={query}
```
