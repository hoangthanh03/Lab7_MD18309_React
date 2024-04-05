import { Alert, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import TextInPut_Custom from '../Component_custom/TextInPut_Custom'
import CustomButton from '../Component_custom/Button_Custom'
import auth from '@react-native-firebase/auth';

const Register = ({ navigation }) => {
  // State để lưu giá trị của các input
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [Cfpassword, setCfPassword] = useState('');

  // State để lưu trạng thái lỗi của các input
  const [errUser, setErrUser] = useState('');
  const [errPass, setErrPass] = useState('');
  const [errCfPass, setErrCfPass] = useState('');

  // State để lưu trạng thái focus của các input
  const [userNameFocused, setUserNameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [CfpasswordFocused, setCfPasswordFocused] = useState(false);

  // Function để xử lý khi input mất focus
  const handleUserNameFocus = () => {
    setUserNameFocused(true);
    setPasswordFocused(false);
    setCfPasswordFocused(false);
  };

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
    setUserNameFocused(false);
    setCfPasswordFocused(false);
  };

  const handleCfPasswordFocus = () => {
    setCfPasswordFocused(true);
    setPasswordFocused(false);
    setUserNameFocused(false);
  };

  // Function để xử lý khi người dùng nhấn nút Register
  const handleRegister = () => {
    // Kiểm tra các input trước khi đăng ký
    if (!userName) {
      setErrUser('Vui lòng nhập username');
    }

    if (!password) {
      setErrPass('Vui lòng nhập password');
    }

    if (!Cfpassword) {
      setErrCfPass('Vui lòng xác nhận password');
      return
    }

    if (Cfpassword !== password) {
      setErrCfPass('Mật khẩu xác nhận không trùng khớp');
      return;
    }

    // Nếu không có lỗi, thực hiện đăng ký
    auth()
      .createUserWithEmailAndPassword(userName, password)
      .then(() => {
        console.log('Đăng ký thành công');
        Alert.alert('Đăng ký thành công');
        navigation.navigate('Login');
        setUserName('');
        setPassword('');
        setCfPassword('');
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(error)
        Alert.alert('Đăng ký không thành công, vui lòng thử lại');
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ImageBackground style={styles.img} source={require('../image/background_crop2.png')}>
          <Text style={{ fontFamily: 'welcome', fontSize: 40 }}>Register</Text>
        </ImageBackground>
      </View>
      <View style={styles.viewBody}>
        <View>
          <TextInPut_Custom
            onFocus={handleUserNameFocus}
            onChangeText={(text) => setUserName(text)}
            placeholder="Username"
            placeholderTextColor="gray"
            style={[
              styles.input,
              userNameFocused && { borderColor: 'blue' },
              errUser && { borderColor: 'red' },
            ]}
          />
          <Text style={styles.errorText}>{errUser}</Text>

          <TextInPut_Custom
            onFocus={handlePasswordFocus}
            onChangeText={(text) => setPassword(text)}
            placeholder="Password"
            placeholderTextColor="gray"
            style={[
              styles.input,
              passwordFocused && { borderColor: 'cyan' },
              errPass && { borderColor: 'red' },
            ]}
          />
          <Text style={styles.errorText}>{errPass}</Text>

          <TextInPut_Custom
            onFocus={handleCfPasswordFocus}
            onChangeText={(text) => setCfPassword(text)}
            placeholder="Confirm Password"
            placeholderTextColor="gray"
            style={[
              styles.input,
              CfpasswordFocused && { borderColor: 'cyan' },
              errCfPass && { borderColor: 'red' },
            ]}
          />
          <Text style={styles.errorText}>{errCfPass}</Text>

          <CustomButton title="Register" onPress={handleRegister} />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text onPress={() => navigation.navigate('Login')} style={{ fontStyle: 'italic', marginTop: 10 }}>
            Do you have an account? <Text style={{ color: 'black', fontWeight: 'bold', fontStyle: 'italic' }}>Sign In</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};


export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C6E2FF'
  },
  input: {
    borderColor: 'gray',
    paddingLeft: 10,
  },
  errorText: {
    color: 'red',
    marginLeft: 20,
    fontStyle: 'italic',
    fontSize: 12
  },
  img: {
    // flex: 1,
    width: '100%', // Chiều rộng cố định của ảnh
    height: '100%', // Chiều cao cố định của ảnh

  },
  header: {
    flex: 0.7
  },
  viewBody: {
    flex: 2.1,
    backgroundColor: "white",
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  logWith: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9AC0CD',
    padding: 4,
    borderRadius: 6,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
    // margin:20
  },
  btnWith: {
    flexDirection: 'row',
    // alignItems:'center',
    justifyContent: 'center'
  },
  text: {
    color: 'black',
    fontWeight: 'bold'
  }
})
