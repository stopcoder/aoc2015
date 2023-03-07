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

	const pers = [];
	const map = [];
	for await (let line of rl) {
		line = line.substring(0, line.length - 1);
		const parts = line.split(" ");
		const p1 = parts[0];
		const p2 = parts[parts.length - 1];
		let value = parseInt(parts[3]);
		if (parts[2] === "lose") {
			value *= -1;
		}

		let i1 = pers.indexOf(p1);
		if (i1 === -1) {
			i1 = pers.length;
			pers.push(p1);
		}

		let i2 = pers.indexOf(p2);
		if (i2 === -1) {
			i2 = pers.length;
			pers.push(p2);
		}

		map[i1] = map[i1] || [];
		map[i1][i2] = value;
	}

	const perms = permutation(pers.length);

	const result = perms.reduce((acc, perm) => {
		let sum = 0;
		for (let i = 0; i < perm.length; i++) {
			const cur = perm[i];
			const next = perm[(i+1) % perm.length];
			sum += (map[cur][next] + map[next][cur]);
		}

		return Math.max(acc, sum);
	}, 0);

	console.log(result);
}

processLineByLine();
