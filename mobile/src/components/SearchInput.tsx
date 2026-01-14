import { StyleSheet, TextInput, View } from 'react-native';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export function SearchInput({ value, onChangeText }: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search by title..."
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
        accessibilityLabel="Search posts"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: '#fff',
  },
  input: {
    height: 44,
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: '#F2F4F7',
    color: '#111827',
  },
});
