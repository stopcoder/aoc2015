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

	const loc = [];
	for await (const line of rl) {
		let parts = line.split(", ");
		const result = [];

		let command;
		if (parts.length === 2) {
			command = parts[0];
			result.push(parseInt(parts[1]));
		} else {
			command = line;
		}

		parts = command.split(" ");
		if (parts[0] === "jmp") {
			parts[1] = parseInt(parts[1]);
		}
		result.unshift(parts[1]);
		result.unshift(parts[0]);
		loc.push(result);
	}

	let ln = 0;
	let o = {
		a: 0,
		b: 0
	};

	while (ln < loc.length) {
		console.log(ln);
		const code = loc[ln];

		switch (code[0]) {
			case "inc":
				o[code[1]]++;
				ln++;
				break;
			case "tpl":
				o[code[1]] *= 3;
				ln++;
				break;
			case "hlf":
				o[code[1]] /= 2;
				ln++;
				break;
			case "jmp":
				ln += code[1];
				break;
			case "jio":
				if (o[code[1]] === 1) {
					ln += code[2];
				} else {
					ln++;
				}
				break;
			case "jie":
				if (o[code[1]] % 2 === 0) {
					ln += code[2];
				} else {
					ln++;
				}
				break;
		}
	}

	console.log(o.b);
}

processLineByLine();
