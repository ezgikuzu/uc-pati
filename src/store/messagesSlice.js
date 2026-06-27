import { createSlice } from "@reduxjs/toolkit";

const getSavedMessages = () => {
  try {
    const saved = localStorage.getItem("contact_messages");
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    return [];
  }
};

const saveMessages = (messages) => {
  try {
    localStorage.setItem("contact_messages", JSON.stringify(messages));
  } catch (error) {
    console.error("Failed to save contact messages", error);
  }
};

const initialState = {
  messages: getSavedMessages(),
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    submitMessage: (state, action) => {
      const newMessage = {
        id: Date.now(),
        name: action.payload.name,
        email: action.payload.email,
        phone: action.payload.phone || "",
        subject: action.payload.subject,
        message: action.payload.message,
        date: new Date().toLocaleString("tr-TR"),
        status: "Beklemede", // Initial status
        responses: [], // History of replies
      };
      state.messages.push(newMessage);
      saveMessages(state.messages);
    },
    approveMessage: (state, action) => {
      const message = state.messages.find((msg) => msg.id === action.payload);
      if (message) {
        message.status = "Onaylandı";
        saveMessages(state.messages);
      }
    },
    rejectMessage: (state, action) => {
      const message = state.messages.find((msg) => msg.id === action.payload);
      if (message) {
        message.status = "Reddedildi";
        saveMessages(state.messages);
      }
    },
    respondToMessage: (state, action) => {
      const { id, response, doctorName } = action.payload;
      const message = state.messages.find((msg) => msg.id === id);
      if (message) {
        message.status = "Cevaplandı";
        message.responses.push({
          id: Date.now(),
          doctorName,
          text: response,
          date: new Date().toLocaleString("tr-TR"),
        });
        saveMessages(state.messages);
      }
    },
    deleteMessage: (state, action) => {
      state.messages = state.messages.filter((msg) => msg.id !== action.payload);
      saveMessages(state.messages);
    },
  },
});

export const {
  submitMessage,
  approveMessage,
  rejectMessage,
  respondToMessage,
  deleteMessage,
} = messagesSlice.actions;

export default messagesSlice.reducer;
