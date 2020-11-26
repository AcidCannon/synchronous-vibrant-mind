/** Class representing a Mahjong board. */
class Board {
    /**
     * Create a Board
     * <p>
     * Also initializes a layout
     * @param {context} scene - The scene in which the sprite resides.
     * @see Layout
     */
    constructor() {
        const UIDepth = 20000000001
        emitter.on("selectTile", this.selectTile, this)

        this.tileSelected = null
        this.currentSelection = null
        this.hintedTiles = null
        this.failedMatches = 0

        this.layout = new Layout(this.scene)
        for (var i = 1; i <= this.layout.height; i++) {
            this.layout.addJsonLayer(gameSession.layout['layer' + i], i)
        }
        gameSession.sizeX = this.layout.layers[0][0].length
        gameSession.sizeY = this.layout.layers[0].length
        console.log(gameStats.layout)
        //console.log(this.layout)
        this.layout.buildHierarchy()
        this.layout.generateTiles()
        if (!gameSession.hardMode) {
            this.layout.initializeBeginnerMode()
        }
    }

    /**
     * Selects a given TileNode
     * <p>
     * If a tile was previously selected check for a match
     * @param {TileNode} tile - The hexadecimal value used to tint the sprite
     */
    selectTile(tile) {

        gameStats.gameSnapshot.boardConfig.push({
            board: this.layout,
            responseTime: new Date().getTime() - gameSession.timer.startTime
        })
        gameStats.gameSnapshot.events.push({
            selectedTile: tile.tile,
            responseTime: new Date().getTime() - gameSession.timer.startTime
        })
        console.log(gameStats.gameSnapshot)
        // The tile can be selected
        if (tile.selectable) {
            this.currentSelection = tile
            this.playSound('click')

            if (this.tileSelected !== null) {
                if (this.tileSelected === this.currentSelection) {
                    if (this.hintedTiles && this.hintedTiles.indexOf(this.currentSelection) > -1) {
                        this.currentSelection.highlightTile(gameSession.colours.hint)
                    } else {
                        this.currentSelection.unhighlightTile()
                    }
                    this.tileSelected = null
                    gameStats.deselections += 1

                } else {
                    this.checkMatch()
                }
            } else {
                // Tile has not been selected yet
                this.currentSelection.highlightTile(gameSession.colours.select)
                this.tileSelected = this.currentSelection
                gameStats.selections += 1
            }
        }
    }

    /**
     * Checks if the player has made a successful match
     * <p>
     * In the case of a match the TileNode will be removed along with the previously selected TileNode
     * In the case of The TileNode already being selected it will be deselected
     * In the case of a mismatch The TileNode will be highlighted and the previous deselected
     */
    checkMatch() {
        gameStats.selections += 1

        // The two tiles match, remove them
        if (this.tileSelected.tile.texture.key === this.currentSelection.tile.texture.key) {
            this.tileMatch()
        } else {
            this.tileMismatch()
        }
    }

    /**
     * Handles a correct tile match
     * <p>
     * update gamesession and stats, decrement layout size
     * Play tile animation and create a timeout for tile removal
     */
    tileMatch() {
        var self = this

        this.failedMatches = 0
        if (scene.buttons.hint.visible) {
            scene.buttons.hint.toggleVisibility()
        }

        // Keeps the layout updated
        this.layout.size -= 2

        gameStats.correctMatches += 1
        this.playSound('correct')

        if (this.hintedTiles) {
            this.removeHint()
        }

        this.tileSelected.highlightTile(gameSession.colours.correct)
        this.currentSelection.highlightTile(gameSession.colours.correct)

        this.slideTileOut(this.tileSelected)
        this.slideTileOut(this.currentSelection)

        this.tileSelected = null
        this.currentSelection = null

        setTimeout(function () {
            if (self.layout.size === 0) {
                emitter.emit("endGame")
            } else {
                if (!self.layout.validMatchAvailable()) {
                    scene.buttons.shuffle.toggleVisibility()
                    scene.buttons.overlay.toggleVisibility()
                    scene.buttons.shuffleText.toggleVisibility()
                }
            }
        }, 600)
    }

    /**
     * Handles an incorrect tile match
     * <p>
     * update gamesession and stats
     * If three incorrect matches in a row show the hint button
     * tint tiles incorrect and set a callback to return them to the correct tint after delay
     */
    tileMismatch() {

        // The two tiles don't match so only select the most recent tile
        this.tileSelected.highlightTile(gameSession.colours.incorrect)
        this.currentSelection.highlightTile(gameSession.colours.incorrect)
        gameStats.incorrectMatches += 1

        //gives audio feedback to the player
        this.playSound('incorrect')

        var tile1 = this.tileSelected
        var tile2 = this.currentSelection

        this.tileSelected = null
        this.currentSelection = null

        var self = this
        setTimeout(function () {
            if (tile1.selectable && tile1 !== self.tileSelected) {
                if (!self.hintedTiles || self.hintedTiles.indexOf(tile1) < 0) {
                    tile1.unhighlightTile()
                } else {
                    tile1.highlightTile(gameSession.colours.hint)
                }
            }
            if (tile2.selectable && tile2 !== self.tileSelected) {
                if (!self.hintedTiles || self.hintedTiles.indexOf(tile2) < 0) {
                    tile2.unhighlightTile()
                } else {
                    tile2.highlightTile(gameSession.colours.hint)
                }
            }
            if (++self.failedMatches === 3 && self.layout.validMatchAvailable()
                && gameSession.enabledHints
                && !self.hintedTiles) {
                scene.buttons.hint.toggleVisibility()
                self.playSound('hint')
            }
        }, 300)
    }

