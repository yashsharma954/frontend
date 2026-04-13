// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   ActivityIndicator,
// } from "react-native";
// import { useLocalSearchParams } from "expo-router";
// import { useEffect, useState } from "react";

// export default function ViewResultScreen() {
//   const { id } = useLocalSearchParams();

//   const [image, setImage] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [resultTable, setResultTable] = useState([]);

//   const fetchResult = async () => {
//     try {
//       const res = await fetch(
//         `http://192.168.31.126:8000/api/v1/host/result/${id}`
//       );

//       const data = await res.json();
//       console.log("RESULT 👉", data);

//       if (!data.success) {
//         alert(data.message);
//         return;
//       }
//       console.log("data of image is ",data.data.leaderboard);
//       console.log("data of image is ",data.data.leaderboardtable);

//       setImage(data.data.leaderboard);
//       setResultTable(data.data.leaderboardtable || []);
//     } catch (err) {
//       console.log(err);
//       alert("Server error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchResult();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>🏆 Match Result</Text>

//       {loading ? (
//         <ActivityIndicator size="large" color="#38bdf8" />
//       ) : image ? (
//         <Image source={{ uri: image }} style={styles.image} />
//       ) : (
//         <Text style={styles.empty}>Result not uploaded yet</Text>
//       )}
//       {resultTable.length > 0 && (
//   <View style={styles.table}>
    
//     {/* HEADER */}
//     <View style={styles.headerRow}>
//       <Text style={styles.header}>Rank</Text>
//       <Text style={styles.header}>Team</Text>
//       <Text style={styles.header}>Prize</Text>
//     </View>

//     {/* ROWS */}
//     {resultTable.map((item, index) => (
//       <View key={index} style={styles.row}>
//         <Text style={styles.cell}>#{item.rank}</Text>
//         <Text style={styles.cell}>
//           {item.teamName || "N/A"}
//         </Text>
//         <Text style={styles.cell}>₹{item.prize}</Text>
//       </View>
//     ))}
//   </View>
// )}
//     </View>
    
//   );
// }
// const styles = StyleSheet.create({
//   table: {
//   marginTop: 20,
// },

// headerRow: {
//   flexDirection: "row",
//   justifyContent: "space-between",
//   borderBottomWidth: 1,
//   borderColor: "#1e293b",
//   paddingBottom: 8,
//   marginBottom: 10,
// },

// header: {
//   color: "#38bdf8",
//   fontWeight: "bold",
//   width: "33%",
//   textAlign: "center",
// },

// row: {
//   flexDirection: "row",
//   justifyContent: "space-between",
//   marginBottom: 10,
//   backgroundColor: "#0f172a",
//   padding: 10,
//   borderRadius: 10,
// },

// cell: {
//   color: "#e5e7eb",
//   width: "33%",
//   textAlign: "center",
// },
//   container: {
//     flex: 1,
//     backgroundColor: "#020617",
//     padding: 16,
//     justifyContent: "center",
//   },

//   title: {
//     color: "#38bdf8",
//     fontSize: 22,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 20,
//   },

//   image: {
//     width: "100%",
//     height: 400,
//     borderRadius: 16,
//     resizeMode: "contain",
//   },

//   empty: {
//     color: "#94a3b8",
//     textAlign: "center",
//     marginTop: 20,
//   },
// });


import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function ViewResultScreen() {
  const { id } = useLocalSearchParams();

  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [resultTable, setResultTable] = useState<any[]>([]);
  const [tournamentTitle, setTournamentTitle] = useState("");

  const fetchResult = async () => {
    try {
      const res = await fetch(
        `http://192.168.31.126:8000/api/v1/host/result/${id}`
      );

      const data = await res.json();
      console.log("RESULT DATA 👉", data);

      if (data.success) {
        setTournamentTitle(data.data.title || "Tournament Results");
        setImage(data.data.leaderboard || "");
        setResultTable(data.data.leaderboardtable || []);
      } else {
        alert(data.message || "Failed to load results");
      }
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
      <LinearGradient
        colors={["#0a0e17", "#1e2937"]}
        style={styles.background}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="trophy" size={68} color="#eab308" />
          <Text style={styles.title}>FINAL RESULTS</Text>
          <Text style={styles.subtitle}>{tournamentTitle}</Text>
        </View>

        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#eab308" />
            <Text style={styles.loadingText}>Loading final standings...</Text>
          </View>
        ) : (
          <>
            {/* Leaderboard Screenshot */}
            {image ? (
              <View style={styles.imageCard}>
                <Text style={styles.sectionTitle}>📸 OFFICIAL SCREENSHOT</Text>
                <Image
                  source={{ uri: image }}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
            ) : (
              <View style={styles.emptyCard}>
                <Ionicons name="image-outline" size={80} color="#334155" />
                <Text style={styles.emptyText}>No screenshot uploaded yet</Text>
              </View>
            )}

            {/* Results Table */}
            {resultTable.length > 0 && (
              <View style={styles.tableCard}>
                <Text style={styles.sectionTitle}>🏅 FINAL STANDINGS</Text>

                {/* Table Header */}
                <View style={styles.tableHeader}>
                  <Text style={[styles.headerCell, { flex: 1 }]}>RANK</Text>
                  <Text style={[styles.headerCell, { flex: 3 }]}>TEAM NAME</Text>
                  <Text style={[styles.headerCell, { flex: 2, textAlign: "right" }]}>
                    PRIZE
                  </Text>
                </View>

                {/* Table Rows */}
                {resultTable.map((item, index) => (
                  <View key={index} style={styles.tableRow}>
                    <View style={styles.rankContainer}>
                      <Text style={styles.rankText}>#{item.rank}</Text>
                    </View>

                    <Text style={styles.teamName}>
                      {item.teamName || "Unknown Team"}
                    </Text>

                    <Text style={styles.prizeText}>
                      ₹{item.prize || "0"}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {resultTable.length === 0 && !image && (
              <View style={styles.emptyCard}>
                <Ionicons name="trophy-outline" size={80} color="#334155" />
                <Text style={styles.emptyText}>Results not available yet</Text>
              </View>
            )}
          </>
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
    padding: 16,
    paddingBottom: 40,
  },

  header: {
    alignItems: "center",
    marginBottom: 30,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#eab308",
    marginTop: 12,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: "#94a3b8",
    marginTop: 6,
    textAlign: "center",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#f1f5f9",
    marginBottom: 16,
  },

  imageCard: {
    backgroundColor: "#1e2937",
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#334155",
  },
  image: {
    width: "100%",
    height: 420,
    borderRadius: 12,
  },

  tableCard: {
    backgroundColor: "#1e2937",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#334155",
  },

  tableHeader: {
    flexDirection: "row",
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: "#eab308",
    marginBottom: 12,
  },
  headerCell: {
    color: "#eab308",
    fontWeight: "700",
    fontSize: 15,
  },

  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
  },

  rankContainer: {
    width: 50,
    alignItems: "center",
  },
  rankText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#eab308",
  },

  teamName: {
    flex: 3,
    fontSize: 16,
    fontWeight: "600",
    color: "#f1f5f9",
    paddingHorizontal: 8,
  },

  prizeText: {
    flex: 2,
    fontSize: 17,
    fontWeight: "700",
    color: "#22c55e",
    textAlign: "right",
  },

  emptyCard: {
    backgroundColor: "#1e2937",
    borderRadius: 20,
    padding: 60,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#334155",
  },
  emptyText: {
    color: "#64748b",
    fontSize: 16,
    marginTop: 16,
    textAlign: "center",
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