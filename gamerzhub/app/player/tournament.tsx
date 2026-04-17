


// import { View, Text, ScrollView, StyleSheet, TouchableOpacity,Image,TextInput} from "react-native";
// import { useEffect, useState } from "react";
// import { useRouter } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useLocalSearchParams } from "expo-router";


// type TabType = "LIVE" | "UPCOMING" | "COMPLETED";
// type ScreenMode = "PLAYER" | "HOST";


// export default function TournamentsScreen() {
//   const router = useRouter();
//   const [mode, setMode] = useState<ScreenMode>("PLAYER");
//   const [activeTab, setActiveTab] = useState<TabType>("LIVE");
//   const [tournaments, setTournaments] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false); 
//   const [userLoaded, setUserLoaded] = useState(false);
//   const [userId, setUserId] = useState<string | null>(null);
//   const [time, setTime] = useState("");
// const [meridiem, setMeridiem] = useState("PM");
// const { game } = useLocalSearchParams();
// const [search, setSearch] = useState("");
// const [isSearching, setIsSearching] = useState(false);

// useEffect(() => {
//   const loadUser = async () => {
//     const id = await AsyncStorage.getItem("userId");
//     console.log("🔥 USER ID FROM STORAGE =", id);

//     setUserId(id);
//     setUserLoaded(true);
//   };

//   loadUser();
// }, []);

// const handleSearch = async () => {
//   try {
//     if (!search.trim()) {
//       setIsSearching(false);
//       fetchTournaments(); // reset
//       return;
//     }
//      setIsSearching(true);
//     setLoading(true);

//     const res = await fetch(
//       "https://gamerzhub-backend.onrender.com/api/v1/player/search",
//       {
//         method: "POST", // 👈 important
//         headers: {
//           "Content-Type": "application/json", // 👈 important
//         },
//         body: JSON.stringify({
//           username: search,
//           game:game,
//           status:activeTab, // 👈 body me bhej rahe
//         }),
//       }
//     );

//     const data = await res.json();

//     console.log("SEARCH RESULT 👉", data);

//     setTournaments(data.data || []);
//   } catch (err) {
//     console.log("Search error:", err);
//   } finally {
//     setLoading(false);
//   }
// };


// const fetchTournaments = async () => {
//   try {
//     setLoading(true);

//     const baseURL =
//       mode === "HOST"
//         ? "https://gamerzhub-backend.onrender.com/api/v1/host/tournaments/my"
//         : "https://gamerzhub-backend.onrender.com/api/v1/player/tournaments";
// const res = await fetch(
//   `${baseURL}?status=${activeTab}&game=${game || ""}`
// );


//     const data = await res.json();

//     console.log("FETCHED TOURNAMENTS 👉", data);

//     setTournaments(Array.isArray(data) ? data : data.data || []);
//   } catch (error) {
//     console.log("Fetch error:", error);
//   } finally {
//     setLoading(false);
//   }
// };
// //   useEffect(() => {
// //   if (!userLoaded) return;

// //    if (!isSearching) {
// //     fetchTournaments(); // 👈 only when NOT searching
// //   }
// // }, [activeTab, mode, userLoaded,game,isSearching]);

// useEffect(() => {
//   if (!userLoaded) return;

//   if (isSearching) {
//     handleSearch(); // 👈 THIS FIX
//   } else {
//     fetchTournaments();
//   }
// }, [activeTab, mode, userLoaded, game]);

// const isUserJoinedTournament = (tournament, userId) => {
//   if (!tournament || !userId) return false;

//   return tournament.players?.some((team) =>
//     team.members?.some(
//       (m) => String(m.playerId) === String(userId)
//     )
//   );
// };

//   return (
//     <View style={styles.screen}>
//       {/* 🔍 SEARCH BAR */}
// <View style={styles.searchContainer}>
//   <TextInput
//     placeholder="Search by host username..."
//     placeholderTextColor="#64748b"
//     value={search}
//     // onChangeText={setSearch}
//     onChangeText={(text) => {
//   setSearch(text);

//   // 👇 agar empty ho gaya → normal mode
//   if (text.trim() === "") {
//     setIsSearching(false);
//     fetchTournaments();
//   }
// }}
//     style={styles.searchInput}
//   />

//   <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
//     <Text style={styles.searchButtonText}>Search</Text>
//   </TouchableOpacity>
// </View>

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

//         {!loading && tournaments.length === 0 && (
//           <Text style={styles.empty}>No tournaments found</Text>
//         )}
  
//         {tournaments.map(item =>  {
// const isJoined = isUserJoinedTournament(item, userId);
//                    const HostUpcomingCard = ({ item }: any) => (
//                        <>
//                   <Text style={styles.detail}>
//                           👥 Teams: {item.currentTeams}/{item.maxTeams}
//                    </Text>

