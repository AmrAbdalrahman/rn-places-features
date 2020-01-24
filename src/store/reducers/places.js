import {ADD_PLACE, SET_PLACES} from '../actions/places';
import Place from '../../models/place';

const initialState = {
    places: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PLACES:
            let mapPlaces = [];
            for (let i = 0; i < action.places.length; i++) {
                let pl = action.places.item(i);
                mapPlaces.push(new Place(
                    pl.id.toString(),
                    pl.title,
                    pl.imageUri,
                    pl.address,
                    pl.lat,
                    pl.lng,
                ));
            }
            console.log(mapPlaces);
            return {
                places: mapPlaces,
            };
        case ADD_PLACE:
            const newPlace = new Place(
                action.placeDate.id.toString(),
                action.placeDate.title,
                action.placeDate.image);
            return {
                places: state.places.concat(newPlace),
            };
        default:
            return state;
    }
}
