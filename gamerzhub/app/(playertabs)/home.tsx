import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import MatchCard from "@/components/MatchCard";
import Tournaments from "@/data/homeTournaments";

import bgmiLogo from "@/assets/images/bgmi.png";
import freeFireLogo from "@/assets/images/freefire.png";
import bgmiBanner from "@/assets/images/bgmibanner.jpg";
import freeFireBanner from "@/assets/images/freefirebanner.jpg";

export default function HomeScreen() {

  const router = useRouter();

  return (
    <ScrollView style={styles.screen}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>GamerzHub</Text>
        <Text style={styles.logo}>🎮</Text>
      </View>

      {/* Tournament Cards */}
      {Tournaments.map((item) => (

        <View key={item.id}>

          <MatchCard
            game={item.game}
            logo={item.game === "BGMI" ? bgmiLogo : freeFireLogo}
            banner={item.game === "BGMI" ? bgmiBanner : freeFireBanner}
          />

          {/* View Tournament Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              router.push(`../player/tournament?game=${item.game}`)
            }
          >
            <Text style={styles.buttonText}>
              View {item.game} Tournaments
            </Text>
          </TouchableOpacity>

        </View>

      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  screen: {
    flex: 1,
    backgroundColor: "#1f032a",
  },

  header: {
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  logo: {
    fontSize: 22,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#38bdf8",
  },

  button: {
    marginTop: 10,
    marginHorizontal: 20,
    backgroundColor: "#38bdf8",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#020617",
    fontWeight: "bold",
  },

});