
import { configureStore, createSlice } from "@reduxjs/toolkit";


const loadFavorites = (uid) => {
  if (!uid) return [];
  return JSON.parse(localStorage.getItem(`favorites_${uid}`)) || [];
};

const appSlice = createSlice({
  name: "app",
  initialState: {
    user: null,          
    isSubscribed: false, 
    favorites: [],     
  },
  reducers: {
    login: (state, action) => {
      const { user, isSubscribed } = action.payload;
      state.user = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "Utilisateur",
        photoURL: user.photoURL,
      };
      state.isSubscribed = isSubscribed;
      state.favorites = loadFavorites(user.uid);
    },
    logout(state) {
      state.user = null;
      state.isSubscribed = false;
    },
    addFavorite: (state, action) => {
      const exists = state.favorites.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter((item) => item.id !== action.payload);
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
  },
});

export const { login, logout, addFavorite, removeFavorite, setFavorites } = appSlice.actions;

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});


store.subscribe(() => {
  const { user, favorites } = store.getState().app;
  if (user?.uid) {
    localStorage.setItem(`favorites_${user.uid}`, JSON.stringify(favorites));
  }
});
    
