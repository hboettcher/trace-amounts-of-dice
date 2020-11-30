Hooks.on("renderChatMessage", (message, html) => {
  if (html.length === 1) {
    const rolls = html[0].getElementsByClassName("inline-result");
    for (let i = 0; i < rolls.length; i++) {
      const rollData = JSON.parse(
        decodeURIComponent(rolls[i].getAttribute("data-roll"))
      );
      rollData.terms.forEach(term => {
        if (term.class === "Die") {
          let result = term.results.filter(res => res.active)[0].result;
          if (result === term.faces) {
            rolls[i].classList.add("max");
          } else if (result === 1) {
            rolls[i].classList.add("min");
          }
        }
      });
    }
  }
});
