const signOut = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("encryptValue");
};

export default signOut;
