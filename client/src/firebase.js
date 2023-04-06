// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyD_l_wUF9SPwsntgSwSe_ajIwmPe2Ul2X4',
	authDomain: 'remote-learners.firebaseapp.com',
	projectId: 'remote-learners',
	storageBucket: 'remote-learners.appspot.com',
	messagingSenderId: '118650743738',
	appId: '1:118650743738:web:1645ad088f90a59629cb83',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
