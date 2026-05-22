import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function CustomSidebar({ visible, onClose }: any) {
  const router = useRouter();

  const menuItems = [
    { label: '🏠 Home', route: '/(tabs)/home' },
    { label: '🔍 Explore Tournaments', route: '/(tabs)/explore' },
    { label: '🎮 My Room / Join Room', route: '/player/room' },
    { label: '🏆 My Tournaments', route: '/player/tournament' },
    { label: '💰 Wallet & Payments', route: '/player/payment' },
    { label: '🚪 Logout', route: '/logout' },
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.sidebar}>
          <Text style={styles.title}>GamerzHub</Text>

          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => {
                router.push(item.route);
                onClose();
              }}
            >
              <Text style={styles.menuText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-start',
  },
  sidebar: {
    width: 280,
    height: '100%',
    backgroundColor: '#0f172a',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  menuItem: {
    paddingVertical: 15,
  },
  menuText: {
    color: '#e2e8f0',
    fontSize: 17,
  },
});