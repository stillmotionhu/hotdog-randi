import { initializeApp, type FirebaseOptions, type FirebaseApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';

const firebaseOptions: FirebaseOptions = {
	apiKey: 'AIzaSyCdH3AzfelhMex49WbsJdybioyfrFzwCxU',
	authDomain: 'hotdog-rating.firebaseapp.com',
	projectId: 'hotdog-rating',
	storageBucket: 'hotdog-rating.firebasestorage.app',
	messagingSenderId: '958661713927',
	appId: '1:958661713927:web:808dd00a1b5cd1d2738aa2',
	measurementId: 'G-YLXR79WK96'
};

const firebaseApp: FirebaseApp = initializeApp(firebaseOptions);

export const database: Firestore = getFirestore(firebaseApp);
