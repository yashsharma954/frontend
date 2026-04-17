// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   ActivityIndicator,
//   TextInput
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { useState } from "react";
// import { Platform } from "react-native";

// import { usePathname } from "expo-router";
// import { useLocalSearchParams, useRouter } from "expo-router";


// export default function UploadLeaderboardScreen() {
//   const router = useRouter();
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const { id } = useLocalSearchParams();
//   const [leaderboard, setLeaderboard] = useState([
//   { teamName: "", rank: "", prize: "" }
// ]);

// const addRow = () => {
//   setLeaderboard([...leaderboard, { teamName: "", rank: "", prize: "" }]);
// };

// const updateField = (index, field, value) => {
//   const updated = [...leaderboard];
//   updated[index][field] = value;
//   setLeaderboard(updated);
// };

// const pickImage = async () => {
//   const result = await ImagePicker.launchImageLibraryAsync({
//     mediaTypes: ImagePicker.MediaTypeOptions.Images,
//     allowsEditing: true,
//     aspect: [1,1],
//     quality: 1,
//   });

//   if (!result.canceled) {
//     const imageUri = result.assets[0].uri;
//     console.log("IMAGE URI:", imageUri);
//     setImage(imageUri);
//   }
//  };

//   const handleUpload = async () => {
//     if (!image) {
//       alert("Please select an image first");
//       return;
//     }

//     for (let row of leaderboard) {
//     if (!row.teamName || !row.rank || !row.prize) {
//       alert("Please fill all fields");
//       return;
//     }
//   }

//     try {
//       setLoading(true);

//       const formData = new FormData();

//       formData.append("tournamentId",id);
//       formData.append("leaderboardData", JSON.stringify(leaderboard));
//       if (image) {
      
//         if (Platform.OS === "web") {
//           const response = await fetch(image);
//           const blob = await response.blob();
      
//           formData.append("leaderboard", blob, "host.jpg");
//         } else {
//           formData.append("leaderboard", {
//             uri: image,
//             type: "image/jpeg",
//             name: "host.jpg",
//           });
//         }
      
//       }
     

//       await fetch("https://gamerzhub-backend.onrender.com/api/v1/host/uploadleaderboard", {
//         method: "POST",
//         body: formData,
//       });

//       alert("✅ Leaderboard Uploaded");
//       router.replace("../tournament/mytournament")
//       setImage(null);
//     } catch (err) {
//       alert("Upload failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>🏆 Upload Leaderboard</Text>
//       <View style={styles.table}>
//   <View style={styles.headerRow}>
//     <Text style={styles.header}>Team</Text>
//     <Text style={styles.header}>Rank</Text>
//     <Text style={styles.header}>Prize</Text>
//   </View>

//   {leaderboard.map((row, index) => (
//     <View key={index} style={styles.row}>
      
//       <TextInput
//         placeholder="Team Name"
//         style={styles.input}
//         value={row.teamName}
//         onChangeText={(text) => updateField(index, "teamName", text)}
//       />

//       <TextInput
//         placeholder="Rank"
//         style={styles.input}
//         keyboardType="numeric"
//         value={row.rank}
//         onChangeText={(text) => updateField(index, "rank", text)}
//       />

//       <TextInput
//         placeholder="₹ Prize"
//         style={styles.input}
//         keyboardType="numeric"
//         value={row.prize}
//         onChangeText={(text) => updateField(index, "prize", text)}
//       />
//     </View>
//   ))}

//   <TouchableOpacity onPress={addRow} style={styles.addButton}>
//     <Text style={{ color: "#fff" }}>+ Add Team</Text>
//   </TouchableOpacity>
// </View>

//       {/* IMAGE PREVIEW */}
//       <View style={styles.previewBox}>
//         {image ? (
//           <Image source={{ uri: image }} style={styles.image} />
//         ) : (
//           <Text style={styles.placeholder}>No Image Selected</Text>
//         )}
//       </View>

//       {/* PICK BUTTON */}
//       <TouchableOpacity style={styles.pickBtn} onPress={pickImage}>
//         <Text style={styles.pickText}>📸 Select Screenshot</Text>
//       </TouchableOpacity>

