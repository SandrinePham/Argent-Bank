import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../slices/api";

// FETCH profil utilisateur
export const fetchUserProfile = createAsyncThunk(
  "profile/fetchUserProfile",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) return rejectWithValue("Non authentifié");

    try {
      const response = await apiFetch(
        "http://localhost:3001/api/v1/user/profile",
        { method: "GET" },
        token
      );
      return response.body; // contient id, email, userName...
    } catch (error) {
      return rejectWithValue(error.message || "Erreur lors du fetch profil");
    }
  }
);

// UPDATE userName
export const updateUserProfile = createAsyncThunk(
  "profile/updateUserProfile",
  async ({ userName }, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) return rejectWithValue("Non authentifié");

    try {
      await apiFetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "PUT",
          body: JSON.stringify({ userName }),
        },
        token
      );
      return userName;
    } catch (error) {
      return rejectWithValue(error.message || "Erreur lors de la mise à jour");
    }
  }
);

// SLICE
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    status: "idle", // ou loading | succeeded | failed
    error: null,
  },
  reducers: {
    clearProfile(state) {
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateUserProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.user) {
          state.user.userName = action.payload; // mettre à jour localement
        }
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
