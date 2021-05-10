Hooks.once("init", () => {
  game.settings.register("trace-amounts-of-dice", "bossHealthBar", {
    name: "Enable boss health bar",
    hint: "Adds controls to hide/show boss health bar.",
    scope: "world",
    config: true,
    default: true,
    type: Boolean,
  });
});
