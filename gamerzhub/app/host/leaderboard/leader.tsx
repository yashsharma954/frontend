import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Platform } from "react-native";

import { usePathname } from "expo-router";
import { useLocalSearchParams, useRouter } from "expo-router";


export default function UploadLeaderboardScreen() {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useLocalSearchParams();
  const [leaderboard, setLeaderboard] = useState([
  { teamName: "", rank: "", prize: "" }
]);

const addRow = () => {
  setLeaderboard([...leaderboard, { teamName: "", rank: "", prize: "" }]);
};

const updateField = (index, field, value) => {
  const updated = [...leaderboard];
  updated[index][field] = value;
  setLeaderboard(updated);
};

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
    setImage(imageUri);
  }
 };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image first");
      return;
    }

    for (let row of leaderboard) {
    if (!row.teamName || !row.rank || !row.prize) {
      alert("Please fill all fields");
      return;
    }
  }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("tournamentId",id);
      formData.append("leaderboardData", JSON.stringify(leaderboard));
      if (image) {
      
        if (Platform.OS === "web") {
          const response = await fetch(image);
          const blob = await response.blob();
      
          formData.append("leaderboard", blob, "host.jpg");
        } else {
          formData.append("leaderboard", {
            uri: image,
            type: "image/jpeg",
            name: "host.jpg",
          });
        }
      
      }
     

      await fetch("http://192.168.31.126:8000/api/v1/host/uploadleaderboard", {
        method: "POST",
        body: formData,
      });

      alert("✅ Leaderboard Uploaded");
      router.replace("../tournament/mytournament")
      setImage(null);
    } catch (err) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Upload Leaderboard</Text>
      <View style={styles.table}>
  <View style={styles.headerRow}>
    <Text style={styles.header}>Team</Text>
    <Text style={styles.header}>Rank</Text>
    <Text style={styles.header}>Prize</Text>
  </View>

  {leaderboard.map((row, index) => (
    <View key={index} style={styles.row}>
      
      <TextInput
        placeholder="Team Name"
        style={styles.input}
        value={row.teamName}
        onChangeText={(text) => updateField(index, "teamName", text)}
      />

      <TextInput
        placeholder="Rank"
        style={styles.input}
        keyboardType="numeric"
        value={row.rank}
        onChangeText={(text) => updateField(index, "rank", text)}
      />

      <TextInput
        placeholder="₹ Prize"
        style={styles.input}
        keyboardType="numeric"
        value={row.prize}
        onChangeText={(text) => updateField(index, "prize", text)}
      />
    </View>
  ))}

  <TouchableOpacity onPress={addRow} style={styles.addButton}>
    <Text style={{ color: "#fff" }}>+ Add Team</Text>
  </TouchableOpacity>
</View>

      {/* IMAGE PREVIEW */}
      <View style={styles.previewBox}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.placeholder}>No Image Selected</Text>
        )}
      </View>

      {/* PICK BUTTON */}
      <TouchableOpacity style={styles.pickBtn} onPress={pickImage}>
        <Text style={styles.pickText}>📸 Select Screenshot</Text>
      </TouchableOpacity>

      {/* UPLOAD BUTTON */}
      <TouchableOpacity style={styles.uploadBtn} onPress={handleUpload}>
        {loading ? (
          <ActivityIndicator color="#020617" />
        ) : (
          <Text style={styles.uploadText}>🚀 Upload Leaderboard</Text>
        )}
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
  table: {
  marginTop: 16,
},

headerRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 8,
},

header: {
  color: "#94a3b8",
  fontWeight: "bold",
  width: "30%",
},

row: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 10,
},

input: {
  backgroundColor: "#0f172a",
  color: "#fff",
  padding: 10,
  borderRadius: 8,
  width: "30%",
  borderWidth: 1,
  borderColor: "#1e293b",
},

addButton: {
  marginTop: 10,
  backgroundColor: "#22c55e",
  padding: 12,
  borderRadius: 10,
  alignItems: "center",
},

  title: {
    color: "#38bdf8",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
  },

  previewBox: {
    height: 220,
    borderRadius: 16,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#1e293b",
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },

  placeholder: {
    color: "#64748b",
    fontSize: 14,
  },

  pickBtn: {
    backgroundColor: "#1e293b",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
  },

  pickText: {
    color: "#38bdf8",
    fontWeight: "600",
  },

  uploadBtn: {
    backgroundColor: "#22c55e",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },

  uploadText: {
    color: "#020617",
    fontWeight: "bold",
    fontSize: 15,
  },
});