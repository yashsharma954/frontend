// import { View, Text, StyleSheet, FlatList, Image } from "react-native";
// import { useLocalSearchParams } from "expo-router";
// import { useEffect, useState } from "react";

// export default function PlayerListScreen() {
//   const { id } = useLocalSearchParams(); // tournament id
//   const [players, setPlayers] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchPlayers = async () => {
//     try {
//       const res = await fetch(
//         `https://gamerzhub-backend.onrender.com/api/v1/player/tournament/${id}`
//       );

//       const data = await res.json();
//       console.log("data is ",data);

//       if (data.success) {
//         setPlayers(data.data.players);
//       }
//     } catch (err) {
//       console.log("Player fetch error", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPlayers();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <Text style={{ color: "#94a3b8" }}>Loading players...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.screen}>
//       <Text style={styles.heading}>👥 Joined Players</Text>

//       <FlatList
//   data={players}
//   keyExtractor={(item) => item._id}
//   renderItem={({ item }) => (
//     <View style={styles.card}>
      
//       {/* TEAM HEADER */}
//       <Text style={styles.teamName}>🏆 {item.teamName}</Text>
     

//       {/* TEAM MEMBERS */}
//       {item.members.map((m, index) => (
//         <View key={index} style={styles.row}>
          

//           <View>
//             <Text style={styles.name}>
//               Player {index + 1}
//             </Text>

//             <Text style={styles.sub}>
//               🎮 IGN: {m.ign}
//             </Text>
//           </View>
//         </View>
//       ))}

//       {/* FOOTER */}
//       <View style={styles.bottomRow}>
//         <Text style={{ color: "#22c55e" }}>
//           {item.payment ? "✅ Paid" : "❌ Pending"}
//         </Text>

//         <Text style={styles.time}>
//           {new Date(item.joinedAt).toLocaleString()}
//         </Text>
//       </View>

//     </View>
//   )}
// />

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     backgroundColor: "#020617",
//     padding: 16,
//   },

//   heading: {
//     color: "#f8fafc",
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 12,
//   },
//   teamName: {
//   backgroundColor: "#020617",
//   paddingVertical: 6,
//   paddingHorizontal: 12,
//   borderRadius: 10,
//   marginBottom: 10,
//   borderWidth: 1,
//   borderColor: "#1e293b",
//   color: "#facc15",   // ⭐ THIS LINE
//   fontWeight: "700",
//   fontSize: 14,
// },


//   card: {
//     backgroundColor: "#0f172a",
//     borderRadius: 14,
//     padding: 14,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: "#1e293b",
//   },

//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   avatar: {
//     width: 46,
//     height: 46,
//     borderRadius: 50,
//     marginRight: 12,
//     borderWidth: 2,
//     borderColor: "#38bdf8",
//   },

//   name: {
//     color: "#e5e7eb",
//     fontWeight: "700",
//     fontSize: 14,
//   },

//   sub: {
//     color: "#94a3b8",
//     fontSize: 12,
//     marginTop: 2,
//   },

//   bottomRow: {
//     marginTop: 10,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   payment: {
//     fontSize: 12,
//     fontWeight: "bold",
//   },

//   time: {
//     color: "#64748b",
//     fontSize: 11,
//   },

//   center: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#020617",
//   },
// });



import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function PlayerListScreen() {
  const { id } = useLocalSearchParams(); // tournament id
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tournamentTitle, setTournamentTitle] = useState("");

  const fetchPlayers = async () => {
    try {
      const res = await fetch(
        `https://gamerzhub-backend.onrender.com/api/v1/player/tournament/${id}`
      );

      const data = await res.json();
      console.log("Player List Data:", data);

      if (data.success) {
        setTournamentTitle(data.data.title || "Tournament");
        setPlayers(data.data.players || []);
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

  const renderTeam = ({ item }: { item: any }) => (
    <View style={styles.teamCard}>
      {/* Team Header */}
      <View style={styles.teamHeader}>
        <View style={styles.teamIcon}>
          <Ionicons name="people" size={28} color="#67e8f9" />
        </View>
        <Text style={styles.teamName}>{item.teamName}</Text>
        <View style={styles.paymentBadge}>
          <Text style={[
            styles.paymentText,
            { color: item.payment ? "#22c55e" : "#ef4444" }
          ]}>
            {item.payment ? "✓ PAID" : "⧖ PENDING"}
          </Text>
        </View>
      </View>

      {/* Team Members */}
      <View style={styles.membersContainer}>
        {item.members.map((member: any, index: number) => (
          <View key={index} style={styles.memberRow}>
            <View style={styles.memberAvatar}>
              <Text style={styles.memberInitial}>
                {member.ign ? member.ign[0].toUpperCase() : "?"}
              </Text>
            </View>

            <View style={styles.memberInfo}>
              <Text style={styles.memberLabel}>PLAYER {index + 1}</Text>
              <Text style={styles.ignText}>🎮 {member.ign || "Not Filled"}</Text>
            </View>

            <Ionicons name="game-controller" size={20} color="#64748b" />
          </View>
        ))}
      </View>

      {/* Join Time */}
      <View style={styles.footer}>
        <Text style={styles.joinedTime}>
          Joined • {new Date(item.joinedAt).toLocaleString("en-IN", {
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#67e8f9" />
        <Text style={styles.loadingText}>Loading joined teams...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {/* Header */}
      <LinearGradient
        colors={["#1e2937", "#0f172a"]}
        style={styles.header}
      >
        <Text style={styles.heading}>👥 JOINED TEAMS</Text>
        <Text style={styles.subHeading}>{tournamentTitle}</Text>
      </LinearGradient>

      {players.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="people-outline" size={80} color="#334155" />
          <Text style={styles.emptyText}>No teams have joined yet</Text>
        </View>
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item._id}
          renderItem={renderTeam}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0a0e17",
  },

  header: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 24,
  },
  heading: {
    fontSize: 26,
    fontWeight: "800",
    color: "#67e8f9",
    letterSpacing: 1,
  },
  subHeading: {
    fontSize: 15,
    color: "#94a3b8",
    marginTop: 4,
  },

  listContainer: {
    padding: 16,
    paddingBottom: 40,
  },

  teamCard: {
    backgroundColor: "#1e2937",
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#334155",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },

  teamHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  teamIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "rgba(103, 232, 249, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  teamName: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    color: "#facc15",
  },
  paymentBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: "rgba(15, 23, 42, 0.8)",
  },
  paymentText: {
    fontSize: 12,
    fontWeight: "700",
  },

  membersContainer: {
    marginBottom: 12,
  },
  memberRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
  },
  memberAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#334155",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    borderWidth: 2,
    borderColor: "#67e8f9",
  },
  memberInitial: {
    color: "#67e8f9",
    fontSize: 18,
    fontWeight: "700",
  },
  memberInfo: {
    flex: 1,
  },
  memberLabel: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "500",
  },
  ignText: {
    color: "#e2e8f0",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 2,
  },

  footer: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#334155",
  },
  joinedTime: {
    color: "#64748b",
    fontSize: 12,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0a0e17",
  },
  loadingText: {
    color: "#94a3b8",
    marginTop: 16,
    fontSize: 16,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyText: {
    color: "#64748b",
    fontSize: 17,
    marginTop: 20,
    textAlign: "center",
  },
});