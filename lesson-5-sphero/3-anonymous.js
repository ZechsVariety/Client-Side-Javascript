// Sometimes we just need to run a short code block in one place, and so we don't need a named FUNCTION. In this case, we can use an ANONYMOUS FUNCTION, which is a function that is defined without a name and is often used as a callback or event handler.
// DONE 5: Add a crash counter variable
let crashes = 0;
// DONE 1: Create an event handler to listen for collisions, and add an anonymous function to handle the event
registerEvent(EventType.onCollision, async () => {
    // DONE 2: Stop the robot from rolling, set the main LED to red, and play an explosion animation
    stopRoll();

    setMainLed({
        r: 255,
        g: 0,
        b: 0
    });
    await setDisplayAnimation(1030, true);

    // DONE 3a: Make the robot say, "Collision", create a variable for a random heading, then set the heading
    await speak("ow!", true);
    //rotate
    setHeading(getHeading() + 180);

    // DONE 3b: Wait for half a second, set the main LED to white, and roll again
    await delay(.5);

    setMainLed({
        r: 255,
        g: 255,
        b: 255
    });

    // DONE 6: Increment a crash counter
    crashes++;

    // DONE 4: Run the program and see how the robot reacts to collisions
});

async function startProgram() {
    setMainLed({
        r: 255,
        g: 255,
        b: 255
    });

    // Main program loop
    while (crashes < 5) {
        setSpeed(255);
        // A small delay to slow the execution of the loop so we don't overwhelm the hardware
        await delay(0.025);
    }
    exitProgram();
};