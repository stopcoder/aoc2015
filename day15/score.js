import fs from 'fs';
import readline from 'readline';
import jsSdsl from 'js-sdsl';
import dijkstra from 'dijkstrajs';
import hash from 'object-hash';
import permutation from "./permutation.js";

const { find_path, single_source_shortest_paths } = dijkstra;
const { OrderedMap, PriorityQueue, LinkList, Deque } = jsSdsl;

async function processLineByLine() {
	const fileStream = fs.createReadStream('input');

	const rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});

	const materials = [];

	for await (const line of rl) {
		const parts = line.split(": ")[1].split(", ");
		materials.push(parts.map((p) => {
			return parseInt(p.split(" ")[1]);
		}));
	}

	console.log(materials);

	let max = 0;
	for (let i = 0; i <= 100; i++) {
		for (let j = 0; j <= 100; j++) {
			for (let k = 0; k <= 100; k++) {
				let l = 100 - i - j - k;
				if (l < 0) {
					continue;
				}

				console.log(`${i}, ${j}, ${k}, ${l}`);

				const total = [0,1,2,3].reduce((acc, pIndex) => {
					let value = [i,j,k,l].reduce((acc, amount, i) => {
						return acc + amount * materials[i][pIndex];
					}, 0);

					value = Math.max(0, value);
					
					return acc * value;
				}, 1);

				max = Math.max(max, total);
			}
		}
	}

	console.log(max);
}

processLineByLine();
