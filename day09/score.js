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

	const cities = [];
	const map = [];

	for await (const line of rl) {
		let parts = line.split(" to ");
		const c1 = parts[0];
		parts = parts[1].split(" = ");
		const c2 = parts[0];
		const dis = parseInt(parts[1]);

		let i1 = cities.indexOf(c1);
		if (i1 === -1) {
			i1 = cities.length;
			cities.push(c1);
		}

		let i2 = cities.indexOf(c2);
		if (i2 === -1) {
			i2 = cities.length;
			cities.push(c2);
		}

		map[i1] = map[i1] || [];
		map[i1][i2] = dis;

		map[i2] = map[i2] || [];
		map[i2][i1] = dis;
	}

	const dp = (city, visited) => {
		if (visited.length === cities.length) {
			return 0;
		}

		let min = Number.MAX_SAFE_INTEGER;
		for (let i = 0; i < cities.length; i++) {
			if (visited.includes(i)) {
				continue;
			}

			const newVisited = visited.slice();
			newVisited.push(i);
			if (city === i) {
				console.log(city);
			}
			min = Math.min(min, map[city][i] + dp(i, newVisited));
		}

		return min;
	};

	const result = cities.reduce((acc, c, i) => {
		const value = dp(i, [i]);
		return Math.min(acc, value);
	}, Number.MAX_SAFE_INTEGER);


	console.log(result);
}

processLineByLine();
