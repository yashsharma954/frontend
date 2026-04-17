
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
// } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";

// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useEffect, useState } from "react";


// export default function PaymentScreen() {
//   const { id } = useLocalSearchParams();
//   const router = useRouter();
//    const [loading, setLoading] = useState(false);

//   const [teamName, setTeamName] = useState("");
 
//   const [tournament, setTournament] = useState(null);
//   const [members, setMembers] = useState([
 
// ]);
// const [tournamentId,setTournamentId]=useState("");




// useEffect(() => {
//   const fetchTournament = async () => {
//     try {
//       const res = await fetch(
//         `https://gamerzhub-backend.onrender.com/api/v1/player/tournament/${id}`
//       );

//       const data = await res.json();
//       console.log("data is ",data);
//       setTournament(data.data);
//       setTournamentId(data.data._id);

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   if (id) fetchTournament();
// }, [id]);
// // useEffect(() => {
// //   if (!tournament) return;

// //   setMembers(
// //     Array.from({ length: tournament.teamSize }).map(() => ({
// //       ign: "",
// //     }))
// //   );
// // }, [tournament]);
// useEffect(() => {
//   if (!tournament) return;

//   console.log("TEAM SIZE:", tournament.teamSize);

//   const teamSize = Number(tournament.teamSize) || 1;

//   const newMembers = Array.from({ length: teamSize }, () => ({
//     ign: "",
//   }));

//   setMembers(newMembers);
// }, [tournament]);

// const handlePayment = async () => {
//   try {
//     setLoading(true);

//     const playerId = await AsyncStorage.getItem("tempUserId");
//     console.log(playerId);

//     if (!playerId) {
//       alert("User not found, please login again");
//       return;
//     }

//     const res = await fetch(
//       `https://gamerzhub-backend.onrender.com/api/v1/player/join`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           teamName,
//           playerId,
//           tournamentId,
//           members: members.map((m) => ({
//             playerId,
//             ign: m.ign,
//           })),
//         }),
//       }
//     );

//     const data = await res.json();

//     if (!data.success) {
//       alert(data.message);
//       return;
//     }

//     // ✅ PAYMENT SUCCESS → convert temp → permanent
//     await AsyncStorage.removeItem("tempUserId");
//     await AsyncStorage.setItem("userId", data.data._id);
    

//     alert("🎉 Slot Confirmed");
//     router.replace("./tournament");

//   } catch (err) {
//     console.log(err);
//     alert("Server error");
//   } finally {
//     setLoading(false);
//   }
// };



//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Complete Registration</Text>

//       <TextInput
//         placeholder="Team Name"
//         placeholderTextColor="#94a3b8"
//         style={styles.input}
//         value={teamName}
//         onChangeText={setTeamName}
//       />

//       {/* {members.map((member, index) => (
//      <TextInput
//     key={index}
//     placeholder={`Player ${index + 1} IGN`}
//     placeholderTextColor="#94a3b8"
//     style={styles.input}
//     value={member.ign}
//     onChangeText={(text) => {
//       const updated = [...members];
//       updated[index].ign = text;
//       setMembers(updated);
//        }}
//       />
//      ))} */}

//      {members.length > 0 &&
//   members.map((member, index) => (
//     <TextInput
//       key={index}
//       placeholder={`Player ${index + 1} IGN`}
//       placeholderTextColor="#94a3b8"
//       style={styles.input}
//       value={member.ign}
//       onChangeText={(text) => {
//         const updated = [...members];
//         updated[index].ign = text;
//         setMembers(updated);
//       }}
//     />
// ))}


//       <TouchableOpacity style={styles.payBtn} onPress={handlePayment}>
//         <Text style={styles.payText}>PAY ₹50 & JOIN</Text>
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
//     marginBottom: 25,
//     textAlign: "center",
//   },
//   input: {
//     backgroundColor: "#0f172a",
//     padding: 14,
//     borderRadius: 12,
//     color: "#fff",
//     marginBottom: 15,
//   },
//   payBtn: {
//     backgroundColor: "#22c55e",
//     padding: 15,
//     borderRadius: 14,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   payText: {
//     color: "#020617",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
// });


