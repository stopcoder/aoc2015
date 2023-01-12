import fs from 'fs';
import readline from 'readline';
import jsSdsl from 'js-sdsl';
import dijkstra from 'dijkstrajs';
import hash from 'object-hash';

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

	let steps;
	for await (const line of rl) {
		steps = line.split("");
	}

	let dirs = {
		"^": [-1, 0],
		"v": [1, 0],
		"<": [0, -1],
		">": [0, 1]
	};

	const visited = new Set();
	visited.add([0, 0].join(" "));

	const santas = [[0, 0], [0, 0]];

	steps.forEach((s, index) => {
		const i = index % 2;
		const santa = santas[i];
		santa[0] += dirs[s][0];
		santa[1] += dirs[s][1];
		visited.add(santa.join(" "));
	});

	console.log(visited.size);
}

processLineByLine();
