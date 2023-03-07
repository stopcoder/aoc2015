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

	const expected = {
		children: 3,
		cats: 7,
		samoyeds: 2,
		pomeranians: 3,
		akitas: 0,
		vizslas: 0,
		goldfish: 5,
		trees: 3,
		cars: 2,
		perfumes: 1
	};

	const sues = [];

	for await (const line of rl) {
		const parts = line.split(": ").slice(1).join(": ").split(", ");
		const sue = parts.reduce((acc, s) => {
			const parts = s.split(": ");
			acc[parts[0]] = parseInt(parts[1]);
			return acc;
		}, {});
		sues.push(sue);
	}

	sues.forEach((sue, i) => {
		const match = Object.keys(sue).every((key) => {
			if (key === "cats" || key === "trees") {
				return sue[key] > expected[key];
			} else if (key === "pomeranians" || key === "goldfish") {
				return sue[key] < expected[key];
			} else {
				return sue[key] === expected[key];
			}
		});

		if (match) {
			console.log(i+1);
		}
	});
}

processLineByLine();
