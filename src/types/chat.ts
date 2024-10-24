export default interface Chat {
  cuid: string;
  encryptedTransferKey: string;
  iv: string;
  message: string;
}