//     <TouchableOpacity style={styles.roomButton}>
//       <Text style={styles.roomText}>👥 Player List</Text>
//     </TouchableOpacity>

//     <TouchableOpacity style={styles.button}>
//       <Text style={styles.buttonText}>🚀 Go Live</Text>
//     </TouchableOpacity>
//   </>
// );


// const HostLiveCard = ({ item }: any) => (
//   <>
//     <TouchableOpacity style={styles.liveButton}>
//       <Text style={styles.buttonText}>📤 Upload Leaderboard</Text>
//     </TouchableOpacity>

//     <TouchableOpacity style={[styles.button, { backgroundColor: "#ef4444" }]}>
//       <Text style={styles.buttonText}>⛔ End Tournament</Text>
//     </TouchableOpacity>
//   </>
// );


// const HostCompletedCard = ({ item }: any) => (
//   <TouchableOpacity style={styles.resultButton}>
//     <Text style={styles.resultText}>📊 View Leaderboard</Text>
//   </TouchableOpacity>
// );

//                  const UpcomingCard = ({ item }: any) => (
//                               <>
//                      <Text style={styles.detail}>
//                             👥 Teams: {item.currentTeams}/{item.maxTeams}
//                             </Text>

                       

//                              <Text style={styles.time}>
//                                  ⏰{" "}
//                          {new Date(item.startTime).toLocaleString("en-IN", {
//                           timeZone: "Asia/Kolkata",
//                             hour: "2-digit",
//                            minute: "2-digit",
//                            hour12: true,
//                           day: "2-digit",
//                              month: "short",
//                                 })}
//                           </Text>
//                         <TouchableOpacity style={styles.button}
//                          onPress={() => router.push({
//   pathname: "./joinbyphone",
//   params: {
//     id: item._id,
    
//   },
//   })}>
                           
//                         <Text style={styles.buttonText}>Join Tournament</Text>
//                      </TouchableOpacity>
//                              </>
//                                 );
//              const LiveCard = ({ item, isJoined }: any) => (
//                         <>
//                       <View style={styles.row}>
//                    <Text style={styles.detail}>🏆 Prize: ₹{item.prizePool}</Text>
//                    <Text style={styles.liveText}>🔴 LIVE</Text>
//                 </View>

//                   <Text style={styles.detail}>
//                   👥 Slots: {item.currentTeams}/{item.maxTeams}
//                     </Text>

//                <TouchableOpacity style={styles.liveButton}
//                onPress={() => router.push(`./live/${item._id}`)}>
//               <Text style={styles.buttonText}>🎥 Watch Live</Text>
//                     </TouchableOpacity>

//                      {isJoined && (
//                   <TouchableOpacity style={styles.roomButton}
//                   onPress={() => router.push({ pathname: "/player/room", params: { id: item._id }})}>
//                            <Text style={styles.roomText}>🎮 Join Room</Text>
//                              </TouchableOpacity>
//                               )}
//                       </>
//                                );
//               const CompletedCard = ({ item }: any) => (
//   <>
//     <Text style={styles.detail}>
//       🏆 Prize Pool: ₹{item.prizePool}
//     </Text>

//     <Text style={styles.time}>
//       Completed on {new Date(item.endTime).toLocaleDateString()}
//     </Text>

//     <TouchableOpacity style={styles.resultButton}
//     onPress={() => router.push({ pathname: "/host/leaderboard/viewresult", params: { id: item._id }})}>
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
//             <View style={styles.typeRow}>
//   <Text style={styles.matchType}>
//     {item.matchType === "SOLO" && "🧍 SOLO"}
//     {item.matchType === "DUO" && "👥 DUO"}
//     {item.matchType === "SQUAD" && "👨‍👩‍👧‍👦 SQUAD"}
//   </Text>

//   <Text style={styles.teamSize}>
//     Team Size: {item.teamSize}
//   </Text>
// </View>

//             <Text style={styles.game}>{item.game}</Text>
//             {/* HOST INFO */}
// <View style={styles.hostRow}>
//   <Image
//     source={{
//       uri:
//         item.hostId?.avatar ||
//         "https://cdn-icons-png.flaticon.com/512/149/149071.png",
//     }}
//     style={styles.hostAvatar}
//   />

//   <View>
//     <Text style={styles.hostName}>
//       Host: {item.hostId?.username || "Unknown"}
//     </Text>

//     <Text style={styles.hostId}>
//       ID: {item.hostId?._id?.slice(0, 9)}
//     </Text>
//   </View>
// </View>

//               {/* 🔥 TAB WISE CONTENT */}
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
//   searchContainer: {
//   flexDirection: "row",
//   alignItems: "center",
//   marginBottom: 12,
// },

