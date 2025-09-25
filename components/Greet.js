import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
  Easing,
  TextInput,
  Modal,
} from "react-native";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Greet() {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [pin, setPin] = useState("");
  const [reason, setReason] = useState("");

  // Pulse animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scaleAnim]);

  // Send SOS
  const sendSOS = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Location Needed",
          "We need access to your location in order to send help."
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const response = await fetch(
        "https://sos-project.onrender.com/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ latitude, longitude }),
        }
      );

      let data: any = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      // Treat HTTP 2xx as success
      if (response.status >= 200 && response.status < 300) {
        console.log("✅ SOS sent:", data);
        Alert.alert(
          "SOS Sent!",
          "Your location has been shared with our emergency team. Please stay safe — help is on the way!"
        );
      } else {
        console.error("❌ SOS failed:", data);
        Alert.alert(
          "SOS Failed",
          "The server responded with an error. Please try again or call emergency services directly.",
          [
            { text: "Try Again", onPress: sendSOS },
            { text: "Cancel", style: "cancel" },
          ]
        );
      }
    } catch (error) {
      console.error("❌ SOS network error:", error);
      Alert.alert(
        "SOS Failed",
        "Network error. Please check your connection or call emergency services directly.",
        [
          { text: "Try Again", onPress: sendSOS },
          { text: "Cancel", style: "cancel" },
        ]
      );
    }
  };

  // Cancel submit
  const handleCancelSubmit = () => {
    if (!pin || !reason) {
      Alert.alert("Error", "Please enter both PIN and reason.");
      return;
    }
    console.log("Cancel submitted:", { pin, reason });
    setCancelModalVisible(false);
    Alert.alert("Cancelled", "Your cancellation has been recorded.");
    setPin("");
    setReason("");
  };

  const animatedStyle: Animated.WithAnimatedValue<any> = {
    transform: [{ scale: scaleAnim }],
  };

  return (
    <View style={styles.container}>
      {/* SOS Button */}
      <Animated.View style={animatedStyle}>
        <TouchableOpacity
          style={styles.sosButton}
          onPress={sendSOS}
          activeOpacity={0.8}
        >
          <Icon name="bell" size={50} color="white" />
          <Text style={styles.sosText}>SOS</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Title */}
      <Text style={styles.title}>
        NO TO <Text style={styles.highlight}>GBV</Text>
      </Text>
      <Text style={styles.subtitle}>An immediate, life-saving resource.</Text>

      {/* Cancel Button */}
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => setCancelModalVisible(true)}
      >
        <Icon
          name="times-circle"
          size={20}
          color="black"
          style={{ marginRight: 8 }}
        />
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton}>
        <Icon
          name="sign-in"
          size={20}
          color="white"
          style={{ marginRight: 8 }}
        />
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footer}>
        Don’t have an account? <Text style={styles.link}>Register here</Text>
      </Text>

      {/* Cancel Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={cancelModalVisible}
        onRequestClose={() => setCancelModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cancel SOS</Text>

            <TextInput
              placeholder="Enter PIN"
              keyboardType="numeric"
              secureTextEntry
              style={styles.input}
              value={pin}
              onChangeText={setPin}
            />
            <TextInput
              placeholder="Reason for cancellation"
              style={[styles.input, { height: 80 }]}
              multiline
              value={reason}
              onChangeText={setReason}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "red" }]}
                onPress={handleCancelSubmit}
              >
                <Text style={styles.modalButtonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#ccc" }]}
                onPress={() => setCancelModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  sosButton: {
    backgroundColor: "red",
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "red",
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 10,
  },
  sosText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  title: { fontSize: 26, fontWeight: "bold", marginVertical: 10 },
  highlight: { color: "red" },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 30,
    textAlign: "center",
  },
  cancelButton: {
    flexDirection: "row",
    backgroundColor: "#eee",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  cancelText: { fontSize: 18, fontWeight: "600", color: "black" },
  loginButton: {
    flexDirection: "row",
    backgroundColor: "blue",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  loginText: { fontSize: 18, fontWeight: "bold", color: "white" },
  footer: { fontSize: 14, color: "black" },
  link: { color: "purple", textDecorationLine: "underline" },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: "center",
  },
  modalButtonText: { color: "white", fontWeight: "bold" },
});
