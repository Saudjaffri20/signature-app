import React, {useState} from 'react'
import {Text, View, StatusBar, StyleSheet, Dimensions, Pressable, TouchableOpacity, Image, TextInput, FlatList, SafeAreaView, Modal} from "react-native";
import { AntDesign } from '@expo/vector-icons';




const { width, height } = Dimensions.get('window');

const DATA = [
    {
        id: '1',
        appointmentName: 'Physiotherapy',
        appointmentDate: '10-march-2022',
        userImage: require('../assets/images/user.jpg'),
        gender: 'Male',
    },
    {
        id: '2',
        appointmentName: 'Physiotherapy',
        appointmentDate: '10-march-2022',
        userImage: require('../assets/images/user.jpg'),
        gender: 'Male',
    },
    {
        id: '3',
        appointmentName: 'Physiotherapy',
        appointmentDate: '10-march-2022',
        userImage: require('../assets/images/user.jpg'),
        gender: 'Male',
    },
    {
        id: '4',
        appointmentName: 'Physiotherapy',
        appointmentDate: '10-march-2022',
        userImage: require('../assets/images/user.jpg'),
        gender: 'Male',
    },
];

const AppointmentLists = () => {
    
    const [modalVisible, setModalVisible] = useState(false);

    const renderItem = ({ item }) => {
        return(

        <View style={styles.listContainer}>
           <View>
               <Image 
                    style={{height : 60, width : 60, borderRadius : 100}} 
                    source={item.userImage} 
                />
           </View>
            <View style={styles.detailView}>
                <Text style={{fontSize : 18, fontWeight : '600'}}>{item.appointmentName}</Text>
                <Text style={{fontSize : 14, marginTop : 3, fontWeight : '500', color : '#F0f2d0'}}>{item.appointmentDate}</Text>
            </View>
            <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(true)}
            >
                <AntDesign 
                    name="adduser" 
                    size={34} 
                    color="black" 
                />
            </TouchableOpacity>
       </View>
        )
    };


    return (
        <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
    )
}



const styles = StyleSheet.create({

    listContainer : {
        width : width * 1,
        paddingHorizontal : 12,
        paddingVertical : 10,
        flexDirection : 'row',
        borderBottomWidth : 1,
        borderBottomColor : '#F0F2F5',
    },
    
    detailView : {
        flex : 1,
        paddingLeft : 15,
        paddingTop : 7
    },

    modalButton : {
        alignSelf : 'center'
    },
 
});


export default AppointmentLists