// searchInput: {
//   flex: 1,
//   backgroundColor: "#0f172a",
//   padding: 12,
//   borderRadius: 12,
//   color: "#fff",
//   borderWidth: 1,
//   borderColor: "#1e293b",
//   marginRight: 8,
// },

// searchButton: {
//   backgroundColor: "#38bdf8",
//   paddingHorizontal: 16,
//   paddingVertical: 12,
//   borderRadius: 12,
// },

// searchButtonText: {
//   color: "#020617",
//   fontWeight: "bold",
// },

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
//   typeRow: {
//   flexDirection: "row",
//   justifyContent: "space-between",
//   marginBottom: 6,
// },

// matchType: {
//   color: "#22c55e",
//   fontWeight: "bold",
//   fontSize: 12,
// },

// teamSize: {
//   color: "#94a3b8",
//   fontSize: 11,
// },


//   game: {
//     color: "#38bdf8",
//     fontSize: 13,
//     marginBottom: 10,
//   },
//   image: {
//   width: "100%",
//   height: 160,
//   borderRadius: 14,
//   marginBottom: 10,
// },

// meta: {
//   color: "#94a3b8",
//   fontSize: 12,
//   marginTop: 4,
// },
// hostRow: {
//   flexDirection: "row",
//   alignItems: "center",
//   marginBottom: 10,
// },

// hostAvatar: {
//   width: 36,
//   height: 36,
//   borderRadius: 50,
//   marginRight: 10,
//   borderWidth: 2,
//   borderColor: "#38bdf8",
// },

// hostName: {
//   color: "#e5e7eb",
//   fontWeight: "700",
//   fontSize: 13,
// },

// hostId: {
//   color: "#94a3b8",
//   fontSize: 11,
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
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";

type TabType = "LIVE" | "UPCOMING" | "COMPLETED";

