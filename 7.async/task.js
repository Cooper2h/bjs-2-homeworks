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

    addClock(time, callback, id) {
        if (id === undefined) {
            throw new Error('Параметр id не передан');
        }

        if (this.alarmCollection.some(clock => clock.id === id)) {
            console.error('Звонок с таким id уже существует');
            return;
        }

        this.alarmCollection.push({ id, time, callback });
    }

    removeClock(id) {
        this.alarmCollection = this.alarmCollection.filter(clock => clock.id !== id);
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
            const currentTime = this.getCurrentFormattedTime();
            this.alarmCollection.forEach(clock => {
                if (clock.time === currentTime) {
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

    printAlarms() {
        this.alarmCollection.forEach(clock => {
            console.log(`Будильник №${clock.id} заведен на ${clock.time}`);
        });
    }

    clearAlarms() {
        this.stop();
        this.alarmCollection = [];
    }
}

// чтобы тесты видели класс
window.AlarmClock = AlarmClock;
