// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { useState } from "react";

// export default function GoLiveScreen() {
//   const { id } = useLocalSearchParams();
//   const router = useRouter();

//   const [roomId, setRoomId] = useState("");
//   const [password, setPassword] = useState("");

//   const handleGoLive = async () => {
//     if (!roomId || !password) {
//       alert("Fill all fields");
//       return;
//     }

//     try {
//       const res = await fetch("http://192.168.31.126:8000/api/v1/host/tournaments/golive", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           tournamentId: id,
//           roomId,
//           roomPassword: password,
//         }),
//       });

//       const data = await res.json();

//       if (!data.success) {
//         alert(data.message);
//         return;
//       }

//       alert("🚀 Tournament is LIVE");
//       router.push("./mytournament")

//     } catch (error) {
//       console.log(error);
//       alert("Server error");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Go Live</Text>

//       <TextInput
//         placeholder="Room ID"
//         value={roomId}
//         onChangeText={setRoomId}
//         style={styles.input}
//       />

//       <TextInput
//         placeholder="Room Password"
//         value={password}
//         onChangeText={setPassword}
//         style={styles.input}
//       />

//       <TouchableOpacity style={styles.button} onPress={handleGoLive}>
//         <Text style={styles.text}>Start Match</Text>
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
//     color: "#38bdf8",
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   input: {
//     backgroundColor: "#0f172a",
//     padding: 14,
//     borderRadius: 12,
//     color: "#fff",
//     marginBottom: 15,
//   },
//   button: {
//     backgroundColor: "#22c55e",
//     padding: 14,
//     borderRadius: 12,
//     alignItems: "center",
//   },
//   text: {
//     color: "#020617",
//     fontWeight: "bold",
//   },
// });


import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function GoLiveScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [roomId, setRoomId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleGoLive = async () => {
    if (!roomId.trim() || !password.trim()) {
      alert("Missing Fields Please enter both Room ID and Password");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "http://192.168.31.126:8000/api/v1/host/tournaments/golive",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tournamentId: id,
            roomId: roomId.trim(),
            roomPassword: password.trim(),
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert(
          "🚀 Tournament is Now LIVE! Players can now join the room.", 
        );
        router.push("./mytournament")
      } else {
        alert("Failed Something went wrong"+ data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Server Error Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0a0e17", "#1e2937", "#0f172a"]}
        style={styles.background}
      />

      <View style={styles.header}>
        <Ionicons name="radio" size={60} color="#22c55e" />
        <Text style={styles.title}>GO LIVE</Text>
        <Text style={styles.subtitle}>
          Enter room details to start the match
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>ROOM ID</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="game-controller" size={22} color="#67e8f9" />
          <TextInput
            placeholder="Enter Room ID (e.g. BGMI-8742)"
            placeholderTextColor="#64748b"
            style={styles.input}
            value={roomId}
            onChangeText={setRoomId}
            autoCapitalize="none"
          />
        </View>

        <Text style={styles.label}>ROOM PASSWORD</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed" size={22} color="#67e8f9" />
          <TextInput
            placeholder="Enter Room Password"
            placeholderTextColor="#64748b"
            secureTextEntry={!showPassword}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#94a3b8"
            />
          </TouchableOpacity>
        </View>

        {/* Go Live Button */}
        <TouchableOpacity
          style={styles.goLiveButton}
          onPress={handleGoLive}
          disabled={loading}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={["#22c55e", "#4ade80"]}
            style={styles.gradientButton}
          >
            {loading ? (
              <ActivityIndicator color="#0f172a" size="small" />
            ) : (
              <>
                <Ionicons name="play-circle" size={24} color="#0f172a" />
                <Text style={styles.buttonText}>START MATCH & GO LIVE</Text>
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.note}>
          Make sure the room is created in-game before going live
        </Text>
      </View>
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
    alignItems: "center",
    paddingTop: 80,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#22c55e",
    marginTop: 12,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: "#94a3b8",
    marginTop: 8,
    textAlign: "center",
    paddingHorizontal: 40,
  },

  card: {
    backgroundColor: "#1e2937",
    marginHorizontal: 20,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "#334155",
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#e2e8f0",
    marginBottom: 8,
    marginTop: 16,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f172a",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#334155",
    paddingHorizontal: 16,
    marginBottom: 8,
  },

  input: {
    flex: 1,
    paddingVertical: 18,
    color: "#f1f5f9",
    fontSize: 17,
  },

  eyeIcon: {
    padding: 8,
  },

  goLiveButton: {
    marginTop: 32,
    borderRadius: 16,
    overflow: "hidden",
  },

  gradientButton: {
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  buttonText: {
    color: "#0f172a",
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  note: {
    textAlign: "center",
    color: "#64748b",
    fontSize: 13,
    marginTop: 24,
    lineHeight: 18,
  },
});