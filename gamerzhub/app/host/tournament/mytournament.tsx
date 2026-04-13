
// import { View, Text, ScrollView, StyleSheet, TouchableOpacity,Image} from "react-native";
// import { useEffect, useState } from "react";
// import { useRouter } from "expo-router";
// import { usePathname } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";




// type TabType = "LIVE" | "UPCOMING" | "COMPLETED";
// type ScreenMode = "PLAYER" | "HOST";




// export default function TournamentsScreen() {
//   const router = useRouter();
// const pathname = usePathname();
// const [hostId, setHostId] = useState<string | null>(null);
// useEffect(() => {
//   const getHost = async () => {
//     const data = await AsyncStorage.getItem("host");

//     if (data) {
//       const host = JSON.parse(data);
//       setHostId(host._id);
//     }
//   };

//   getHost();
// }, []);
 


// const mode: ScreenMode = pathname.includes("/host")
//   ? "HOST"
//   : "PLAYER";

//   const [activeTab, setActiveTab] = useState<TabType>("LIVE");
//   const [tournaments, setTournaments] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false); 
//   useEffect(() => {
//   if (mode === "HOST" && hostId) {
//     fetchTournaments();
//   }

//   if (mode === "PLAYER") {
//     fetchTournaments();
//   }
// }, [activeTab, hostId]);

//  const fetchTournaments = async () => {
//   try {
//     setLoading(true);

//     const baseURL =
//       mode === "HOST"
//         ? "http://192.168.31.126:8000/api/v1/host/tournaments/my"
//         : "http://192.168.31.126:8000/api/v1/player/tournaments";

//     const url = `${baseURL}?status=${activeTab}`;

//     const token = await AsyncStorage.getItem("token");

// const res = await fetch(url, {
//   method: "GET",
//   headers: {
//     "Authorization": `Bearer ${token}`,
//     "Content-Type": "application/json"
//   }
// });

//     const data = await res.json();

//     console.log("FETCHED TOURNAMENTS 👉", data);

//     setTournaments(data.data || []);

//   } catch (error) {
//     console.log("Fetch error:", error);
//   } finally {
//     setLoading(false);
//   }
// };

// // const golive = async (tournamentId) => {
// //   try {
    
// //     const res = await fetch("http://192.168.31.126:8000/api/v1/host/tournaments/golive", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify({
// //         tournamentId,
// //       }),
// //     });

// //     const data = await res.json();

// //     if (data.success) {
// //       alert(data.message);
// //     }

   
// //     router.replace("./mytournament");

// //   } catch (err) {
// //     alert("Server error");
// //   }
// // };
// const endlive = async (tournamentId) => {
//   try {
    
//     const res = await fetch("http://192.168.31.126:8000/api/v1/host/tournaments/end", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         tournamentId,
//       }),
//     });

//     const data = await res.json();

//     if (data.success) {
//       alert(data.message);
//     }


   
//     router.replace("./mytournament");

//   } catch (err) {
//     alert("Server error");
//   }
// };
//  const userId = "65c1a9f0a1b2c3d4e5f67890";
   


  

// const filteredTournaments = tournaments || [];


  
//   return (
//     <View style={styles.screen}>

//       {/* TABS */}
//       <View style={styles.tabs}>
//         {["LIVE", "UPCOMING", "COMPLETED"].map(tab => (
           
//           <TouchableOpacity
//             key={tab}
//             onPress={() => setActiveTab(tab as TabType)}
//             style={[styles.tab, activeTab === tab && styles.activeTab]}
//           >
//             <Text style={activeTab === tab ? styles.activeTabText : styles.tabText}>
//               {tab}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* LIST */}
//       <ScrollView>
//         {loading && <Text style={styles.empty}>Loading tournaments...</Text>}

//         {!loading && filteredTournaments?.length === 0 && (
//           <Text style={styles.empty}>No tournaments found</Text>
//         )}
  
//         {filteredTournaments.map(item =>  {
//              const isJoined = item.players?.some(
//             (playerId: any) => playerId.toString() === userId
//                    );
                   
//                    const HostUpcomingCard = ({ item }: any) => (
//                          <>
//                         <Text style={styles.detail}>
//                        👥 Joined: {item.currentTeams}/{item.maxTeams}
//                             </Text>

