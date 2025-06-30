import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "./api";

// Lire les données persistées si dispo
const tokenFromStorage = localStorage.getItem("token");
const firstNameFromStorage = localStorage.getItem("firstName");
const lastNameFromStorage = localStorage.getItem("lastName");

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await apiFetch(
        "http://localhost:3001/api/v1/user/login",
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(
          response.message || "Erreur de connexion"
        );
      }

      return response.body; // Doit contenir token, firstName, lastName
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    firstName: localStorage.getItem("firstName") || null,
    lastName: localStorage.getItem("lastName") || null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout(state) {
      state.token = null;
      state.firstName = null;
      state.lastName = null;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("firstName");
      localStorage.removeItem("lastName");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { token, firstName, lastName } = action.payload;
        state.status = "succeeded";
        state.token = token;
        state.firstName = firstName;
        state.lastName = lastName;
        state.error = null;

        localStorage.setItem("token", token);
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("lastName", lastName);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Erreur inconnue";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
