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

	let nice = 0;
	for await (const line of rl) {
		let c1 = false;
		for (let i = 0; i < line.length - 1; i++) {
			const substr1 = line.substring(i, i+2);
			for (let j = i + 2; j < line.length -1; j++) {
				const substr2 = line.substring(j, j+2);
				if (substr1 === substr2) {
					c1 = true;
					break;
				}
			}
			if (c1) {
				break;
			}
		}

		let c2 = false;
		for (let i = 0; i < line.length - 2; i++) {
			if (line[i] === line[i+2]) {
				c2 = true;
				break;
			}
		}

		if (c1 && c2) {
			nice++;
		}
	}

	console.log(nice);
}

processLineByLine();
