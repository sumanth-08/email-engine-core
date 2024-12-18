const userIndex = {
  index: "users",
  body: {
    mapping: {
      properties: {
        user_id: { type: "keyword" },
        email_aady: { type: "keyword" },
      },
    },
  },
};

export default userIndex;
