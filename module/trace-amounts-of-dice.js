import addInlineInitiativeInput from "./addInlineInitiativeInput.js";
import { registerBossHealthBarControls } from "./bossHealthBarControls.js";
import { BossHealthLayer } from "./bossHealthLayer.js";
import highlightInlineRolls from "./highlightInlineRolls.js";
import bossHealthBar from "./bossHealthBar.js";

function registerLayer() {
  const layers = mergeObject(Canvas.layers, {
    bossHealthLayer: BossHealthLayer,
  });
  Object.defineProperty(Canvas, "layers", {
    get: function () {
      return layers;
    },
  });
}

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

  registerLayer();
});

Hooks.on("renderCombatTracker", (...args) => {
  addInlineInitiativeInput(...args);
});
Hooks.on("renderChatMessage", (...args) => {
  highlightInlineRolls(...args);
});
Hooks.on("getSceneControlButtons", (controls) => {
  registerBossHealthBarControls(controls);
});

Hooks.on("canvasInit", (canvas) => {
  if (!game.settings.get("trace-amounts-of-dice", "bossHealthBar")) {
    return;
  }
  bossHealthBar.close();
});

Hooks.on("canvasReady", (_) => {
  if (!game.settings.get("trace-amounts-of-dice", "bossHealthBar")) {
    return;
  }
  bossHealthBar.activate();
});
