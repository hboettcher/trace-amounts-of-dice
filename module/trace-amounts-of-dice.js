import { registerBossHealthBarControls } from "./bossHealthBarControls.js";
import { registerHooks } from "./hooks.js";

Hooks.once("init", () => {
  game.settings.register("trace-amounts-of-dice", "bossHealthBar", {
    name: "Enable boss health bar",
    hint: "Adds controls to hide/show boss health bar.",
    scope: "world",
    config: true,
    default: true,
    type: Boolean,
  });
  game.settings.register("trace-amounts-of-dice", "highlightInlineRolls", {
    name: "Highlight Inline Rolls",
    hint: "Enable this to highlight crits and crit fails for inline rolls.",
    scope: "world",
    config: true,
    default: true,
    type: Boolean,
  });
  game.settings.register("trace-amounts-of-dice", "addInitiativeInput", {
    name: "Enable initiative editing",
    hint:
      "Allows token owners to edit their initiative value in the combat tracker.",
    scope: "world",
    config: true,
    default: true,
    type: Boolean,
  });
  registerHooks();
});

Hooks.on("getSceneControlButtons", (controls) => {
  registerBossHealthBarControls(controls);
});
