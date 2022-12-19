import axios from 'axios'
import { db } from "../config/firebase";
import {
    doc, setDoc, updateDoc, arrayUnion, getFirestore,
    onSnapshot,
    collection,
    query,
    where,
    orderBy,
    getDoc,
    addDoc,
    deleteDoc,
    serverTimestamp,
    deleteField,
    arrayRemove,
} from 'firebase/firestore';
import { auth } from '../config/firebase'
import {
    useQuery,
    hashQueryKey,
    QueryClient,
    QueryClientProvider as QueryClientProviderBase,
} from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'

const client = new QueryClient();


export const fetchWatchlist = async (uid) => {
    const res = await getDoc(doc(db, 'users', uid), {
    })
    return res.data()
};

// Create a new user
export function createUser(uid, data) {
    return setDoc(doc(db, "users", uid), data, { merge: true });
};

// Update an existing user
export function updateUser(uid, data) {
    return updateDoc(doc(db, "users", uid), data);
};



/**** HELPERS ****/

// Store Firestore unsubscribe functions
const unsubs = {};

function createQuery(getRef) {
    // Create a query function to pass to `useQuery`
    return async ({ queryKey }) => {
        let unsubscribe;
        let firstRun = true;
        // Wrap `onSnapshot` with a promise so that we can return initial data
        const data = await new Promise((resolve, reject) => {
            unsubscribe = onSnapshot(
                getRef(),
                // Success handler resolves the promise on the first run.
                // For subsequent runs we manually update the React Query cache.
                (response) => {
                    const data = format(response);
                    if (firstRun) {
                        firstRun = false;
                        resolve(data);
                    } else {
                        client.setQueryData(queryKey, data);
                    }
                },
                // Error handler rejects the promise on the first run.
                // We can't manually trigger an error in React Query, so on a subsequent runs we
                // invalidate the query so that it re-fetches and rejects if error persists.
                (error) => {
                    if (firstRun) {
                        firstRun = false;
                        reject(error);
                    } else {
                        client.invalidateQueries(queryKey);
                    };
                }
            );
        });

        // Unsubscribe from an existing subscription for this `queryKey` if one exists
        // Then store `unsubscribe` function so it can be called later
        const queryHash = hashQueryKey(queryKey);
        unsubs[queryHash] && unsubs[queryHash]();
        unsubs[queryHash] = unsubscribe;

        return data;
    };
};

// Automatically remove Firestore subscriptions when all observing components have unmounted
client.queryCache.subscribe(({ type, query }) => {
    if (
        type === "observerRemoved" &&
        query.getObserversCount() === 0 &&
        unsubs[query.queryHash]
    ) {
        // Call stored Firestore unsubscribe function
        unsubs[query.queryHash]();
        delete unsubs[query.queryHash];
    };
});

// Format Firestore response
function format(response) {
    // Converts doc into object that contains data and `doc.id`
    const formatDoc = (doc) => ({ id: doc.id, ...doc.data() });
    if (response.docs) {
        // Handle a collection of docs
        return response.docs.map(formatDoc);
    } else {
        // Handle a single doc
        return response.exists() ? formatDoc(response) : null;
    };
};


export function QueryClientProvider(props) {
    return (
        <QueryClientProviderBase client={client}>
            {props.children}
            <ReactQueryDevtools />
        </QueryClientProviderBase>
    );
}


export const useNews = (q, size, onSuccess, onError) => {
    return useQuery(['news', { q, size }], () => fetchNews(q, size), {
        onSuccess,
        onError,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetch: false
    });
}

export const updateWatchlist = async (uid, ticker) => {
    const docRef = doc(db, "watchlists", uid)
    const docSnap = await getDoc(docRef)
    if (!ticker) return;

    if (docSnap.exists()) {
        updateDoc(docRef, { watchlist: arrayUnion({ ...ticker, 'owner': uid }) })
    } else {
        setDoc(docRef, { 'watchlist': ticker })
    };
};
export const addMessage = async (value, roomId, uid, photoURL) => {
    const collectionRef = collection(db, "messages")
    addDoc(collectionRef, {
        value,
        owner: uid,
        photoURL,
        roomId,
        createdAt: serverTimestamp()
    })
};

export function useMessagesByOwner(owner) {
    return useQuery(
        ['messages', { owner }],
        createQuery(() =>
            query(
                collection(db, "messages"), orderBy('createdAt'),
            )
        ),
        {
            // enabled: !!owner,
        }
    );
};

export const deleteRoom = async (roomId, uid) => {
    const docRef = doc(db, "rooms", roomId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        deleteDoc(docRef)
    }
}

export const updateRoom = async (roomId, uid) => {
    const docRef = doc(db, "rooms", roomId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        updateDoc(docRef, data)
    } else {
        setDoc(docRef, data)
    };
};
export const addRoom = async (data, uid) => {
    const collectionRef = collection(db, "rooms")
    const { roomName, roomDescription } = data
    addDoc(collectionRef, {
        roomName, roomDescription,
        admin: uid,
        createdAt: serverTimestamp()
    })
};

export function useAddRoom(data, uid) {
    return useQuery(
        ['rooms', { data, uid }],
        createQuery(() =>
            query(
                collection(db, "rooms"), orderBy('createdAt'),
            )
        ),
        {
            // enabled: !!owner,
        }
    );
};

export function useRoomsByOwner(ownerId) {
    return useQuery(
        ['rooms', { ownerId }],
        createQuery(() =>
            query(
                collection(db, "rooms"),
                where("admin", "==", ownerId),
                orderBy('createdAt'),
            )
        ),
        {
            enabled: !!ownerId,
        }
    );
};

export function useRoomByParticipant(roomId, ownerId) {
    return useQuery(
        ['rooms', { ownerId, roomId }],
        createQuery(() =>
            query(
                doc(db, "rooms", roomId),
                // where("participants", "array-contains", ownerId)
            )
        ),
        {
            enabled: !!ownerId,
        }
    );
};

export function useMessagesByRoom(roomId, ownerId) {
    return useQuery(
        ['messages', { roomId, ownerId }],
        createQuery(() =>
            query(
                collection(db, "messages"),
                where("roomId", "==", roomId),
                orderBy('createdAt'),
            )
        ),
        {
            enabled: !!ownerId,
        }
    );
};

export const useRooms = (uid) => {
    return useQuery(['rooms', { uid }], () => getRooms(uid), {
        enabled: !!uid
    });
}

// ['PhxZjvaiY2hqCRARifW3SE5is1M2', 'K5KBirPuJMyXrBPFJtku', '1x07c2J2RROimbIHUVKErdEoNoj2',]