//       {/* UPLOAD BUTTON */}
//       <TouchableOpacity style={styles.uploadBtn} onPress={handleUpload}>
//         {loading ? (
//           <ActivityIndicator color="#020617" />
//         ) : (
//           <Text style={styles.uploadText}>🚀 Upload Leaderboard</Text>
//         )}
//       </TouchableOpacity>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#020617",
//     padding: 20,
//     justifyContent: "center",
//   },
//   table: {
//   marginTop: 16,
// },

// headerRow: {
//   flexDirection: "row",
//   justifyContent: "space-between",
//   marginBottom: 8,
// },

// header: {
//   color: "#94a3b8",
//   fontWeight: "bold",
//   width: "30%",
// },

// row: {
//   flexDirection: "row",
//   justifyContent: "space-between",
//   marginBottom: 10,
// },

// input: {
//   backgroundColor: "#0f172a",
//   color: "#fff",
//   padding: 10,
//   borderRadius: 8,
//   width: "30%",
//   borderWidth: 1,
//   borderColor: "#1e293b",
// },

// addButton: {
//   marginTop: 10,
//   backgroundColor: "#22c55e",
//   padding: 12,
//   borderRadius: 10,
//   alignItems: "center",
// },

//   title: {
//     color: "#38bdf8",
//     fontSize: 22,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 25,
//   },

//   previewBox: {
//     height: 220,
//     borderRadius: 16,
//     backgroundColor: "#0f172a",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: "#1e293b",
//   },

//   image: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 16,
//   },

//   placeholder: {
//     color: "#64748b",
//     fontSize: 14,
//   },

//   pickBtn: {
//     backgroundColor: "#1e293b",
//     padding: 14,
//     borderRadius: 12,
//     alignItems: "center",
//     marginBottom: 15,
//   },

//   pickText: {
//     color: "#38bdf8",
//     fontWeight: "600",
//   },

//   uploadBtn: {
//     backgroundColor: "#22c55e",
//     padding: 16,
//     borderRadius: 14,
//     alignItems: "center",
//     marginTop: 10,
//   },

//   uploadText: {
//     color: "#020617",
//     fontWeight: "bold",
//     fontSize: 15,
//   },
// });


