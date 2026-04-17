// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Image
// } from "react-native";
// import { useRouter } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useEffect, useState } from "react";



// export default function HostDashboard() {
//   const router = useRouter();
//   const [host, setHost] = useState(null);
//   useEffect(() => {
//   const getHost = async () => {
//     try {

//       const hostData = await AsyncStorage.getItem("host");
//       console.log("Hostdata is ",hostData);

//       if (hostData && hostData !== "undefined") {
//         setHost(JSON.parse(hostData));
//       }

//     } catch (error) {
//       console.log("AsyncStorage error:", error);
//     }
//   };

//   getHost();
// }, []);

// const logout = async () => {
//   try {

//     const token = await AsyncStorage.getItem("token");

//     const res=await fetch("https://gamerzhub-backend.onrender.com/api/v1/host/logout", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//   const data =await res.json();
//   console.log("data is ",data);


//     await AsyncStorage.removeItem("token");
//     await AsyncStorage.removeItem("host");
    

//     router.replace("./login");

//   } catch (error) {
//     console.log("Logout error", error);
//   }
// };


//   return (
//     <ScrollView style={styles.container}>

//       {/* PROFILE CARD */}
      
//       <View style={styles.welcomeRow}>
//   <View>
   
//     <Text style={styles.hostName}>
//   Welcome, {host?.name} 👋
// </Text>

// <Text style={styles.hostId}>
//   Username: {host?.username}
// </Text>

//   </View>

//   {/* <TouchableOpacity onPress={() => router.push("./profile")}>
//     <Image
//       source={require("../../../assets/images/icon.png")}
//       style={styles.avatar}
//     />
//   </TouchableOpacity> */}
//   <TouchableOpacity onPress={() => router.push("./profile/profileimage")}>
//   <Image
//     source={
//       host?.avatar
//         ? { uri: host.avatar }
//         : require("../../assets/images/icon.png")
//     }
//     style={styles.avatar}
//   />
// </TouchableOpacity>
// </View>


//       {/* ACTION BUTTONS */}
//       <View style={styles.section}>

//         <TouchableOpacity
//           style={styles.card}
//           onPress={() => router.push("./tournament/createtournaments")}
//         >
//           <Text style={styles.cardTitle}>➕ Create Tournament</Text>
//           <Text style={styles.cardDesc}>
//             Create and publish new tournaments
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.card}
//           onPress={() => router.push("./tournament/mytournament")}
//         >
//           <Text style={styles.cardTitle}>🏆 My Tournaments</Text>
//           <Text style={styles.cardDesc}>
//             View and manage your tournaments
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.card}>
//           <Text style={styles.cardTitle}>💰 Earnings</Text>
//           <Text style={styles.cardDesc}>
//             Total earning and wallet info
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//       style={[styles.card, styles.logout]}
//        onPress={logout}
//          >
//       <Text style={styles.logoutText}>🚪 Logout</Text>
//     </TouchableOpacity>
//       </View>

//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#020617",
//     padding: 20,
//   },

//   profileCard: {
//     backgroundColor: "#0f172a",
//     borderRadius: 16,
//     padding: 20,
//     marginBottom: 25,
//     borderWidth: 1,
//     borderColor: "#1e293b",
//   },

//   hostName: {
//     fontSize: 20,
//     fontWeight: "800",
//     color: "#38bdf8",
//   },

//   hostId: {
//     marginTop: 6,
//     color: "#94a3b8",
//     fontSize: 13,
//   },

//   section: {
//     gap: 14,
//   },

//   card: {
//     backgroundColor: "#020617",
//     borderRadius: 14,
//     padding: 18,
//     borderWidth: 1,
//     borderColor: "#1e293b",
//   },

//   cardTitle: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#e5e7eb",
//   },

//   cardDesc: {
//     fontSize: 13,
//     color: "#94a3b8",
//     marginTop: 6,
//   },

//   logout: {
//     borderColor: "#7f1d1d",
//     backgroundColor: "#020617",
//   },
//   welcomeRow: {
//   flexDirection: "row",
//   justifyContent: "space-between",
//   alignItems: "center",
//   backgroundColor: "#020617",
//   borderRadius: 14,
//   padding: 18,
//   borderWidth: 1,
//   borderColor: "#1e293b",
// },

// avatar: {
//   width: 46,
//   height: 46,
//   borderRadius: 50,
//   borderWidth: 2,
//   borderColor: "#38bdf8",
// },


//   logoutText: {
//     color: "#f87171",
//     fontWeight: "700",
//     textAlign: "center",
//     fontSize: 15,
//   },
// });



import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

