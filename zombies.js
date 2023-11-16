/**
 * Save humans, destroy zombies!
 * Code vs Zombies ===> https://www.codingame.com/ide/puzzle/code-vs-zombies
 **/

// target closest zombie from ash out of array urgent zombies (e.g zombies closest to each human)

//calculate distance between 2 points
const getDistance = (x, y, x1, y1) => {
	let deltaX = x1 - x;
	let deltaY = y1 - y;
	let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
	return Math.round(distance);
};

//return object wit Ash's x and y position extracted from 1st given standard input line
const parseAsh = () => {
	const ashData = readline().split(" ");
	return {
		x: ashData[0],
		y: ashData[1],
	};
};

//return array of lines containing human data extracted from 2nd given input
const parseHumans = () => {
	//read and store humanCount
	let humanCount = readline();
	//extract string containing data for each human
	let humansList = [];
	for (let i = 0; i < humanCount; i++) {
		var inputs = readline();
		humansList.push(inputs);
	}
	//return array of strings containing id, x and y for each  human
	return humansList;
};

//return array of human objects
const initHumans = () => {
	// read and store strings containing data for each human
	let humansList = parseHumans();

	//extract and return each human's id,  X and Y position as obj
	return humansList.map((str) => {
		let humanData = str.split(" ");
		return {
			humanId: humanData[0],
			x: humanData[1],
			y: humanData[2],
		};
	});
};

//get array of strings containing zombies' data
const parseZombies = () => {
	let zombieCount = readline();
	let zombiesList = [];
	for (let i = 0; i < zombieCount; i++) {
		var inputs = readline();
		zombiesList.push(inputs);
	}
	return zombiesList;
};

//return list of zombies objects
const initZombies = () => {
	//obtain list of strings containing each zombie's data
	let zombiesList = parseZombies();
	//return list of zombies objects with their id, x and y coordinates, and their target's x and y
	return zombiesList.map((str) => {
		let data = str.split(" ");
		for (let i = 0; i < zombiesList.length; i++) {
			return {
				zombieId: data[0],
				x: data[1],
				y: data[2],
				zombieXNext: data[3],
				zombieYNext: data[4],
			};
		}
	});
};

//return closest zombie object
const findClosestZombie = (target, ...zombies) => {
	let closestZombie = null;
	let minDistance = Infinity;

	for (const zombie of zombies) {
		const distance = getDistance(target.x, target.y, zombie.x, zombie.y);
		if (distance < minDistance) {
			minDistance = distance;
			closestZombie = zombie;
		}
	}
	return closestZombie;
};

//can Ash reach human target before zombie
const isWithinReach = (human, zombie, ash) => {
	const distanceZH = getDistance(human.x, human.y, zombie.x, zombie.y);
	const distanceAH = getDistance(human.x, human.y, ash.x, ash.y);
	let ans = distanceZH / 400 >= distanceAH / 1000;
	console.error({ distanceAH, distanceZH, ans });
	return ans;
};

// init X and Y answer to console log
let targetX;
let targetY;

// game loop
while (true) {
	// Object to store the closest zombie for each human
	//get string containing ash x and y position
	const ash = parseAsh();

	//get array of strings containing: humanId,x and y position
	const humans = initHumans();

	//number of humans
	const humanCount = humans.length;

	// array of strings containing:zombieId,x,y,zombieXNext, ZombieYNext position
	let zombies = initZombies();

	//numbers of zombies
	let zombieCount = zombies.length;

	// list of closest zombie for each human
	let threatZombies = humans.map((human) => {
		let closestZ = findClosestZombie(human, ...zombies);
		let ind = zombies.indexOf(closestZ);
		zombies[ind].humanX = human.x;
		zombies[ind].humanY = human.y;
		human.closestZombie = closestZ;
		zombies[ind].isReachable = isWithinReach(human, closestZ, ash);
		return zombies[ind];
	});

	console.error({ threatZombies });

	let zombi = threatZombies.filter((zomb) => zomb.isReachable);

	console.error({ zombi, threatZombies });

	//get closest threatening zombie from Ash
	if (zombi.length >= 1) {
		const closestThreatZombieFromAsh = findClosestZombie(ash, ...zombi);

		targetX = closestThreatZombieFromAsh.x;
		targetY = closestThreatZombieFromAsh.y;
	} else {
		const closestHumanFromAsh = findClosestZombie(ash, ...humans);
		// const closestZombieFromAsh = findClosestZombie(ash, ...zombies);
		targetX = closestHumanFromAsh.x;
		targetY = closestHumanFromAsh.y;
	}

	//debugger
	// log answer: Your destination coordinates x and y postion
	console.log(`${targetX} ${targetY}`);
}
