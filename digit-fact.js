/**
 * Вычисляет факториал для цифры
 * @param {type} nStr цифра
 * @returns {Number} значение факториала
 */
var fact = function(nStr) {
    var n = parseInt(nStr);
    if (n < 0 && n > 9) {
        throw 'Out of bounds';
    }
    var factorials = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880];
    return factorials[n];
};

/**
 * Проверка условия отбора для числа
 * @param {type} number число
 * @returns {Boolean} выполнено ли условие
 */
var check = function(number) {
    var summary = 0;
    var digits = number.toString().split('');
    var length = digits.length;
    var digit = null;
    for (var i = 0; i < length; i++) {
        digit = digits[i];
        var adder = fact(digit);
        summary += adder;
    }
    return summary === number;
};
/**
 * Определение максимально допустимого числа, 
 * которое может содержать решение.
 * @returns {Number} предельное значение для поиска решения
 * 
 * @description для определения лимита исследуем поведение двух функций:
 * 
 * сумма факториалов для числа, состоящего из цифр "9" f1(x)=x*(9!)
 * значение числа, состоящего из цифр "9" f2(x)=(10^x)-1
 * 
 * Обе функции f1 и f2 монотонные, неубывающие, 
 * f2 -- экспоненциальная функция, возрастающая значительно быстрее линейной f1.
 * Как только значение f2 превысит f1, дальнейший поиск не имеет смысла.
 * 
 * ОТВЕТЫ: 1, 2, 145, 40585
 */
var getSearchLimit = function() {
    var digitCount = 0;
    var factSum = 1;
    var number = 1;
    do {
        digitCount++;
        factSum = digitCount * fact(9);
        number = Math.pow(10, digitCount) - 1;
    }
    while (factSum >= number);
    return number;
};

var limit = getSearchLimit();
console.log("Search Limit: " + limit);
for (var i = 1; i < limit; i++) {
    if (check(i)) {
        console.log("FOUND: " + i);
    }
}
console.log("Limit (" + limit + ") achieved");