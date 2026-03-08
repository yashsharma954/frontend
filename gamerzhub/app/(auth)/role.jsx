import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function RoleSelectScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <Text style={styles.title}>Welcome to GamerzHub 🎮</Text>
      <Text style={styles.subtitle}>
        Choose how you want to continue
      </Text>

      {/* PLAYER CARD */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/(tabs)/home")}
      >
        <Text style={styles.icon}>🎮</Text>
        <Text style={styles.cardTitle}>Continue as Player</Text>
        <Text style={styles.cardDesc}>
          Join tournaments, watch live matches & check leaderboard
        </Text>
      </TouchableOpacity>

      {/* HOST CARD */}
      <TouchableOpacity
        style={[styles.card, styles.hostCard]}
        onPress={() => router.push("/host/register")}
      >
        <Text style={styles.icon}>🏆</Text>
        <Text style={styles.cardTitle}>Continue as Host</Text>
        <Text style={styles.cardDesc}>
          Create tournaments, manage players & upload results
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#38bdf8",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#9ca3af",
    textAlign: "center",
    marginBottom: 30,
  },
  card: {
    backgroundColor: "#0f172a",
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  hostCard: {
    borderColor: "#7c3aed",
  },
  icon: {
    fontSize: 36,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#f9fafb",
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 13,
    color: "#cbd5e1",
    textAlign: "center",
  },
});
