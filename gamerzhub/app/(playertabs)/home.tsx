// import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
// import { useRouter } from "expo-router";

// import MatchCard from "@/components/MatchCard";
// import Tournaments from "@/data/homeTournaments";

// import bgmiLogo from "@/assets/images/bgmi.png";
// import freeFireLogo from "@/assets/images/freefire.png";
// import bgmiBanner from "@/assets/images/bgmibanner.jpg";
// import freeFireBanner from "@/assets/images/freefirebanner.jpg";

// export default function HomeScreen() {

//   const router = useRouter();

//   return (
//     <ScrollView style={styles.screen}>

//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.title}>GamerzHub</Text>
//         <Text style={styles.logo}>🎮</Text>
//       </View>

//       {/* Tournament Cards */}
//       {Tournaments.map((item) => (

//         <View key={item.id}>

//           <MatchCard
//             game={item.game}
//             logo={item.game === "BGMI" ? bgmiLogo : freeFireLogo}
//             banner={item.game === "BGMI" ? bgmiBanner : freeFireBanner}
//           />

//           {/* View Tournament Button */}
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() =>
//               router.push(`../player/tournament?game=${item.game}`)
//             }
//           >
//             <Text style={styles.buttonText}>
//               View {item.game} Tournaments
//             </Text>
//           </TouchableOpacity>

//         </View>

//       ))}

//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({

//   screen: {
//     flex: 1,
//     backgroundColor: "#1f032a",
//   },

//   header: {
//     paddingVertical: 16,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 8,
//   },

//   logo: {
//     fontSize: 22,
//   },

//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#38bdf8",
//   },

//   button: {
//     marginTop: 10,
//     marginHorizontal: 20,
//     backgroundColor: "#38bdf8",
//     paddingVertical: 12,
//     borderRadius: 10,
//     alignItems: "center",
//   },

//   buttonText: {
//     color: "#020617",
//     fontWeight: "bold",
//   },

// });

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient"; // Add this package if not installed

import MatchCard from "@/components/MatchCard";
import Tournaments from "@/data/homeTournaments";

import bgmiLogo from "@/assets/images/bgmi.png";
import freeFireLogo from "@/assets/images/freefire.png";
import bgmiBanner from "@/assets/images/bgmibanner.jpg";
import freeFireBanner from "@/assets/images/freefirebanner.jpg";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView 
      style={styles.screen}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Hero Header */}
      <LinearGradient
        colors={["#0f172a", "#1e2937", "#0f172a"]}
        style={styles.hero}
      >
        <View style={styles.headerContent}>
          <Text style={styles.welcome}>WELCOME TO</Text>
          <Text style={styles.appName}>GAMERZHUB</Text>
          <Text style={styles.tagline}>
            Compete • Win • Dominate
          </Text>
        </View>

        {/* Neon Glow Effect */}
        <View style={styles.glowContainer}>
          <Text style={styles.glowText}>🎮</Text>
        </View>
      </LinearGradient>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>248</Text>
          <Text style={styles.statLabel}>Active Players</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>47</Text>
          <Text style={styles.statLabel}>Live Tournaments</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>₹2.4L</Text>
          <Text style={styles.statLabel}>Prize Pool Today</Text>
        </View>
      </View>

      {/* Featured Tournaments Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Tournaments</Text>
         
        </View>

        {Tournaments.map((item, index) => (
          <View key={item.id} style={styles.tournamentWrapper}>
            <MatchCard
              game={item.game}
              logo={item.game === "BGMI" ? bgmiLogo : freeFireLogo}
              banner={item.game === "BGMI" ? bgmiBanner : freeFireBanner}
            />

            {/* Enhanced Action Button */}
            <TouchableOpacity
              style={styles.viewButton}
              onPress={() =>
                router.push(`../player/tournament?game=${item.game}`)
              }
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={["#67e8f9", "#22d3ee"]}
                style={styles.gradientButton}
              >
                <Text style={styles.viewButtonText}>
                  EXPLORE {item.game} TOURNAMENTS
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      {/* <View style={styles.quickActions}>
        <Text style={styles.quickTitle}>Quick Actions</Text>
        
        <View style={styles.actionRow}>
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => router.push("/create")}
          >
            <Text style={styles.actionIcon}>🏆</Text>
            <Text style={styles.actionText}>Host Tournament</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => router.push("/my-tournaments")}
          >
            <Text style={styles.actionIcon}>📋</Text>
            <Text style={styles.actionText}>My Tournaments</Text>
          </TouchableOpacity>
        </View>
      </View> */}

      {/* Bottom Spacing */}
      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0a0e17",
  },
  scrollContent: {
    paddingBottom: 20,
  },

  /* HERO SECTION */
  hero: {
    height: 240,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  headerContent: {
    alignItems: "center",
    zIndex: 2,
  },
  welcome: {
    fontSize: 14,
    color: "#94a3b8",
    letterSpacing: 3,
    fontWeight: "600",
  },
  appName: {
    fontSize: 42,
    fontWeight: "900",
    color: "#67e8f9",
    letterSpacing: 2,
    textShadowColor: "#67e8f9",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  tagline: {
    fontSize: 17,
    color: "#e0f2fe",
    marginTop: 8,
    fontWeight: "500",
  },
  glowContainer: {
    position: "absolute",
    bottom: -30,
    opacity: 0.15,
  },
  glowText: {
    fontSize: 180,
  },

  /* STATS */
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#1e2937",
    marginHorizontal: 16,
    marginTop: -40,
    borderRadius: 20,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: "#334155",
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
  },
  statBox: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "800",
    color: "#facc15",
  },
  statLabel: {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 4,
    textAlign: "center",
  },

  /* SECTION */
  section: {
    paddingHorizontal: 16,
    marginTop: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#f8fafc",
  },
  seeAll: {
    color: "#67e8f9",
    fontWeight: "600",
    fontSize: 15,
  },

  tournamentWrapper: {
    marginBottom: 28,
  },

  /* BUTTON */
  viewButton: {
    marginHorizontal: 4,
    marginTop: 12,
    borderRadius: 16,
    overflow: "hidden",
  },
  gradientButton: {
    paddingVertical: 16,
    alignItems: "center",
  },
  viewButtonText: {
    color: "#0f172a",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  /* QUICK ACTIONS */
  quickActions: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  quickTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#e0f2fe",
    marginBottom: 14,
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
  },
  actionCard: {
    flex: 1,
    backgroundColor: "#1e2937",
    borderRadius: 18,
    paddingVertical: 22,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#334155",
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  actionText: {
    color: "#cbd5e1",
    fontWeight: "600",
    fontSize: 15,
  },
});