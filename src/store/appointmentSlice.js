import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointments: [
    {
      id: 1,
      petName: "Boncuk",
      ownerName: "Ezgi Kuzu",
      doctorName: "Veteriner Hekim Mehmet Kaya",
      service: "Genel Muayene",
      date: "2026-06-30",
      time: "10:00",
      status: "Onaylandı",
      note: "Rutin kontrol ve aşı takibi yapılacak.",
    },
    {
      id: 2,
      petName: "Max",
      ownerName: "Ali Yılmaz",
      doctorName: "Veteriner Hekim Ali Yılmaz",
      service: "Biyokimya Kontrolü",
      date: "2026-07-02",
      time: "14:30",
      status: "Beklemede",
      note: "Beslenme düzeni ve kilo takibi değerlendirilecek.",
    },
  ],
};

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    addAppointment: (state, action) => {
      state.appointments.unshift(action.payload);
    },

    cancelAppointment: (state, action) => {
      const appointment = state.appointments.find(
        (item) => item.id === action.payload
      );

      if (appointment) {
        appointment.status = "İptal Edildi";
      }
    },

    deleteAppointment: (state, action) => {
      state.appointments = state.appointments.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  addAppointment,
  cancelAppointment,
  deleteAppointment,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;