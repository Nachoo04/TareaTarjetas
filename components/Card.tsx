import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    Image,
    ImageSourcePropType,
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native";

type Item = { id: string; title: string; image: ImageSourcePropType; price: number };

export default function Card({
  item,
  isFavorite,
  onPress,
  onLongPress,
}: {
  item: Item;
  isFavorite: boolean;
  onPress: () => void;
  onLongPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={300}
      style={[styles.card, styles.cardInactive]}
      accessibilityHint="Mantener pulsado para marcar como favorito"
    >
      {isFavorite && (
        <View style={styles.starBadge}>
          <Ionicons name="star" size={18} />
        </View>
      )}
      <Image source={item.image} style={{ width: 50, height: 50, marginBottom: 8 }} />
      <Text style={styles.cardText}>{item.title}</Text>
      <Text style={{ color: "#fff" }}>${item.price}</Text>
    </Pressable>
  );
}


const styles = StyleSheet.create({


  card: {
    height: 120,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
    elevation: 2,
    overflow: "hidden",
  },
  cardInactive: { backgroundColor: "#ced686ff" },
  cardText: { color: "#fff", fontSize: 16, fontWeight: "600", textAlign: "center" },

  starBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },

});