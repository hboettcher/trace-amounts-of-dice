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

  _getPercentage() {
    if (!this._baseHealthTotal) {
      return "0%";
    }
    return `${100 * (this._currentHealthTotal / this._baseHealthTotal)}%`;
  }

  /** @override */
  getData(options) {
    return { healthBarPercentage: this._getPercentage() };
  }

  setHealth(currentHealthTotal, baseHealthTotal) {
    this._currentHealthTotal = Math.max(0, currentHealthTotal);
    this._baseHealthTotal = Math.max(0, baseHealthTotal);
    $(".boss-health-bar-inner").css("width", this._getPercentage());
  }
}

const bossHealthBar = new BossHealthBar();
export default bossHealthBar;
