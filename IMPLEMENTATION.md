# Exact Implementation Document — React Native Posts + Search + AsyncStorage

Date: January 14, 2026

## 1) Purpose
Build a React Native application that:
- Fetches a list of posts from `https://jsonplaceholder.typicode.com/posts`
- Displays them in a `FlatList` (title + body)
- Filters posts by title in real time as the user types (case-insensitive)
- Persists the user’s latest search text using AsyncStorage and restores it on app restart
- Persists a small recent search history list (optional enhancement) to quickly re-apply past searches
- Handles API failures and empty search results states

This document describes an *exact*, buildable implementation approach: folder structure, modules, state flow, UI states, and acceptance criteria.

## 2) Scope
### In scope (mandatory)
- Fetch posts from `/posts`
- Render list UI
- Search input + instant filtering
- Persist search text to AsyncStorage on change
- Restore persisted search text on startup and auto-apply filtering
- Error state: network/API failures
- Empty state: no results after filtering

### Optional (bonus, recommended)
- Loading indicator while fetching
- Pull-to-refresh
- Reusable `PostCard` component
- Clean folder structure (`components`, `hooks`, `services`)

### Out of scope
- Authentication
- Pagination/infinite scroll
- Offline caching of full post list
- Complex state management libraries (Redux/MobX)

## 3) Tech Decisions
### Networking
- Use built-in `fetch` (no extra dependency) for simplicity.
- A small `services/postsApi.ts` module isolates API details.

### Persistence
- Use `@react-native-async-storage/async-storage`.
- Persist *the latest search text* under a single key (requirement: auto-fill and apply filtering on restart).

### State management
- Use React hooks (`useState`, `useEffect`, `useMemo`, `useCallback`).
- Optional: a `usePosts` hook for fetch/loading/error/refresh logic.

## 4) Proposed Folder Structure
```
src/
  components/
    PostCard.tsx
    SearchInput.tsx
    StateMessage.tsx
  hooks/
    usePosts.ts
    usePersistedSearch.ts
  services/
    postsApi.ts
    storage.ts
  types/
    post.ts
  screens/
    PostsScreen.tsx
App.tsx
```

If you already have an existing structure, keep it; the important part is separation of concerns:
- UI components in `components/`
- data loading in `services/` + `hooks/`

## 5) Data Contracts
### Post type
From JSONPlaceholder `/posts`:
- `userId: number`
- `id: number`
- `title: string`
- `body: string`

Define:
- `src/types/post.ts` exporting `export type Post = { userId: number; id: number; title: string; body: string }`

## 6) Storage Contract
### Key
- `SEARCH_TEXT_KEY = 'searchText'` (single key)
- `SEARCH_HISTORY_KEY = 'searchHistory'` (JSON array of strings)

### Behavior
- On every search text change, persist the value to AsyncStorage.
- On app startup, load it once and set it as initial search text.

Recent history behavior (enhancement):
- Maintain a list of up to N recent search strings (deduped case-insensitively).
- Persist the history list to AsyncStorage.
- Show history as tappable chips under the search input.

Notes:
- Persisting on every keystroke is acceptable for this assessment.
- Optional improvement: debounce writes by ~250–400ms to reduce AsyncStorage churn. If you debounce, the UI filter must still update instantly (filtering stays in memory; only storage writes are delayed).

## 7) UI/UX Requirements and States
### Main screen layout
Top-to-bottom:
1. Search input (single line text input)
2. Content area:
   - Loading state: activity indicator (bonus)
   - Error state: message “Unable to fetch posts. Check your network connection.”
   - Empty state: “No posts found.”
   - Success state: `FlatList` of posts

### Post row UI
- Title: prominent (semi-bold)
- Body: secondary text
- Card-like container with spacing and subtle border/shadow

### Pull-to-refresh (bonus)
- `FlatList` uses `refreshing` + `onRefresh` to re-fetch posts.

## 8) Implementation Details (Exact)

### 8.1 services/postsApi.ts
Responsibilities:
- Fetch posts
- Throw an error on non-2xx

Behavior:
- `fetchPosts()` returns `Promise<Post[]>`

Pseudo:
- `const res = await fetch(URL)`
- `if (!res.ok) throw new Error('HTTP_' + res.status)`
- `return (await res.json()) as Post[]`

### 8.2 services/storage.ts
Responsibilities:
- Wrap AsyncStorage read/write with typed helpers

Exports:
- `getString(key): Promise<string | null>`
- `setString(key, value): Promise<void>`

### 8.3 hooks/usePosts.ts
State:
- `posts: Post[]`
- `isLoading: boolean`
- `error: string | null`
- `isRefreshing: boolean`

API:
- `reload()` (initial fetch)
- `refresh()` (pull-to-refresh)

Rules:
- Initial load sets `isLoading=true`
- Pull-to-refresh sets `isRefreshing=true` (not necessarily `isLoading`)
- On failure, set `error` and empty posts only if needed

Error messaging:
- UI shows exactly: “Unable to fetch posts. Check your network connection.”
- Internal `error` string can be simplified to that exact message.

### 8.4 hooks/usePersistedSearch.ts
State:
- `searchText: string`
- `isHydrated: boolean` (optional but useful)

Behavior:
- On mount: load `SEARCH_TEXT_KEY`. If it exists, set `searchText`.
- On `searchText` change: write to AsyncStorage.

Optional improvement:
- Debounce AsyncStorage write.

### 8.5 screens/PostsScreen.tsx
Responsibilities:
- Compose hooks and components
- Filter posts instantly as user types
- Show correct UI state

Filtering rule (exact):
- `query = searchText.trim().toLowerCase()`
- If `query` is empty: show all posts
- Else: `posts.filter(p => p.title.toLowerCase().includes(query))`

Empty results:
- If not loading, not error, and filtered list length is 0 → show “No posts found.”

### 8.6 components
- `SearchInput`: controlled input with `value` and `onChangeText`.
- `PostCard`: accepts `title`, `body` (or `post`), renders a clean card.
- `StateMessage`: reusable message UI for empty/error.

## 9) Acceptance Criteria (Mapped to requirements)
1) Fetch & Display Posts
- App fetches from `GET https://jsonplaceholder.typicode.com/posts` on launch.
- Posts display `title` and `body` in a `FlatList`.

2) Search Functionality
- Search input at top.
- Filtering is case-insensitive.
- Filtering updates instantly with each keystroke.

3) Save Search Using AsyncStorage
- Typing updates persisted search text.
- Restarting the app restores the saved search text into the input.
- Restored value immediately filters the list.

4) Error Handling
- If fetch fails, show: “Unable to fetch posts. Check your network connection.”
- If search yields no results, show: “No posts found.”

## 10) Manual Test Checklist
- Launch with network on → list loads.
- Type a query matching some titles → list filters instantly.
- Type nonsense query → “No posts found.” appears.
- Kill app and reopen → query is restored and filtering is applied.
- Disable network and relaunch → error message appears.
- Pull-to-refresh (if implemented) → refreshes list.

## 11) Submission Notes (what to include)
- RN version used
- Any additional libraries installed (e.g., `@react-native-async-storage/async-storage`)
- Bonus features implemented (loading, pull-to-refresh, PostCard, folder structure)
