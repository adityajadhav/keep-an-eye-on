import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import {TabNavigator} from '../navigation/MainTabNavigator';
import { MonoText } from '../components/StyledText';
import {
  StackNavigator,
} from 'react-navigation';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
  //  imgUri: 'https://imgflip.com/s/meme/Philosoraptor.jpg',
    imgUri: 'https://www.delhitrainingcourses.com/images/scanning.png',
    topText: '',
    bottomText: '',
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
          <Text style={styles.titleText}>Keep An Eye On </Text>
          </View>

          <View ref={(ref) => this.memeView = ref}>
          <Image
            style={{ alignSelf: "stretch" , height: 350 }}
            source={{ uri: this.state.imgUri }}
          />
        </View>

          <View style={styles.buttonRow}>
        <TouchableOpacity>
            <Button title = "Take a pic"
            onPress={this._onTakePic}>
            </Button>
          </TouchableOpacity>
          <TouchableOpacity>
            <Button title = "Save to Gallery"
            onPress={this._onSave}>
            </Button>
          </TouchableOpacity>
          <TouchableOpacity>
            <Button
            onPress = {this._handleImagePicked}
            title = "Upload">
            </Button>
          </TouchableOpacity>
          </View>


        </ScrollView>

      </View>
    );
  }

  _onTakePic = async () => {
    const {
      cancelled,
      uri,
    } = await Expo.ImagePicker.launchCameraAsync({});
    if (!cancelled) {
      this.setState({ imgUri: uri });
    }
  }

  _onSave = async () => {
    const uri = await Expo.takeSnapshotAsync(this.memeView, {});
    await CameraRoll.saveToCameraRoll(uri);
  }

  _handleImagePicked = async () => {
    console.log("Button Pressed");
    console.log("Image" + this.state.imgUri);
    let uploadResponse, uploadResult;

   try {
     this.setState({ uploading: true });


       //uploadResponse = await uploadImageAsync(this.state.imgUri);
       //uploadResult = await uploadResponse.json();
       

        this.props.navigation.navigate('Analysis');


       //this.setState({ image: uploadResult.location });


   } catch (e) {
     console.log({ uploadResponse });
     console.log({ uploadResult });
     console.log({ e });
     alert('Upload failed, sorry :(');
   } finally {
     this.setState({ uploading: false });
   }
 };




  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}
async function uploadImageAsync(imgUri) {

  let apiUrl = 'http://104.194.98.94:8080/images/upload';

      // Note:
      // Uncomment this if you want to experiment with local server
      //
      // if (Constants.isDevice) {
      //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
      // } else {
      //   apiUrl = `http://localhost:3000/upload`
      // }

    //  let uriParts = uri.split('.');
    //  let fileType = uri[uri.length - 1];

      let formData = new FormData();
      formData.append('file', {
        uri:imgUri,
        name: `file.jpg`,
        type: `file/jpg`,
      });

      let options = {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      };
      return fetch(apiUrl, options);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleText:{
    fontSize: 30,
  },
  buttonRow:{

    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
