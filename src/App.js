import React from 'react';
import PlacesNavigator from './navigation/PlacesNavigator';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import placesReducer from './store/reducers/places';
import {init} from './helpers/db';

init()
    .then(() => {
        console.log('Initialized database');
    })
    .catch(err => {
        console.log('Initializing db failed.');
        console.log(err);
    });

const rootReducer = combineReducers({
    places: placesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
    return (
        <Provider store={store}>
            <PlacesNavigator/>
        </Provider>
    );
};

export default App;
