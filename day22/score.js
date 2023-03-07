import fs from 'fs';
import readline from 'readline';
import jsSdsl from 'js-sdsl';
import dijkstra from 'dijkstrajs';
import hash from 'object-hash';
import permutation from "./permutation.js";

const { find_path, single_source_shortest_paths } = dijkstra;
const { OrderedMap, PriorityQueue, LinkList, Deque } = jsSdsl;

async function processLineByLine() {
	let bossDamage = 9;
	const bossHit = 51;

	const myHit = 50;
	const myMana = 500;
	const myArmor = 0;
	const totalMana = 0;


	// damage, heal, 
	const magics = [
		{ cost: 53, damage: 4, heal: 0, armor: 0, mana: 0, last: 1 },
		{ cost: 73, damage: 2, heal: 2, armor: 0, mana: 0, last: 1 },
		{ cost: 113, damage: 0, heal: 0, armor: 7, mana: 0, last: 6 },
		{ cost: 173, damage: 3, heal: 0, armor: 0, mana: 0, last: 6 },
		{ cost: 229, damage: 0, heal: 0, armor: 0, mana: 101, last: 5 }
	]

	let globalMin = Number.MAX_SAFE_INTEGER;

	const round = ({bossHit, myHit, myMana, myArmor, totalMana}, activeSpells, myTurn) => {
		if (totalMana >= globalMin) {
			return;
		}
/*Effects all work the same way. Effects apply at the start of both the player's turns and the boss' turns. Effects are created with a timer (the number of turns they last); at the start of each turn, after they apply any effect they have, their timer is decreased by one. If this decreases the timer to zero, the effect ends. You cannot cast a spell that would start an effect which is already active. However, effects can be started on the same turn they end.*/
		for (let i = 0; i < activeSpells.length; i++) {
			const spell = activeSpells[i];
			if (spell && spell.last > 0) {
				bossHit -= spell.damage;
				myMana += spell.mana;
				myHit += spell.heal;
				if (spell.armor) {
					if (spell.last === 6) {
						myArmor = spell.armor;
					} else if (spell.last === 1) {
						myArmor = 0;
					}
				}
				spell.last--;
				if (spell.last === 0) {
					activeSpells[i] = undefined;
				}
			}
		}

		if (myHit <= 0) {
			return;
		} else if (bossHit <= 0) {
			console.log(`Win: ${totalMana}`);
			globalMin = Math.min(globalMin, totalMana);
		}

		if (myTurn) {
			for (let i = 0; i < magics.length; i++) {
				const spell = magics[i];
				if (!activeSpells[i] && myMana >= spell.cost) {
					const newActiveSpells = activeSpells.map((e) => {
						if (e) {
							// clone the object
							return {...e};
						} else {
							return undefined;
						}
					});
					newActiveSpells[i] = {...spell};
					round({bossHit, myHit, myMana: myMana - spell.cost, myArmor, totalMana: totalMana + spell.cost}, newActiveSpells, !myTurn);
				}
			}
		} else {
			myHit -= Math.max(bossDamage - myArmor, 1);
			round({bossHit, myHit, myMana, myArmor, totalMana}, activeSpells, !myTurn);
		}
	};

	round({bossHit, myHit, myMana, myArmor, totalMana}, [], true);
	console.log(globalMin);
}

processLineByLine();
