"use client";

import React from "react";

/* Core */
import { Provider } from "react-redux";
import store from "@/store/redux/store";

/* Instruments */

export const ReduxProvider = (props: React.PropsWithChildren) => {
    return <Provider store={store}>{props.children}</Provider>;
};

