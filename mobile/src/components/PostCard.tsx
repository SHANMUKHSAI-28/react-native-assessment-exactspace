import { StyleSheet, Text, View } from 'react-native';

type Props = {
  title: string;
  body: string;
};

export function PostCard({ title, body }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E5E7EB',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 6,
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
    color: '#374151',
  },
});