export default function HostDashboard() {
  const router = useRouter();
  const [host, setHost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getHostData = async () => {
      try {
        const hostData = await AsyncStorage.getItem("host");
        if (hostData && hostData !== "undefined") {
          setHost(JSON.parse(hostData));
        }
      } catch (error) {
        console.log("Error fetching host data:", error);
      } finally {
        setLoading(false);
      }
    };

    getHostData();
  }, []);

  const logout = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      await fetch("https://gamerzhub-backend.onrender.com/api/v1/host/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("host");

      router.replace("./login");
    } catch (error) {
      console.log("Logout error:", error);
      // Still logout locally even if API fails
      await AsyncStorage.multiRemove(["token", "host"]);
      router.replace("./login");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading Dashboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" backgroundColor="#020617" />

      {/* Header / Welcome Section with Gradient */}
      <LinearGradient
        colors={["#0f172a", "#1e2937"]}
        style={styles.header}
      >
        <View style={styles.welcomeRow}>
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.greeting}>Welcome back, Host</Text>
            <Text style={styles.hostName}>{host?.name}</Text>
            <Text style={styles.username}>{host?.username}</Text>
          </View>

          <TouchableOpacity onPress={() => router.push("./profile/profileimage")}>
            <Image
              source={
                host?.avatar
                  ? { uri: host.avatar }
                  : require("../../assets/images/icon.png")
              }
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Quick Stats */}
      {/* <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Tournaments</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>₹24,850</Text>
          <Text style={styles.statLabel}>Total Earnings</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>8</Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
      </View> */}

      {/* Action Cards */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Manage Your Events</Text>

        <TouchableOpacity
          style={styles.mainCard}
          onPress={() => router.push("./tournament/createtournaments")}
        >
          <View style={styles.cardContent}>
            <View style={styles.iconCircle}>
              <Text style={styles.cardIcon}>⚔️</Text>
            </View>
            <View>
              <Text style={styles.cardTitle}>Create New Tournament</Text>
              <Text style={styles.cardDesc}>
                Host a new competitive event for gamers
              </Text>
            </View>
          </View>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.mainCard}
          onPress={() => router.push("./tournament/mytournament")}
        >
          <View style={styles.cardContent}>
            <View style={styles.iconCircle}>
              <Text style={styles.cardIcon}>🏆</Text>
            </View>
            <View>
              <Text style={styles.cardTitle}>My Tournaments</Text>
              <Text style={styles.cardDesc}>
                View, manage & monitor your events
              </Text>
            </View>
          </View>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.mainCard}>
          <View style={styles.cardContent}>
            <View style={styles.iconCircle}>
              <Text style={styles.cardIcon}>💰</Text>
            </View>
            <View>
              <Text style={styles.cardTitle}>Earnings & Wallet</Text>
              <Text style={styles.cardDesc}>
                Track your income and withdrawals
              </Text>
            </View>
          </View>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: "#020617",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#94a3b8",
    fontSize: 16,
  },

  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  welcomeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  welcomeTextContainer: {
    flex: 1,
  },

  greeting: {
    fontSize: 14,
    color: "#94a3b8",
    marginBottom: 4,
  },

  hostName: {
    fontSize: 26,
    fontWeight: "800",
    color: "#ffffff",
  },

  username: {
    fontSize: 15,
    color: "#38bdf8",
    marginTop: 2,
  },

  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 3,
    borderColor: "#38bdf8",
  },

  // Stats
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: -35,
    marginBottom: 30,
  },

  statCard: {
    backgroundColor: "#0f172a",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    width: "31%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1e293b",
  },

  statNumber: {
    fontSize: 20,
    fontWeight: "800",
    color: "#38bdf8",
  },

  statLabel: {
    fontSize: 11,
    color: "#94a3b8",
    marginTop: 4,
    textAlign: "center",
  },

  // Section
  section: {
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#e2e8f0",
    marginBottom: 16,
    paddingLeft: 4,
  },

  mainCard: {
    backgroundColor: "#0f172a",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#1e293b",
  },

  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#1e2937",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  cardIcon: {
    fontSize: 24,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#f1f5f9",
  },

  cardDesc: {
    fontSize: 13.5,
    color: "#94a3b8",
    marginTop: 3,
  },

  arrow: {
    fontSize: 22,
    color: "#38bdf8",
    fontWeight: "300",
  },

  // Logout
  logoutButton: {
    marginHorizontal: 20,
    marginTop: 30,
    backgroundColor: "#7f1d1d",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  logoutText: {
    color: "#fda4af",
    fontSize: 16,
    fontWeight: "700",
  },
});