const array = [1, 2, 3, 2, 5, 5];

const uniqueSet = new Set(array)
const backToArray = [...uniqueSet]

console.log(uniqueSet, backToArray);

console.log(Array.from(new Set(array)))

const filterMethod = array.filter(
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

console.log(filterMethod);

const filterMethodInverse = array.filter((item, index) => array.indexOf(item) !== index)
console.log(filterMethodInverse);

const reduceMethod = array.reduce(
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
        return unique.includes(item) ? unique : [...unique, item]
    },
    [] //Начальное значение нашего 'аккумулятора' - пустой массив
)

console.log(reduceMethod);

// Объекты

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

    // for (let key of keysObj1) {
    //     if (!compare(obj1[key], obj2[key])) {
    //         return false;
    //     }
    // }
    // return true;

    return keysObj1.every(
        (key) => compare(obj1[key], obj2[key])
    );
}

const arrayOfObject = [{ name: 'Ok' }, { num: 'lol' }, { num: 'lol' }, { name: 'Ok' }, { name: 'Nok' }, { num: 'lol', non: { lol: 1, ok: true } }]
const newArray = JSON.parse(JSON.stringify(arrayOfObject))
const filterArray = arrayOfObject.filter(item => checkIn(item)) //
console.log('====================================')
console.log(filterArray)
console.log('====================================')

