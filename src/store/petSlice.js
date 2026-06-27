import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pets: [
    {
      id: 1,
      name: "Boncuk",
      type: "Kedi",
      breed: "British Shorthair",
      age: "3 yaşında",
      gender: "Dişi",
      ownerName: "Ezgi Kuzu",
    },
    {
      id: 2,
      name: "Pamuk",
      type: "Hamster",
      breed: "Suriye Hamsterı",
      age: "8 aylık",
      gender: "Dişi",
      ownerName: "Ezgi Kuzu",
    },
  ],
};

const petSlice = createSlice({
  name: "pets",
  initialState,
  reducers: {
    addPet: (state, action) => {
      state.pets.unshift(action.payload);
    },

    deletePet: (state, action) => {
      state.pets = state.pets.filter((pet) => {
        return pet.id !== action.payload;
      });
    },
  },
});

export const { addPet, deletePet } = petSlice.actions;

export default petSlice.reducer;