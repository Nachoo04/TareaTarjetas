import React, { useCallback, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

type Item = { id: string; title: string };

const DATA: Item[] = [
  { id: "1", title: "Tarjeta 1" },
  { id: "2", title: "Tarjeta 2" },
  { id: "3", title: "Tarjeta 3" },
  { id: "4", title: "Tarjeta 4" },
  { id: "5", title: "Tarjeta 5" },
];

function Card({
  item,
  selected,
  onPress,
}: {
  item: Item;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        selected ? styles.cardActive : styles.cardInactive,
        pressed && styles.cardPressed,
      ]}
    >
      <Text style={styles.cardText}>{item.title}</Text>
    </Pressable>
  );
}

export default function TarjetaProp() {
  const [tarjetasPresionadas, setTarjeta] = useState<Set<string>>(new Set());

  const toggleSelection = (id: string) => {
    setTarjeta((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const renderItem = useCallback(
    ({ item }: { item: Item }) => (
      <Card
        item={item}
        selected={tarjetasPresionadas.has(item.id)}
        onPress={() => toggleSelection(item.id)}
      />
    ),
    [tarjetasPresionadas]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 18 }} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        extraData={tarjetasPresionadas}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1bd2d8ff" },
  listContent: { paddingHorizontal: 24, paddingVertical: 24 },
  card: {
    height: 84,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 2,
  },
  cardInactive: { backgroundColor: "#0231ffff" },
  cardActive: { backgroundColor: "#133B44" },
  cardPressed: { transform: [{ scale: 0.98 }] },
  cardText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