//                             <TouchableOpacity 
//                             style={styles.button}
//                         onPress={() => router.push({ pathname: "/host/joinplayer/player", params: { id: item._id }})} >
//                            <Text style={styles.roomText}>👥 Player List</Text>
//                                  </TouchableOpacity>

//                                <TouchableOpacity style={styles.button}
//                                onPress={() => router.push({ pathname: "/host/tournament/golive", params: { id: item._id }})}>
//                                 <Text style={styles.buttonText}>🚀 Go Live</Text>
//                                </TouchableOpacity>
//                          </>
//                         );


//                    const HostLiveCard = ({ item }: any) => (
//                        <>
//                     <TouchableOpacity style={styles.liveButton}
//                      onPress={() => router.push({ pathname: "/host/leaderboard/leader", params: { id: item._id }})}>
//                   <Text style={styles.buttonText}>📤 Upload Leaderboard</Text>
//                  </TouchableOpacity>

//               <TouchableOpacity
//                    style={[styles.button, { backgroundColor: "#ef4444" }]}
//               onPress={()=>endlive(item._id)}
//                     >
//                  <Text style={styles.buttonText}>⛔ End Tournament</Text>
//                       </TouchableOpacity>

//                     </>
//                          );


//                const HostCompletedCard = ({ item }: any) => (
//                      <TouchableOpacity style={styles.resultButton}
//                      onPress={() => router.push({ pathname: "/host/leaderboard/viewresult", params: { id: item._id }})}
                             
//                                 >
//                    <Text style={styles.resultText}>📊 View Leaderboard</Text>
//                   </TouchableOpacity>
//                       );



//                    const UpcomingCard = ({ item }: any) => (
//                               <>
//                      <Text style={styles.detail}>
//                             👥 Slots: {item.joinedSlots}/{item.slots}
//                             </Text>

//                        <Text style={styles.time}>
//                           ⏰ {new Date(item.startTime).toLocaleString()}
//                              </Text>

//                         <TouchableOpacity style={styles.button}
//                          onPress={() => router.push(`./join/${item._id}`)}>
                           
//                         <Text style={styles.buttonText}>Join Tournament</Text>
//                      </TouchableOpacity>
//                              </>
//                                 );
//                                 const LiveCard = ({ item, isJoined }: any) => (
//                         <>
//                       <View style={styles.row}>
//                    <Text style={styles.detail}>🏆 Prize: ₹{item.prizePool}</Text>
//                    <Text style={styles.liveText}>🔴 LIVE</Text>
//                 </View>

//                   <Text style={styles.detail}>
//                   👥 Slots: {item.joinedSlots}/{item.slots}
//                     </Text>

//                <TouchableOpacity style={styles.liveButton}
//                onPress={() => router.push(`./live/${item._id}`)}>
//               <Text style={styles.buttonText}>🎥 Watch Live</Text>
//                     </TouchableOpacity>

//                      {isJoined && (
//                   <TouchableOpacity style={styles.roomButton}
//                   onPress={() => router.push(`./room/${item._id}`)}>
//                            <Text style={styles.roomText}>🎮 Join Room</Text>
//                              </TouchableOpacity>
//                               )}
//                       </>
//                                );
//                                const CompletedCard = ({ item }: any) => (
//   <>
//     <Text style={styles.detail}>
//       🏆 Prize Pool: ₹{item.prizePool}
//     </Text>

//     <Text style={styles.time}>
//       Completed on {new Date(item.endTime).toLocaleDateString()}
//     </Text>

//     <TouchableOpacity style={styles.resultButton}
//     onPress={() => router.push(`./results/${item._id}`)}>
//       <Text style={styles.resultText}>View Results</Text>
//     </TouchableOpacity>
//   </>
// );




//            return(
//           <View key={item._id} style={styles.card}>
//              {/* 🔥 TOURNAMENT IMAGE */}
             
//     <Image
//       source={{ uri: item.banner }}
//       style={styles.image}
//     />
    
 
//             <Text style={styles.title}>{item.title}</Text>
//             <Text style={styles.game}>{item.game}</Text>
             
//       {mode === "PLAYER" && activeTab === "UPCOMING" && <UpcomingCard item={item} />}
// {mode === "PLAYER" && activeTab === "LIVE" && (
//   <LiveCard item={item} isJoined={isJoined} />
// )}
// {mode === "PLAYER" && activeTab === "COMPLETED" && (
//   <CompletedCard item={item} />
// )}

