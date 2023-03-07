import fs from 'fs';
import readline from 'readline';
import jsSdsl from 'js-sdsl';
import dijkstra from 'dijkstrajs';
import hash from 'object-hash';
import permutation from "./permutation.js";

const { find_path, single_source_shortest_paths } = dijkstra;
const { OrderedMap, PriorityQueue, LinkList, Deque } = jsSdsl;

/*
const arr = [1, 2, 3, 4, 5];
const que = new PriorityQueue(
    // initialize the incoming arr, the complexity of doing so is O(n)
    arr,
    // this will create a small root heap, the default is a large root heap
    (x, y) => x - y
);
console.log(que.pop());
*/

/*
const graph = {
	a: {b: 10, c: 100, d: 1},
	b: {c: 10},
	d: {b: 1, e: 1},
	e: {f: 1},
	f: {c: 1},
	g: {b: 1}
};
// All paths from 'a'
const paths = single_source_shortest_paths(graph, 'a');
console.log(paths);
*/

async function processLineByLine() {
	const isPrime = (number) => {
		if (number < 2) {
			return false;
		}

		if (number % 2 === 0) {
			return (number === 2);
		}

		for (let i = 3; i <= Math.sqrt(number); i += 2) {
			if (number % i === 0) {
				return false;
			}
		}

		return true;
	};

	const factors = (number) => {
		const limit = Math.floor(Math.sqrt(number));
		const res = [];
		for (let i = 1; i <= limit; i++) {
			let pos = res.length / 2;
			if (number % i === 0) {
				res.splice(pos, 0, i);
				if (number / i !== i) {
					res.splice(pos === 0 ? 1 : -pos, 0, number / i);
				}
			}
		}

		return res;
	};


	const threshold = 33100000;

	let sum;
	let start = 2;

	do {
		sum = factors(start).reduce((acc, n) => {
			if (n * 50 >= start) {
				return acc + n * 11;
			} else {
				return acc;
			}
		}, 0);
		if (start % 100000 === 0) {
			console.log(start, sum);
		}
		start++;
	} while (sum < threshold)

	console.log(start - 1);
}

processLineByLine();
