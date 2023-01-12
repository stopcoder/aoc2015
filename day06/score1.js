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

	const ins = [];
	for await (const line of rl) {
		const instruction = [];
		if (line.includes("toggle")) {
			line.substring(7).split(" through ").forEach((p) => {
				p.split(",").forEach((c) => {
					instruction.push(parseInt(c));
				});
			});

			instruction.push(2);
		} else {
			const parts = line.split(" ");

			parts[2].split(",").forEach((c) => {
				instruction.push(parseInt(c));
			});

			parts[4].split(",").forEach((c) => {
				instruction.push(parseInt(c));
			});

			if (parts[1] === "on") {
				instruction.push(1)
			} else {
				instruction.push(-1)
			}
		}
		ins.push(instruction);
	}

	let map = []
	for (let i = 0; i < 1000; i++) {
		const row = Array(1000).fill(0);
		map.push(row);
	}

	for (let i = 0; i < ins.length; i++) {
		const b = ins[i];
		for (let r = b[0]; r <= b[2]; r++) {
			for (let c = b[1]; c <= b[3]; c++) {
				map[r][c] = Math.max(0, map[r][c] + b[4]);
			}
		}
	}

	let count = 0;
	for (let i = 0; i < 1000; i++) {
		for (let j = 0; j < 1000; j++) {
			count += map[i][j];
		}
	}

	console.log(count);
}

processLineByLine();
