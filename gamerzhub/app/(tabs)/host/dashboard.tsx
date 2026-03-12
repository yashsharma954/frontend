import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";



export default function HostDashboard() {
  const router = useRouter();
  const [host, setHost] = useState(null);
  useEffect(() => {
  const getHost = async () => {
    try {

      const hostData = await AsyncStorage.getItem("host");
      console.log("Hostdata is ",hostData);

      if (hostData && hostData !== "undefined") {
        setHost(JSON.parse(hostData));
      }

    } catch (error) {
      console.log("AsyncStorage error:", error);
    }
  };

  getHost();
}, []);

const logout = async () => {
  try {

    const token = await AsyncStorage.getItem("token");

    const res=await fetch("http://192.168.31.126:8000/api/v1/host/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  const data =await res.json();
  console.log("data is ",data);


    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("host");
    

    router.replace("./login");

  } catch (error) {
    console.log("Logout error", error);
  }
};


  return (
    <ScrollView style={styles.container}>

      {/* PROFILE CARD */}
      
      <View style={styles.welcomeRow}>
  <View>
   
    <Text style={styles.hostName}>
  Welcome, {host?.name} 👋
</Text>

<Text style={styles.hostId}>
  Username: {host?.username}
</Text>

  </View>

  {/* <TouchableOpacity onPress={() => router.push("./profile")}>
    <Image
      source={require("../../../assets/images/icon.png")}
      style={styles.avatar}
    />
  </TouchableOpacity> */}
  <TouchableOpacity onPress={() => router.push("./profile/profileimage")}>
  <Image
    source={
      host?.avatar
        ? { uri: host.avatar }
        : require("../../../assets/images/icon.png")
    }
    style={styles.avatar}
  />
</TouchableOpacity>
</View>


      {/* ACTION BUTTONS */}
      <View style={styles.section}>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("./create")}
        >
          <Text style={styles.cardTitle}>➕ Create Tournament</Text>
          <Text style={styles.cardDesc}>
            Create and publish new tournaments
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("./my-tournaments")}
        >
          <Text style={styles.cardTitle}>🏆 My Tournaments</Text>
          <Text style={styles.cardDesc}>
            View and manage your tournaments
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>💰 Earnings</Text>
          <Text style={styles.cardDesc}>
            Total earning and wallet info
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
      style={[styles.card, styles.logout]}
       onPress={logout}
         >
      <Text style={styles.logoutText}>🚪 Logout</Text>
    </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    padding: 20,
  },

  profileCard: {
    backgroundColor: "#0f172a",
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#1e293b",
  },

  hostName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#38bdf8",
  },

  hostId: {
    marginTop: 6,
    color: "#94a3b8",
    fontSize: 13,
  },

  section: {
    gap: 14,
  },

  card: {
    backgroundColor: "#020617",
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: "#1e293b",
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#e5e7eb",
  },

  cardDesc: {
    fontSize: 13,
    color: "#94a3b8",
    marginTop: 6,
  },

  logout: {
    borderColor: "#7f1d1d",
    backgroundColor: "#020617",
  },
  welcomeRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#020617",
  borderRadius: 14,
  padding: 18,
  borderWidth: 1,
  borderColor: "#1e293b",
},

avatar: {
  width: 46,
  height: 46,
  borderRadius: 50,
  borderWidth: 2,
  borderColor: "#38bdf8",
},


  logoutText: {
    color: "#f87171",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 15,
  },
});
