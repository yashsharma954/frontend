
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";


export default function PaymentScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
   const [loading, setLoading] = useState(false);

  const [teamName, setTeamName] = useState("");
 
  const [tournament, setTournament] = useState(null);
  const [members, setMembers] = useState([
 
]);
const [tournamentId,setTournamentId]=useState("");




useEffect(() => {
  const fetchTournament = async () => {
    try {
      const res = await fetch(
        `http://192.168.31.126:8000/api/v1/player/tournament/${id}`
      );

      const data = await res.json();
      console.log("data is ",data);
      setTournament(data.data);
      setTournamentId(data.data._id);

    } catch (error) {
      console.log(error);
    }
  };

  if (id) fetchTournament();
}, [id]);
// useEffect(() => {
//   if (!tournament) return;

//   setMembers(
//     Array.from({ length: tournament.teamSize }).map(() => ({
//       ign: "",
//     }))
//   );
// }, [tournament]);
useEffect(() => {
  if (!tournament) return;

  console.log("TEAM SIZE:", tournament.teamSize);

  const teamSize = Number(tournament.teamSize) || 1;

  const newMembers = Array.from({ length: teamSize }, () => ({
    ign: "",
  }));

  setMembers(newMembers);
}, [tournament]);

const handlePayment = async () => {
  try {
    setLoading(true);

    const playerId = await AsyncStorage.getItem("tempUserId");
    console.log(playerId);

    if (!playerId) {
      alert("User not found, please login again");
      return;
    }

    const res = await fetch(
      `http://192.168.31.126:8000/api/v1/player/join`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teamName,
          playerId,
          tournamentId,
          members: members.map((m) => ({
            playerId,
            ign: m.ign,
          })),
        }),
      }
    );

    const data = await res.json();

    if (!data.success) {
      alert(data.message);
      return;
    }

    // ✅ PAYMENT SUCCESS → convert temp → permanent
    await AsyncStorage.removeItem("tempUserId");
    await AsyncStorage.setItem("userId", data.data._id);
    

    alert("🎉 Slot Confirmed");
    router.replace("./tournament");

  } catch (err) {
    console.log(err);
    alert("Server error");
  } finally {
    setLoading(false);
  }
};



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complete Registration</Text>

      <TextInput
        placeholder="Team Name"
        placeholderTextColor="#94a3b8"
        style={styles.input}
        value={teamName}
        onChangeText={setTeamName}
      />

      {/* {members.map((member, index) => (
     <TextInput
    key={index}
    placeholder={`Player ${index + 1} IGN`}
    placeholderTextColor="#94a3b8"
    style={styles.input}
    value={member.ign}
    onChangeText={(text) => {
      const updated = [...members];
      updated[index].ign = text;
      setMembers(updated);
       }}
      />
     ))} */}

     {members.length > 0 &&
  members.map((member, index) => (
    <TextInput
      key={index}
      placeholder={`Player ${index + 1} IGN`}
      placeholderTextColor="#94a3b8"
      style={styles.input}
      value={member.ign}
      onChangeText={(text) => {
        const updated = [...members];
        updated[index].ign = text;
        setMembers(updated);
      }}
    />
))}


      <TouchableOpacity style={styles.payBtn} onPress={handlePayment}>
        <Text style={styles.payText}>PAY ₹50 & JOIN</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    color: "#38bdf8",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#0f172a",
    padding: 14,
    borderRadius: 12,
    color: "#fff",
    marginBottom: 15,
  },
  payBtn: {
    backgroundColor: "#22c55e",
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 20,
  },
  payText: {
    color: "#020617",
    fontWeight: "bold",
    fontSize: 16,
  },
});
