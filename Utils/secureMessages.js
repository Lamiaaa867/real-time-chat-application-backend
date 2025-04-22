import CryptoJS from "crypto-js";


// Encrypt a message
export const encryptMessage = (message,userKey) => {
    return CryptoJS.AES.encrypt(message, userKey).toString();
  };
  
  // Decrypt a message
  export const decryptMessage = (encryptedMessage,userKey) => {
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, userKey).toString(CryptoJS.enc.Utf8);
    return bytes

  };