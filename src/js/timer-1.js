class CountdownTimer {
  constructor({ selector, targetDate }) {
    this._selector = selector;
    this._targetDate = targetDate;
    this._clock = document.querySelector(this._selector);
    this._partsSelector = {
      daysSpan: this._clock.querySelector('[data-value="days"]'),
      hoursSpan: this._clock.querySelector('[data-value="hours"]'),
      minsSpan: this._clock.querySelector('[data-value="mins"]'),
      secsSpan: this._clock.querySelector('[data-value="secs"]'),
    };
    this._timerID = null;
    this._timeLeft = {};
  }

  getSelector() {
    return this.selector;
  }
  getTargetDate() {
    return this.targetDate;
  }
  getTimeLeft(time) {
    return {
      deltaTime: time,
      days: Math.floor(time / (1000 * 60 * 60 * 24)),
      hours: Math.floor((time / (1000 * 60 * 60)) % 24),
      mins: Math.floor((time / 1000 / 60) % 60),
      secs: Math.floor((time / 1000) % 60),
    };
  }

  startClock() {
    let prev = new Date();
    let leftTime = this.getTimeLeft(Date.parse(this._targetDate) - prev);
    this._partsSelector.daysSpan.innerHTML = leftTime.days;
    this._partsSelector.hoursSpan.innerHTML = leftTime.hours;
    this._partsSelector.minsSpan.innerHTML = leftTime.mins;
    this._partsSelector.secsSpan.innerHTML = leftTime.secs;

    this._timerID = setInterval(() => {
      const now = new Date();
      leftTime = this.getTimeLeft(Date.parse(this._targetDate) - now);

      let day = now.getDate();
      let min = now.getMinutes();
      let hours = now.getHours();
      let se = now.getSeconds();

      if (leftTime.deltaTime < 0) {
        clearInterval(this._timerID);
        return;
      }

      if (day !== prev.getDate()) {
        this.updateAnimate(this._partsSelector.daysSpan);
        prev.setDate(day);
        this._partsSelector.daysSpan.innerHTML = leftTime.days;
      }

      if (hours !== prev.getHours()) {
        this.updateAnimate(this._partsSelector.hoursSpan);
        prev.setHours(hours);
        this._partsSelector.hoursSpan.innerHTML = ('0' + leftTime.hours).slice(
          -2,
        );
      }

      if (min !== prev.getMinutes()) {
        this.updateAnimate(this._partsSelector.minsSpan);
        prev.setMinutes(min);
        this._partsSelector.minsSpan.innerHTML = ('0' + leftTime.mins).slice(
          -2,
        );
      }

      if (se !== prev.getSeconds()) {
        this.updateAnimate(this._partsSelector.secsSpan);
        prev.setSeconds(se);
        this._partsSelector.secsSpan.innerHTML = ('0' + leftTime.secs).slice(
          -2,
        );
      }
    }, 1000);
  }

  updateAnimate(element) {
    element.classList.add('removed');
    element.classList.remove('updated');

    setTimeout(() => {
      element.classList.remove('removed');
      element.classList.add('updated');
    }, 300);
  }
}

const downDate = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2022'),
});
downDate.startClock();
