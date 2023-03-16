import { createContext } from "react";

const credentialsContext = createContext({
    user: null,
    setUser: () => { }
});

export default credentialsContext;