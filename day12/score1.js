import fs from 'fs';
import readline from 'readline';
import jsSdsl from 'js-sdsl';
import dijkstra from 'dijkstrajs';
import hash from 'object-hash';


async function processLineByLine() {
	const fileStream = fs.createReadStream('input');

	const rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});

	let o;
	for await (const line of rl) {
		o = JSON.parse(line);
	}

	console.log(o);

	const sumNum = (v) => {
		if (Array.isArray(v)) {
			let sum = 0;
			v.forEach((e) => {
				sum += sumNum(e);
			});
			return sum;
		} else if (typeof v === "number") {
			return v;
		} else if (typeof v === "string") {
			return 0;
		} else if (typeof v === "object") {
			const values = Object.values(v);
			if (values.includes("red")) {
				return 0;
			} else {
				return sumNum(values);
			}
		}
	};

	console.log(sumNum(o));
}

processLineByLine();