export default function PlayerTournamentsScreen() {
  const router = useRouter();
  const { game } = useLocalSearchParams();

  const [activeTab, setActiveTab] = useState<TabType>("UPCOMING");
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Load User ID
  useEffect(() => {
    const loadUser = async () => {
      const id = await AsyncStorage.getItem("userId");
      setUserId(id);
    };
    loadUser();
  }, []);

  const fetchTournaments = async () => {
    try {
      setLoading(true);
      const baseURL = "https://gamerzhub-backend.onrender.com/api/v1/player/tournaments";
      const url = `${baseURL}?status=${activeTab}&game=${game || ""}`;

      const res = await fetch(url);
      const data = await res.json();

      setTournaments(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.log("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!search.trim()) {
      setIsSearching(false);
      fetchTournaments();
      return;
    }

    try {
      setIsSearching(true);
      setLoading(true);

      const res = await fetch(
        "https://gamerzhub-backend.onrender.com/api/v1/player/search",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: search,
            game: game,
            status: activeTab,
          }),
        }
      );

      const data = await res.json();
      setTournaments(data.data || []);
    } catch (err) {
      console.log("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch when tab changes or game changes
  useEffect(() => {
    if (isSearching) {
      handleSearch();
    } else {
      fetchTournaments();
    }
  }, [activeTab, game]);

  const isUserJoinedTournament = (tournament: any, userId: string | null) => {
    if (!tournament || !userId) return false;
    return tournament.players?.some((team: any) =>
      team.members?.some((m: any) => String(m.playerId) === String(userId))
    );
  };

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          {game ? `${game} Tournaments` : "All Tournaments"}
        </Text>
        <Text style={styles.subtitle}>Find your next battle</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search by host username..."
          placeholderTextColor="#64748b"
          value={search}
          onChangeText={(text) => {
            setSearch(text);
            if (text.trim() === "") {
              setIsSearching(false);
              fetchTournaments();
            }
          }}
          style={styles.searchInput}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>SEARCH</Text>
        </TouchableOpacity>
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

      {/* Tournaments List */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {loading && (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#67e8f9" />
            <Text style={styles.loadingText}>Loading battles...</Text>
          </View>
        )}

        {!loading && tournaments.length === 0 && (
          <View style={styles.center}>
            <Text style={styles.emptyText}>No {activeTab.toLowerCase()} tournaments found</Text>
          </View>
        )}

        {tournaments.map((item) => {
          const isJoined = isUserJoinedTournament(item, userId);

          return (
            <View key={item._id} style={styles.card}>
              {/* Banner with Overlay */}
              <View style={styles.bannerContainer}>
                <Image
                  source={{ uri: item.banner }}
                  style={styles.banner}
                  resizeMode="cover"
                />
                <View style={styles.bannerOverlay}>
                  <Text style={styles.matchTypeBadge}>
                    {item.matchType} • {item.teamSize}v{item.teamSize}
                  </Text>
                </View>
              </View>

              {/* Tournament Info */}
              <View style={styles.infoContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.game}>{item.game}</Text>

                <View style={styles.metaRow}>
                  <Text style={styles.prize}>🏆 ₹{item.prizePool}</Text>
                  <Text style={styles.teams}>
                    👥 {item.currentTeams || 0}/{item.maxTeams}
                  </Text>
                </View>

                {activeTab === "UPCOMING" && (
                  <Text style={styles.time}>
                    ⏰ {new Date(item.startTime).toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                      day: "numeric",
                      month: "short",
                    })}
                  </Text>
                )}

                {activeTab === "COMPLETED" && item.endTime && (
                  <Text style={styles.time}>
                    Ended: {new Date(item.endTime).toLocaleDateString()}
                  </Text>
                )}

                {/* Host Info */}
                <View style={styles.hostRow}>
                  <Image
                    source={{
                      uri: item.hostId?.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                    }}
                    style={styles.hostAvatar}
                  />
                  <View>
                    <Text style={styles.hostName}>
                      Host: {item.hostId?.username || "Unknown"}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.actions}>
                {activeTab === "UPCOMING" && (
                  <TouchableOpacity
                    style={styles.joinButton}
                    onPress={() =>
                      router.push({
                        pathname: "./joinbyphone",
                        params: { id: item._id },
                      })
                    }
                  >
                    <Text style={styles.joinButtonText}>JOIN TOURNAMENT</Text>
                  </TouchableOpacity>
                )}

                {activeTab === "LIVE" && (
                  <>
                    <TouchableOpacity
                      style={styles.liveButton}
                      onPress={() => router.push(`./live/${item._id}`)}
                    >
                      <Text style={styles.liveButtonText}>🎥 WATCH LIVE</Text>
                    </TouchableOpacity>

                    {isJoined && (
                      <TouchableOpacity
                        style={styles.roomButton}
                        onPress={() =>
                          router.push({ pathname: "/player/room", params: { id: item._id } })
                        }
                      >
                        <Text style={styles.roomButtonText}>🎮 JOIN ROOM</Text>
                      </TouchableOpacity>
                    )}
                  </>
                )}

                {activeTab === "COMPLETED" && (
                  <TouchableOpacity
                    style={styles.resultButton}
                    onPress={() =>
                      router.push({ pathname: "/host/leaderboard/viewresult", params: { id: item._id } })
                    }
                  >
                    <Text style={styles.resultButtonText}>📊 VIEW RESULTS</Text>
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
    backgroundColor: "#1e2937",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#67e8f9",
  },
  subtitle: {
    fontSize: 15,
    color: "#94a3b8",
    marginTop: 4,
  },

  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#1e2937",
    gap: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 14,
    borderRadius: 14,
    color: "#f1f5f9",
    borderWidth: 1,
    borderColor: "#334155",
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: "#67e8f9",
    paddingHorizontal: 20,
    borderRadius: 14,
    justifyContent: "center",
  },
  searchButtonText: {
    color: "#0f172a",
    fontWeight: "800",
    fontSize: 15,
  },

  tabs: {
    flexDirection: "row",
    backgroundColor: "#1e2937",
    marginHorizontal: 16,
    marginVertical: 12,
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
  scrollContent: { padding: 16, paddingBottom: 40 },

  card: {
    backgroundColor: "#1e2937",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#334155",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
  },

  bannerContainer: {
    position: "relative",
    height: 170,
  },
  banner: {
    width: "100%",
    height: "100%",
  },
  bannerOverlay: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "rgba(15, 23, 42, 0.85)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  matchTypeBadge: {
    color: "#67e8f9",
    fontSize: 13,
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
    fontSize: 15,
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
    fontSize: 17,
    fontWeight: "700",
  },
  teams: {
    color: "#94a3b8",
    fontSize: 15,
  },
  time: {
    color: "#cbd5e1",
    fontSize: 13.5,
    marginTop: 4,
  },

  hostRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#334155",
  },
  hostAvatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 12,
    borderWidth: 2,
    borderColor: "#67e8f9",
  },
  hostName: {
    color: "#e2e8f0",
    fontWeight: "600",
    fontSize: 14,
  },

  actions: {
    padding: 16,
    paddingTop: 0,
    gap: 12,
  },

  joinButton: {
    backgroundColor: "#22d3ee",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  joinButtonText: {
    color: "#0f172a",
    fontWeight: "800",
    fontSize: 16,
  },

  liveButton: {
    backgroundColor: "#ef4444",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  liveButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  roomButton: {
    borderWidth: 2,
    borderColor: "#67e8f9",
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: "center",
  },
  roomButtonText: {
    color: "#67e8f9",
    fontWeight: "700",
    fontSize: 16,
  },

  resultButton: {
    backgroundColor: "#475569",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  resultButtonText: {
    color: "#e2e8f0",
    fontWeight: "600",
    fontSize: 16,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
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