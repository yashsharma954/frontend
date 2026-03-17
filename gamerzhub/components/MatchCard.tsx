import { View, Text, StyleSheet, Image } from "react-native";

type Props = {
  game: string;
  logo: any;
  banner: any;
};

export default function MatchCard({
  game,
  logo,
  banner,
}: Props) {
  return (
    <View style={styles.card}>

      <Image source={banner} style={styles.banner} />

      <View style={styles.content}>
        <Image source={logo} style={styles.logo} />

        <View>
          <Text style={styles.game}>{game}</Text>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#010611",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    overflow: "hidden",
  },

  banner: {
    width: "100%",
    height: 120,
  },

  content: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    gap: 10,
  },

  logo: {
    width: 40,
    height: 40,
  },

  game: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  info: {
    color: "#d1d5db",
    fontSize: 13,
  },
});