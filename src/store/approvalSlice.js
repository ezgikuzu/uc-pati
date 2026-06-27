import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  requests: [
    {
      id: 1,
      source: "Hekim",
      type: "Laboratuvar Sonucu",
      title: "Boncuk için kan tahlili sonucu eklendi",
      description:
        "Veteriner Hekim Ali Yılmaz tarafından Boncuk için yeni kan tahlili sonucu sisteme eklendi.",
      status: "Beklemede",
      createdBy: "Veteriner Hekim Ali Yılmaz",
      date: "2026-06-25",
    },
    {
      id: 2,
      source: "Müşteri",
      type: "Randevu Talebi",
      title: "Ezgi Kuzu randevu talebi oluşturdu",
      description:
        "Boncuk için Genel Muayene hizmetine yeni randevu talebi oluşturuldu.",
      status: "Beklemede",
      createdBy: "Ezgi Kuzu",
      date: "2026-06-25",
    },
    {
      id: 3,
      source: "Hekim",
      type: "Ürün Ekleme",
      title: "Hekim yeni ürün ekledi",
      description:
        "Veteriner Hekim Ali Yılmaz tarafından pet shop için yeni bakım ürünü eklendi. Admin onayı bekliyor.",
      status: "Beklemede",
      createdBy: "Veteriner Hekim Ali Yılmaz",
      date: "2026-06-25",
    },
    {
      id: 4,
      source: "Müşteri",
      type: "Sahiplendirme İlanı",
      title: "Yeni sahiplendirme ilanı oluşturuldu",
      description:
        "Müşteri tarafından sahiplendirme ilanı oluşturuldu. Yayına alınması için admin onayı gerekiyor.",
      status: "Beklemede",
      createdBy: "Beyza Mensur",
      date: "2026-06-25",
    },
  ],
};

const approvalSlice = createSlice({
  name: "approvals",
  initialState,
  reducers: {
    addApprovalRequest: (state, action) => {
      state.requests.unshift({
        id: Date.now(),
        status: "Beklemede",
        date: new Date().toISOString().slice(0, 10),
        ...action.payload,
      });
    },

    approveRequest: (state, action) => {
      const request = state.requests.find((item) => {
        return item.id === action.payload;
      });

      if (request) {
        request.status = "Onaylandı";
      }
    },

    rejectRequest: (state, action) => {
      const request = state.requests.find((item) => {
        return item.id === action.payload;
      });

      if (request) {
        request.status = "Reddedildi";
      }
    },

    deleteRequest: (state, action) => {
      state.requests = state.requests.filter((item) => {
        return item.id !== action.payload;
      });
    },
  },
});

export const {
  addApprovalRequest,
  approveRequest,
  rejectRequest,
  deleteRequest,
} = approvalSlice.actions;

export default approvalSlice.reducer;