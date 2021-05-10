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
      template: "templates/hud/hotbar.html",
      popOut: false,
    });
  }

  /** @override */
  getData(options) {
    return {
      baseHealthTotal: this._baseHealthTotal,
      currentHealthTotal: this._currentHealthTotal,
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
