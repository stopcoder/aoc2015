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

	const escapes = [
		{
			regex: /\\x[0-9a-f]{2}/g,
			diff: 3
		},
		{
			regex: /\\"/g,
			diff: 1
		},
		{
			regex: /\\\\/g,
			diff: 1
		}
	];

	let t = 0;

	for await (let line of rl) {
		// the double quotes at the beginning and end
		t += 2;

		escapes.forEach((e) => {
			const m = line.match(e.regex);
			if (m) {
				t += (e.diff * m.length);
			}

			line = line.replace(e.regex, "");
		});
	}

	console.log(t);
}

processLineByLine();
