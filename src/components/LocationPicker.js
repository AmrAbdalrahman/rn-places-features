import React, {useState, useEffect} from 'react';
import {
    View,
    Button,
    Text,
    ActivityIndicator,
    Alert,
    StyleSheet, PermissionsAndroid, Dimensions,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
/*import Geolocation from 'react-native-geolocation-service';*/
import Colors from '../constants/Colors';
/*
import MapPreview from './MapPreview';
*/

/*interface IGeolocation {
    latitude: number;
    longitude: number;
}*/
const LocationPicker = props => {
    const [isFetching, setIsFetching] = useState(false);
    const [pickedLocation, setPickedLocation] = useState({
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
    );

    /*const mapPickedLocation = props.navigation.getParam('pickedLocation');

    const { onLocationPicked } = props;

    useEffect(() => {
        if (mapPickedLocation) {
            setPickedLocation(mapPickedLocation);
            onLocationPicked(mapPickedLocation);
        }
    }, [mapPickedLocation, onLocationPicked]);*/

    /*useEffect(() => {
        Geolocation.getCurrentPosition(
            position => {
                const {latitude, longitude} = position.coords;
                setPickedLocation({
                    latitude,
                    longitude,
                });
            },
            error => {
                console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
    }, []);*/

    const verifyPermissions = async () => {
        try {
            await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

            if (await PermissionsAndroid.check('android.permission.ACCESS_FINE_LOCATION')) {
                console.log('You can use the location');
                return true;
            } else {
                console.log('Location permission denied');
                Alert.alert(
                    'Insufficient permissions!',
                    'You need to grant location permissions to use this app.',
                    [{text: 'Okay'}],
                );
                return false;
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const getLocationHandler = async (coordinate) => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }

        console.log('get location');

        /*this.props.onLocationPick({
            latitude: coords.latitude,
            longitude: coords.longitude
        });*/

        // try {
        //     setIsFetching(true);
        //     const location = await MapView.getCurrentPositionAsync({
        //         timeout: 5000
        //     });
        //     setPickedLocation({
        //         lat: location.coords.latitude,
        //         lng: location.coords.longitude
        //     });
        //     props.onLocationPicked({
        //         lat: location.coords.latitude,
        //         lng: location.coords.longitude
        //     });
        // } catch (err) {
        //     Alert.alert(
        //         'Could not fetch location!',
        //         'Please try again later or pick a location on the map.',
        //         [{ text: 'Okay' }]
        //     );
        // }
        // setIsFetching(false);
    };

    const pickOnMapHandler = () => {
        props.navigation.navigate('Map');
    };

    return (
        <View style={styles.locationPicker}>
            <MapView style={styles.map}
                     provider={PROVIDER_GOOGLE}
                     initialRegion={pickedLocation}
                     onRegionChange={region => {
                         setPickedLocation({
                             latitude: region.latitude,
                             longitude: region.longitude,
                         });
                     }}
                     onRegionChangeComplete={region => {
                         setPickedLocation({
                             latitude: region.latitude,
                             longitude: region.longitude,
                         });
                     }}

            >
                <Marker
                    coordinate={{
                        latitude: pickedLocation.latitude,
                        longitude: pickedLocation.longitude,
                    }}
                    title="this is a marker"
                    description="this is a marker example"
                />
            </MapView>

            <View style={styles.actions}>
                <Button
                    title="Get User Location"
                    color={Colors.primary}
                    onPress={getLocationHandler}
                />
                <Button
                    title="Pick on Map"
                    color={Colors.primary}
                    onPress={pickOnMapHandler}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    locationPicker: {
        width: '100%',
        alignItems: 'center',
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    map: {
        width: '100%',
        height: 250,
        marginBottom: 20,
    },
});

export default LocationPicker;
