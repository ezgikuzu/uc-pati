import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPatients = createAsyncThunk(
  "patients/fetchPatients",
  async () => {
    const response = await fetch("/db.json");

    if (!response.ok) {
      throw new Error("Hasta bilgileri alınamadı.");
    }

    const data = await response.json();
    return data.patients;
  }
);

const initialState = {
  patients: [],
  status: "idle",
  error: null,
};

const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    addPatient: (state, action) => {
      state.patients.unshift({
        id: Date.now(),
        riskStatus: "Düşük",
        vaccineStatus: "Kontrol Bekliyor",
        lastControl: "-",
        nextControl: "-",
        treatmentNote: "Yeni evcil hayvan kaydı oluşturuldu.",
        doctor: "Henüz atanmadı",
        ...action.payload,
      });
    },

    deletePatient: (state, action) => {
      state.patients = state.patients.filter((patient) => {
        return patient.id !== action.payload;
      });
    },

    updatePatientRisk: (state, action) => {
      const patient = state.patients.find((item) => {
        return item.id === action.payload.id;
      });

      if (patient) {
        patient.riskStatus = action.payload.riskStatus;
      }
    },

    updatePatientNote: (state, action) => {
      const patient = state.patients.find((item) => {
        return item.id === action.payload.id;
      });

      if (patient) {
        patient.treatmentNote = action.payload.treatmentNote;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.status = "loading";
      })

      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.patients = action.payload;
      })

      .addCase(fetchPatients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  addPatient,
  deletePatient,
  updatePatientRisk,
  updatePatientNote,
} = patientSlice.actions;

export default patientSlice.reducer;