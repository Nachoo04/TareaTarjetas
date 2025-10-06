import React, { useMemo, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ImageSourcePropType,
} from "react-native";
import { createProduct } from "@/services/api";

type Props = {
  visible: boolean;
  onClose: () => void;
  onCreated?: (item: {
    id: string;
    title: string;
    image: ImageSourcePropType;
    price: number;
  }) => void;
};

export default function CreateProductModal({ visible, onClose, onCreated }: Props) {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);



  const reset = () => {
    setTitle("");
    setImageUrl("");
    setPrice("");
    setError(null);
    setSubmitting(false);
  };

  const handleClose = () => {
    if (submitting) return;
    reset();
    onClose();
  };

  const handleSubmit = async () => {;
    setSubmitting(true);
    setError(null);
    const payload = {
        title: title.trim(),
        image: imageUrl.trim(),
        price: Number(price),
    };
    const created = await createProduct(payload);
    onCreated?.({
        id: created.id,
        title: created.title,
        image: { uri: created.image },
        price: created.price,
    });
    reset();
    onClose();
    
    setSubmitting(false);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.select({ ios: "padding", android: undefined })}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Nuevo producto</Text>

          <Text style={styles.label}>Título</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Ej: CocaCola"
            placeholderTextColor="#888"
            style={styles.input}
            autoCapitalize="sentences"
          />

          <Text style={styles.label}>Imagen (URL)</Text>
          <TextInput
            value={imageUrl}
            onChangeText={setImageUrl}
            placeholder="https://…"
            placeholderTextColor="#888"
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.label}>Precio</Text>
          <TextInput
            value={price}
            onChangeText={setPrice}
            placeholder="0.00"
            placeholderTextColor="#888"
            style={styles.input}
            keyboardType="decimal-pad"
          />


          <View style={styles.row}>
            <Pressable style={[styles.btn, styles.btnGhost]} onPress={handleClose} disabled={submitting}>
              <Text style={[styles.btnText, { color: "#ddd" }]}>Cancelar</Text>
            </Pressable>

            <Pressable
              style={[styles.btn, styles.btnPrimary]}
              onPress={handleSubmit}
            >
              {submitting ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.btnText}>Guardar</Text>
              )}
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  card: {
    width: "100%",
    backgroundColor: "#1b1b1b",
    borderRadius: 14,
    padding: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#333",
  },
  title: { fontSize: 18, fontWeight: "700", color: "#fff", marginBottom: 12 },
  label: { color: "#bbb", fontSize: 12, marginTop: 8, marginBottom: 6 },
  input: {
    backgroundColor: "#2a2a2a",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "#fff",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#3a3a3a",
  },
  row: { flexDirection: "row", justifyContent: "flex-end", gap: 12, marginTop: 16 },
  btn: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 10, alignItems: "center" },
  btnPrimary: { backgroundColor: "#3a86ff" },
  btnDisabled: { backgroundColor: "#2d2d2d" },
  btnGhost: { backgroundColor: "transparent", borderWidth: StyleSheet.hairlineWidth, borderColor: "#444" },
  btnText: { color: "#fff", fontWeight: "600" },

});
