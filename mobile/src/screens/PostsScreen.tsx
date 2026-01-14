import { useMemo } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

import { PostCard } from '../components/PostCard';
import { SearchInput } from '../components/SearchInput';
import { StateMessage } from '../components/StateMessage';
import { usePersistedSearch } from '../hooks/usePersistedSearch';
import { usePosts } from '../hooks/usePosts';

export function PostsScreen() {
  const { posts, isLoading, isRefreshing, errorMessage, refresh } = usePosts();
  const { searchText, setSearchText } = usePersistedSearch();

  const filteredPosts = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    if (!query) return posts;

    return posts.filter((post) =>
      post.title.toLowerCase().includes(query),
    );
  }, [posts, searchText]);

  const showEmpty =
    !isLoading && !errorMessage && filteredPosts.length === 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <SearchInput value={searchText} onChangeText={setSearchText} />

        {isLoading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" />
          </View>
        ) : errorMessage ? (
          <StateMessage message={errorMessage} />
        ) : (
          <FlatList
            data={filteredPosts}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={
              showEmpty ? styles.emptyContainer : styles.listContainer
            }
            renderItem={({ item }) => (
              <PostCard title={item.title} body={item.body} />
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            refreshing={isRefreshing}
            onRefresh={refresh}
            ListEmptyComponent={
              showEmpty ? (
                <StateMessage message="No posts found." />
              ) : null
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  separator: {
    height: 12,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
