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
