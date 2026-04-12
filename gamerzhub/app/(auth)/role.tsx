// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { useRouter } from "expo-router";

// export default function RoleSelectScreen() {
//   const router = useRouter();

//   return (
//     <View style={styles.container}>
//       {/* HEADER */}
//       <Text style={styles.title}>Welcome to GamerzHub 🎮</Text>
//       <Text style={styles.subtitle}>
//         Choose how you want to continue
//       </Text>

//       {/* PLAYER CARD */}
//       <TouchableOpacity
//         style={styles.card}
//         onPress={() => router.push("../(playertabs)/home")}
//       >
//         <Text style={styles.icon}>🎮</Text>
//         <Text style={styles.cardTitle}>Continue as Player</Text>
//         <Text style={styles.cardDesc}>
//           Join tournaments, watch live matches & check leaderboard
//         </Text>
//       </TouchableOpacity>

//       {/* HOST CARD */}
//       <TouchableOpacity
//         style={[styles.card, styles.hostCard]}
//         onPress={() => router.push("/host/register")}
//       >
//         <Text style={styles.icon}>🏆</Text>
//         <Text style={styles.cardTitle}>Continue as Host</Text>
//         <Text style={styles.cardDesc}>
//           Create tournaments, manage players & upload results
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#020617",
//     padding: 20,
//     justifyContent: "center",
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#38bdf8",
//     textAlign: "center",
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: "#9ca3af",
//     textAlign: "center",
//     marginBottom: 30,
//   },
//   card: {
//     backgroundColor: "#0f172a",
//     borderRadius: 18,
//     padding: 20,
//     marginBottom: 18,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#1e293b",
//   },
//   hostCard: {
//     borderColor: "#7c3aed",
//   },
//   icon: {
//     fontSize: 36,
//     marginBottom: 10,
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#f9fafb",
//     marginBottom: 6,
//   },
//   cardDesc: {
//     fontSize: 13,
//     color: "#cbd5e1",
//     textAlign: "center",
//   },
// });


import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
// Using Expo's built-in vector icons
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 

export default function RoleSelectScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>
          Welcome to <Text style={styles.brandText}>GamerzHub</Text>
        </Text>
        <Text style={styles.subtitle}>Choose your path to continue</Text>
      </View>

      <View style={styles.cardsContainer}>
        {/* PLAYER CARD */}
        <TouchableOpacity
          style={[styles.card, styles.playerCard]}
          activeOpacity={0.7}
          onPress={() => router.push("../(playertabs)/home")}
        >
          <View style={[styles.iconContainer, styles.playerIconBg]}>
            {/* <Ionicons name="game-controller" size={32} color="#38bdf8" /> */}
            <Text style={styles.icon}>🎮</Text>
          </View>
          
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Player</Text>
            <Text style={styles.cardDesc}>
              Join tournaments, watch matches & climb the leaderboard
            </Text>
          </View>
          
          <Ionicons name="chevron-forward" size={24} color="#38bdf8" style={styles.chevron} />
        </TouchableOpacity>

        {/* HOST CARD */}
        <TouchableOpacity
          style={[styles.card, styles.hostCard]}
          activeOpacity={0.7}
          onPress={() => router.push("/host/register")}
        >
          <View style={[styles.iconContainer, styles.hostIconBg]}>
            {/* <MaterialCommunityIcons name="trophy-award" size={32} color="#a855f7" /> */}
            <Text style={styles.icon}>🏆</Text>
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Tournament Host</Text>
            <Text style={styles.cardDesc}>
              Create events, manage players & update match results
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={24} color="#a855f7" style={styles.chevron} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617", // Deeper, richer dark background
    padding: 24,
    justifyContent: "center",
  },
  header: {
    marginBottom: 48,
  },
  title: {
    fontSize: 34,
    fontWeight: "900",
    color: "#f8fafc",
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  brandText: {
    color: "#38bdf8", // Gaming cyan/blue
  },
   icon: {
    fontSize: 36,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#94a3b8",
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  cardsContainer: {
    gap: 20, // Adds space between the two cards
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f172a",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5, // For Android shadow
  },
  playerCard: {
    borderColor: "rgba(56, 189, 248, 0.3)", // Subtle cyan border
  },
  hostCard: {
    borderColor: "rgba(168, 85, 247, 0.3)", // Subtle purple border
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  playerIconBg: {
    backgroundColor: "rgba(56, 189, 248, 0.1)",
  },
  hostIconBg: {
    backgroundColor: "rgba(168, 85, 247, 0.1)",
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#f1f5f9",
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  cardDesc: {
    fontSize: 13,
    color: "#94a3b8",
    lineHeight: 18,
  },
  chevron: {
    marginLeft: 12,
    opacity: 0.8,
  },
});