import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [
    {
      sender: "bot",
      text: "Merhaba, ben Üç Pati Vet AI Asistanı. Randevu, sağlık karnesi, laboratuvar sonucu, hayvan pasaportu, pet shop, sahiplendirme veya evcil hayvan belirtileri hakkında yardımcı olabilirim.",
    },
  ],
};

const chatbotSlice = createSlice({
  name: "chatbot",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push({
        sender: action.payload.sender,
        text: action.payload.text,
      });
    },
    clearChat: (state) => {
      state.messages = [];
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { addMessage, clearChat, setMessages } = chatbotSlice.actions;

export default chatbotSlice.reducer;
