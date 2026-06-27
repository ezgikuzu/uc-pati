import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  schedules: [
    {
      doctorName: "Veteriner Hekim Mehmet Kaya",
      availableTimes: ["09:00", "10:00", "11:00"],
    },
    {
      doctorName: "Veteriner Hekim Ali Yılmaz",
      availableTimes: ["13:30", "14:30", "15:30"],
    },
    {
      doctorName: "Veteriner Hekim Zeynep Arslan",
      availableTimes: ["10:00", "14:30", "16:30"],
    },
  ],
};

const doctorScheduleSlice = createSlice({
  name: "doctorSchedule",
  initialState,
  reducers: {
    updateDoctorSchedule: (state, action) => {
      const { doctorName, availableTimes } = action.payload;

      const doctor = state.schedules.find((item) => {
        return item.doctorName === doctorName;
      });

      if (doctor) {
        doctor.availableTimes = availableTimes;
      } else {
        state.schedules.push({
          doctorName,
          availableTimes,
        });
      }
    },
  },
});

export const { updateDoctorSchedule } = doctorScheduleSlice.actions;

export default doctorScheduleSlice.reducer;