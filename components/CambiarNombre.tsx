import React, { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

type Persona = { nombre: string; apellido: string };

const TextInputExample = () => {
  const [persona, setPersona] = useState<Persona>({ nombre: "", apellido: "" });

  const [isOpen, setIsOpen] = useState(false);
  const [tmpNombre, setTmpNombre] = useState(persona.nombre);
  const [tmpApellido, setTmpApellido] = useState(persona.apellido);

  const abrirModal = () => {
    setTmpNombre(persona.nombre);
    setTmpApellido(persona.apellido);
    setIsOpen(true);
  };
  const cerrarModal = () => setIsOpen(false);

  const guardarNombre = () => {
    setPersona((prev) => ({ ...prev, nombre: tmpNombre }));
    setIsOpen(false);
  };
  const guardarApellido = () => {
    setPersona((prev) => ({ ...prev, apellido: tmpApellido }));
    setIsOpen(false);
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={styles.texto}>NOMBRE: <Text style={styles.valor}>{persona.nombre || "(sin nombre)"} </Text></Text>
      <Text style={styles.texto}>APELLIDO: <Text style={styles.valor}>{persona.apellido || "(sin apellido)"} </Text></Text>

      <View style={styles.viewStyles}>
        <Pressable onPress={abrirModal}>
          <Text style={styles.botonCambiar}>CAMBIAR</Text>
        </Pressable>
      </View>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>

            <TextInput
              style={styles.input}
              placeholder="Escribe el nuevo nombre"
              value={tmpNombre}
              onChangeText={setTmpNombre}
              onSubmitEditing={guardarNombre}
            />
            <TextInput
              style={styles.input}
              placeholder="Escribe el nuevo apellido"
              value={tmpApellido}
              onChangeText={setTmpApellido}
              onSubmitEditing={guardarApellido}
            />

            <View style={styles.row}>
              <Pressable style={[styles.boton, styles.cancelar]} onPress={cerrarModal}>
                <Text style={styles.textoBoton}>cancelarar</Text>
              </Pressable>
              <Pressable style={[styles.boton, styles.guardar]} onPress={guardarNombre}>
                <Text style={styles.textoBoton}>Guardar Nombre</Text>
              </Pressable>
              <Pressable style={[styles.boton, styles.guardar]} onPress={guardarApellido}>
                <Text style={styles.textoBoton}>Guardar Apellido</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  texto: { fontWeight: "700", marginBottom: 6 },
  valor: { fontWeight: "400" },

  viewStyles: {
    backgroundColor: "#1bbd87ff",
    padding: 10,
    marginTop: 8,
  },
  botonCambiar: { color: "#fff", fontWeight: "700" },

  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modal: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    elevation: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  row: {
    flexDirection: "column",
    gap: 10,
    justifyContent: "flex-end",
  },
  boton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  cancelar: { backgroundColor: "#999" },
  guardar: { backgroundColor: "#1bbd87ff" },
  textoBoton: { color: "#fff", fontWeight: "700" },
});

export default TextInputExample;
