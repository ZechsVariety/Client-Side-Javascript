let unitLength = 35;
let rotation = 0;

async function startProgram() {
    //start at E1
	//move(2, 1); //E3
    //move(3, 1); //B3
    //move(1, -1); //B2
    //move(1, -1); //A2

    //start at E1
    /*
    await move(2, 1); //E3
    await move(3, -1); //B3
    await move(5, 0); //B8
    */

    //start at B1
    await move(4, -1);
    await move(2, 1);
    await move(3, 0);
}

async function move(units, leftOrRight) {
    await rollToDistance(rotation, 10, unitLength * units);

    rotation += 90 * leftOrRight;

    await delay(1);
}
