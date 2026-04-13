

// import { View, Text, StyleSheet, Alert } from "react-native";
// import { useLocalSearchParams } from "expo-router";
// import { useEffect, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function RoomDetailScreen() {
//   const { id } = useLocalSearchParams();

//   const [roomId, setRoomId] = useState("");
//   const [roomPassword, setRoomPassword] = useState("");
//   const [loading, setLoading] = useState(true);
  
 

//   console.log("tournamentid is",id);

//   const fetchRoom = async () => {
//     // if (!userId) return;

//     try {
//       const res = await fetch(
//         `http://192.168.31.126:8000/api/v1/host/tournaments/liveroom/${id}`
//       );

//       const data = await res.json();
//       console.log("ROOM RESPONSE 👉", data);


//       if (!data.success) {
//         alert("Wait", data.message);
//         return;
//       }
//       console.log("id is ",data.data._id);

//       setRoomId(data.data.roomId);
//       setRoomPassword(data.data.roompassword);
//     } catch (err) {
//       Alert.alert("Server error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRoom();
//   }, []);
// //   useEffect(() => {
// //   if (userId) {
// //     fetchRoom();
// //   }
// // }, [userId]);


//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>🎮 Tournament Room</Text>

//       {loading ? (
//         <Text style={{ color: "#94a3b8", textAlign: "center" }}>
//           Fetching room details...
//         </Text>
//       ) : (
//         <>
//           <View style={styles.card}>
//             <Text style={styles.label}>Room ID</Text>
//             <Text style={styles.value}>{roomId}</Text>
//           </View>

//           <View style={styles.card}>
//             <Text style={styles.label}>Room Password</Text>
//             <Text style={styles.value}>{roomPassword}</Text>
//           </View>
//         </>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#020617",
//     padding: 20,
//   },
//   title: {
//     color: "#fff",
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   card: {
//     backgroundColor: "#0a1f30",
//     padding: 16,
//     borderRadius: 14,
//     marginBottom: 12,
//   },
//   label: {
//     color: "#94a3b8",
//     fontSize: 12,
//   },
//   value: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//     marginTop: 4,
//   },
//   copyBtn: {
//     backgroundColor: "#22c55e",
//     padding: 14,
//     borderRadius: 14,
//     marginTop: 20,
//     alignItems: "center",
//   },
//   copyText: {
//     color: "#022c22",
//     fontWeight: "bold",
//   },
// });



import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";   // Add this for copy functionality

export default function RoomDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [roomId, setRoomId] = useState("");
  const [roomPassword, setRoomPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const fetchRoom = async () => {
    try {
      const res = await fetch(
        `http://192.168.31.126:8000/api/v1/host/tournaments/liveroom/${id}`
      );

      const data = await res.json();
      console.log("ROOM RESPONSE 👉", data);

      if (data.success) {
        setRoomId(data.data.roomId || "");
        setRoomPassword(data.data.roompassword || "");
      } else {
        alert("Not Available  Room details not found", data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Error Failed to fetch room details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoom();
  }, []);

  const copyToClipboard = async (text: string, field: string) => {
    if (!text) return;

    await Clipboard.setStringAsync(text);
    setCopiedField(field);

    setTimeout(() => setCopiedField(null), 2000);

    alert("Copied!" +`${field}`+ "copied to clipboard");
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0a0e17", "#1e2937", "#0f172a"]}
        style={styles.background}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="game-controller" size={72} color="#22c55e" />
          <Text style={styles.title}>TOURNAMENT ROOM</Text>
          <Text style={styles.subtitle}>Join the match now</Text>
        </View>

        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#22c55e" />
            <Text style={styles.loadingText}>Fetching room details...</Text>
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.infoTitle}>ROOM DETAILS</Text>

            {/* Room ID */}
            <View style={styles.detailRow}>
              <View style={styles.detailLeft}>
                <Text style={styles.label}>ROOM ID</Text>
                <Text style={styles.value}>{roomId || "Not Available"}</Text>
              </View>

              <TouchableOpacity
                style={styles.copyButton}
                onPress={() => copyToClipboard(roomId, "Room ID")}
              >
                <Ionicons 
                  name={copiedField === "Room ID" ? "checkmark-circle" : "copy"} 
                  size={24} 
                  color="#67e8f9" 
                />
              </TouchableOpacity>
            </View>

            {/* Room Password */}
            <View style={styles.detailRow}>
              <View style={styles.detailLeft}>
                <Text style={styles.label}>ROOM PASSWORD</Text>
                <Text style={styles.value}>{roomPassword || "Not Available"}</Text>
              </View>

              <TouchableOpacity
                style={styles.copyButton}
                onPress={() => copyToClipboard(roomPassword, "Room Password")}
              >
                <Ionicons 
                  name={copiedField === "Room Password" ? "checkmark-circle" : "copy"} 
                  size={24} 
                  color="#67e8f9" 
                />
              </TouchableOpacity>
            </View>

            {/* Instructions */}
            <View style={styles.instructions}>
              <Text style={styles.instructionTitle}>How to Join:</Text>
              <Text style={styles.instructionText}>
                1. Open your game{'\n'}
                2. Go to Custom Room{'\n'}
                3. Enter the Room ID and Password above{'\n'}
                4. Join the match and play!
              </Text>
            </View>
          </View>
        )}

        {/* Action Button */}
        {!loading && (
          <TouchableOpacity 
            style={styles.joinButton}
            onPress={() => alert("Ready? Make sure you have entered the correct details in-game.")}
          >
            <Text style={styles.joinButtonText}>I HAVE JOINED THE ROOM</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
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
  scrollContent: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },

  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#22c55e",
    marginTop: 16,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: "#94a3b8",
    marginTop: 6,
  },

  card: {
    backgroundColor: "#1e2937",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "#334155",
  },

  infoTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#67e8f9",
    marginBottom: 20,
    textAlign: "center",
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f172a",
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#334155",
  },
  detailLeft: {
    flex: 1,
  },
  label: {
    color: "#94a3b8",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 4,
  },
  value: {
    color: "#f1f5f9",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 1,
  },

  copyButton: {
    padding: 8,
  },

  instructions: {
    marginTop: 20,
    backgroundColor: "#0f172a",
    padding: 18,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#22c55e",
  },
  instructionTitle: {
    color: "#22c55e",
    fontWeight: "700",
    marginBottom: 8,
  },
  instructionText: {
    color: "#cbd5e1",
    lineHeight: 22,
    fontSize: 15,
  },

  joinButton: {
    backgroundColor: "#22c55e",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 30,
  },
  joinButtonText: {
    color: "#0f172a",
    fontSize: 17,
    fontWeight: "800",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  loadingText: {
    color: "#94a3b8",
    marginTop: 16,
    fontSize: 16,
  },
});
