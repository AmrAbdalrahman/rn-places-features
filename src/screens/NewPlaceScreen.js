import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput, Button, Alert} from 'react-native';
import Colors from '../constants/Colors';
import * as placesActions from '../store/actions/places';
import {useDispatch} from 'react-redux';
import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';

const NewPlaceScreen = props => {

    const [titleValue, setTitleValue] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    const [selectedLocation, setSelectedLocation] = useState();

    const dispatch = useDispatch();

    const titleChangeHandler = text => {
        //you could add validation
        setTitleValue(text);
    };

    const imageTakenHandler = imagePath => {
        console.log('imagePath', imagePath);
        setSelectedImage(imagePath);
    };

    const savePlaceHandler = () => {
        if (titleValue.trim().length < 3) {
            Alert.alert('Alert', 'Title must be minimum 3 characters', [{text: 'Okay'}]);
            return;
        }
        dispatch(placesActions.addPlace(titleValue, selectedImage));
        props.navigation.goBack();
    };

    return (
        <ScrollView keyboardShouldPersistTaps={'always'}>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.textInput}
                           onChangeText={titleChangeHandler}
                           value={titleValue}/>
                <ImagePicker onImageTaken={imageTakenHandler}/>
                <LocationPicker/>

                <Button title={'Save Place'} color={Colors.primary} onPress={savePlaceHandler}/>
            </View>
        </ScrollView>
    );
};


NewPlaceScreen.navigationOptions = {
    headerTitle: 'Add Place',
};

const styles = StyleSheet.create({
    form: {
        margin: 30,
    },
    label: {
        fontSize: 18,
        marginBottom: 15,
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2,
    },
});

export default NewPlaceScreen;
