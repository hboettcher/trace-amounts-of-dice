class BossHealthBar extends Application {
  constructor(options) {
    super(options);
    this.bossHealthFilter = {};
  }

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "bossHealthBar",
      template: "modules/trace-amounts-of-dice/templates/boss-health-bar.html",
      popOut: false,
    });
  }

  /** @override */
  getData(options) {
    return { healthBarPercentage: this._getPercentage() };
  }

  /** @override */
  close() {
    this.bossHealthFilter.active = false;
    this.dump();
    super.close();
  }

  _getPercentage() {
    if (
      !(
        this.bossHealthFilter.baseHealthTotal &&
        this.bossHealthFilter.currentHealthTotal
      )
    ) {
      return "0%";
    }
    return `${
      100 *
      (this.bossHealthFilter.currentHealthTotal /
        this.bossHealthFilter.baseHealthTotal)
    }%`;
  }

  activate(forceActivate) {
    this.bossHealthFilter = canvas.scene.getFlag(
      "trace-amounts-of-dice",
      "bossHealthFilter"
    );
    if (!this.bossHealthFilter) {
      this.bossHealthFilter = {};
    }

    if (this.bossHealthFilter.active || forceActivate) {
      if (!this.bossHealthFilter.active && forceActivate) {
        this.bossHealthFilter.active = true;
        this.dump();
      }
      this.render(true);
    }
  }

  update() {
    this.bossHealthFilter = canvas.scene.getFlag(
      "trace-amounts-of-dice",
      "bossHealthFilter"
    );
    if (!this.bossHealthFilter) {
      this.bossHealthFilter = {};
    }

    if (this.bossHealthFilter.active) {
      $(".boss-health-bar-inner").css("width", this._getPercentage());
    } else if (super.rendered) {
      super.close();
    }
  }

  dump() {
    canvas.scene
      .setFlag("trace-amounts-of-dice", "bossHealthFilter", null)
      .then((_) => {
        canvas.scene.setFlag(
          "trace-amounts-of-dice",
          "bossHealthFilter",
          this.bossHealthFilter
        );
      });
  }

  setHealth(currentHealthTotal, baseHealthTotal) {
    this.bossHealthFilter.currentHealthTotal = Math.max(0, currentHealthTotal);
    this.bossHealthFilter.baseHealthTotal = Math.max(0, baseHealthTotal);
    this.bossHealthFilter.active = true;
    this.dump();
  }
}

const bossHealthBar = new BossHealthBar();
export default bossHealthBar;
