import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchLabResults = createAsyncThunk(
  "labResults/fetchLabResults",
  async () => {
    const response = await fetch("/db.json");

    if (!response.ok) {
      throw new Error("Laboratuvar sonuçları alınamadı.");
    }

    const data = await response.json();
    return data.labResults;
  }
);

const initialState = {
  results: [],
  pendingResults: [],
  status: "idle",
  error: null,
};

const labSlice = createSlice({
  name: "labResults",
  initialState,
  reducers: {
    addPendingLabResult: (state, action) => {
      state.pendingResults.unshift({
        id: Date.now(),
        status: "Beklemede",
        resultStatus: "Bekliyor",
        createdAt: new Date().toISOString().slice(0, 10),
        ...action.payload,
      });
    },

    approveLabResult: (state, action) => {
      const result = state.pendingResults.find((item) => {
        return item.id === action.payload;
      });

      if (result) {
        result.status = "Onaylandı";

        const alreadyAdded = state.results.some((item) => {
          return item.id === result.id;
        });

        if (!alreadyAdded) {
          state.results.unshift({
            id: result.id,
            patientId: Number(result.patientId),
            petName: result.petName,
            petType: result.petType,
            ownerName: result.ownerName,
            testType: result.testType,
            date: result.date,
            doctor: result.doctor,
            status: "Tamamlandı",
            resultStatus: result.resultStatus || "Normal",
            summary: result.summary,
            doctorNote: result.doctorNote,
            values: result.values,
          });
        }
      }
    },

    rejectLabResult: (state, action) => {
      const result = state.pendingResults.find((item) => {
        return item.id === action.payload;
      });

      if (result) {
        result.status = "Reddedildi";
      }
    },

    deletePendingLabResult: (state, action) => {
      state.pendingResults = state.pendingResults.filter((item) => {
        return item.id !== action.payload;
      });
    },

    deleteLabResult: (state, action) => {
      state.results = state.results.filter((item) => {
        return item.id !== action.payload;
      });
    },

    updateLabResultStatus: (state, action) => {
      const { id, resultStatus } = action.payload;

      const result = state.results.find((item) => {
        return item.id === id;
      });

      if (result) {
        result.resultStatus = resultStatus;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchLabResults.pending, (state) => {
        state.status = "loading";
      })

      .addCase(fetchLabResults.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results = action.payload;
      })

      .addCase(fetchLabResults.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  addPendingLabResult,
  approveLabResult,
  rejectLabResult,
  deletePendingLabResult,
  deleteLabResult,
  updateLabResultStatus,
} = labSlice.actions;

export default labSlice.reducer;