import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function PaymentScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [tournament, setTournament] = useState<any>(null);
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState<{ ign: string }[]>([]);
  const [tournamentId, setTournamentId] = useState("");

  // Fetch Tournament Details
  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const res = await fetch(
          `https://gamerzhub-backend.onrender.com/api/v1/player/tournament/${id}`
        );
        const data = await res.json();

        if (data.success) {
          setTournament(data.data);
          setTournamentId(data.data._id);

          // Auto-create member fields based on team size
          const teamSize = Number(data.data.teamSize) || 1;
          const newMembers = Array.from({ length: teamSize }, () => ({ ign: "" }));
          setMembers(newMembers);
        }
      } catch (error) {
        console.log("Fetch error:", error);
        Alert.alert("Error", "Failed to load tournament details");
      }
    };

    if (id) fetchTournament();
  }, [id]);

  const handlePayment = async () => {
    if (!teamName.trim()) {
      alert("Missing Info Please enter a team name");
      return;
    }

    if (members.some((m) => !m.ign.trim())) {
      alert("Missing IGN Please fill all player IGNs");
      return;
    }

    setLoading(true);
    try {
      const playerId = await AsyncStorage.getItem("tempUserId");

      if (!playerId) {
        Alert.alert("Session Expired", "Please verify your number again");
        return;
      }

      const res = await fetch(
        `https://gamerzhub-backend.onrender.com/api/v1/player/join`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            teamName: teamName.trim(),
            playerId,
            tournamentId,
            members: members.map((m) => ({
              playerId,
              ign: m.ign.trim(),
            })),
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        await AsyncStorage.removeItem("tempUserId");
        await AsyncStorage.setItem("userId", data.data._id);

        alert("🎉 Success! Your slot has been confirmed!");
        router.replace("./tournament");
      } else {
        alert("Failed Something went wrong");
      }
    } catch (err) {
      console.log(err);
      alert("Error Server error. Please try again.");
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

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="trophy-outline" size={52} color="#67e8f9" />
          <Text style={styles.title}>COMPLETE REGISTRATION</Text>
          <Text style={styles.subtitle}>
            {tournament?.title || "Tournament Registration"}
          </Text>
        </View>

        {/* Tournament Info Card */}
        {tournament && (
          <View style={styles.tournamentCard}>
            <Image
              source={{ uri: tournament.banner }}
              style={styles.banner}
              resizeMode="cover"
            />
            <View style={styles.tournamentInfo}>
              <Text style={styles.gameName}>{tournament.game}</Text>
              <Text style={styles.prize}>Prize Pool: ₹{tournament.prizePool}</Text>
              <Text style={styles.entryFee}>
                Entry Fee: ₹{tournament.entryFee || "50"}
              </Text>
            </View>
          </View>
        )}

        {/* Registration Form */}
        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>TEAM DETAILS</Text>

          <TextInput
            placeholder="Team Name (e.g. DeathSquad)"
            placeholderTextColor="#64748b"
            style={styles.input}
            value={teamName}
            onChangeText={setTeamName}
          />

          <Text style={styles.sectionTitle}>PLAYER IGNs</Text>
          <Text style={styles.helperText}>
            Enter your in-game names (IGN) for all team members
          </Text>

          {members.map((member, index) => (
            <View key={index} style={styles.memberRow}>
              <Text style={styles.memberLabel}>Player {index + 1}</Text>
              <TextInput
                placeholder={`IGN for Player ${index + 1}`}
                placeholderTextColor="#64748b"
                style={styles.input}
                value={member.ign}
                onChangeText={(text) => {
                  const updated = [...members];
                  updated[index].ign = text;
                  setMembers(updated);
                }}
              />
            </View>
          ))}

          {/* Payment Button */}
          <TouchableOpacity
            style={styles.payButton}
            onPress={handlePayment}
            disabled={loading}
          >
            <LinearGradient
              colors={["#22c55e", "#4ade80"]}
              style={styles.gradientButton}
            >
              {loading ? (
                <ActivityIndicator color="#0f172a" size="small" />
              ) : (
                <>
                  <Text style={styles.payText}>PAY ₹{tournament?.entryFee || "50"} & CONFIRM SLOT</Text>
                  <Ionicons name="checkmark-circle" size={20} color="#0f172a" style={{ marginLeft: 8 }} />
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <Text style={styles.note}>
          ⚡ Your slot will be reserved instantly after payment
        </Text>
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
    paddingBottom: 40,
  },

  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#67e8f9",
    marginTop: 12,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 6,
  },

  tournamentCard: {
    backgroundColor: "#1e2937",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#334155",
  },
  banner: {
    width: "100%",
    height: 140,
  },
  tournamentInfo: {
    padding: 16,
  },
  gameName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#67e8f9",
  },
  prize: {
    fontSize: 16,
    color: "#facc15",
    marginTop: 4,
    fontWeight: "600",
  },
  entryFee: {
    fontSize: 15,
    color: "#94a3b8",
    marginTop: 2,
  },

  formCard: {
    backgroundColor: "#1e2937",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "#334155",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#e2e8f0",
    marginBottom: 10,
    marginTop: 8,
  },

  helperText: {
    color: "#64748b",
    fontSize: 13,
    marginBottom: 12,
  },

  memberRow: {
    marginBottom: 16,
  },
  memberLabel: {
    color: "#94a3b8",
    fontSize: 13,
    marginBottom: 6,
    fontWeight: "500",
  },

  input: {
    backgroundColor: "#0f172a",
    padding: 16,
    borderRadius: 14,
    color: "#f1f5f9",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },

  payButton: {
    marginTop: 20,
    borderRadius: 16,
    overflow: "hidden",
  },
  gradientButton: {
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  payText: {
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
  },
});