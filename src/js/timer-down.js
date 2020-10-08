document.addEventListener('DOMContentLoaded', () => {
  const daysSpan = document.querySelector('[data-value="days"]');
  const hoursSpan = document.querySelector('[data-value="hours"]');
  const minsSpan = document.querySelector('[data-value="mins"]');
  const secsSpan = document.querySelector('[data-value="secs"]');

  // class CountdownTimer {
  //   constructor({ selector, targetDate }) {
  //     this._selector = selector;
  //     this._targetDate = targetDate;
  //   }

  //   getTimeLeft() {
  //     const total = Date.parse(this._targetDate) - Date.parse(new Date());
  //     return {
  //       total: total,
  //       days: Math.floor(total / (1000 * 60 * 60 * 24)),
  //       hours: Math.floor((total / (1000 * 60 * 60)) % 24),
  //       mins: Math.floor((total / 1000 / 60) % 60),
  //       secs: Math.floor((total / 1000) % 60),
  //     };
  //   }
  //   // const downDate = new CountdownTimer({
  //   //   selector: '#timer-1',
  //   //   targetDate: new Date('Jul 17, 2019'),
  //   // });

  //   playClock() {
  //     const clock = document.querySelector(this._selector);
  //     const daysSpan = clock.querySelector('.value[data-value="days"]');
  //     const hoursSpan = clock.querySelector('.value[data-value="hours"]');
  //     const minsSpan = clock.querySelector('.value[data-value="mins"]');
  //     const secsSpan = clock.querySelector('.value[data-value="secs"]');
  //     clock.classList.add('removed');
  //     clock.classList.remove('updated');
  //     const updateClock = () => {
  //       const t = this.getTimeLeft();
  //       if (t.total < 0) {
  //         clearInterval(timeinterval);
  //         return;
  //       }
  //       daysSpan.innerHTML = t.days;
  //       hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
  //       minsSpan.innerHTML = ('0' + t.mins).slice(-2);
  //       secsSpan.innerHTML = ('0' + t.secs).slice(-2);
  //     };

  //     const timeinterval = setInterval(updateClock, 1000);
  //   }
  // }
  // const countTimer = new CountdownTimer({
  //   selector: '#timer-1',
  //   targetDate: new Date('Jul 17, 2021'),
  // });

  // console.log(countTimer.playClock());

  class CountdownTimer {
    constructor({ selector, targetDate }) {
      this.selector = selector;
      this.targetDate = targetDate;
    }

    getSelector() {
      return this.selector;
    }
    getTargetDate() {
      return this.targetDate;
    }
  }

  const downDate = new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('Jul 17, 2019'),
  });

  const targetDate = downDate.getTargetDate();

  // const timer = {
  //   start() {
  //     let startTime = Date.now();
  //     setInterval(() => {
  //       const deltatime = startTime - targetDate;
  //       updateClock(deltatime);
  //       startTime -= 1000;
  //     }, 1000);
  //   },
  // };

  // timer.start();

  const timer = {
    start() {
      let startTime = new Date();

      let dayStart = startTime.getUTCDay();
      let hoursStart = startTime.getUTCHours();
      let minutesStart = startTime.getMinutes();
      let secondsStart = startTime.getSeconds();

      setInterval(() => {
        const deltatime = startTime - targetDate;
        if (deltatime <= 0) {
          // То
          // Выключаем интервал
          clearInterval(timer);
          // Выводим сообщение об окончание
          alert('Время закончилось');
        } else {
          // Иначе
          // Получаем время зависимую от разницы
          let res = new Date(deltatime);

          if (dayStart !== res.getDay()) {
            updateElement(daysSpan);
            dayStart = res.getDay();
          }
          if (minutesStart !== res.getMinutes()) {
            updateElement(minsSpan);
            minutesStart = res.getMinutes();
          }

          if (hoursStart !== res.getHours()) {
            updateElement(hoursSpan);
            hoursStart = res.getHours();
          }

          if (secondsStart !== res.getSeconds()) {
            updateElement(secsSpan);
            secondsStart = res.getSeconds();
          }
          updateClock(res);
          startTime -= 1000;
        }
      }, 1000);
    },
  };

  timer.start();

  const updateElement = element => {
    element.classList.add('removed');
    element.classList.remove('updated');

    setTimeout(() => {
      element.classList.remove('removed');
      element.classList.add('updated');
    }, 300);
  };

  /*
   * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
   * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
   */
  const formatValue = value =>
    value.toString().length === 2 ? value : `0${value}`;

  function updateClock(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));

    // /*
    //  * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
    //  * остатка % и делим его на количество миллисекунд в одном часе
    //  * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
    //  */
    const hours = formatValue(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );

    // /*
    //  * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
    //  * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
    //  */
    const mins = formatValue(
      Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)),
    );

    // /*
    //  * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
    //  * миллисекунд в одной секунде (1000)
    //  */
    const secs = formatValue(Math.floor((time % (1000 * 60)) / 1000));

    daysSpan.innerHTML = `${days} `;
    hoursSpan.innerHTML = `${hours}`;
    minsSpan.innerHTML = `${mins}`;
    secsSpan.innerHTML = `${secs}`;
  }
});
