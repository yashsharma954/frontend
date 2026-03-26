import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";

export default function GoLiveScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [roomId, setRoomId] = useState("");
  const [password, setPassword] = useState("");

  const handleGoLive = async () => {
    if (!roomId || !password) {
      alert("Fill all fields");
      return;
    }

    try {
      const res = await fetch("http://192.168.31.126:8000/api/v1/host/tournaments/golive", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tournamentId: id,
          roomId,
          roomPassword: password,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      alert("🚀 Tournament is LIVE");
      router.push("./mytournament")

    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Go Live</Text>

      <TextInput
        placeholder="Room ID"
        value={roomId}
        onChangeText={setRoomId}
        style={styles.input}
      />

      <TextInput
        placeholder="Room Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleGoLive}>
        <Text style={styles.text}>Start Match</Text>
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
    color: "#38bdf8",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#0f172a",
    padding: 14,
    borderRadius: 12,
    color: "#fff",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#22c55e",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  text: {
    color: "#020617",
    fontWeight: "bold",
  },
});