"use strict";

// Задача 1
function getArrayParams(...arr) {
	let min = Infinity;
	let max = -Infinity;
	let sum = 0;

	for (let num of arr) {
		if (num < min) min = num;
		if (num > max) max = num;
		sum += num;
	}

	let avg = +(sum / arr.length).toFixed(2);
	return {
		min,
		max,
		avg
	};
}

// Задача 2 — насадки
function summElementsWorker(...arr) {
	if (arr.length === 0) return 0;
	return arr.reduce((sum, el) => sum + el, 0);
}

function differenceMaxMinWorker(...arr) {
	if (arr.length === 0) return 0;
	return Math.max(...arr) - Math.min(...arr);
}

function differenceEvenOddWorker(...arr) {
	let sumEven = 0,
		sumOdd = 0;
	for (let el of arr) {
		if (el % 2 === 0) sumEven += el;
		else sumOdd += el;
	}
	return sumEven - sumOdd;
}

function averageEvenElementsWorker(...arr) {
	let sumEven = 0,
		countEven = 0;
	for (let el of arr) {
		if (el % 2 === 0) {
			sumEven += el;
			countEven++;
		}
	}
	return countEven === 0 ? 0 : sumEven / countEven;
}

// Задача 3 — агрегатор makeWork
function makeWork(arrOfArr, func) {
	let max = -Infinity;

	for (let arr of arrOfArr) {
		const result = func(...arr);
		if (result > max) max = result;
	}

	return max;
}
