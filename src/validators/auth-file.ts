import vine from "@vinejs/vine";

const authFile = vine.compile(
  vine.object({
    cuid: vine.string(),
    privateKey: vine.string(),
  })
);

export default authFile;
