import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import appointmentReducer from "./appointmentSlice";
import cartReducer from "./cartSlice";
import favoriteReducer from "./favoriteSlice";
import petReducer from "./petSlice";
import adoptionReducer from "./adoptionSlice";
import labReducer from "./labSlice";
import userReducer from "./userSlice";
import patientReducer from "./patientSlice";
import approvalReducer from "./approvalSlice";
import productReducer from "./productSlice";
import doctorScheduleReducer from "./doctorScheduleSlice";
import blogReducer from "./blogSlice";
import messagesReducer from "./messagesSlice";
import chatbotReducer from "./chatbotSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    appointments: appointmentReducer,
    cart: cartReducer,
    favorites: favoriteReducer,
    pets: petReducer,
    adoptions: adoptionReducer,
    labResults: labReducer,
    users: userReducer,
    patients: patientReducer,
    approvals: approvalReducer,
    products: productReducer,
    doctorSchedule: doctorScheduleReducer,
    blogs: blogReducer,
    messages: messagesReducer,
    chatbot: chatbotReducer,
  },
});