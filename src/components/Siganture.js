import React, {useState} from 'react'
import Signature from "react-native-signature-canvas";


const Siganture = () => {

    const [signature, setSign] = useState(null);

    const handleOK = (signature) => {
        setSign(signature);
        // setModalVisible(!modalVisible);
    };

    const handleEmpty = () => {
        console.log("Empty");
    };


  return (
    <Signature
        style={{backgroundColor : 'red'}}
        onOK={handleOK}
        onEmpty={handleEmpty}
        descriptionText="Sign"
        clearText="Clear"
        confirmText="Save"
        // webStyle={style}
    />
  )
}

export default Siganture