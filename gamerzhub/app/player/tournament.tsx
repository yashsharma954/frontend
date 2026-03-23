


import { View, Text, ScrollView, StyleSheet, TouchableOpacity,Image,TextInput} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";


type TabType = "LIVE" | "UPCOMING" | "COMPLETED";
type ScreenMode = "PLAYER" | "HOST";


export default function TournamentsScreen() {
  const router = useRouter();
  const [mode, setMode] = useState<ScreenMode>("PLAYER");
  const [activeTab, setActiveTab] = useState<TabType>("LIVE");
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false); 
  const [userLoaded, setUserLoaded] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [time, setTime] = useState("");
const [meridiem, setMeridiem] = useState("PM");
const { game } = useLocalSearchParams();

useEffect(() => {
  const loadUser = async () => {
    const id = await AsyncStorage.getItem("userId");
    console.log("🔥 USER ID FROM STORAGE =", id);

    setUserId(id);
    setUserLoaded(true);
  };

  loadUser();
}, []);




const fetchTournaments = async () => {
  try {
    setLoading(true);

    const baseURL =
      mode === "HOST"
        ? "http://192.168.31.126:8000/api/v1/host/tournaments/my"
        : "http://192.168.31.126:8000/api/v1/player/tournaments";
const res = await fetch(
  `${baseURL}?status=${activeTab}&game=${game || ""}`
);


    const data = await res.json();

    console.log("FETCHED TOURNAMENTS 👉", data);

    setTournaments(Array.isArray(data) ? data : data.data || []);
  } catch (error) {
    console.log("Fetch error:", error);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
  if (!userLoaded) return;

  fetchTournaments();
}, [activeTab, mode, userLoaded,game]);

const isUserJoinedTournament = (tournament, userId) => {
  if (!tournament || !userId) return false;

  return tournament.players?.some((team) =>
    team.members?.some(
      (m) => String(m.playerId) === String(userId)
    )
  );
};

  return (
    <View style={styles.screen}>

      {/* TABS */}
      <View style={styles.tabs}>
        {["LIVE", "UPCOMING", "COMPLETED"].map(tab => (
           
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab as TabType)}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
          >
            <Text style={activeTab === tab ? styles.activeTabText : styles.tabText}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* LIST */}
      <ScrollView>
        {loading && <Text style={styles.empty}>Loading tournaments...</Text>}

        {!loading && tournaments.length === 0 && (
          <Text style={styles.empty}>No tournaments found</Text>
        )}
  
        {tournaments.map(item =>  {

  
// const isJoined = item.players?.some((team: any) =>
//   team.members?.some(
//     (m: any) => String(m.playerId) === String(userId)
//   )
// );
const isJoined = isUserJoinedTournament(item, userId);
                   const HostUpcomingCard = ({ item }: any) => (
                       <>
                  <Text style={styles.detail}>
                          👥 Teams: {item.currentTeams}/{item.maxTeams}
                   </Text>

    <TouchableOpacity style={styles.roomButton}>
      <Text style={styles.roomText}>👥 Player List</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>🚀 Go Live</Text>
    </TouchableOpacity>
  </>
);


const HostLiveCard = ({ item }: any) => (
  <>
    <TouchableOpacity style={styles.liveButton}>
      <Text style={styles.buttonText}>📤 Upload Leaderboard</Text>
    </TouchableOpacity>

    <TouchableOpacity style={[styles.button, { backgroundColor: "#ef4444" }]}>
      <Text style={styles.buttonText}>⛔ End Tournament</Text>
    </TouchableOpacity>
  </>
);


const HostCompletedCard = ({ item }: any) => (
  <TouchableOpacity style={styles.resultButton}>
    <Text style={styles.resultText}>📊 View Leaderboard</Text>
  </TouchableOpacity>
);

                 const UpcomingCard = ({ item }: any) => (
                              <>
                     <Text style={styles.detail}>
                            👥 Teams: {item.currentTeams}/{item.maxTeams}
                            </Text>

                       

                             <Text style={styles.time}>
                                 ⏰{" "}
                         {new Date(item.startTime).toLocaleString("en-IN", {
                          timeZone: "Asia/Kolkata",
                            hour: "2-digit",
                           minute: "2-digit",
                           hour12: true,
                          day: "2-digit",
                             month: "short",
                                })}
                          </Text>
                        <TouchableOpacity style={styles.button}
                         onPress={() => router.push({
  pathname: "./joinbyphone",
  params: {
    id: item._id,
    
  },
  })}>
                           
                        <Text style={styles.buttonText}>Join Tournament</Text>
                     </TouchableOpacity>
                             </>
                                );
             const LiveCard = ({ item, isJoined }: any) => (
                        <>
                      <View style={styles.row}>
                   <Text style={styles.detail}>🏆 Prize: ₹{item.prizePool}</Text>
                   <Text style={styles.liveText}>🔴 LIVE</Text>
                </View>

                  <Text style={styles.detail}>
                  👥 Slots: {item.currentTeams}/{item.maxTeams}
                    </Text>

               <TouchableOpacity style={styles.liveButton}
               onPress={() => router.push(`./live/${item._id}`)}>
              <Text style={styles.buttonText}>🎥 Watch Live</Text>
                    </TouchableOpacity>

                     {isJoined && (
                  <TouchableOpacity style={styles.roomButton}
                  onPress={() => router.push(`./room/${item._id}`)}>
                           <Text style={styles.roomText}>🎮 Join Room</Text>
                             </TouchableOpacity>
                              )}
                      </>
                               );
              const CompletedCard = ({ item }: any) => (
  <>
    <Text style={styles.detail}>
      🏆 Prize Pool: ₹{item.prizePool}
    </Text>

    <Text style={styles.time}>
      Completed on {new Date(item.endTime).toLocaleDateString()}
    </Text>

    <TouchableOpacity style={styles.resultButton}
    onPress={() => router.push(`./(tabs)/view-result/${item._id}`)}>
      <Text style={styles.resultText}>View Results</Text>
    </TouchableOpacity>
  </>
);
           return(
          <View key={item._id} style={styles.card}>
             {/* 🔥 TOURNAMENT IMAGE */}
             
    <Image
      source={{ uri: item.banner }}
      style={styles.image}
    />
 
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.typeRow}>
  <Text style={styles.matchType}>
    {item.matchType === "SOLO" && "🧍 SOLO"}
    {item.matchType === "DUO" && "👥 DUO"}
    {item.matchType === "SQUAD" && "👨‍👩‍👧‍👦 SQUAD"}
  </Text>

  <Text style={styles.teamSize}>
    Team Size: {item.teamSize}
  </Text>
</View>

            <Text style={styles.game}>{item.game}</Text>
            {/* HOST INFO */}
<View style={styles.hostRow}>
  <Image
    source={{
      uri:
        item.hostId?.avatar ||
        "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    }}
    style={styles.hostAvatar}
  />

  <View>
    <Text style={styles.hostName}>
      Host: {item.hostId?.username || "Unknown"}
    </Text>

    <Text style={styles.hostId}>
      ID: {item.hostId?._id?.slice(0, 9)}
    </Text>
  </View>
</View>

              {/* 🔥 TAB WISE CONTENT */}
      {mode === "PLAYER" && activeTab === "UPCOMING" && <UpcomingCard item={item} />}
{mode === "PLAYER" && activeTab === "LIVE" && (
  <LiveCard item={item} isJoined={isJoined} />
)}
{mode === "PLAYER" && activeTab === "COMPLETED" && (
  <CompletedCard item={item} />
)}

{mode === "HOST" && activeTab === "UPCOMING" && (
  <HostUpcomingCard item={item} />
)}
{mode === "HOST" && activeTab === "LIVE" && (
  <HostLiveCard item={item} />
)}
{mode === "HOST" && activeTab === "COMPLETED" && (
  <HostCompletedCard item={item} />
)}

          </View>
        )})}
      </ScrollView>

    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#020617",
    padding: 16,
  },

  /* =====================
     TABS
  ===================== */
  tabs: {
    flexDirection: "row",
    backgroundColor: "#0f172a",
    borderRadius: 14,
    padding: 6,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#38bdf8",
  },
  tabText: {
    color: "#94a3b8",
    fontWeight: "600",
    fontSize: 13,
  },
  activeTabText: {
    color: "#020617",
    fontWeight: "bold",
    fontSize: 13,
  },

  /* =====================
     CARD
  ===================== */
  card: {
    backgroundColor: "#0f172a",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#1e293b",
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#f8fafc",
    marginBottom: 4,
  },
  typeRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 6,
},

