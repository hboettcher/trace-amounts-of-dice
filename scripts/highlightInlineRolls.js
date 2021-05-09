Hooks.on("init", () => {
  game.settings.register("trace-amounts-of-dice", "highlightInlineRolls", {
    name: "Highlight Inline Rolls",
    hint: "Enable this to highlight crits and crit fails for inline rolls.",
    scope: "world",
    config: true,
    default: true,
    type: Boolean,
  });
});

Hooks.on("renderChatMessage", (message, html) => {
  if (
    game.settings.get("trace-amounts-of-dice", "highlightInlineRolls") &&
    html.length === 1
  ) {
    const rolls = html[0].getElementsByClassName("inline-result");
    for (let i = 0; i < rolls.length; i++) {
      const rollData = JSON.parse(
        decodeURIComponent(rolls[i].getAttribute("data-roll"))
      );
      rollData.terms.forEach((term) => {
        if (term.class === "Die") {
          let results = term.results.filter((res) => res.active);
          if (results.length === 1) {
            if (results[0].result === term.faces) {
              rolls[i].classList.add("max");
            } else if (results[0].result === 1) {
              rolls[i].classList.add("min");
            }
          }
        }
      });
    }
  }
});
