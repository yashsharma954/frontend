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

      setImage(data.data.leaderboard);
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
    </View>
  );
}
const styles = StyleSheet.create({
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