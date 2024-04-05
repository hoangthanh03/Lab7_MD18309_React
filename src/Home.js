import { FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ItemHome from '../Item/ItemHome'
import ItemHome2 from '../Item/ItemHome2'
import LinearGradient from 'react-native-linear-gradient'

const Home = ({ navigation }) => {
  const [data1, setdata1] = useState([])

  const layduLieu = async () => {
    let linkProducts1 = 'http://10.24.42.159:3000/products';
    try {
      const res = await fetch(linkProducts1);

      const jsonData = await res.json()
      setdata1(jsonData)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    layduLieu()
  }, [])

  return (
    <LinearGradient colors={['#87CEEB', '#FFFFF0', '#EECBAD']} style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.hearder}>
            <ImageBackground style={styles.imgBgr} source={require('../image/backgroundHearder.jpg')}>
              <View style={styles.viewHearder1}>
                <Text style={{ color: 'white', fontSize: 24, fontFamily: 'textLog' }}>Motorcyle burn with passion</Text>
                <TouchableOpacity style={styles.btnCart} onPress={() => navigation.navigate('Cart')}>
                  <Image style={{ width: 30, height: 30 }} source={require('../image/cart2.png')} />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>

          <View style={styles.body}>
            <View style={styles.viewBody1}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', color: 'black', margin: 3 }}>Motor</Text>
              <FlatList
                data={data1}
                renderItem={({ item }) => <TouchableOpacity onPress={() => navigation.navigate('Deltais', { item: item })}><ItemHome item={item} /></TouchableOpacity>}
                keyExtractor={(item) => item.id}
                horizontal={false}
                numColumns={2} // Hiển thị 2 item trên mỗi dòng
              />
            </View>
            {/* ///// */}

            <View style={styles.viewBody1}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', color: 'black', margin: 3 }}>Vehicle accessories</Text>
              <FlatList
                data={data1}
                renderItem={({ item }) => <ItemHome2 item={item} />}
                keyExtractor={(item) => item.id}
                horizontal={false}
                numColumns={2} // Hiển thị 2 item trên mỗi dòng
              />
            </View>
          </View>

        </ScrollView>
      </View>
    </LinearGradient>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ''
  },
  hearder: {
    flex: 3,
    width: '100%',
    height: 200
    // backgroundColor: 'black',
    // flexDirection: 'row'
  },
  body: {
    flex: 7,
  },
  imgBgr: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  viewHearder1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10
  },
  btnCart: {
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 20,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: 'center'
  },
  viewBody1: {

  }
})