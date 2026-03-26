

import { View, Text, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RoomDetailScreen() {
  const { id } = useLocalSearchParams();

  const [roomId, setRoomId] = useState("");
  const [roomPassword, setRoomPassword] = useState("");
  const [loading, setLoading] = useState(true);
  
 

  console.log("tournamentid is",id);

  const fetchRoom = async () => {
    // if (!userId) return;

    try {
      const res = await fetch(
        `http://192.168.31.126:8000/api/v1/host/tournaments/liveroom/${id}`
      );

      const data = await res.json();
      console.log("ROOM RESPONSE 👉", data);


      if (!data.success) {
        alert("Wait", data.message);
        return;
      }
      console.log("id is ",data.data._id);

      setRoomId(data.data.roomId);
      setRoomPassword(data.data.roompassword);
    } catch (err) {
      Alert.alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoom();
  }, []);
//   useEffect(() => {
//   if (userId) {
//     fetchRoom();
//   }
// }, [userId]);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 Tournament Room</Text>

      {loading ? (
        <Text style={{ color: "#94a3b8", textAlign: "center" }}>
          Fetching room details...
        </Text>
      ) : (
        <>
          <View style={styles.card}>
            <Text style={styles.label}>Room ID</Text>
            <Text style={styles.value}>{roomId}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Room Password</Text>
            <Text style={styles.value}>{roomPassword}</Text>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#0a1f30",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
  },
  label: {
    color: "#94a3b8",
    fontSize: 12,
  },
  value: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 4,
  },
  copyBtn: {
    backgroundColor: "#22c55e",
    padding: 14,
    borderRadius: 14,
    marginTop: 20,
    alignItems: "center",
  },
  copyText: {
    color: "#022c22",
    fontWeight: "bold",
  },
});

