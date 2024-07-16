import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text1}>Manage Your Todo Task</Text>
      <Text style={styles.text2}>Be productive with us</Text>
      <Image style={styles.image} source={require('../assets/home.png')} />
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Todo')}>
        <Text style={styles.btnText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#D8D0FF',
        height: '100%',
        paddingTop: 100,
        paddingLeft: 20,
    },
    image: {
        height: 350,
        width: 300,
        marginTop: 70,
        marginLeft: 35,
    },
    text1: {
        fontSize: 40,
        fontWeight: 'bold',
        textShadowColor: '#585858',
        textShadowOffset: { width: 2, height: 5 },
        textShadowRadius: 8,
    },
    text2: {
        fontSize: 30,
        paddingTop: 20,
    },
    btn: {
        backgroundColor: '#7B61FF',
        width: 350,
        height: 55,
        borderRadius: 50,
        shadowColor: '#585858',
        shadowOffset: { width: 0, height: 5},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        marginTop: 100,
        textAlign: 'center',
        paddingTop: 13,
        marginLeft: 10,
    },
    btnText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 25,
    }

})

