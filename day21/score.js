import fs from 'fs';
import readline from 'readline';
import jsSdsl from 'js-sdsl';
import dijkstra from 'dijkstrajs';
import hash from 'object-hash';
import permutation from "./permutation.js";

const { find_path, single_source_shortest_paths } = dijkstra;
const { OrderedMap, PriorityQueue, LinkList, Deque } = jsSdsl;

async function processLineByLine() {
	const weapons = [
		[8,4,0],
		[10,5,0],
		[25,6,0],
		[40,7,0],
		[74,8,0]
	];

	const armors = [
		[13,0,1],
		[31,0,2],
		[53,0,3],
		[75,0,4],
		[102,0,5]
	];

	const rings = [
		[25,1,0],
		[50,2,0],
		[100,3,0],
		[20,0,1],
		[40,0,2],
		[80,0,3]
	];

	const enemyAttack = 9;
	const enemyDefense = 2;

	const win = (attack, defense) => {
		const enemyHit = Math.max(enemyAttack - defense, 1);
		const meHit = Math.max(attack - enemyDefense, 1);

		const round = Math.ceil(103 / meHit);

		return (round - 1) * enemyHit < 100;
	};

	let min = Number.MAX_SAFE_INTEGER;

	for (let w = 0; w < weapons.length; w++) {
		const weapon = weapons[w];
		for (let a = 0; a < armors.length + 1; a++) {
			const armor = a > 0 ? armors[a - 1] : undefined;
			for (let r1 = 0; r1 < rings.length + 1; r1++) {
				const ring1 = r1 > 0 ? rings[r1 - 1] : undefined;
				for (let r2 = 0; r2 < rings.length + 1; r2++) {
					if (r1 !== 0 && r2 !== 0 && r1 === r2) {
						continue;
					}
					const ring2 = r2 > 0 ? rings[r2 - 1] : undefined;

					let attack = weapon[1];
					let defense = 0;
					let cost = weapon[0];
					if (armor) {
						defense += armor[2];
						cost += armor[0];
					}
					if (ring1) {
						attack += ring1[1];
						defense += ring1[2];
						cost += ring1[0];
					}
					if (ring2) {
						attack += ring2[1];
						defense += ring2[2];
						cost += ring2[0]
					}

					if (win(attack, defense)) {
						min = Math.min(min, cost);
					}
				}
			}
		}
	}

	console.log(min);
}

processLineByLine();
