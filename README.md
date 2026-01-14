# react-native-assessment-exactspace
React Native assessment application for ExactSpace. The app fetches posts from a public API, supports real-time search with AsyncStorage persistence, and includes proper error handling and clean component structure.

## Run the app

The React Native app lives in `mobile/` (Expo + TypeScript).

Prereqs:
- Node.js LTS
- Expo Go installed on your phone (recommended), or Android Studio emulator

Commands:
1. `cd mobile`
2. `npm install`
3. `npm run start`

Then:
- Scan the QR code with Expo Go, or
- Press `a` for Android emulator, or `w` for web.

## Features implemented
- Fetch posts from `https://jsonplaceholder.typicode.com/posts`
- Display `title` + `body` in a `FlatList`
- Real-time, case-insensitive search by title
- Persist search text using AsyncStorage and restore it on restart
- Error state: “Unable to fetch posts. Check your network connection.”
- Empty search state: “No posts found.”
- Bonus: loading indicator and pull-to-refresh

## Notes
- The post content is expected “random” placeholder text because JSONPlaceholder returns sample lorem ipsum.
- You may see a console warning about `SafeAreaView` deprecation (from React Native). It does not affect functionality.
