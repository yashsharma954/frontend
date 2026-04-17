
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
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
  const [maxteam, setMaxteam] = useState("");
  const [map, setMap] = useState("");

  const [matchType, setMatchType] = useState("SQUAD");
  const [teamSize, setTeamSize] = useState(4);

  // Date & Time
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState(""); // e.g., "7:30"
  const [startMeridiem, setStartMeridiem] = useState("PM");

  const [banner, setBanner] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9], // Better for banners (landscape)
      quality: 0.9,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setBanner(imageUri);
    }
  };

  const normalizeGame = (game: string) => {
    return game.replace(/\s+/g, "").toUpperCase();
  };

  const createDateTime = (date: Date, time: string, meridiem: string) => {
    if (!time) return new Date().toISOString();

    let [hour, minute] = time.split(":").map(Number);
    if (isNaN(hour) || isNaN(minute)) return new Date().toISOString();

    if (meridiem === "PM" && hour !== 12) hour += 12;
    if (meridiem === "AM" && hour === 12) hour = 0;

    const newDate = new Date(date);
    newDate.setHours(hour, minute, 0, 0);
    return newDate.toISOString();
  };

  const create = async () => {
    if (!name || !game || !startTime || !prize || !entryFee || !maxteam) {
      Alert.alert("Missing Fields", "Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const hostData = await AsyncStorage.getItem("host");
      if (!hostData) {
        Alert.alert("Session Expired", "Please login again");
        router.replace("../login");
        return;
      }

      const host = JSON.parse(hostData);

      const startDateObj = new Date(
        createDateTime(selectedDate, startTime, startMeridiem)
      );

      // Default duration: 10 hours (you can make this configurable)
      const endDateObj = new Date(startDateObj.getTime() + 10 * 60 * 60 * 1000);

      const formData = new FormData();

      formData.append("title", name.trim());
      formData.append("game", normalizeGame(game));
      formData.append("startTime", startDateObj.toISOString());
      formData.append("endTime", endDateObj.toISOString());
      formData.append("prizePool", prize);
      formData.append("entryFee", entryFee);
      formData.append("maxTeams", Number(maxteam));
      formData.append("matchType", matchType);
      formData.append("teamSize", teamSize);
      formData.append("map", map.trim());
      formData.append("hostId", host._id);

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
        "https://gamerzhub-backend.onrender.com/api/v1/host/tournaments",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.success) {
        Alert.alert("Success", "Tournament created successfully!");
        router.push("./mytournament");
      } else {
        Alert.alert("Error", data.message || "Failed to create tournament");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView 
      style={styles.screen}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.heading}>HOST NEW TOURNAMENT</Text>
      <Text style={styles.subheading}>Create a competitive experience</Text>

      {/* Banner Section */}
      <TouchableOpacity style={styles.bannerContainer} onPress={pickImage}>
        {banner ? (
          <Image source={{ uri: banner }} style={styles.bannerImage} />
        ) : (
          <View style={styles.bannerPlaceholder}>
            <Text style={styles.bannerText}>TAP TO UPLOAD BANNER</Text>
            <Text style={styles.bannerSubtext}>Recommended: 16:9 • 1920x1080</Text>
          </View>
        )}
        {banner && (
          <View style={styles.bannerOverlay}>
            <Text style={styles.changeBannerText}>CHANGE BANNER</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Tournament Details */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Tournament Details</Text>

        <TextInput
          placeholder="Tournament Name *"
          placeholderTextColor="#64748b"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="Game (BGMI / Free Fire / Valorant...) *"
          placeholderTextColor="#64748b"
          style={styles.input}
          value={game}
          onChangeText={setGame}
        />

        <TextInput
          placeholder="Map (Erangel, Bermuda, etc.)"
          placeholderTextColor="#64748b"
          style={styles.input}
          value={map}
          onChangeText={setMap}
        />
      </View>

      {/* Format & Rules */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Format</Text>

        <Text style={styles.label}>Match Type</Text>
        <View style={styles.matchTypeContainer}>
          {["SOLO", "DUO", "SQUAD"].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.matchTypeButton,
                matchType === type && styles.matchTypeButtonActive,
              ]}
              onPress={() => {
                setMatchType(type);
                setTeamSize(type === "SOLO" ? 1 : type === "DUO" ? 2 : 4);
              }}
            >
              <Text
                style={[
                  styles.matchTypeText,
                  matchType === type && styles.matchTypeTextActive,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Maximum Teams *</Text>
        <TextInput
          placeholder="e.g. 64"
          placeholderTextColor="#64748b"
          style={styles.input}
          keyboardType="numeric"
          value={maxteam}
          onChangeText={setMaxteam}
        />
      </View>

      {/* Prize & Entry */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Prize & Entry</Text>

        <TextInput
          placeholder="Entry Fee (₹) *"
          placeholderTextColor="#64748b"
          style={styles.input}
          keyboardType="numeric"
          value={entryFee}
          onChangeText={setEntryFee}
        />

        <TextInput
          placeholder="Prize Pool (₹) *"
          placeholderTextColor="#64748b"
          style={styles.input}
          keyboardType="numeric"
          value={prize}
          onChangeText={setPrize}
        />
      </View>

      {/* Schedule */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Schedule</Text>

        <Text style={styles.label}>Start Time *</Text>
        <View style={styles.timeRow}>
          <TextInput
            placeholder="7:30"
            placeholderTextColor="#64748b"
            style={[styles.input, { flex: 1 }]}
            value={startTime}
            onChangeText={setStartTime}
            keyboardType="numbers-and-punctuation"
          />

          <View style={styles.meridiemContainer}>
            {["AM", "PM"].map((m) => (
              <TouchableOpacity
                key={m}
                style={[
                  styles.meridiemButton,
                  startMeridiem === m && styles.meridiemButtonActive,
                ]}
                onPress={() => setStartMeridiem(m)}
              >
                <Text
                  style={[
                    styles.meridiemText,
                    startMeridiem === m && styles.meridiemTextActive,
                  ]}
                >
                  {m}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={{ color: "#64748b", fontSize: 12, marginTop: 8 }}>
          Duration will be auto-set to 10 hours. You can change this later.
        </Text>
      </View>

      {/* Create Button */}
      <TouchableOpacity 
        style={[styles.createButton, loading && styles.createButtonDisabled]} 
        onPress={create}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#020617" />
        ) : (
          <Text style={styles.createButtonText}>CREATE TOURNAMENT</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Your tournament will be reviewed before going live
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0a0e17",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 32,
    fontWeight: "800",
    color: "#67e8f9",
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  subheading: {
    fontSize: 16,
    color: "#94a3b8",
    marginBottom: 24,
  },
  bannerContainer: {
    height: 180,
    backgroundColor: "#1e2937",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 24,
    borderWidth: 2,
    borderColor: "#334155",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  bannerPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bannerText: {
    color: "#67e8f9",
    fontSize: 18,
    fontWeight: "600",
  },
  bannerSubtext: {
    color: "#64748b",
    fontSize: 12,
    marginTop: 8,
  },
  bannerOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 12,
    alignItems: "center",
  },
  changeBannerText: {
    color: "#fff",
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#1e2937",
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#334155",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#e0f2fe",
    marginBottom: 14,
  },
  label: {
    color: "#cbd5e1",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#0f172a",
    borderRadius: 12,
    padding: 15,
    color: "#f1f5f9",
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#334155",
  },
  matchTypeContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  matchTypeButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#334155",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  matchTypeButtonActive: {
    backgroundColor: "#22d3ee",
    borderColor: "#67e8f9",
  },
  matchTypeText: {
    fontWeight: "700",
    color: "#94a3b8",
  },
  matchTypeTextActive: {
    color: "#0f172a",
  },
  timeRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  meridiemContainer: {
    flexDirection: "row",
    backgroundColor: "#0f172a",
    borderRadius: 10,
    padding: 4,
  },
  meridiemButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },
  meridiemButtonActive: {
    backgroundColor: "#67e8f9",
  },
  meridiemText: {
    color: "#94a3b8",
    fontWeight: "600",
  },
  meridiemTextActive: {
    color: "#0f172a",
  },
  createButton: {
    backgroundColor: "#67e8f9",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#67e8f9",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  createButtonDisabled: {
    opacity: 0.7,
  },
  createButtonText: {
    color: "#0f172a",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  footerText: {
    textAlign: "center",
    color: "#64748b",
    fontSize: 12,
    marginTop: 20,
  },
});