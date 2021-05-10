import bossHealthBar from "./bossHealthBar.js";

export function registerBossHealthBarControls(controls) {
  if (game.settings.get("trace-amounts-of-dice", "bossHealthBar")) {
    controls.push({
      name: "bossHealth",
      title: "Boss Health Bar Controls",
      icon: "fas fa-skull-crossbones",
      layer: "BossHealthLayer",
      visible: game.user.isGM,
      tools: [
        {
          name: "showBossHealth",
          title: "Show Boss Health Bar",
          icon: "fas fa-eye",
          onClick: () => {
            bossHealthBar.render(true);
          },
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
}

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
      new bossHealthBar.setBaseHealth(baseHealth);
    }
  }
});
