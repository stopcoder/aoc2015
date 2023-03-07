import fs from 'fs';
import readline from 'readline';
import jsSdsl from 'js-sdsl';
import dijkstra from 'dijkstrajs';
import hash from 'object-hash';
import permutation from "./permutation.js";

const { find_path, single_source_shortest_paths } = dijkstra;
const { OrderedMap, PriorityQueue, LinkList, Deque } = jsSdsl;

async function processLineByLine() {
	const row = 2947;
	const column = 3029;

	const total = row + column;
	const startRow = total - 1;

	let count = 1;
	for (let i = 0; i < startRow; i++) {
		count += i;
	}

	count += (startRow - row);

	let code = 20151125;
	const mul = 252533;
	const div = 33554393;

	for (let i = 1; i < count; i++) {
		code = (code * mul) % div;
	}

	console.log(code);
}

processLineByLine();
