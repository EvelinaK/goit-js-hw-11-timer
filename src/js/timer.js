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
  getTimeLeft(anyDate) {
    this._deltaTime = Date.parse(this._targetDate) - anyDate;
    return {
      deltaTime: this._deltaTime,
      days: Math.floor(this._deltaTime / (1000 * 60 * 60 * 24)),
      hours: Math.floor((this._deltaTime / (1000 * 60 * 60)) % 24),
      mins: Math.floor((this._deltaTime / 1000 / 60) % 60),
      secs: Math.floor((this._deltaTime / 1000) % 60),
    };
  }

  //------------------черновое
  // startClock() {
  //   let q = this;
  //   this._timerID = setTimeout(function Clock() {
  //     q.updateHtml();
  //     if (q._deltaTime < 0) {
  //       clearInterval(q._timerID);
  //     }
  //     q._timerID = setTimeout(Clock, 1000);
  //   }, 1000);
  // }
  //------------------красивее
  // startClock() {
  //   let q = this;
  //   function Clock() {
  //     q.updateHtml();
  //     if (q._deltaTime < 0) {
  //       clearInterval(q._timerID);
  //     }
  //     q._timerID = setTimeout(Clock, 1000);
  //   }

  //   this._timerID = setTimeout(Clock, 1000);
  // }
  //------------------красивее

  startClock() {
    let prev = new Date();
    function Clock() {
      const now = new Date();

      let day = now.getUTCDay();
      let min = now.getMinutes();
      let hours = now.getHours();
      let se = now.getSeconds();

      this._timeLeft = this.getTimeLeft(now);
      if (this._timeLeft.deltaTime < 0) {
        clearInterval(this._timerID);
        return;
      }

      if (day !== prev.getUTCDay()) {
        this.updateAnimate(this._partsSelector.daysSpan);
        prev.setDate(day);
        this.updateHtml(this._partsSelector.daysSpan);
      }

      if (hours !== prev.getHours()) {
        this.updateAnimate(this._partsSelector.hoursSpan);
        prev.setHours(hours);
        this.updateHtml(this._partsSelector.hoursSpan);
      }
      if (min !== prev.getMinutes()) {
        this.updateAnimate(this._partsSelector.minsSpan);
        prev.setMinutes(min);
        this.updateHtml(this._partsSelector.minsSpan);
      }
      if (se !== prev.getSeconds()) {
        this.updateAnimate(this._partsSelector.secsSpan);
        prev.setSeconds(se);
        this.updateHtml(this._partsSelector.secsSpan);
      }

      this._timerID = setTimeout(Clock.bind(this), 1000);
    }

    this._timerID = setTimeout(Clock.bind(this), 1000);
  }

  //------------------не красивое с биндом
  // startClock() {
  //   this._timerID = setTimeout(
  //     function Clock() {
  //       this.updateHtml();
  //       if (this._deltaTime < 0) {
  //         clearInterval(this._timerID);
  //         return;
  //       }
  //       this._timerID = setTimeout(Clock.bind(this), 1000);
  //     }.bind(this),
  //     1000,
  //   );
  // }

  updateHtml(element) {
    element.innerHTML = this._timeLeft.days;
    element.innerHTML = ('0' + this._timeLeft.hours).slice(-2);
    element.innerHTML = ('0' + this._timeLeft.mins).slice(-2);
    element.innerHTML = ('0' + this._timeLeft.secs).slice(-2);
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
