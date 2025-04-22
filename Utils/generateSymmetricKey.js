import CryptoJS from "crypto-js";

// Shared Key Generation (Example: XOR-based)
export const deriveSharedKey = (senderKey, receiverKey) => {
  const [key1, key2] = [senderKey, receiverKey].sort();
  // Combine the sorted keys and hash them
  return CryptoJS.SHA256(key1 + key2).toString(CryptoJS.enc.Hex);
};

export const encryptMessage = (message,userKey) => {
  return CryptoJS.AES.encrypt(JSON.stringify(message), userKey)
};
// Decrypt a message
export const decryptMessage = (encryptedMessage,sharedKey) => {

  const bytes = CryptoJS.AES.decrypt(encryptedMessage, sharedKey);
  return bytes.toString(CryptoJS.enc.Utf8);
  
};

