/** Class representing a Timer. */
class Timer {
    /**
     * Create a timed event
     * @param {duration} amount - the amount of time before the session should end
     */
    constructor() {
        this.startTime = new Date().getTime()
        this.paused = true
        this.time = 0
        this.counterText = null
        this.counterString = null
        this.timeout = null
        this.callback = null


        // tickAmount is, in seconds, how often the timer should update
        let tickAmount = 1
        setInterval(this.runTimer, tickAmount * 1000, this, tickAmount)
    }

    /**
     * Callback for the Timer which decrements the time left by a given amount
     * @param {context} timer - A Timer
     * @param {number} amount - The amount to decrement the time left by
     */
    runTimer(timer, amount) {
        if (timer.isTimerRunning()) {
            timer.time += amount
            if (timer.counterText != null) {
                if (timer.counterString.includes('%t')) {
                    timer.counterText.setText(timer.counterString.replace(/%t/g, timer.time))
                } else {
                    timer.counterText.setText(timer.counterString + timer.time)
                }
            }
            if (timer.timeout != null && timer.time >= timer.timeout) {
                timer.callback()
            }
        }
    }

    /**
     * Checks if the Timer is currently running
     * @return {boolean} !paused
     */
    isTimerRunning() {
        return !this.paused
    }

    /**
     * pauses the Timer
     */
    pause() {
        this.paused = true
    }

    /**
     * resumes the Timer
     */
    resume() {
        this.paused = false
    }

    /**
     * starts the Timer
     */
    start() {
        this.paused = false
    }

    /**
     * a function of duration - time left
     * @return {number} time elapsed (seconds)
     */
    timeElapsed() {
        return this.time
    }

    /**
     * The number of minutes elapsed rounded down
     * @return {number} time elapsed (seconds)
     */
    getJustMinutes() {
        return Math.floor(this.time / 60)
    }

    /**
     * The number of seconds elapsed rounded down
     * @return {number} time elapsed (seconds)
     */
    getJustSeconds() {
        return this.time % 60
    }

    /**
     * The number of minutes remaining if there is a timeout set
     * @return {number} time remaining (minues)
     */
    getJustMinutesRemaining() {
        if (this.timeout) {
            return Math.floor((this.timeout - this.time) / 60)
        }
    }

    /**
     * The number of seconds remaining if there is a timeout set
     * @return {number} time remaining (seconds)
     */
    getJustSecondsRemaining() {
        if (this.timeout) {
            return (this.timeout - this.time) % 60
        }
    }

    /**
     * Reposition the timer to itrs correct position
     */
    repositionTimer() {
        this.counterText.setX(gameProperties.leftOffset)
        this.counterText.setY(gameProperties.topOffset - 31)
    }

    /**
     * Adds the timer to the current scene
     * <p>
     * The %t character is reserved to insert the time into the text
     * if no %t is present the time will be appended to the string
     *
     * @param {number} x - The x coordinate of the timer
     * @param {number} y - The y coordinate of the timer
     * @param {String} counterString - template string to display time
     */
    addTimerText(x, y, counterString) {
        this.counterString = counterString
        if (this.counterString.includes('%t')) {
            this.counterText = scene.add.text(x, y, counterString.replace('%t', this.time), fontStyles.counterFontStyle)
        } else {
            this.counterText = scene.add.text(x, y, counterString + this.time, fontStyles.counterFontStyle)
        }
        this.counterText.setDepth(1001)
    }

    /**
     * Adds a callback to the timer
     * <p>
     * Adds callback to trigger when the timer reaches a certain value
     *
     * @param {number} duratin     - The value the timer must reach to trigger the function
     * @param {function} callback - A function pointer to the function to trigger
     */
    setTimeout(duration, callback) {
        console.log("setting Timeout")
        this.timeout = duration
        this.callback = callback
    }
}