import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Platform } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function UploadLeaderboardScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [leaderboard, setLeaderboard] = useState([
    { teamName: "", rank: "", prize: "" },
  ]);

  const addRow = () => {
    setLeaderboard([...leaderboard, { teamName: "", rank: "", prize: "" }]);
  };

  const removeRow = (index: number) => {
    if (leaderboard.length === 1) return;
    const updated = leaderboard.filter((_, i) => i !== index);
    setLeaderboard(updated);
  };

  const updateField = (index: number, field: string, value: string) => {
    const updated = [...leaderboard];
    updated[index][field] = value;
    setLeaderboard(updated);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.9,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      Alert.alert("Missing Screenshot", "Please select a leaderboard screenshot");
      return;
    }

    for (let row of leaderboard) {
      if (!row.teamName.trim() || !row.rank || !row.prize) {
        Alert.alert("Incomplete Data", "Please fill all fields for every team");
        return;
      }
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("tournamentId", String(id));
    formData.append("leaderboardData", JSON.stringify(leaderboard));

    if (image) {
      if (Platform.OS === "web") {
        const response = await fetch(image);
        const blob = await response.blob();
        formData.append("leaderboard", blob, "leaderboard.jpg");
      } else {
        formData.append("leaderboard", {
          uri: image,
          type: "image/jpeg",
          name: "leaderboard.jpg",
        });
      }
    }

    try {
      const res = await fetch(
        "https://gamerzhub-backend.onrender.com/api/v1/host/uploadleaderboard",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.success) {
        Alert.alert("✅ Success!", "Leaderboard uploaded successfully");
        router.replace("../mytournament");
      } else {
        Alert.alert("Upload Failed", data.message || "Something went wrong");
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed to upload leaderboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0a0e17", "#1e2937"]}
        style={styles.background}
      />

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="trophy" size={56} color="#eab308" />
          <Text style={styles.title}>UPLOAD LEADERBOARD</Text>
          <Text style={styles.subtitle}>
            Final results of the tournament
          </Text>
        </View>

        {/* Leaderboard Table */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>🏅 FINAL STANDINGS</Text>

          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, { flex: 2 }]}>TEAM NAME</Text>
            <Text style={styles.headerCell}>RANK</Text>
            <Text style={styles.headerCell}>PRIZE (₹)</Text>
            <View style={{ width: 40 }} />
          </View>

          {leaderboard.map((row, index) => (
            <View key={index} style={styles.tableRow}>
              <TextInput
                placeholder="Team Name"
                style={[styles.input, { flex: 2 }]}
                value={row.teamName}
                onChangeText={(text) => updateField(index, "teamName", text)}
              />

              <TextInput
                placeholder="#1"
                style={styles.input}
                keyboardType="numeric"
                value={row.rank}
                onChangeText={(text) => updateField(index, "rank", text)}
              />

              <TextInput
                placeholder="5000"
                style={styles.input}
                keyboardType="numeric"
                value={row.prize}
                onChangeText={(text) => updateField(index, "prize", text)}
              />

              {leaderboard.length > 1 && (
                <TouchableOpacity
                  onPress={() => removeRow(index)}
                  style={styles.deleteBtn}
                >
                  <Ionicons name="trash" size={20} color="#ef4444" />
                </TouchableOpacity>
              )}
            </View>
          ))}

          <TouchableOpacity style={styles.addButton} onPress={addRow}>
            <Ionicons name="add-circle" size={20} color="#67e8f9" />
            <Text style={styles.addButtonText}>ADD ANOTHER TEAM</Text>
          </TouchableOpacity>
        </View>

        {/* Screenshot Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>📸 LEADERBOARD SCREENSHOT</Text>

          <View style={styles.previewBox}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />
            ) : (
              <View style={styles.placeholderContainer}>
                <Ionicons name="image-outline" size={60} color="#334155" />
                <Text style={styles.placeholderText}>
                  No screenshot selected
                </Text>
              </View>
            )}
          </View>

          <TouchableOpacity style={styles.pickButton} onPress={pickImage}>
            <Ionicons name="camera" size={20} color="#fff" />
            <Text style={styles.pickText}>
              {image ? "CHANGE SCREENSHOT" : "SELECT SCREENSHOT"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Upload Button */}
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handleUpload}
          disabled={loading}
        >
          <LinearGradient
            colors={["#eab308", "#facc15"]}
            style={styles.gradientButton}
          >
            {loading ? (
              <ActivityIndicator color="#0f172a" />
            ) : (
              <>
                <Ionicons name="cloud-upload" size={24} color="#0f172a" />
                <Text style={styles.uploadText}>UPLOAD LEADERBOARD</Text>
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>
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
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#eab308",
    marginTop: 12,
  },
  subtitle: {
    fontSize: 15,
    color: "#94a3b8",
    marginTop: 6,
  },

  card: {
    backgroundColor: "#1e2937",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#334155",
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#f1f5f9",
    marginBottom: 16,
  },

  tableHeader: {
    flexDirection: "row",
    marginBottom: 8,
  },
  headerCell: {
    color: "#94a3b8",
    fontWeight: "600",
    fontSize: 13,
  },

  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },

  input: {
    backgroundColor: "#0f172a",
    borderRadius: 12,
    padding: 14,
    color: "#f1f5f9",
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#334155",
  },

  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#334155",
    padding: 14,
    borderRadius: 14,
    gap: 8,
  },
  addButtonText: {
    color: "#67e8f9",
    fontWeight: "600",
  },

  deleteBtn: {
    padding: 8,
  },

  previewBox: {
    height: 240,
    backgroundColor: "#0f172a",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#334155",
    marginBottom: 16,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholderContainer: {
    alignItems: "center",
  },
  placeholderText: {
    color: "#64748b",
    marginTop: 12,
    fontSize: 15,
  },

  pickButton: {
    backgroundColor: "#1e2937",
    padding: 16,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  pickText: {
    color: "#67e8f9",
    fontWeight: "700",
    fontSize: 16,
  },

  uploadButton: {
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 10,
  },
  gradientButton: {
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  uploadText: {
    color: "#0f172a",
    fontSize: 17,
    fontWeight: "800",
  },
});