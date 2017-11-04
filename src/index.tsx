import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'skeleton-css/css/normalize.css';
import 'skeleton-css/css/skeleton.css';
import './index.css';

import { HashRouter, Redirect, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import * as firebase from 'firebase';

let config = {
    apiKey: 'AIzaSyD9DESNq4FR6ddtwydMxkJMfu10Ccs4PTQ',
    authDomain: 'control-list.firebaseapp.com',
    databaseURL: 'https://control-list.firebaseio.com',
    projectId: 'control-list',
    storageBucket: 'control-list.appspot.com',
    messagingSenderId: '735172718450'
};

firebase.initializeApp(config); // tslint:disable


let isAuth = false;

const PrivateRoute = ({component: Component, ...rest}: any) => (
    <Route {...rest} render={props => (
        isAuth
            ? <Component {...props}/>
            : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
    )}/>
);

ReactDOM.render(
    <HashRouter>
        <div>
            <Route exact path="/" component={App}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <PrivateRoute path="/profile" component={Profile}/>
        </div>
    </HashRouter>,
    document.getElementById('root') as HTMLElement
);

registerServiceWorker();
