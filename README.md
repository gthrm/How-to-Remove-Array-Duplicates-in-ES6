# Как удалить дубликаты из массивов в ES6

Вот три способа отфильтровать дубликаты из массива и вернуть только уникальные значения.
Мой любимый метод - это Set, самый короткий и простой 😁

```javascript
const array = [1,2,3,2,5,5];

// 1: "Set"
[...new Set(array)]

// 2 : "Filter"
array.filter((item, index) => {array.indexOf(item) === index})

// 3: "Reduce"
array.reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], [])
```

## Using Set

### Позвольте мне начать с объяснения, что такое Set:

> **Set** - это новый объект данных, представленный в ES6. Set только позволяет хранить только уникальные значения.
> Когда вы передаете массив, он удалит все повторяющиеся значения.

Хорошо, давайте вернемся к нашему коду и разберем, что происходит. Там происходит 2 вещи:
- Сначала мы создаем `new Set`, передавая массив. Поскольку `Set` допускает только уникальные значения, то все дубликаты будут удалены.
- Теперь, когда дубликаты исчезли, мы собираемся преобразовать их обратно в массив с помощью spread operator ...

```javascript
const array = [1,2,3,2,5,5];

const uniqueSet = new Set(array)
// {1, 2, 3, 5}

const backToArray = [...uniqueSet]
// [1, 2, 3, 5]
```

### Преобразовать набор в массив с помощью Array.from

Вы также можете использовать Array.from для преобразования набора в массив:

```javascript
const array = [1,2,3,2,5,5];

Array.from(new Set(array))

// [1, 2, 3, 5]
```

## Using filter

Чтобы понять эту опцию, давайте рассмотрим, что делают эти два метода: `indexOf` и `filter`

### indexOf

Метод `indexOf` возвращает первый найденный индекс указанного элемента из нашего массива.

```javascript
const array = [1,2,3,2,5,5];

array.indexOf(1) // 0
array.indexOf(2) // 1
array.indexOf(3) // 2
array.indexOf(5) // 4

```

### filter

Метод `filter()` создает новый массив элементов, которые соответсвуют переданым нами условиям.
Другими словами, если элемент проходит и возвращает true, он будет включен в фильтруемый массив. И любой элемент, который не соответствует вернет false и не будет в фильтрованном массиве.
Давайте пройдемся по тому, что происходит, когда мы перебираем массив.

```javascript
const array = [1,2,3,2,5,5];
array.filter(
    (item, index) => {
        console.log(
            // a. item
            item,
            // b. index
            index,
            // c. indexOf
            array.indexOf(item),
            // условие
            array.indexOf(item) === index
        )
        return array.indexOf(item) === index
    }
)
// [1, 2, 3, 5]
```

Ниже приведен вывод из файла console.log, показанный выше. Дубликаты - это место, где индекс не совпадает с indexOf. Таким образом, в этих случаях условие будет ложным и не будет включено в наш отфильтрованный массив.

| item | index | indexOf | условие |
|------|-------|---------|---------|
| 1    | 0     | 0       | true    |
| 2    | 1     | 1       | true    |
| 3    | 2     | 2       | true    |
| 2    | 3     | 1       | false   |
| 5    | 4     | 4       | true    |
| 5    | 5     | 4       | false   |

### Можно получить только повторяющиеся значения

Мы также можем использовать метод фильтра для извлечения дублированных значений из массива. Мы можем сделать это, просто настроив наше условие следующим образом:

```javascript
const array = [1,2,3,2,5,5];
array.filter((item, index) => array.indexOf(item) !== index)
// [2, 5]
```

Опять же, если мы пройдемся по коду выше и увидим вывод:

| item | index | indexOf | условие |
|------|-------|---------|---------|
| 1    | 0     | 0       | false   |
| 2    | 1     | 1       | false   |
| 3    | 2     | 2       | false   |
| 2    | 3     | 1       | true    |
| 5    | 4     | 4       | false   |
| 5    | 5     | 4       | true    |

# Using reduce

Метод `Reduce` используется для уменьшения элементов массива и объединения их в окончательный массив на основе переданной вами reducer function.
В этом случае наша функция-редусер проверяет, содержит ли наш последний массив элемент. Если это не так, поместите этот элемент в наш последний массив. В противном случае пропустите этот элемент и верните только наш окончательный массив как есть.
Понять Reduce всегда немного сложнее, поэтому давайте рассмотрим каждый случай и посмотрим:

```javascript
const array = [1,2,3,2,5,5];

array.reduce(
    (unique, item) => {
        console.log(
            // a. item
            item,
            // b. Final Array
            unique,
            // c. условие (item будет запушена если условие вернет false)
            unique.includes(item),
            // d. функция-редуктор
            unique.includes(item) ? unique : [...unique, item]
        )
        return unique.include(item) ? unique : [...unique, item]
    },
    [] //Начальное значение нашего 'аккумулятора' - пустой массив
)
// [1, 2, 3, 5]
```

И вот вывод из console.log:

| item | Final Array (ДО редусера) | Запушить в Final Array? | Final Array (ПОСЛЕ редусера) |
|------|---------------------------|-------------------------|------------------------------|
| 1    | []                        | Да                      | [1]                          |
| 2    | [1]                       | Да                      | [1, 2]                       |
| 3    | [1, 2]                    | Да                      | [1, 2, 3]                    |
| 2    | [1, 2, 3]                 | Нет                     | [1, 2, 3]                    |
| 5    | [1, 2, 3]                 | Да                      | [1, 2, 3, 5]                 |
| 5    | [1, 2, 3, 5]              | Нет                     | [1, 2, 3, 5]                 |

Оригинал статьи [тут](https://medium.com/dailyjs/how-to-remove-array-duplicates-in-es6-5daa8789641c)

>От себя хочу добавить то, что код представленный выше справедлив только для массивов из примитивов,
>в случвае, если в массивах будут объекты, это работать не будет.

## Чтобы удалить дубликаты объектов из массива, можно использовать что-то вроде этого

```javascript

function checkIn(item) {
    newArray.shift();
    const findTrue = newArray.find(itemnewArray => compare(item, itemnewArray) === true);
    if (!findTrue) {
        return true
    }
    return false
}

function compare(obj1, obj2) {
    if (obj1 === obj2) {
        return true;
    }

    if (obj1 === null || obj2 === null) {
        return false;
    }

    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
        return false;
    }

    let keysObj1 = Object.keys(obj1);
    let keysObj2 = Object.keys(obj2);

    if (keysObj1.length !== keysObj2.length) {
        return false;
    }
    return keysObj1.every(
        (key) => compare(obj1[key], obj2[key])
    );
}

const arrayOfObject = [{ name: 'Ok' }, { num: 'lol' }, { num: 'lol' }, { name: 'Ok' }, { name: 'Nok' }, { num: 'lol', non: { lol: 1, ok: true } }]
const newArray = JSON.parse(JSON.stringify(arrayOfObject)) //для проверки

const filterArray = arrayOfObject.filter(item => checkIn(item)) //

console.log(filterArray)
```
