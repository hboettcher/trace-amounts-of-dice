import addInlineInitiativeInput from "./addInlineInitiativeInput";
import highlightInlineRolls from "./highlightInlineRolls";

export const registerHooks = function () {
  Hooks.on("renderCombatTracker", (...args) => {
    addInlineInitiativeInput(...args);
  });
  Hooks.on("renderChatMessage", (...args) => {
    highlightInlineRolls(...args);
  });
};
