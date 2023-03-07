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

	const deers = [];
	for await (const line of rl) {
		let deer = {};

		const parts = line.split(" ");

		deer.name = parts[0];
		deer.speed = parseInt(parts[3]);
		deer.fly = parseInt(parts[6]);
		deer.rest = parseInt(parts[parts.length - 2]);
		deers.push(deer);
	}

	let time = 2503;
	const awards = Array(deers.length).fill(0);
	const dists = Array(deers.length).fill(0);

	for (let i = 0; i < time; i++) {
		let maxIndices = [];
		let max = 0;
		for (let j = 0; j < deers.length; j++) {
			const deer = deers[j];
			if (i % (deer.fly + deer.rest) < deer.fly) {
				dists[j] += deer.speed;
			}
			if (dists[j] > max) {
				maxIndices = [j];
				max = dists[j];
			} else if (dists[j] === max) {
				maxIndices.push(j);
			}
		}

		for (let j = 0; j < maxIndices.length; j++) {
			awards[maxIndices[j]]++;
		}
	}

	console.log(Math.max(...dists));
	console.log(Math.max(...awards));
}

processLineByLine();
