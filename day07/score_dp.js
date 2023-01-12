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

	const map = new Map();

	const cParse = (s) => {
		if (/^\d+$/.test(s)) {
			return parseInt(s);
		}
		return s;
	};

	for await (const line of rl) {
		const parts = line.split(" -> ");
		const key = parts[1];

		const exp = parts[0].split(" ");
		if (exp.length === 1) {
			map.set(key, cParse(exp[0]));
		} else if (exp.length === 2) {
			map.set(key, {
				opr: exp[0],
				left: cParse(exp[1])
			});
		} else {
			map.set(key, {
				opr: exp[1],
				left: cParse(exp[0]),
				right: cParse(exp[2])
			});
		}
	}

	const seen = new Map();
	const dp = (variable) => {
		if (typeof variable === "number") {
			return variable;
		}

		if (seen.has(variable)) {
			return seen.get(variable);
		}

		const exp = map.get(variable);

		let value;
		if (typeof exp === "object") {
			if (exp.opr === "NOT") {
				let limit = (1 << 16) - 1;
				value = dp(exp.left) ^ limit;
			} else {
				switch (exp.opr) {
					case "AND":
						value = dp(exp.left) & dp(exp.right);
						break;
					case "OR":
						value = dp(exp.left) | dp(exp.right);
						break;
					case "LSHIFT":
						value = dp(exp.left) << dp(exp.right);
						break;
					case "RSHIFT":
						value = dp(exp.left) >> dp(exp.right);
						break;
				}
			}

			seen.set(variable, value);
			return value;
		} else {
			value = dp(exp);
			seen.set(variable, value);
			return value;
		}
	};

	console.log(dp("a"));

	/*
	const oprs = ["AND", "OR", "NOT", "LSHIFT", "RSHIFT"];
	const stack = ["a"];
	const nstack = [];
	const seen = new Map();

	while (stack.length) {
		const e = stack.pop();

		if (typeof e === "number") {
			console.log(stack);
			nstack.push(e);
		} else if (typeof e === "object") { // opr
			let value;
			if (e.opr === "NOT") {
				value = operate(e.opr, [nstack.pop()]);
			} else {
				value = operate(e.opr, [nstack.pop(), nstack.pop()]);
			}
			nstack.push(value);
			seen.set(e.variable, value);
		} else { // expression
			if (seen.has(e)) {
				nstack.push(seen.get(e));
			} else {
				const exp = map.get(e);

				if (typeof exp === "number") {
					console.log(stack);
					nstack.push(exp);
					seen.set(e, exp);
				} else if (typeof exp === "string") {
					stack.push(exp);
				} else if (typeof exp === "object") {
					stack.push({ opr: exp.opr, variable: e });
					if (exp.hasOwnProperty("right")) {
						stack.push(exp.right);
					}
					stack.push(exp.left);
				}
			}
		}
	}
	console.log(seen);
	console.log(nstack);
	*/
}

processLineByLine();
