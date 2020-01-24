import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, Image, PermissionsAndroid, Alert} from 'react-native';
import Colors from '../constants/Colors';
import ImagePicker from 'react-native-image-picker';

const ImgPicker = props => {

    const [pickedImage, setPickedImage] = useState();

    const verifyPermissions = async () => {
        try {
            await PermissionsAndroid.requestMultiple
            ([PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE]);
            if ((await PermissionsAndroid.check('android.permission.CAMERA')) &&
                (await PermissionsAndroid.check('android.permission.CAMERA')) &&
                (await PermissionsAndroid.check('android.permission.CAMERA'))) {
                console.log('You can use the camera');
                return true;
            } else {
                console.log('Camera permission denied');
                Alert.alert(
                    'Insufficient permissions!',
                    'You need to grant camera permissions to use this app.',
                    [{text: 'Okay'}],
                );
                return false;
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }

        const options = {
            title: 'Select Place Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
               // setPickedImage(response.uri);
                //console.log('data', response.data);
                //const source = {uri: response.uri};
                // You can also display the image using data:
                /* const source = { uri: 'data:image/jpeg;base64,' + response.data };
                console.log("source",source);*/
                setPickedImage(response.uri);
                props.onImageTaken(response.uri);
            }
        });
    };

    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
                {!pickedImage ? (<Text>No image picked yet. </Text>) :
                    (<Image style={styles.image} source={{uri: pickedImage}}/>)}
            </View>
            <Button
                title={'Take Image'}
                color={Colors.primary}
                onPress={takeImageHandler}/>
        </View>
    );
};

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center',
        marginBottom: 15,
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default ImgPicker;
