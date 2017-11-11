import * as firebase from 'firebase';
import Notyf = require('notyf');

const notyf = new Notyf({delay: 5000});

export function errorHandler(title: string = 'Error') {
    return (error: firebase.FirebaseError) => {
        notyf.alert(`${title}<br><br>Code: ${error.code}<br>Message: ${error.message}`);
    };
}
