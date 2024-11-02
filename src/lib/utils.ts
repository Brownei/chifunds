import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { JSEncrypt } from "jsencrypt";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function arrangeMoneyFigures(figure: number): string {
  return figure.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function encryptData(publicKey: string, dataToBeEncrypted: any) {
  if (publicKey !== "") {
    const stringified = JSON.stringify(dataToBeEncrypted)
    const encrypt = new JSEncrypt()
    encrypt.setPublicKey(publicKey)

    return encrypt.encrypt(stringified) as string
  } else {
    return ""
  }
}

export function decryptData(privateKey: string, dataToBeDecrypted: string) {
  if (privateKey !== "") {
    const decrypt = new JSEncrypt()
    decrypt.setPrivateKey(privateKey)

    const d = decrypt.decrypt(dataToBeDecrypted)
    return d

  } else {
    return "Noting here for you"
  }
}
