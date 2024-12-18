const userIndex = {
  index: "users",
  body: {
    mapping: {
      properties: {
        user_id: { type: "text" },
        email_addy: { type: "text" },
      },
    },
  },
};

export default userIndex;
