class BossHealthBar extends Application {
  constructor(options) {
    super(options);
    this.bossHealthState = {};
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
  async close() {
    this.bossHealthState.active = false;
    await this.dump();
    super.close();
  }

  _getPercentage() {
    if (
      !(
        this.bossHealthState.baseHealthTotal &&
        this.bossHealthState.currentHealthTotal
      )
    ) {
      return "0%";
    }
    return `${
      100 *
      (this.bossHealthState.currentHealthTotal /
        this.bossHealthState.baseHealthTotal)
    }%`;
  }

  async activate(forceActivate) {
    this.bossHealthState = canvas.scene.getFlag(
      "trace-amounts-of-dice",
      "bossHealthState"
    );
    if (!this.bossHealthState) {
      this.bossHealthState = {};
    }

    if (this.bossHealthState.active || forceActivate) {
      if (!this.bossHealthState.active && forceActivate) {
        this.bossHealthState.active = true;
        await this.dump();
      }
      this.render(true);
    }
  }

  update() {
    this.bossHealthState = canvas.scene.getFlag(
      "trace-amounts-of-dice",
      "bossHealthState"
    );
    if (!this.bossHealthState) {
      this.bossHealthState = {};
    }

    if (this.bossHealthState.active) {
      $(".boss-health-bar-inner").css("width", this._getPercentage());
    } else if (super.rendered && this.bossHealthState.activate === false) {
      super.close();
    }
  }

  async dump() {
    let newBossHealthState = duplicate(this.bossHealthState);

    await canvas.scene.setFlag(
      "trace-amounts-of-dice",
      "bossHealthState",
      null
    );
    await canvas.scene.setFlag(
      "trace-amounts-of-dice",
      "bossHealthState",
      newBossHealthState
    );
  }

  setHealth(currentHealthTotal, baseHealthTotal) {
    this.bossHealthState.currentHealthTotal = Math.max(0, currentHealthTotal);
    this.bossHealthState.baseHealthTotal = Math.max(0, baseHealthTotal);
    this.bossHealthState.active = true;
    this.dump();
  }
}

const bossHealthBar = new BossHealthBar();
export default bossHealthBar;
