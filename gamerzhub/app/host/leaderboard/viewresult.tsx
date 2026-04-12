import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function ViewResultScreen() {
  const { id } = useLocalSearchParams();

  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [resultTable, setResultTable] = useState([]);

  const fetchResult = async () => {
    try {
      const res = await fetch(
        `http://192.168.31.126:8000/api/v1/host/result/${id}`
      );

      const data = await res.json();
      console.log("RESULT 👉", data);

      if (!data.success) {
        alert(data.message);
        return;
      }
      console.log("data of image is ",data.data.leaderboard);
      console.log("data of image is ",data.data.leaderboardtable);

      setImage(data.data.leaderboard);
      setResultTable(data.data.leaderboardtable || []);
    } catch (err) {
      console.log(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResult();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Match Result</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#38bdf8" />
      ) : image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Text style={styles.empty}>Result not uploaded yet</Text>
      )}
      {resultTable.length > 0 && (
  <View style={styles.table}>
    
    {/* HEADER */}
    <View style={styles.headerRow}>
      <Text style={styles.header}>Rank</Text>
      <Text style={styles.header}>Team</Text>
      <Text style={styles.header}>Prize</Text>
    </View>

    {/* ROWS */}
    {resultTable.map((item, index) => (
      <View key={index} style={styles.row}>
        <Text style={styles.cell}>#{item.rank}</Text>
        <Text style={styles.cell}>
          {item.teamName || "N/A"}
        </Text>
        <Text style={styles.cell}>₹{item.prize}</Text>
      </View>
    ))}
  </View>
)}
    </View>
    
  );
}
const styles = StyleSheet.create({
  table: {
  marginTop: 20,
},

headerRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  borderBottomWidth: 1,
  borderColor: "#1e293b",
  paddingBottom: 8,
  marginBottom: 10,
},

header: {
  color: "#38bdf8",
  fontWeight: "bold",
  width: "33%",
  textAlign: "center",
},

row: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 10,
  backgroundColor: "#0f172a",
  padding: 10,
  borderRadius: 10,
},

cell: {
  color: "#e5e7eb",
  width: "33%",
  textAlign: "center",
},
  container: {
    flex: 1,
    backgroundColor: "#020617",
    padding: 16,
    justifyContent: "center",
  },

  title: {
    color: "#38bdf8",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  image: {
    width: "100%",
    height: 400,
    borderRadius: 16,
    resizeMode: "contain",
  },

  empty: {
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 20,
  },
});