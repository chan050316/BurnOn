const notyfError = new Notyf({
  position: {
    x: "left",
    y: "bottom",
  },
  types: [
    {
      type: "error",
      background: "red",
      duration: 2000,
      ripple: false,
    },
  ],
});

const notyfSuccess = new Notyf({
  position: {
    x: "left",
    y: "bottom",
  },
  types: [
    {
      type: "sucess",
      background: "green",
      duration: 2000,
      ripple: false,
    },
  ],
});
