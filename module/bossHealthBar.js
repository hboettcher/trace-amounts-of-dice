class BossHealthBar extends Application {
  constructor(options) {
    super(options);
    this._baseHealthTotal = 0;
    this._currentHealthTotal = 0;
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
    if (this._baseHealthTotal) {
      return "0%";
    }
    return {
      healthBarPercentage: `${
        100 * (this._currentHealthTotal / this._baseHealthTotal)
      }%`,
    };
  }

  setCurrentHealth(currentHealthTotal) {
    this._currentHealthTotal = Math.max(0, currentHealthTotal);
  }

  setBaseHealth(baseHealthTotal) {
    this._baseHealthTotal = Math.max(0, baseHealthTotal);
  }
}

const bossHealthBar = new BossHealthBar();
export default bossHealthBar;
