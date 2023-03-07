import fs from 'fs';
import readline from 'readline';
import jsSdsl from 'js-sdsl';
import dijkstra from 'dijkstrajs';
import hash from 'object-hash';


async function processLineByLine() {
	let s = "3113322113";
	let tmp = "";

	for (let t = 0; t < 50; t++) {
		let p, c;
		let total = 1;
		for (let i = 0; i < s.length; i++) {
			c = s[i];

			if (i !== 0) {
				if (c === p) {
					total++;
				} else {
					tmp += total;
					tmp += p;
					total = 1;
				}
			}

			p = c;
		}
		tmp += total;
		tmp += p;

		s = tmp;
		tmp = "";
	}

	console.log(s.length);
}

processLineByLine();