matchType: {
  color: "#22c55e",
  fontWeight: "bold",
  fontSize: 12,
},

teamSize: {
  color: "#94a3b8",
  fontSize: 11,
},


  game: {
    color: "#38bdf8",
    fontSize: 13,
    marginBottom: 10,
  },
  image: {
  width: "100%",
  height: 160,
  borderRadius: 14,
  marginBottom: 10,
},

meta: {
  color: "#94a3b8",
  fontSize: 12,
  marginTop: 4,
},
hostRow: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 10,
},

hostAvatar: {
  width: 36,
  height: 36,
  borderRadius: 50,
  marginRight: 10,
  borderWidth: 2,
  borderColor: "#38bdf8",
},

hostName: {
  color: "#e5e7eb",
  fontWeight: "700",
  fontSize: 13,
},

hostId: {
  color: "#94a3b8",
  fontSize: 11,
},



  /* =====================
     BUTTON
  ===================== */
  button: {
    marginTop: 12,
    backgroundColor: "#38bdf8",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#020617",
    fontWeight: "bold",
    fontSize: 14,
  },
row: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 6,
},

detail: {
  color: "#cbd5f5",
  fontSize: 13,
},

time: {
  color: "#94a3b8",
  fontSize: 12,
  marginTop: 6,
},
liveText: {
  color: "#ef4444",
  fontWeight: "bold",
},

liveButton: {
  backgroundColor: "#ef4444",
  padding: 12,
  borderRadius: 12,
  marginTop: 10,
  alignItems: "center",
},

roomButton: {
  borderWidth: 1,
  borderColor: "#38bdf8",
  padding: 10,
  borderRadius: 10,
  marginTop: 8,
  alignItems: "center",
},

roomText: {
  color: "#38bdf8",
  fontWeight: "bold",
},

resultButton: {
  backgroundColor: "#334155",
  padding: 12,
  borderRadius: 12,
  marginTop: 10,
  alignItems: "center",
},

resultText: {
  color: "#e5e7eb",
},


  /* =====================
     EMPTY / LOADING
  ===================== */
  empty: {
    textAlign: "center",
    color: "#64748b",
    marginTop: 40,
    fontSize: 14,
  },
});
