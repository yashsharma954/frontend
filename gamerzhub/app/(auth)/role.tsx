
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function RoleSelectScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Dynamic Background Gradient */}
      <LinearGradient
        colors={["#0a0e17", "#1e2937", "#0f172a"]}
        style={styles.background}
      />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcome}>CHOOSE YOUR ROLE</Text>
        <Text style={styles.title}>
          Welcome to <Text style={styles.brand}>GAMERZHUB</Text>
        </Text>
        <Text style={styles.subtitle}>
          Enter the arena as a Player or Host
        </Text>
      </View>

      <View style={styles.cardsContainer}>
        {/* PLAYER CARD - Neon Cyan Theme */}
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.85}
          onPress={() => router.push("../(playertabs)/home")}
        >
          <LinearGradient
            colors={["#22d3ee", "#67e8f9"]}
            style={styles.gradientBorder}
          >
            <View style={styles.cardInner}>
              <View style={styles.iconWrapper}>
                <View style={styles.playerIconBg}>
                  <Text style={styles.icon}>🎮</Text>
                </View>
              </View>

              <View style={styles.content}>
                <Text style={styles.roleTitle}>PLAYER</Text>
                <Text style={styles.roleDesc}>
                  Join tournaments, compete against pros, climb global leaderboards and win big prizes
                </Text>
              </View>

              <Ionicons
                name="arrow-forward-circle"
                size={32}
                color="#67e8f9"
              />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* HOST CARD - Neon Purple Theme */}
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.85}
          onPress={() => router.push("/host/register")}
        >
          <LinearGradient
            colors={["#c026d3", "#e879f9"]}
            style={styles.gradientBorder}
          >
            <View style={styles.cardInner}>
              <View style={styles.iconWrapper}>
                <View style={styles.hostIconBg}>
                  <Text style={styles.icon}>🏆</Text>
                </View>
              </View>

              <View style={styles.content}>
                <Text style={styles.roleTitle}>TOURNAMENT HOST</Text>
                <Text style={styles.roleDesc}>
                  Create epic tournaments, manage players, control matches and build your esports community
                </Text>
              </View>

              <Ionicons
                name="arrow-forward-circle"
                size={32}
                color="#e879f9"
              />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Footer Note */}
      <Text style={styles.footerText}>
        Choose wisely. Your journey in the arena begins here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0e17",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },

  header: {
    paddingTop: 80,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  welcome: {
    fontSize: 14,
    fontWeight: "700",
    color: "#67e8f9",
    letterSpacing: 4,
    marginBottom: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: "900",
    color: "#f8fafc",
    textAlign: "center",
    letterSpacing: 1.5,
  },
  brand: {
    color: "#67e8f9",
  },
  subtitle: {
    fontSize: 16,
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 12,
    lineHeight: 22,
  },

  cardsContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    gap: 24,
  },

  card: {
    borderRadius: 28,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.5,
    shadowRadius: 25,
    elevation: 15,
  },

  gradientBorder: {
    padding: 3, // This creates the glowing border effect
  },

  cardInner: {
    backgroundColor: "#1e2937",
    borderRadius: 25,
    padding: 24,
    flexDirection: "row",
    alignItems: "center",
  },

  iconWrapper: {
    marginRight: 20,
  },
  playerIconBg: {
    width: 78,
    height: 78,
    borderRadius: 20,
    backgroundColor: "rgba(103, 232, 249, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#67e8f9",
  },
  hostIconBg: {
    width: 78,
    height: 78,
    borderRadius: 20,
    backgroundColor: "rgba(232, 121, 249, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#e879f9",
  },
  icon: {
    fontSize: 42,
  },

  content: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#f1f5f9",
    letterSpacing: 1,
    marginBottom: 8,
  },
  roleDesc: {
    fontSize: 14.5,
    color: "#cbd5e1",
    lineHeight: 20,
    opacity: 0.95,
  },

  footerText: {
    textAlign: "center",
    color: "#64748b",
    fontSize: 13,
    paddingBottom: 40,
    fontWeight: "500",
  },
});