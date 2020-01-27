import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
/*import ENV from '../env';*/

const MapPreview = props => {
    let imagePreviewUrl;

    if (props.location) {
        imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${
            props.location.lat
        },${
            props.location.lng
        }&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${
            props.location.lat
        },${props.location.lng}&key=AIzaSyAKMOXBoqxcGMlHebaKB1DkAwaR0jZ6_w0`;
    }

    return (
        <MapView onPress={props.onPress} style={{...styles.mapPreview, ...props.style}}z
        >
            {props.location ? (
                <Image style={styles.mapImage} source={{uri: imagePreviewUrl}}/>
            ) : (
                props.children
            )}
        </MapView>
    );
};

const styles = StyleSheet.create({
    mapPreview: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapImage: {
        width: '100%',
        height: '100%',
    },
});

export default MapPreview;