    /**
     * Plays a preloaded sound file
     *
     * @param {string} sound - name of a preloaded sound to play
     */
    playSound(sound) {
        if (gameSession.sound) {
            var music = scene.sound.add(sound)
            music.play()
        }
    }

    /**
     * Creates an animation tween for removing a tile
     * <p>
     * Animate tiles x position away from the neighbouring tiles
     * Animate the alpha to a value of 0
     * Set a callback to remove the tile from the layout after alpha hits 0
     */
    slideTileOut(tilenode) {
        tilenode.selectable = false
        var neighbour = this.layout.findNeighbours(tilenode)[0]
        if (neighbour === undefined || neighbour.x < tilenode.x) {
            var destination = tilenode.tile.x + 100
        } else {
            var destination = tilenode.tile.x - 100
        }

        scene.tweens.add({
            targets: tilenode.tile,
            x: {value: destination, duration: 1000, ease: 'Power2'},
            alpha: {value: 0, duration: 500, ease: 'Power2'}
        })

        var self = this
        setTimeout(function () {
            self.layout.removeTile(tilenode)
        }, 500)
    }

    /**
     * Creates an animation tween for hinting a tile
     * <p>
     * Scale the tile 120% and back repeat twice
     */
    pulsateTile(tilenode) {
        var scaleTargetX = tilenode.tile.scaleX * 1.2
        var scaleTargetY = tilenode.tile.scaleY * 1.2
        scene.tweens.add({
            targets: tilenode.tile,
            yoyo: true,
            repeat: 2,
            scaleX: {value: scaleTargetX, duration: 500, ease: 'Power2'},
            scaleY: {value: scaleTargetY, duration: 500, ease: 'Power2'}
        })
    }

    /**
     * Unhighlights any remaining tiles from the hintedTiles array.
     */
    removeHint() {
        for (var i = 0; i < this.hintedTiles.length; i++) {
            if (this.hintedTiles[i] !== null) {
                this.hintedTiles[i].unhighlightTile()
            }
        }
        this.hintedTiles = null
    }

    //remove this and replace with a new scene
    //
    scoreScreen(timerDone) {
        console.log(scene.buttons)
        this.scene.buttons.overlay.sprite.setVisible(true)

        // this makes sure that none of the other overlayed text is every visible
        this.scene.buttons.resume.sprite.setVisible(false)
        this.scene.buttons.pauseText.sprite.setVisible(false)
        this.scene.buttons.quit.sprite.setVisible(false)

        this.scene.buttons.endText.toggleVisibility()

        console.log(this.scene.buttons)
        console.log(this.scene.buttons.endText)

        if (!gameSession.practiceGame) {
            // Statistics for time taken to complete game
            gameSession.timer.pauseTimer()
            gameStats.endGameTime = gameSession.timer.timeLeft
            console.log('Duration: ', gameStats.startGameTime - gameStats.endGameTime)

            // Displays the proper message for ending a game
            if ((gameStats.startGameTime - gameStats.endGameTime) < 60) {
                var str = 'You\'ve made ' + gameStats.correctMatches +
                    ' matches in\n' + String(gameStats.startGameTime - gameStats.endGameTime) +
                    ' seconds.'
            } else {
                if (Math.floor((gameStats.startGameTime - gameStats.endGameTime) / 60) === 1) {
                    var str = 'You\'ve made ' + gameStats.correctMatches +
                        ' matches in\n' + String(Math.floor((gameStats.startGameTime - gameStats.endGameTime) / 60)) +
                        ' minute and ' + String((gameStats.startGameTime - gameStats.endGameTime) % 60) +
                        ' seconds.'
                } else {
                    var str = 'You\'ve made ' + gameStats.correctMatches +
                        ' matches in\n' + String(Math.floor((gameStats.startGameTime - gameStats.endGameTime) / 60)) +
                        ' minutes and ' + String((gameStats.startGameTime - gameStats.endGameTime) % 60) +
                        ' seconds.'
                }
            }
            if (timerDone) {
                str = 'The session has ended.'
                this.scene.buttons.shuffle.sprite.setVisible(false)
                this.scene.buttons.shuffleText.sprite.setVisible(false)
            }
            this.scene.buttons.scoreText.sprite.setText(str)
            this.scene.buttons.scoreText.toggleVisibility()
        }

        // Uses the continue button or finish button depending on if a game session has ended
        if (timerDone) {
            this.scene.buttons.finish.toggleVisibility()
        } else {
            this.scene.buttons.next.toggleVisibility()
        }
    }

    getBoard() {
        return this.board
    }

}
