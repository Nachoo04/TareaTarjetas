import Card from "@/components/Card";
import GaleriaModal from "@/components/GaleriaModal";
import React, { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { DATA } from "../assets/data";

type Item = { id: string; title: string; image: ImageSourcePropType; price: number };


export default function Galeria() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [mode, setMode] = useState<"cover" | "contain" | "stretch">("cover");
  const [favoritos, setFavoritos] = useState<Set<string>>(new Set());

  
  const [query, setQuery] = useState("");

  
  const filteredData = useMemo(() => {
    if (!query) return DATA;
    return DATA.filter((it) => it.title.includes(query));
  }, [query]);

  const toggleFavorite = (id: string) =>
    setFavoritos((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const renderItem = useCallback(
    ({ item }: { item: Item }) => (
      <Card
        item={item}
        isFavorite={favoritos.has(item.id)}
        onPress={() => setSelectedItem(item)}
        onLongPress={() => toggleFavorite(item.id)}
      />
    ),
    [favoritos]
  );

  const closeModal = () => setSelectedItem(null);

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredData}          
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 18 }} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.searchBox}>
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Buscar por título..."
              placeholderTextColor="#888"
              style={styles.searchInput}
              returnKeyType="search"
              autoCorrect={false}
              autoCapitalize="none"
              clearButtonMode="while-editing"
            />
            {query ? <Text style={styles.resultsText}>{filteredData.length} resultados</Text> : null}
          </View>
        }
        stickyHeaderIndices={[0]} 
      />

      <GaleriaModal
        item={selectedItem}
        mode={mode}
        cambiarModo={setMode}
        cerrarModal={closeModal}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  searchBox: {
    backgroundColor: "#1b1b1b", 
    padding: 12,
  },
  searchInput: {
    backgroundColor: "#2a2a2a",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "#fff",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#3a3a3a",
  },
  resultsText: { marginTop: 6, color: "#bbb", fontSize: 12 },

});