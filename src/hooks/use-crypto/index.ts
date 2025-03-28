import CryptoJS from "crypto-js";

const SECRET_KEY = "your-secret-key"; // Change this to a secure key

const useCrypto = () => {
  // Encrypt function
  const encrypt = (text: string) => {
    return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
  };

  // Decrypt function
  const decrypt = (ciphertext: string) => {
    try {
      const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error("Decryption failed:", error);
      return null;
    }
  };

  return { encrypt, decrypt };
};

export default useCrypto;
