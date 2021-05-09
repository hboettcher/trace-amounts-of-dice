import { Test } from "./bossHealthBar";

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

Hooks.on("getSceneControlButtons", (controls) => {
  if (game.settings.get("trace-amounts-of-dice", "bossHealthBar")) {
    controls.push({
      name: "bossHealth",
      title: "Boss Health Bar Controls",
      icon: "fas fa-skull-crossbones",
      layer: "FXMasterLayer",
      visible: game.user.isGM,
      tools: [
        {
          name: "showBossHealth",
          title: "Show Boss Health Bar",
          icon: "fas fa-eye",
          onClick: () => {},
          visible: game.user.isGM,
          button: true,
        },
        {
          name: "hideBossHealth",
          title: "Hide Boss Health Bar",
          icon: "fas fa-trash",
          onClick: () => {},
          visible: game.user.isGM,
          button: true,
        },
      ],
    });
  }
});

Hooks.on("renderCombatTracker", (app, html, data) => {
  if (game.settings.get("trace-amounts-of-dice", "bossHealthBar")) {
    const currentCombat = data.combats[data.currentIndex - 1];
    if (
      currentCombat &&
      currentCombat.data.active &&
      currentCombat.data.round > 0
    ) {
      let baseHealth = 0;
      let currentHealth = 0;
      for (const combatant of currentCombat.data.combatants) {
        const actor = combatant.actor;
        if (actor.data.type === "npc") {
          baseHealth += Number(actor.data.data.attributes.hp.base);
          currentHealth += Math.max(0, actor.data.data.attributes.hp.value);
        }
      }
      console.log({ baseHealth, currentHealth, Test });
    }
  }
});
