import * as firebase from 'firebase';

export function errorHandler(title: string = 'Error') {
    return (error: firebase.FirebaseError) => {
        alert(`${title}\n\nCode: ${error.code}\nMessage: ${error.message}`);
    };
}
