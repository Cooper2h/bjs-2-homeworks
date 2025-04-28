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
  let timeoutId = null;
  let isFirstCall = true;

  function wrapper(...args) {
    wrapper.allCount++;

    if (isFirstCall) {
      func(...args);
      wrapper.count++;
      isFirstCall = false;
      return;
    }

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
      wrapper.count++;
    }, delay);
  }

  wrapper.count = 0;      // количество реальных запусков функции
  wrapper.allCount = 0;   // количество всех вызовов обёртки

  return wrapper;
}