// {mode === "HOST" && activeTab === "UPCOMING" && (
//   <HostUpcomingCard item={item} />
// )}
// {mode === "HOST" && activeTab === "LIVE" && (
//   <HostLiveCard item={item} />
// )}
// {mode === "HOST" && activeTab === "COMPLETED" && (
//   <HostCompletedCard item={item} />
// )}

//           </View>
//         )})}
//       </ScrollView>

//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     backgroundColor: "#020617",
//     padding: 16,
//   },

//   /* =====================
//      TABS
//   ===================== */
//   tabs: {
//     flexDirection: "row",
//     backgroundColor: "#0f172a",
//     borderRadius: 14,
//     padding: 6,
//     marginBottom: 16,
//   },
//   tab: {
//     flex: 1,
//     paddingVertical: 10,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   activeTab: {
//     backgroundColor: "#38bdf8",
//   },
//   tabText: {
//     color: "#94a3b8",
//     fontWeight: "600",
//     fontSize: 13,
//   },
//   activeTabText: {
//     color: "#020617",
//     fontWeight: "bold",
//     fontSize: 13,
//   },

//   /* =====================
//      CARD
//   ===================== */
//   card: {
//     backgroundColor: "#0f172a",
//     padding: 16,
//     borderRadius: 16,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: "#1e293b",
//   },

//   title: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#f8fafc",
//     marginBottom: 4,
//   },

//   game: {
//     color: "#38bdf8",
//     fontSize: 13,
//     marginBottom: 10,
//   },
//   image: {
//   width: "100%",
//   height: 100,
//   borderRadius: 14,
//   marginBottom: 10,
// },

// meta: {
//   color: "#94a3b8",
//   fontSize: 12,
//   marginTop: 4,
// },


//   /* =====================
//      BUTTON
//   ===================== */
//   button: {
//     marginTop: 12,
//     backgroundColor: "#38bdf8",
//     paddingVertical: 12,
//     borderRadius: 12,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#020617",
//     fontWeight: "bold",
//     fontSize: 14,
//   },
// row: {
//   flexDirection: "row",
//   justifyContent: "space-between",
//   marginTop: 6,
// },

// detail: {
//   color: "#cbd5f5",
//   fontSize: 13,
// },

// time: {
//   color: "#94a3b8",
//   fontSize: 12,
//   marginTop: 6,
// },
// liveText: {
//   color: "#ef4444",
//   fontWeight: "bold",
// },

// liveButton: {
//   backgroundColor: "#ef4444",
//   padding: 12,
//   borderRadius: 12,
//   marginTop: 10,
//   alignItems: "center",
// },

// roomButton: {
//   borderWidth: 1,
//   borderColor: "#38bdf8",
//   padding: 10,
//   borderRadius: 10,
//   marginTop: 8,
//   alignItems: "center",
// },

// roomText: {
//   color: "#38bdf8",
//   fontWeight: "bold",
// },

// resultButton: {
//   backgroundColor: "#334155",
//   padding: 12,
//   borderRadius: 12,
//   marginTop: 10,
//   alignItems: "center",
// },

// resultText: {
//   color: "#e5e7eb",
// },


//   /* =====================
//      EMPTY / LOADING
//   ===================== */
//   empty: {
//     textAlign: "center",
//     color: "#64748b",
//     marginTop: 40,
//     fontSize: 14,
//   },
// });


import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { usePathname } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

type TabType = "LIVE" | "UPCOMING" | "COMPLETED";
type ScreenMode = "PLAYER" | "HOST";

