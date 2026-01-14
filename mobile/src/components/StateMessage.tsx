import { StyleSheet, Text, View } from 'react-native';

type Props = {
  message: string;
};

export function StateMessage({ message }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 14,
  },
});
