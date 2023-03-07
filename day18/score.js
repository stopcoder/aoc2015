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

	let map = [];

	const dirs = [
		[-1, -1],
		[-1, 0],
		[-1, 1],
		[0, -1],
		[0, 1],
		[1, -1],
		[1, 0],
		[1, 1]
	];

	for await (const line of rl) {
		const parts = line.split("");
		map.push(parts);
	}

	console.log(map);

	let nmap = [];

	for(let k = 0; k < 100; k++) {
		for (let i = 0; i < map.length; i++) {
			nmap[i] = [];
			for (let j = 0; j < map[i].length; j++) {
				const lights = dirs.reduce((acc, l) => {
					const x = i + l[0];
					const y = j + l[1];

					if (x >= 0 && x < map.length && y >= 0 && y < map[x].length) {
						if (map[x][y] === "#") {
							return acc + 1;
						}
					}

					return acc;
				}, 0);

				if (map[i][j] === "#") {
					if (lights === 2 || lights === 3) {
						nmap[i][j] = "#";
					} else {
						nmap[i][j] = ".";
					}
				} else {
					if (lights === 3) {
						nmap[i][j] = "#";
					} else {
						nmap[i][j] = ".";
					}
				}
			}
		}
		map = nmap;
		nmap = [];
	}

	console.log(map);

	let count = 0;
	for (let i = 0; i < map.length; i++) {
		for (let j = 0; j < map[i].length; j++) {
			if (map[i][j] === "#") {
				count++;
			}
		}
	}

	console.log(count);
}

processLineByLine();
