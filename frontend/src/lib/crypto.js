import CryptoJS from "crypto-js";

const SECRET_KEY = "your-secret-key"; // In real life, use unique key per chat or user

export const encryptMessage = (message) => {
  return CryptoJS.AES.encrypt(message, SECRET_KEY).toString();
};

export const decryptMessage = (encryptedMessage) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, SECRET_KEY);
    const decryptedMessage = bytes.toString(CryptoJS.enc.Utf8);
    if (!decryptedMessage) {
      throw new Error("Decryption failed, invalid message format.");
    }
    return decryptedMessage;
  } catch (error) {
    console.error("Decryption error:", error);
    return "Error: Unable to decrypt message"; // Return a fallback message on error
  }
};

