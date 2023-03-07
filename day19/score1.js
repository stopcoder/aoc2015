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

	let second = false;
	let str;
	const map = new Map();
	const reverse = [];
	for await (const line of rl) {
		if (!line) {
			second = true;
			continue;
		}

		if (second) {
			str = line;
		} else {
			const parts = line.split(" => ");
			const key = parts[0];
			const value = parts[1];

			if (map.has(key)) {
				const arr = map.get(key);
				arr.push(value);
			} else {
				map.set(key, [value]);
			}

			reverse.push([value, key]);
		}
	}


	for (let i = 0; i < reverse.length; i++) {
		for (let j = i + 1; j < reverse.length; j++) {
			if (reverse[i].indexOf(reverse[j]) !== -1 || reverse[j].indexOf(reverse[i]) !== -1) {
				console.log(reverse[i], reverse[j]);
			}
		}
	}

	// reverse.sort((a, b) => b[0].length - a[0].length);

	// console.log(reverse);
	//
	
	let original = str;
	let count = 0;

	for (let k = 0; k < 100; k++) {
		reverse.sort(() => Math.random() - 0.5);
		str = original;
		count = 0;

		while (str !== "e") {
			let i = 0;
			let tmp = str;

			while (i < reverse.length) {
				let keyword = reverse[i][0];
				let replacement = reverse[i][1];

				let regex = new RegExp(keyword, "g");
				let match = str.match(regex);
				if (match) {
					count += match.length;
					str = str.replace(regex, replacement);
				}
				i++;
			}

			if (tmp === str) {
				str = original;
				reverse.sort(() => Math.random() - 0.5);
				count = 0;
				console.log("sorting");
				//console.log(reverse);
			}
		}


		console.log(count);
	}



	/*
	let seen = new Map();

	const dp = (str, index) => {
		console.log(str);
		console.log(index);
		if (str === "e") {
			return 0;
		}

		if (seen.has(str)) {
			return seen.get(str);
		}

		let min = Number.MAX_SAFE_INTEGER;

		for (let i = index; i < reverse.length; i++) {
			const rep = reverse[i];
			if (i < index) {
				continue;
			}

			const keyword = rep[0];
			const replacement = rep[1];

			let pos = str.indexOf(keyword);
			while (pos !== -1) {
				const newStr = str.substring(0, pos) + str.substring(pos).replace(keyword, replacement);
				min = Math.min(min, dp(newStr, i) + 1);
				pos = str.indexOf(keyword, pos + keyword.length);
			}
		};

		seen.set(str, min);

		return min;
	}

	console.log(dp(str, 0));
	*/
}

processLineByLine();
