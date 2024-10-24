import vine from "@vinejs/vine";

const chat = vine.compile(
  vine.object({
    encryptedTransferKey: vine.string(),
    iv: vine.string(),
    message: vine.string(),
  })
);

export default chat;
