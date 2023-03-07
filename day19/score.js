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
	const fileStream = fs.createReadStream('input');

	const rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});

	let second = false;
	let str;
	const map = new Map();
	for await (const line of rl) {
		if (!line) {
			second = true;
			continue;
		}

		if (second) {
			str = line;
		} else {
			const parts = line.split(" => ");
			const key = parts[0];
			const value = parts[1];

			if (map.has(key)) {
				const arr = map.get(key);
				arr.push(value);
			} else {
				map.set(key, [value]);
			}
		}
	}

	const set = new Set();

	for (const entry of map) {
		const key = entry[0];
		const replacements = entry[1];

		console.log(key);
		console.log(replacements);

		for (let r = 0; r < replacements.length; r++) {
			const rep = replacements[r];
			let index = str.indexOf(key);
			while (index !== -1) {
				const newStr = str.substring(0, index) + str.substring(index).replace(key, rep);
				set.add(newStr);
				index = str.indexOf(key, index + key.length);
			}
		}
	}

	console.log(set.size);
}

processLineByLine();
