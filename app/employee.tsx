import { View, Text, StyleSheet } from "react-native";

export default function EmployeeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Employee Information Form</Text>
      <Text style={styles.text}>
        Member 2 will build the employee form here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f8fafc",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 12,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    color: "#475569",
    textAlign: "center",
  },
});