export default function TournamentsScreen() {
  const router = useRouter();
  const pathname = usePathname();

  const [hostId, setHostId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("UPCOMING");
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const mode: ScreenMode = pathname.includes("/host") ? "HOST" : "PLAYER";

  // Get Host ID
  useEffect(() => {
    const getHost = async () => {
      const data = await AsyncStorage.getItem("host");
      if (data) {
        const host = JSON.parse(data);
        setHostId(host._id);
      }
    };
    getHost();
  }, []);

  // Fetch Tournaments
  useEffect(() => {
    if ((mode === "HOST" && hostId) || mode === "PLAYER") {
      fetchTournaments();
    }
  }, [activeTab, hostId, mode]);

  const fetchTournaments = async () => {
    try {
      setLoading(true);
      const baseURL =
        mode === "HOST"
          ? "http://192.168.31.126:8000/api/v1/host/tournaments/my"
          : "http://192.168.31.126:8000/api/v1/player/tournaments";

      const url = `${baseURL}?status=${activeTab}`;

      const token = await AsyncStorage.getItem("token");

      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setTournaments(data.data || []);
    } catch (error) {
      console.log("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const endlive = async (tournamentId: string) => {
    try {
      const res = await fetch(
        "http://192.168.31.126:8000/api/v1/host/tournaments/end",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tournamentId }),
        }
      );

      const data = await res.json();
      if (data.success) {
        alert(data.message || "Tournament ended successfully");
        fetchTournaments(); // Refresh list
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Server error");
    }
  };

  const userId = "65c1a9f0a1b2c3d4e5f67890"; // Replace with actual logged-in user ID later

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {mode === "HOST" ? "MY TOURNAMENTS" : "TOURNAMENTS"}
        </Text>
        <Text style={styles.headerSubtitle}>
          {mode === "HOST" ? "Manage your events" : "Join competitive battles"}
        </Text>
      </View>

      {/* Neon Tabs */}
      <View style={styles.tabs}>
        {["UPCOMING", "LIVE", "COMPLETED"].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab as TabType)}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tournament List */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {loading && (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#67e8f9" />
            <Text style={styles.loadingText}>Loading tournaments...</Text>
          </View>
        )}

        {!loading && tournaments.length === 0 && (
          <View style={styles.center}>
            <Text style={styles.emptyText}>No {activeTab.toLowerCase()} tournaments found</Text>
          </View>
        )}

        {tournaments.map((item) => {
          const isJoined = item.players?.some(
            (playerId: any) => playerId.toString() === userId
          );

          return (
            <View key={item._id} style={styles.card}>
              {/* Banner */}
              <Image
                source={{ uri: item.banner }}
                style={styles.banner}
                resizeMode="cover"
              />

              {/* Status Badge */}
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>
                  {activeTab}
                </Text>
              </View>

              {/* Info */}
              <View style={styles.infoContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.game}>{item.game} • {item.map || "—"}</Text>

                <View style={styles.metaRow}>
                  <Text style={styles.prize}>
                    🏆 ₹{item.prizePool || item.prize}
                  </Text>
                  <Text style={styles.teams}>
                    👥 {item.currentTeams || item.joinedSlots || 0}/{item.maxTeams || item.slots}
                  </Text>
                </View>

                {activeTab === "UPCOMING" && (
                  <Text style={styles.time}>
                    ⏰ {new Date(item.startTime).toLocaleString([], {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                )}

                {activeTab === "COMPLETED" && item.endTime && (
                  <Text style={styles.time}>
                    Ended: {new Date(item.endTime).toLocaleDateString()}
                  </Text>
                )}
              </View>

              {/* Action Buttons - Different for HOST vs PLAYER */}
              <View style={styles.actions}>
                {mode === "PLAYER" && activeTab === "UPCOMING" && (
                  <TouchableOpacity
                    style={styles.joinButton}
                    onPress={() => router.push(`./join/${item._id}`)}
                  >
                    <Text style={styles.joinButtonText}>JOIN TOURNAMENT</Text>
                  </TouchableOpacity>
                )}

                {mode === "PLAYER" && activeTab === "LIVE" && (
                  <>
                    <TouchableOpacity
                      style={styles.liveWatchButton}
                      onPress={() => router.push(`./live/${item._id}`)}
                    >
                      <Text style={styles.buttonText}>🎥 WATCH LIVE</Text>
                    </TouchableOpacity>

                    {isJoined && (
                      <TouchableOpacity
                        style={styles.roomButton}
                        onPress={() => router.push(`./room/${item._id}`)}
                      >
                        <Text style={styles.roomButtonText}>🎮 JOIN ROOM</Text>
                      </TouchableOpacity>
                    )}
                  </>
                )}

                {mode === "PLAYER" && activeTab === "COMPLETED" && (
                  <TouchableOpacity
                    style={styles.resultButton}
                    onPress={() => router.push(`./results/${item._id}`)}
                  >
                    <Text style={styles.resultButtonText}>📊 VIEW RESULTS</Text>
                  </TouchableOpacity>
                )}

                {/* HOST BUTTONS */}
                {mode === "HOST" && activeTab === "UPCOMING" && (
                  <>
                    <TouchableOpacity
                      style={styles.playerListButton}
                      onPress={() => router.push({ pathname: "/host/joinplayer/player", params: { id: item._id } })}
                    >
                      <Text style={styles.playerListText}>👥 PLAYER LIST</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.goLiveButton}
                      onPress={() => router.push({ pathname: "/host/tournament/golive", params: { id: item._id } })}
                    >
                      <Text style={styles.goLiveText}>🚀 GO LIVE</Text>
                    </TouchableOpacity>
                  </>
                )}

                {mode === "HOST" && activeTab === "LIVE" && (
                  <>
                    <TouchableOpacity
                      style={styles.uploadButton}
                      onPress={() => router.push({ pathname: "/host/leaderboard/leader", params: { id: item._id } })}
                    >
                      <Text style={styles.uploadText}>📤 UPLOAD LEADERBOARD</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.endButton}
                      onPress={() => endlive(item._id)}
                    >
                      <Text style={styles.endButtonText}>⛔ END TOURNAMENT</Text>
                    </TouchableOpacity>
                  </>
                )}

                {mode === "HOST" && activeTab === "COMPLETED" && (
                  <TouchableOpacity
                    style={styles.viewResultButton}
                    onPress={() => router.push({ pathname: "/host/leaderboard/viewresult", params: { id: item._id } })}
                  >
                    <Text style={styles.viewResultText}>📊 VIEW LEADERBOARD</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
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
    backgroundColor: "#0f172a",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#67e8f9",
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 15,
    color: "#94a3b8",
    marginTop: 4,
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#1e2937",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 6,
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#22d3ee",
  },
  tabText: {
    color: "#94a3b8",
    fontWeight: "600",
    fontSize: 14,
  },
  activeTabText: {
    color: "#0f172a",
    fontWeight: "700",
  },

  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 30 },

  card: {
    backgroundColor: "#1e2937",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#334155",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  banner: {
    width: "100%",
    height: 160,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  statusBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(15, 23, 42, 0.9)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#67e8f9",
  },
  statusText: {
    color: "#67e8f9",
    fontSize: 12,
    fontWeight: "700",
  },
  infoContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#f8fafc",
    marginBottom: 4,
  },
  game: {
    fontSize: 14,
    color: "#67e8f9",
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  prize: {
    color: "#facc15",
    fontSize: 16,
    fontWeight: "700",
  },
  teams: {
    color: "#94a3b8",
    fontSize: 15,
  },
  time: {
    color: "#cbd5e1",
    fontSize: 13,
    marginTop: 6,
  },

  /* Buttons */
  actions: {
    padding: 16,
    paddingTop: 0,
    gap: 10,
  },
  joinButton: {
    backgroundColor: "#22d3ee",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  joinButtonText: {
    color: "#0f172a",
    fontWeight: "800",
    fontSize: 16,
  },
  liveWatchButton: {
    backgroundColor: "#ef4444",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  roomButton: {
    borderWidth: 2,
    borderColor: "#67e8f9",
    paddingVertical: 13,
    borderRadius: 14,
    alignItems: "center",
  },
  roomButtonText: {
    color: "#67e8f9",
    fontWeight: "700",
  },
  playerListButton: {
    backgroundColor: "#334155",
    paddingVertical: 13,
    borderRadius: 14,
    alignItems: "center",
  },
  playerListText: {
    color: "#e2e8f0",
    fontWeight: "600",
  },
  goLiveButton: {
    backgroundColor: "#22c55e",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  goLiveText: {
    color: "#0f172a",
    fontWeight: "800",
    fontSize: 16,
  },
  uploadButton: {
    backgroundColor: "#eab308",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  uploadText: {
    color: "#0f172a",
    fontWeight: "700",
  },
  endButton: {
    backgroundColor: "#ef4444",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  endButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
  resultButton: {
    backgroundColor: "#475569",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  resultButtonText: {
    color: "#e2e8f0",
    fontWeight: "600",
  },
  viewResultButton: {
    backgroundColor: "#64748b",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  viewResultText: {
    color: "#f1f5f9",
    fontWeight: "600",
  },

  /* Empty & Loading */
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  emptyText: {
    color: "#64748b",
    fontSize: 16,
  },
  loadingText: {
    color: "#94a3b8",
    marginTop: 12,
    fontSize: 15,
  },
});
