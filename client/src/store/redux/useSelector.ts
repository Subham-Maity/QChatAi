// store/redux/useSelector.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import store, { RootState, AppDispatch } from "./store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
