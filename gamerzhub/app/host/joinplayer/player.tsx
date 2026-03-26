import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function PlayerListScreen() {
  const { id } = useLocalSearchParams(); // tournament id
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPlayers = async () => {
    try {
      const res = await fetch(
        `http://192.168.31.126:8000/api/v1/player/tournament/${id}`
      );

      const data = await res.json();
      console.log("data is ",data);

      if (data.success) {
        setPlayers(data.data.players);
      }
    } catch (err) {
      console.log("Player fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "#94a3b8" }}>Loading players...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.heading}>👥 Joined Players</Text>

      <FlatList
  data={players}
  keyExtractor={(item) => item._id}
  renderItem={({ item }) => (
    <View style={styles.card}>
      
      {/* TEAM HEADER */}
      <Text style={styles.teamName}>🏆 {item.teamName}</Text>
     

      {/* TEAM MEMBERS */}
      {item.members.map((m, index) => (
        <View key={index} style={styles.row}>
          

          <View>
            <Text style={styles.name}>
              Player {index + 1}
            </Text>

            <Text style={styles.sub}>
              🎮 IGN: {m.ign}
            </Text>
          </View>
        </View>
      ))}

      {/* FOOTER */}
      <View style={styles.bottomRow}>
        <Text style={{ color: "#22c55e" }}>
          {item.payment ? "✅ Paid" : "❌ Pending"}
        </Text>

        <Text style={styles.time}>
          {new Date(item.joinedAt).toLocaleString()}
        </Text>
      </View>

    </View>
  )}
/>

    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#020617",
    padding: 16,
  },

  heading: {
    color: "#f8fafc",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  teamName: {
  backgroundColor: "#020617",
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 10,
  marginBottom: 10,
  borderWidth: 1,
  borderColor: "#1e293b",
  color: "#facc15",   // ⭐ THIS LINE
  fontWeight: "700",
  fontSize: 14,
},


  card: {
    backgroundColor: "#0f172a",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1e293b",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 50,
    marginRight: 12,
    borderWidth: 2,
    borderColor: "#38bdf8",
  },

  name: {
    color: "#e5e7eb",
    fontWeight: "700",
    fontSize: 14,
  },

  sub: {
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 2,
  },

  bottomRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  payment: {
    fontSize: 12,
    fontWeight: "bold",
  },

  time: {
    color: "#64748b",
    fontSize: 11,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#020617",
  },
});
