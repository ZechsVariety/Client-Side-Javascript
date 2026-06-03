// DONE 1: Build the main entry point for the program
// ? async: functions contains code that js may have to wait for (thus, is asynchronous)
async function startProgram() {
    // DONE 2: Call a method to control the main LED lights
    setMainLed(getRandomColor());
    // DONE 3: Invoke another method to write to the screen
    //message, colour, speed fps, blocking (will wait until this block of code is done before continuing. await does the same thing)
    await scrollMatrixText("Hello World!", getRandomColor(), 24, false);
    // DONE 3: Call another method to move the robot
    await roll(0, 30, 2);
    // DONE 4: Exit the program
    exitProgram();
}
// DONE 5: Aim your robot, then run the program
