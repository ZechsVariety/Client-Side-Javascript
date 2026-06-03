// DONE 12d: Declare position as a GLOBAL variable
let position;

async function startProgram() {
    // We can make functions more versatile by including PARAMETERS. Parameters are like placeholders for data that the function requires to work properly. We provide the actual values (arguments) at the moment we invoke (call) the function.
    // DONE 6: Light up the main LED with a random colour
    setMainLed(getRandomColor());
    // DONE 7: Call or invoke the traceSquare FUNCTION and pass a distance parameter of 25 (cm).
    await traceSquare(30, 50);
    // DONE 8: Run the program.

    // DONE 9: Add a velocity parameter to the above FUNCTION call (0-255).

    // DONE 12b: Have the robot speak the current heading using the variable created down below inside the traceSquare() function.
    await speak(`My position is ${position.x} X, ${position.y} Y`);
    /* DONE 12c: Notice how this does not work - the position variable is LOCAL in scope - it is only available within the code block 
    comprising the traceSquare() function. Declare the variable at the GLOBAL level, then remove the 'let' within the traceSquare() function */

    exitProgram();
}

// DONE 1: Create a FUNCTION called traceSquare that accepts one parameter - distance (in cm) - and returns nothing.
async function traceSquare(velocity, distance) {
    // DONE 2: Roll the robot with the rollToDistance() method and incorporate the distance parameter.
    await rollToDistance(0, velocity, distance);
    // DONE 3: Turn the robot 90 degrees to the right and roll again using the distance parameter.
    await rollToDistance(90, velocity, distance);
    // DONE 4: Repeat the previous two steps to complete the square.
    await rollToDistance(180, velocity, distance);
    await rollToDistance(270, velocity, distance);
    // DONE 5: Write a text message on the screen using the distance parameter.
    await speak(`${distance} centimeter square.`);
    // DONE 10: Modify the traceSquare FUNCTION above so that it accepts a second parameter - velocity.

    // DONE 11: Change the above rollToDistance() METHODS so that they use the velocity parameter.

    // DONE 12a: Declare and initialize a variable to capture the current position.
    position = getLocation();
}
