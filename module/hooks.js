import addInlineInitiativeInput from "./addInlineInitiativeInput.js";
import highlightInlineRolls from "./highlightInlineRolls.js";

export const registerHooks = function () {
  Hooks.on("renderCombatTracker", (...args) => {
    addInlineInitiativeInput(...args);
  });
  Hooks.on("renderChatMessage", (...args) => {
    highlightInlineRolls(...args);
  });
};
