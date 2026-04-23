import CryptoJS from "crypto-js";

let secretKey = "%Aarue*RnT^1#2$3";
const DERIVED_KEY = CryptoJS.SHA256(secretKey);

function base64ToBase64Url(base64) {
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlToBase64(base64Url) {
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) base64 += "=";
  return base64;
}

export const encryptWithCrypto = async (plainText) => {
  try {
    const iv = CryptoJS.lib.WordArray.random(16);

    const encrypted = CryptoJS.AES.encrypt(String(plainText), DERIVED_KEY, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    console.log("encryptedencrypted",encrypted)

    const combined = iv.clone().concat(encrypted.ciphertext);
    console.log("combinedcombined",combined)

    const base64 = CryptoJS.enc.Base64.stringify(combined);
    console.log("base64base64",base64)
    return base64ToBase64Url(base64);
  } catch (e) {
    console.error(e);
    return plainText;
  }
};

export const base64UrlEncode = (base64) => {
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

export const decryptWithCrypto = async (cipherTextBase64Url) => {
  try {
    const base64 = base64UrlToBase64(cipherTextBase64Url);

    const encryptedData = CryptoJS.enc.Base64.parse(base64);

    const iv = CryptoJS.lib.WordArray.create(
      encryptedData.words.slice(0, 4),
      16
    );

    const cipherText = CryptoJS.lib.WordArray.create(
      encryptedData.words.slice(4),
      encryptedData.sigBytes - 16
    );

    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: cipherText },
      DERIVED_KEY,
      {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );

    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (e) {
    console.error(e);
    return cipherTextBase64Url;
  }
};


export const encryptionWithBase64 = async (Id) => {
  return await encryptWithCrypto(`${Id}`); // already Base64URL
};
