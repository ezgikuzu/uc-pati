import { createSlice } from "@reduxjs/toolkit";
import { adoptionPets } from "../data/data";

const initialState = {
  pets: adoptionPets,
};

const adoptionSlice = createSlice({
  name: "adoptions",
  initialState,
  reducers: {
    addAdoptionPet: (state, action) => {
      state.pets.unshift(action.payload);
    },

    deleteAdoptionPet: (state, action) => {
      state.pets = state.pets.filter((pet) => {
        return pet.id !== action.payload;
      });
    },
  },
});

export const { addAdoptionPet, deleteAdoptionPet } = adoptionSlice.actions;

export default adoptionSlice.reducer;