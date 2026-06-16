Here is the professionally updated and expanded `README.md` file. It incorporates the detailed technical specifications, academic context, and enhanced feature descriptions from your logbook and codebase, making it an excellent portfolio piece.

```markdown
# Janjaruka App 🇰🇪

**Course:** BIT 4107 – Mobile Application Development  
**Student:** Uthman Mwongera (BIT/2024/74642)  
**Lecturer:** Mr. Nyoro Michael  
**Institution:** School of Computing, Bachelor of Information Technology (Year 3, Semester 2)  
**Framework:** React Native (Expo)  

---

## 📖 What is Janjaruka?

In Kenya's devolved governance system, the 47 county governments hold the constitutional mandate to enact local laws and bylaws. While these regulations are designed to maintain public order and urban sanitation, navigating their dense legal jargon presents a severe administrative hurdle for ordinary citizens. 

**Janjaruka** is a mobile civic-tech application engineered to bridge this accessibility gap. Operating as a streamlined, centralized digital directory for Kenyan County Bylaws, the application aggregates, simplifies, and categorizes local regulations into an intuitive mobile interface. It empowers everyday citizens, motorists, and small-scale traders to comprehend their civic rights, maintain regulatory compliance, and avoid arbitrary legal infractions seamlessly.

---

## ✨ Key Features

- **Smooth Onboarding & Auth:** Combined landing and authentication screen with cascading, premium animations and robust client-side form validation (email regex, password matching, terms agreement).
- **Intelligent Locale Selection:** Browse all 47 Kenyan counties with a custom `normalize` search function that sanitizes input (removing accents, special characters, and handling case-insensitivity) for fault-tolerant, user-friendly filtering.
- **Dynamic Responsive UI:** Category grids that automatically adapt between 1-column and 2-column layouts based on real-time device screen dimensions.
- **Context-Aware Navigation:** Conditional rendering and disabled states (e.g., the "Select" button remains disabled until a county is chosen) to prevent invalid navigation and improve UX.
- **Premium Touch Feedback:** Customized `activeOpacity` (0.7–0.8) and subtle shadow elevations across all `TouchableOpacity` elements for a native, polished feel.
- **Graceful Empty States:** Custom fallback UI components when search queries yield no results, ensuring the app never feels "broken" to the user.

---

## 🛠️ Tech Stack & Environment

- **OS:** Windows 11 Pro
- **IDE:** Visual Studio Code (with React Native extensions)
- **Runtime:** Node.js v24.16.0 | NPM v11.13.0
- **Framework:** React Native via Expo (~56.0.8)
- **Core Libraries:**
  - `@react-navigation/native` & `@react-navigation/native-stack` (Screen routing)
  - `react-native-vector-icons` (Premium, scalable iconography)
  - `react-native-safe-area-context` & `react-native-screens` (Native UI compatibility)
- **Testing & Debugging:** React Native Debugger, Chrome DevTools, iOS Simulator, Android Emulator.

---

## 📂 Project Structure

```text
JanjarukaApp/
├── App.js                     # Root navigation & routing configuration
├── screens/
│   ├── LandingScreen.js       # Welcome screen & combined Auth (Sign In/Up)
│   ├── BriefIntroScreen.js    # App value proposition & onboarding
│   ├── LocaleScreen.js        # County selection with smart search & map
│   ├── CategoriesScreen.js    # Civic category browsing (responsive grid)
│   └── MenuScreen.js          # Secondary navigation (Settings, Profile, etc.)
├── assets/                    # Images, icons, and map assets (e.g., kenyan-map.png)
├── app.json                   # Expo configuration
└── package.json               # Project dependencies and scripts
```

---

## 🚀 Quick Start

Follow these steps to get the project running locally on your machine.

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) and [Expo CLI](https://docs.expo.dev/get-started/installation/) installed.

### 2. Installation
```bash
# Clone the repository (or navigate to the project folder)
cd JanjarukaApp

# Install dependencies
npm install
```

### 3. Run the Application
```bash
# Start the Expo development server
npm start

# Choose your target platform from the terminal menu:
# - Press 'a' for Android Emulator
# - Press 'i' for iOS Simulator
# - Press 'w' for Web Browser
```

---

## 🗺️ App User Flow

1. **Landing / Auth** → User views the animated landing page, signs in or signs up with validated credentials.
2. **Brief Intro** → User reads a short onboarding message about the app's civic mission.
3. **Locale Selection** → User searches and selects their specific Kenyan county (with "Previous Locations" quick-select).
4. **Categories** → User browses civic categories (e.g., Parking, Solid Waste, Business Licensing) in a responsive grid.
0. **Menu** → Accessible from the Categories header, providing links to Notifications, Favourites, Settings, Profile, Terms of Use, and About.

---

## 🎨 Design System & Colors

The application maintains a highly consistent, accessible, and professional design language:
- **Primary Yellow:** `#FFD649` (Used for primary CTAs, headers, and highlight cards)
- **Deep Navy Blue:** `#003055` (Used for primary text, ensuring high contrast and readability)
- **Accent Teal:** `#16BBB3` / `#00B4A0` (Used for active states, icons, and success indicators)
- **Backgrounds:** `#FFFFFF` (Primary) and `#F8FAFC` (Secondary/Card backgrounds)

---

## 🔮 Next Steps & Future Improvements

As outlined in the project development plan, the following enhancements are slated for future iterations:
1. **Backend API Integration:** Replace hardcoded arrays (`ALL_COUNTIES`, `categories`) with asynchronous `fetch` calls to a RESTful API or local SQLite database.
2. **Loading & Error States:** Integrate `<ActivityIndicator />` and robust `try/catch` blocks to handle network unpredictability gracefully.
3. **User Profiles & Favorites:** Allow users to save specific bylaws or categories for quick offline access.
4. **Enhanced Accessibility (a11y):** Add `accessibilityLabel` and `accessibilityRole` to icon-only buttons for improved screen reader support.
5. **Dynamic Dimensions Hook:** Refactor static `Dimensions.get("window")` calls to use the `useWindowDimensions()` hook for true, real-time responsiveness during device rotation.

---

*Last Updated: June 2026 | Course: BIT 4107*
```
