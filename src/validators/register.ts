import vine from "@vinejs/vine";

const register = vine.compile(
  vine.object({
    displayName: vine.string(),
  })
);

export default register;
