import { useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";

const ComponenteContador = () => {
  const [state, setState] = useState({clicks: 0})
  function updateContador(){
    setState({ clicks: state.clicks + 1})
  }
  function disminuirContador(){
    setState({clicks: state.clicks -1})
  }
  return     <View style={{ alignItems: "center", marginTop: 10}}>
      <Text>Clicks: {state.clicks}</Text>
      <View style={styles.viewBoxStyles}>
      <Pressable onPress={updateContador} style={styles.viewStyles}>
        <Text style= {styles.textStyles}>AUMENTAR</Text>
        </Pressable>
      <Button title="Disminuir" onPress={disminuirContador} />
      </View>
    </View>
}
const styles = StyleSheet.create({
    viewStyles: {
        backgroundColor: '#2196F3',
        padding: 5,
    },
    textStyles: {
        color: 'white',
        fontWeight: 'bold'

    },
    viewBoxStyles: {
        flexWrap: 'wrap',
        flexDirection:'row',
        paddingLeft:1,
        paddingRight:1
    }
})

export default ComponenteContador