export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';


import {insertPlace, fetchPlaces} from '../../helpers/db';

//RNFS save data to memory in run time only
export const addPlace = (title, image) => {
    return async dispatch => {


        const fileName = image.split('/').pop();

        //const newPath = RNFS.DocumentDirectoryPath + '/' + fileName;

        const newPath = RNFetchBlob.fs.dirs.DocumentDir + '/' + fileName;
        console.log('new path', newPath);
        console.log('image', image);


        try {
            //const fileMoved =await RNFS.moveFile(image, newPath);
            const fileMoved = await RNFetchBlob.fs.createFile(newPath, image, 'uri');

            console.log('fileMoved', fileMoved);


            const dbResult = await insertPlace(title, newPath, 'best address', 15.6, 12.3);
            dispatch({type: ADD_PLACE, placeDate: {id: dbResult.insertId, title: title, image: newPath}});
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

};

export const loadPlaces = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchPlaces();
            dispatch({type: SET_PLACES, places: dbResult.rows});
        } catch (err) {
            throw err;
        }


    };
};
