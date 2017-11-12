import React from 'react';
import { ScrollView, StyleSheet,View, Button } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <Button onPress={this._getUserInformation}
          title = "Press Me"
          />
          </View>
      </ScrollView>
    );
  }
  _getUserInformation = async() => {

      let uploadResponse, uploadResult;
    try {
     


       uploadResponse = await getInformation();
       uploadResult = await uploadResponse.json();
      console.log(uploadResult);   

       


       


   } catch (e) {
     console.log({ uploadResponse });
     console.log({ uploadResult });
     console.log({ e });
     
   } 
  }
}
async function getInformation() {

  let apiUrl = 'http://104.194.98.94:8080/users';

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


      let options = {
        method: 'GET',
        body: formData,
        headers: {
          Accept: 'application/json',
          
        },
      };
      return fetch(apiUrl, options);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
