import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";


export default function CreateTournament() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [game, setGame] = useState("");
  const [entryFee, setEntryFee] = useState("");
  const [prize, setPrize] = useState("");
  // const [time, setTime] = useState("");
  const [map, setMap] = useState("");
  const [matchType, setMatchType] = useState("SOLO");
const [teamSize, setTeamSize] = useState("");
const [maxteam,setMaxteam]=useState("");

// DATE
// const [date,selectedDate] = useState(new Date());
const [selectedDate, setSelectedDate] = useState(new Date());
// START
const [startTime, setStartTime] = useState("");
const [startMeridiem, setStartMeridiem] = useState("PM");

// END
const [endTime, setEndTime] = useState("");
const [endMeridiem, setEndMeridiem] = useState("PM");
 const [banner, setBanner] = useState(null);

 const pickImage = async () => {
   const result = await ImagePicker.launchImageLibraryAsync({
     mediaTypes: ImagePicker.MediaTypeOptions.Images,
     allowsEditing: true,
     aspect: [1,1],
     quality: 1,
   });
 
   if (!result.canceled) {
     const imageUri = result.assets[0].uri;
     console.log("IMAGE URI:", imageUri);
     setBanner(imageUri);
   }
 };

const create = async () => {
  try {
    const hostData = await AsyncStorage.getItem("host");
    const host = JSON.parse(hostData);

    if (!hostData) {
      alert("Please login again");
      router.replace("../login");
      return;
    }

    const normalizeGame = (game: string) => {
      return game.replace(/\s+/g, "").toUpperCase();
    };

    const createDateTime = (date: any, time: string, meridiem: string) => {
      let [hour, minute] = time.split(":").map(Number);

      if (meridiem === "PM" && hour !== 12) hour += 12;
      if (meridiem === "AM" && hour === 12) hour = 0;

      const newDate = new Date(date);
      newDate.setHours(hour);
      newDate.setMinutes(minute);
      newDate.setSeconds(0);

      return newDate.toISOString();
    };

    const startDateObj = new Date(
      createDateTime(selectedDate, startTime, startMeridiem)
    );

    const endDateObj = new Date(startDateObj.getTime() + 10 * 60 * 60 * 1000);

    const startTimeISO = startDateObj.toISOString();
    const endTimeISO = endDateObj.toISOString();

    /* =============================
       FORM DATA
    ============================= */

    const formData = new FormData();

    formData.append("title", name);
    formData.append("game", normalizeGame(game));
    formData.append("startTime", startTimeISO);
    formData.append("endTime", endTimeISO);
    formData.append("prizePool", prize);
    formData.append("entryFee", entryFee);
    formData.append("maxTeams", Number(maxteam));
    formData.append("matchType", matchType);
    formData.append("teamSize", Number(teamSize));
    formData.append("hostId", host._id);

    /* =============================
       BANNER IMAGE
    ============================= */

    if (banner) {
    
      if (Platform.OS === "web") {
        const response = await fetch(banner);
        const blob = await response.blob();
    
        formData.append("banner", blob, "banner.jpg");
      } else {
        formData.append("banner", {
          uri: banner,
          type: "image/jpeg",
          name: "banner.jpg",
        });
      }
    
    }

    
    const res = await fetch(
      "http://192.168.31.126:8000/api/v1/host/tournaments",
      {
        method: "POST",
        body: formData, // ❗ JSON nahi
      }
    );

    const data = await res.json();
    console.log("data is ",data);
    if (data.success) {
      alert("tournament created succesfully");
      router.push("./mytournament");
    } else {
      alert(data.message);
    }
  }
  catch (err) {
    console.log(err);
    alert("Something went wrong");
  }

};

  


  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.heading}>Create Tournament</Text>

      {/* TOURNAMENT NAME */}
      <TextInput
        placeholder="Tournament Name"
        placeholderTextColor="#94a3b8"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      {/* GAME */}
      <TextInput
        placeholder="Game (BGMI / Free Fire)"
        placeholderTextColor="#94a3b8"
        style={styles.input}
        value={game}
        onChangeText={setGame}
      />

      {/* ENTRY FEE */}
      <TextInput
        placeholder="Entry Fee (₹)"
        placeholderTextColor="#94a3b8"
        style={styles.input}
        keyboardType="numeric"
        value={entryFee}
        onChangeText={setEntryFee}
      />

      {/* PRIZE */}
      <TextInput
        placeholder="Prize Pool (₹)"
        placeholderTextColor="#94a3b8"
        style={styles.input}
        keyboardType="numeric"
        value={prize}
        onChangeText={setPrize}
      />
      <TextInput
        placeholder="Maximum Team"
        placeholderTextColor="#94a3b8"
        style={styles.input}
        keyboardType="numeric"
        value={maxteam}
        onChangeText={setMaxteam}
      />

      

      {/* TIME */}
      <TextInput
        placeholder="Match Time (eg: 7:30 PM)"
        placeholderTextColor="#94a3b8"
        style={styles.input}
        value={startTime}
        onChangeText={setStartTime}
      />
           <Text style={{ color: "#94a3b8", marginBottom: 8 }}>
          Match Type
           </Text>

          <View style={{ flexDirection: "row", marginBottom: 16 }}>
            {["SOLO", "DUO", "SQUAD"].map(type => (
             <TouchableOpacity
               key={type}
               style={{
               flex: 1,
                 padding: 12,
             marginRight: 6,
             borderRadius: 10,
             backgroundColor: matchType === type ? "#38bdf8" : "#0f172a",
           borderWidth: 1,
          borderColor: "#1e293b",
               }}
          onPress={() => {
           setMatchType(type);
          setTeamSize(type === "SOLO" ? 1 : type === "DUO" ? 2 : 4);
             }}
              >
      <Text
        style={{
          textAlign: "center",
          fontWeight: "bold",
          color: matchType === type ? "#020617" : "#94a3b8",
        }}
      >
        {type}
      </Text>
    </TouchableOpacity>
  ))}
</View>

      {/* MAP */}
      <TextInput
        placeholder="Map Name"
        placeholderTextColor="#94a3b8"
        style={styles.input}
        value={map}
        onChangeText={setMap}
      />
      <TouchableOpacity style={styles.input} onPress={pickImage}>
  <Text style={{ color: banner ? "#e5e7eb" : "#94a3b8" }}>
    {banner ? "Banner Selected ✅" : "Select Banner Image"}
  </Text>
 </TouchableOpacity>


      {/* CREATE BUTTON */}
      <TouchableOpacity style={styles.button} onPress={create}>
        <Text style={styles.buttonText}>Create Tournament</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#020617",
    padding: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#38bdf8",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#0f172a",
    borderRadius: 12,
    padding: 14,
    color: "#f8fafc",
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#38bdf8",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#020617",
    fontWeight: "bold",
    fontSize: 16,
  },
});
