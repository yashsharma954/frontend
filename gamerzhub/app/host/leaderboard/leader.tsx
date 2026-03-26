import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Platform } from "react-native";
import { usePathname } from "expo-router";
import { useLocalSearchParams, useRouter } from "expo-router";


export default function UploadLeaderboardScreen() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useLocalSearchParams();


//   const pickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

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

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("tournamentId",id);
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