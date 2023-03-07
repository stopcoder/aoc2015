import fs from 'fs';
import readline from 'readline';
import jsSdsl from 'js-sdsl';
import dijkstra from 'dijkstrajs';
import hash from 'object-hash';

async function processLineByLine() {
	let password = "hxbxwxba";

	const increase = (password) => {
		const a = password.split("");
		let i = a.length - 1;
		let result = "";
		let bit = 0;

		let baseCode = "a".charCodeAt(0);

		do {
			let code = a[i].charCodeAt(0);
			let newCode = code + 1;
			if (newCode >= (baseCode + 26)) {
				bit = 1;
				newCode = newCode - 26;
			} else {
				bit = 0;
			}

			result = String.fromCharCode(newCode) + result;
			i--;
		} while (bit !== 0);

		return password.substring(0, i + 1) + result;
	};

	const sequence3s = [];

	const base = "a".charCodeAt(0);
	for (let i = 0; i < 24; i++) {
		let str = "";
		for (let j = 0 ; j < 3; j++) {
			str += String.fromCharCode(base + i + j);
		}
		sequence3s.push(str);
	}

	const double2s = [];

	for (let i = 0; i < 26; i++) {
		const c = String.fromCharCode(base + i);
		double2s.push(c + c);
	}

	console.log(sequence3s);

	const isValid = (s) => {
		if (s.includes("i") || s.includes("o") || s.includes("l")) {
			return false;
		}

		const noS3 = sequence3s.every((sub) => {
			return !s.includes(sub);
		});

		if (noS3) {
			return false;
		}

		const frequency = double2s.reduce((acc, sub) => {
			if (s.includes(sub)) {
				acc++;
			}
			return acc;
		}, 0);

		if (frequency < 2) {
			return false;
		}

		return true;
	};

	let valid;

	do {
		password = increase(password);
		valid = isValid(password);
	} while (!valid)

	console.log(password);

	do {
		password = increase(password);
		valid = isValid(password);
	} while (!valid)

	console.log(password);
}

processLineByLine();
