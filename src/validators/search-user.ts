import vine from "@vinejs/vine";

const searchUser = vine.compile(
  vine.object({
    search: vine.string().optional(),
  })
);

export default searchUser;
