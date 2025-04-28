//Задача № 1
function cachingDecoratorNew(func) {
  let cache = [];

  function wrapper(...args) {
    const hash = md5(args); // создаём хеш от аргументов

    const objectInCache = cache.find(item => item.hash === hash);

    if (objectInCache) {
      console.log("Из кеша: " + objectInCache.value);
      return "Из кеша: " + objectInCache.value;
    }

    const result = func(...args);
    cache.push({ hash: hash, value: result });

    if (cache.length > 5) {
      cache.shift(); // удаляем самый старый элемент
    }

    console.log("Вычисляем: " + result);
    return "Вычисляем: " + result;
  }

  return wrapper;
  
}

//Задача № 2
function debounceDecoratorNew(func, delay) {
  let timeoutId;
  function wrapper(...args) {
    wrapper.allCount++;

    const callNow = !timeoutId;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (callNow) {
      func(...args);
      wrapper.count++;
    } else {
      timeoutId = setTimeout(() => {
        func(...args);
        wrapper.count++;
        timeoutId = null; // сбрасываем идентификатор таймера
      }, delay);
    }
  }

  wrapper.count = 0;     // фактические вызовы функции
  wrapper.allCount = 0;  // все вызовы обертки

  return wrapper;
}
