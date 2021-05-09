Hooks.once("init", () => {
  game.settings.register("trace-amounts-of-dice", "addInitiativeInput", {
    name: "Enable initiative editing",
    hint:
      "Allows token owners to edit their initiative value in the combat tracker.",
    scope: "world",
    config: true,
    default: true,
    type: Boolean,
  });
});

Hooks.on("renderCombatTracker", (app, html, data) => {
  if (game.settings.get("trace-amounts-of-dice", "addInitiativeInput")) {
    const currentCombat = data.combats[data.currentIndex - 1];
    if (currentCombat) {
      html.find(".combatant").each((i, el) => {
        const combatantId = el.dataset.combatantId;
        const combatant = currentCombat.data.combatants.find(
          (c) => c._id === combatantId
        );
        const initiative = combatant.initiative;
        if (initiative !== null && combatant.owner) {
          const initDiv = el.getElementsByClassName("token-initiative")[0];
          initDiv.innerHTML = `<input id="${combatantId}-init-input" type="number" value="${
            initiative ?? ""
          }" style="color:white">`;
          initDiv.addEventListener("change", async (e) => {
            const inputElement = e.target;
            await currentCombat.setInitiative(
              combatantId,
              inputElement.value ?? "-9999"
            );
          });
        }
      });
    }
  }
});
