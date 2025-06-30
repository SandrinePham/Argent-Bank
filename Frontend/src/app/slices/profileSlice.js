import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../slices/api";

export const fetchUserProfile = createAsyncThunk(
  "profile/fetchUserProfile",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    if (!token) return thunkAPI.rejectWithValue("Non authentifié");

    try {
      const data = await apiFetch(
        "http://localhost:3001/api/v1/user/profile",
        { method: "GET" },
        token
      );
      return data.body;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "profile/updateUserProfile",
  async ({ userName }, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    if (!token) return thunkAPI.rejectWithValue("Non authentifié");

    try {
      await apiFetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "PUT",
          body: JSON.stringify({ userName }),
        },
        token
      );
      return { success: true };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    status: "idle",
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
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserProfile.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
