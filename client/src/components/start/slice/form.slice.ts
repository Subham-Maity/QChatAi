import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatState } from "@/components/start/types/form.types";

const initialState: ChatState = {
  title: "",
  description: "",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
  },
});

export const { setTitle, setDescription } = chatSlice.actions;
export default chatSlice.reducer;
