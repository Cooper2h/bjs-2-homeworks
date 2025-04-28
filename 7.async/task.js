function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function getUserData(userId) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    if (!response.ok) {
      throw new Error('Ошибка запроса');
    }
    return await response.json();
  } catch (error) {
    return null;
  }
}

class AlarmClock {
  constructor() {
    this.alarmCollection = [];
    this.intervalId = null;
  }

  addClock(time, callback) {
    if (!time || typeof callback !== 'function') {
      throw new Error('Отсутствуют обязательные аргументы');
    }

    if (this.alarmCollection.some(clock => clock.time === time)) {
      console.warn('Уже присутствует звонок на это же время');
    }

    this.alarmCollection.push({ time, callback, canCall: true });
  }

  removeClock(time) {
    this.alarmCollection = this.alarmCollection.filter(clock => clock.time !== time);
  }

  getCurrentFormattedTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  start() {
    if (this.intervalId !== null) {
      return;
    }

    this.intervalId = setInterval(() => {
      this.alarmCollection.forEach(clock => {
        if (clock.time === this.getCurrentFormattedTime() && clock.canCall) {
          clock.canCall = false;
          clock.callback();
        }
      });
    }, 1000);
  }

  stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  resetAllCalls() {
    this.alarmCollection.forEach(clock => {
      clock.canCall = true;
    });
  }

  clearAlarms() {
    this.stop();
    this.alarmCollection = [];
  }
}

window.AlarmClock = AlarmClock;
