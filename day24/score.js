import fs from 'fs';
import readline from 'readline';
import jsSdsl from 'js-sdsl';
import dijkstra from 'dijkstrajs';
import permutation from "./permutation.js";

const { find_path, single_source_shortest_paths } = dijkstra;
const { OrderedMap, PriorityQueue, LinkList, Deque } = jsSdsl;

async function processLineByLine() {
	const fileStream = fs.createReadStream('input');

	const rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});

	const packs = [];

	for await (const line of rl) {
		packs.push(parseInt(line));
	}

	packs.reverse();

	const sum = packs.reduce((acc, p) => acc + p) / 3;

	const seen = new Map();
	let choices = [];
	let minLength = packs.length;
	const dp = (sum, pos, used) => {
		if (sum === 0) {
			let length = 0;
			let usedBackup = used;
			while (used > 0) {
				const choose = used % 2;
				if (choose) {
					length++;
				}
				used = used >> 1;
			}
			if (choices.length === 0 || length === minLength) {
				choices.push(usedBackup);
				minLength = length;
			} else if (length < minLength) {
				choices = [usedBackup];
				minLength = length;
			}
			// console.log(result);
			// convert used to array
			// add to choices
			return;
		}

		// since we check with the number that is at position 'pos'
		// it doesn't matter whether 'pos+1' is still in range
		if (pos < packs.length) {
			dp(sum, pos + 1, used);
			if (sum >= packs[pos]) {
				dp(sum - packs[pos], pos + 1, used | (1 << pos))
			}
		}
	};

	// dp(sum, 0, 0);
	// console.log(choices.length);

	const sumRest = (sum, pos, used, packs) => {
		if (sum === 0) {
			return true;
		}

		if (pos < packs.length - 1) {
			if (sumRest(sum, pos + 1, used, packs)) {
				return true;
			} else if (sum >= packs[pos]) {
				return sumRest(sum - packs[pos], pos + 1, used | (1 << pos), packs);
			}
		}

		return false;
	};

	let min = Number.MAX_SAFE_INTEGER;
	for (let i = 0; i < choices.length; i++) {
		const choice = choices[i];
		const newPacks = packs.filter((p, i) => {
			return ((choice >> i) % 2) === 0;
		});
		if (sumRest(sum, 0, 0, newPacks)) {
			let array = [];
			const value = packs.reduce((acc, p, i) => {
				if (((choice >> i) % 2) === 1) {
					array.push(p);
					return acc * p;
				} else {
					return acc;
				}
			}, 1);
			console.log(i, value);
			console.log(array);

			min = Math.min(value, min);
		}
	}

	console.log(min);


	const dp1 = (sum, pos, capacity) => {
		if (pos < packs.length) {
			let b1, b2;
			// position 'pos' isn't considered
			b1 = dp1(sum, pos + 1, capacity);

			// position 'pos' is considered
			// only update 'b2' with the result
			if (sum === packs[pos] && capacity === 1) {
				b2 = [[packs[pos]]];
			} else if (sum > packs[pos] && capacity > 0) {
				b2 = dp1(sum - packs[pos], pos + 1, capacity - 1);
				b2.forEach((comb) => {
					comb.push(packs[pos]);
				});
			} else {
				b2 = [];
			}
			return b1.concat(b2);
		} else {
			return [];
		}

	};

	console.log(dp1(sum, 0, 1).length);
}

processLineByLine();
