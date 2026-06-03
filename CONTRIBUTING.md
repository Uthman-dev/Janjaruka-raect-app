# Contributing & Development

## Code Standards

- Use functional components with Hooks
- `StyleSheet.create()` for all styles
- `SafeAreaView` for screens
- Meaningful variable names (camelCase)

## Git Workflow

**Branch naming**:
```
feature/feature-name
bugfix/bug-description
refactor/refactor-name
```

**Commit format**:
```
feat: Add new feature
fix: Bug fix description
docs: Documentation updates
```

## Component Template

```javascript
import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

export default function MyScreen({ navigation }) {
  const [state, setState] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Content */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 20 }
});
```

## Testing

- Test on Android, iOS, Web
- Check navigation flows
- Verify no console errors
- Test responsive design

## Performance

- Use FlatList for lists
- Avoid inline styles
- Use React.memo when needed
- Optimize images

## Common Patterns

**State management**:
```javascript
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
```

**Error handling**:
```javascript
try {
  // code
} catch (error) {
  Alert.alert('Error', error.message);
}
```

## Resources

- [React Native](https://reactnative.dev/)
- [Expo](https://docs.expo.dev/versions/v56.0.0/)
- [React Navigation](https://reactnavigation.org/)
