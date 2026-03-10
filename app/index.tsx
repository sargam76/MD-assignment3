import { View, Text, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Form</Text>

      <Link href="/employee" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Go to Employee Form</Text>
        </Pressable>
      </Link>

      <Link href="/signin" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Go to Sign In</Text>
        </Pressable>
      </Link>

      <Link href="/signup" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Go to Sign Up</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 8,
    width: 220,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});