import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput, Button, Alert} from 'react-native';
import Colors from '../constants/Colors';
import * as placesActions from '../store/actions/places';
import {useDispatch} from 'react-redux';

const NewPlaceScreen = props => {

    const [titleValue, setTitleValue] = useState('');

    const dispatch = useDispatch();

    const titleChangeHandler = text => {
        //you could add validation
        setTitleValue(text);
    };

    const savePlaceHandler = () => {
        if (titleValue.trim().length < 3) {
            Alert.alert('Alert', 'Title must be minimum 3 characters', 'Ok');
            return;
        }
        dispatch(placesActions.addPlace(titleValue));
        props.navigation.goBack();
    };

    return (
        <ScrollView keyboardShouldPersistTaps={'always'}>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.textInput}
                           onChangeText={titleChangeHandler}
                           value={titleValue}/>
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
