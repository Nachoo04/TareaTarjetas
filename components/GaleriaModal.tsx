import React from "react";
import {
    Image,
    ImageSourcePropType,
    Modal,
    Pressable,
    StyleSheet,
    Text
} from "react-native";

type Item = { id: string; title: string; image: ImageSourcePropType; price: number };
type Props = {
  item: Item | null;
  mode: "cover" | "contain" | "stretch";
  cambiarModo: (m: "cover" | "contain" | "stretch") => void;
  cerrarModal: () => void;
};

export default function GaleriaModal({ item, mode, cambiarModo, cerrarModal }: Props){


    return       <Modal visible={!!item} transparent animationType="fade" onRequestClose={cerrarModal}>
            <Pressable style={styles.modalOverlay} onPress={cerrarModal}>
              <Pressable style={styles.modalBox} onPress={() => {}}>
                {item && (
                  <>
                    <Image source={item.image} style={styles.modalImg} resizeMode={mode} />
                    <Text style={styles.modalTitle}>{item.title}</Text>
                    <Text style={styles.modalPrice}>${item.price}</Text>
    
                    <Pressable style={styles.closeBtn} onPress={() => cambiarModo("cover")}>
                      <Text style={styles.closeBtnText}>Cover</Text>
                    </Pressable>
                    <Pressable style={styles.closeBtn} onPress={() => cambiarModo("contain")}>
                      <Text style={styles.closeBtnText}>Contain</Text>
                    </Pressable>
                    <Pressable style={styles.closeBtn} onPress={() => cambiarModo("stretch")}>
                      <Text style={styles.closeBtnText}>Stretch</Text>
                    </Pressable>
    
                    <Pressable style={styles.closeBtn} onPress={cerrarModal}>
                      <Text style={styles.closeBtnText}>Cerrar</Text>
                    </Pressable>
                  </>
                )}
              </Pressable>
            </Pressable>
          </Modal>
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.45)",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
    modalBox: {
        width: "100%",
        maxWidth: 360,
        borderRadius: 16,
        backgroundColor: "#fff",
        padding: 20,
        alignItems: "center",
        gap: 8,
    },
    modalImg: { width: 96, height: 96, borderRadius: 12, marginBottom: 6 },
    modalTitle: { fontSize: 18, fontWeight: "700", textAlign: "center" },
    modalPrice: { fontSize: 16, opacity: 0.8, marginBottom: 10 },
    closeBtn: {
        marginTop: 8,
        backgroundColor: "#787a56ff",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
  closeBtnText: { color: "#fff", fontWeight: "600" },
});