import React from 'react';
import { ScrollView, StyleSheet,View, Button, Text, ListView, Image } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Constants } from 'expo';


export default class LinksScreen extends React.Component {
 
  
  static navigationOptions = {
    title: 'Analysis',
    
  };
  
  state = {
    name: 'null',
    latitude: '0',
    longitude: '0',
    data: [
        
      ],
      dataSource: 'null',
      status: -1,
      score: 63.2,
      imgUri: 'https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2017/08/1501862810blinking-eye-quake.gif',
      dummy: 0,
    }
 

  render() {
    const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });
    this.state.dataSource = ds.cloneWithRowsAndSections({TEST: this.state.data});
    return (
      <ScrollView style={styles.container}>
        
        <View>
          <Button onPress={this._getUserInformation}
          title = "Analyze"
          />
          </View>
          <View>{this._displayProgressBar(
          
            <Image
            style={{ alignSelf: "stretch" , height: 350, marginLeft: 10, marginRight: 10 }}
            source={{ uri: this.state.imgUri }}
          />

          )}
        </View>
          {/*<Text >"Name: "{this.state.name}
          </Text>
          <Text >"Your Location: "{this.state.latitude} + "" + {this.state.longitude}
          </Text>*/}


          


          <View>{this._displayContent( 
            
                  <View style={styles.statusYes}>
                  <Text style={styles.statusYesFont}  >There is <Text>{this.state.score}</Text>% chance that you are affected by the <Text style={styles.diseaseName}>Retinoblastoma</Text></Text>
                  </View>
            
            )}</View>

            <View>{this._displayContentNo( 
            
                  <View style={styles.statusNo}>
                  <Text style={styles.statusNoFont}>Your eyes are perfect :)</Text>
                  </View>
            
            )}</View>

          
           

          <View>{this._displayContent( 
            
                    <View style={styles.description}>
                    <Text style={styles.descriptionFont}>Retinoblastoma is a cancer that starts in the retina, 
                    the very back part of the eye. It is the most common type of eye cancer in children. 
                    Rarely, children can have other kinds of eye cancer, such as medulloepithelioma, which is described briefly below, or melanoma.
                    </Text>
                    </View>
            )}</View>

         
          



        <View style={styles.hospitalList}
        >
        {this._displayContent(
            <ListView 
            dataSource={this.state.dataSource}
            enableEmptySections={true}
            renderSectionHeader={() => {
              return (
                null
              );
            }}
            renderRow={row => {
              return <View style={{height: 40, alignSelf: 'stretch', backgroundColor: 'white'}}><Text style={styles.hospitalsFont}>{row.name}</Text></View>;
            }}
            renderHeader={() => {
              return (
                
                <View>
                  {this._displayContent(
                <View style={{height: 50, alignSelf: 'stretch', backgroundColor: '#4488FF'}}>
                  <Text style={styles.hospitalListFont}>Nearest Hospitals</Text>
                </View>
                  )}
                </View>
              );
            }}
            
          />
        )}
      </View>



          
      </ScrollView>
    );
  }
  _displayContent = (content) => {
    

    if(this.state.status == 1)

    return content;

    else 

    return null;

  }

  _displayProgressBar = (content) => {
    if(this.state.status == 100)
    return content;

    else

    return null;
  }

  _displayContentNo = (content) => {
    

    if(this.state.status == 0)

    return content;

    else 

    return null;

  }


  _getUserInformation = async() => {

      this.setState({status: 100});
      let uploadResponse, uploadResult, hospitalResponse, hospitalResult, hospital, i, diseaseResult, diseaseResponse;
    try {
     

      

      // uploadResponse = await getInformation();
      // uploadResult = await uploadResponse.json();
      

      // this.setState({name:uploadResult.name});
      // this.setState({latitude:uploadResult.latitude});
      // this.setState({longitude:uploadResult.longitude});  

      //----------------------------------------------------------Uncomment------------------------------------------------
      diseaseResponse = await getDiseaseStatus();
      diseaseResult = await diseaseResponse.json();

      if(diseaseResult.infected == true)
      {
        this.setState({status:1});
        this.setState({score:diseaseResult.score});
      }
      else
      {
        this.setState({status:0});
      }
      //----------------------------------------------------------------------------------------------------------


      hospitalResponse = await getNearbyHospitals();
      hospitalResult = await hospitalResponse.json();
      console.log(hospitalResult);   
      //this.state.data = null;
      //this.state.dataSource.cloneWithRowsAndSections ({TEST: this.state.data});
      for (i = 0; i<hospitalResult.length;i++)
      {
        this.state.data.push({'name' : hospitalResult[i].name});
        this.state.dataSource.cloneWithRowsAndSections({TEST: this.state.data})
        this.setState({dummy:1});
        
      }
      this.state.dataSource.cloneWithRowsAndSections({TEST: this.state.data})

      console.log(this.state.data);
      

     
       


       


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
        
        headers: {
          Accept: 'application/json',
          
        },
      };
      return fetch(apiUrl, options);

}
async function getNearbyHospitals() {

  let apiUrl = 'http://104.194.98.94:8080/eye/hospitals';

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
        
        headers: {
          Accept: 'application/json',
          
        },
      };
      return fetch(apiUrl, options);
}
async function getDiseaseStatus() {

  let apiUrl = 'http://104.194.98.94:8080/eye';

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
  statusYes:{    
    backgroundColor: '#E74C3C',
     elevation: 5,
     marginLeft: 5,
     marginRight: 5,
     marginTop: 5,
     marginBottom: 5,
     
  },
  statusNo:{    
    backgroundColor: '#69ce44',
     elevation: 5,
     marginLeft: 5,
     marginRight: 5,
     marginTop: 45,
     marginBottom: 45,
     
     paddingBottom: 25,
     paddingTop:25,
  },
  diseaseName:{
    fontWeight: 'bold',
  },
  statusYesFont:{
    fontSize: 32,
    marginLeft: 5,
    marginRight: 5,
    color: 'white' 
  },
  statusNoFont:{
    fontSize: 32,
    marginLeft: 5,
    marginRight: 5,
    color: 'white' 
  },
  description:{    
    backgroundColor: 'white',
    marginLeft: 5,
     marginRight: 5,
     elevation: 5,
     marginTop: 5,
     marginBottom: 5,
  },
  descriptionFont:{
    fontSize: 22,
    marginLeft: 5,
     marginRight: 5,
     color: 'black'
  },
  
  hospitalList:{
    backgroundColor: '#6eb1d8',
    marginLeft: 5,
     marginRight: 5,
     elevation: 5,
     marginTop: 5,
     marginBottom: 5,

  },

  hospitalListFont:{
 fontSize: 22,
    marginLeft: 5,
     marginRight: 5,
     color:'white',
  },
hospitalsFont:{
 fontSize: 22,
    marginLeft: 5,
     marginRight: 5,
     color:'black',
  },

});
