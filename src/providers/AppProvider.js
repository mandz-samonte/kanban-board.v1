import React, { createContext, useContext, useRef } from "react";

const AppContext = createContext(null);

export default function AppProvider({ children }) {
    const taskModalRef = useRef();

    const value = { taskModalRef };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
    return useContext(AppContext);
};
