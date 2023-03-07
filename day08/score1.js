import fs from 'fs';
import readline from 'readline';
import jsSdsl from 'js-sdsl';
import dijkstra from 'dijkstrajs';
import hash from 'object-hash';

const { find_path, single_source_shortest_paths } = dijkstra;
const { OrderedMap, PriorityQueue, LinkList, Deque } = jsSdsl;

async function processLineByLine() {
	const fileStream = fs.createReadStream('input');

	const rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});

	let t = 0;

	for await (let line of rl) {
		// the double quotes at the beginning and end
		t += 2;

		const regex = /[\\|"]/g;

		const m = line.match(regex);
		if (m) {
			t += m.length;
		}
	}

	console.log(t);
}

processLineByLine();
