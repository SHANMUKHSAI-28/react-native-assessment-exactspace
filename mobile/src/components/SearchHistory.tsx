import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

type Props = {
  items: string[];
  onSelect: (value: string) => void;
  onClear: () => void;
};

export function SearchHistory({ items, onSelect, onClear }: Props) {
  if (items.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Recent searches</Text>
        <Pressable onPress={onClear} hitSlop={10} accessibilityRole="button">
          <Text style={styles.clearText}>Clear</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsRow}
      >
        {items.map((item) => (
          <Pressable
            key={item}
            onPress={() => onSelect(item)}
            accessibilityRole="button"
            style={styles.chip}
          >
            <Text style={styles.chipText} numberOfLines={1}>
              {item}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  headerText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  clearText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563EB',
  },
  chipsRow: {
    gap: 8,
    paddingRight: 16,
  },
  chip: {
    maxWidth: 220,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#F2F4F7',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E5E7EB',
  },
  chipText: {
    fontSize: 12,
    color: '#111827',
  },
});
