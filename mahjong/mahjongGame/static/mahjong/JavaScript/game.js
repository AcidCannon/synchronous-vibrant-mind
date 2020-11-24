var game
var scene
var emitter = null


/**
 * A scene for the general gameplay of Mahjong
 * @extends Phaser.Scene
 */
var play = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function play() {
            Phaser.Scene.call(this, {key: 'play'});
        },

    /**
     * Loads all necessary assets for the game
     * @function Preload
     */
    preload: function () {
        console.log('preloading')

        gameStats.package = gameSession.package
        gameStats.hintsEnabled = gameSession.enabledHints

        var tiles = gameSession.tileset.main
        for (var i = 0; i < tiles.length; i++) {
            var index
            if (i < 10) {
                var index = '0' + i.toString()
            } else {
                var index = i.toString()
            }
            this.load.image('tile' + index, BASE_URL + '/static/mahjong/Resources/Tilesets/' + gameSession.tileset.name + '/' + tiles[i])
        }

        // load UI elements
        var theme = gameSession.theme
        this.load.image('background', BASE_URL + '/static/mahjong/Resources/Themes/' + theme + '/Background.png')
        this.load.image('resume', BASE_URL + '/static/mahjong/Resources/Themes/' + theme + '/Resume.png')
        this.load.image('continue', BASE_URL + '/static/mahjong/Resources/Themes/' + theme + '/Continue.png')
        this.load.image('finish', BASE_URL + '/static/mahjong/Resources/Themes/' + theme + '/Finish.png')
        this.load.image('hint', BASE_URL + '/static/mahjong/Resources/Themes/' + theme + '/Hint.png')
        this.load.image('overlay', BASE_URL + '/static/mahjong/Resources/Themes/' + theme + '/Overlay.png')
        this.load.image('pause', BASE_URL + '/static/mahjong/Resources/Themes/' + theme + '/Pause.png')
        this.load.image('quit', BASE_URL + '/static/mahjong/Resources/Themes/' + theme + '/Quit.png')
        this.load.image('shuffle', BASE_URL + '/static/mahjong/Resources/Themes/' + theme + '/Shuffle.png')
        this.load.spritesheet('sound', BASE_URL + '/static/mahjong/Resources/Themes/' + theme + '/Sound.png', {
            frameWidth: 100,
            frameHeight: 100
        })

        //load the sound files
        this.load.audio('correct', BASE_URL + '/static/mahjong/Resources/Audio/correct.mp3')
        this.load.audio('incorrect', BASE_URL + '/static/mahjong/Resources/Audio/incorrect.mp3')
        this.load.audio('click', BASE_URL + '/static/mahjong/Resources/Audio/click.mp3')
        this.load.audio('hint', BASE_URL + '/static/mahjong/Resources/Audio/hint.mp3')
        this.load.audio('shuffle', BASE_URL + '/static/mahjong/Resources/Audio/shuffle.mp3')
        this.load.audio('finishGame', BASE_URL + '/static/mahjong/Resources/Audio/finish_game.mp3')

        console.log('Assets loaded!')
    },

    /**
     * initializes the necessary data stuctures, resizes the game to match the viewing window and begins the Phaser Game
     * @function Create
     */
    create: function () {
        console.log('creating')
        if (participant == '' || participant == "None") {
            gameSession.practiceGame = true
        }
        if (!gameSession.practiceGame) {
            gameStats.startGameTime = gameSession.timer.time
        }
        scene = this
        emitter = new Phaser.Events.EventEmitter()
        emitter.on('endGame', this.endGame, this)

        var background = this.add.sprite(0, 0, 'background').setOrigin(0, 0)
        this.board = new Board()
        this.buttons = this.loadButtons()

        resizeGame(background)
        scene.board.layout.positionSprites()
        //console.log(this.buttons)
        for (item in this.buttons) {
            if (item === 'overlay') {
                this.buttons[item].fillScreen()
                continue
            }
            this.buttons[item].setSpritePosition()
        }

        var buttons = this.buttons

        window.onresize = function () {
            resizeGame(background)
            scene.board.layout.positionSprites()

            for (item in buttons) {
                if (item === 'overlay') {
                    buttons[item].fillScreen()
                    continue
                }
                buttons[item].setSpritePosition()
            }
        }

        //add the sound effects to the game.
        this.sound.add('correct')
        this.sound.add('incorrect')
        this.sound.add('click')
        this.sound.add('hint')
        this.sound.add('shuffle')
        this.sound.add('finishGame')

        if (!gameSession.practiceGame) {
            // Everything is loaded, so now start the timer
            gameSession.timer.resume()
        }
    },

    /**
     * initializes and creates all of the buttons
     * @function loadButtons
     */
    loadButtons: function () {
        $('.btns').fadeOut(1000);
        const UIDepth = 20000000001
        var s = gameSession

        var buttons = {}

        buttons.hint = new Button(scene, 87, 50, 0, false)
        buttons.hint.setSprite('hint')
        buttons.hint.sprite.on('pointerdown', function () {
            if (this.tileSelected) {
                this.tileSelected.unhighlightTile()
            }
            this.currentSelection = null
            this.tileSelected = null

            this.hintedTiles = this.layout.getMatch()
            this.hintedTiles[0].highlightTile(gameSession.colours.hint)
            this.hintedTiles[1].highlightTile(gameSession.colours.hint)
            this.pulsateTile(this.hintedTiles[0])
            this.pulsateTile(this.hintedTiles[1])

            this.failedMatches = 0
            buttons.hint.toggleVisibility()

            gameStats.hintsUsed += 1

        }, scene.board)

        buttons.shuffle = new Button(scene, 50, 65, 10, false)
        buttons.shuffle.setSprite('shuffle')
        buttons.shuffle.sprite.on('pointerdown', function () {
            buttons.shuffle.toggleVisibility()
            buttons.overlay.toggleVisibility()
            buttons.shuffleText.toggleVisibility()
            this.layout.shuffle()
            this.playSound('shuffle')
            this.failedMatches = 0

            gameStats.timesShuffled += 1

        }, scene.board)

        //sound button
        buttons.sound = new Button(scene, 94, 7, 0, true)
        buttons.sound.setSprite('sound')
        if (s.sound) {
            buttons.sound.sprite.setFrame(0)
        } else {
            buttons.sound.sprite.setFrame(1)
        }

        buttons.sound.sprite.on('pointerdown', function () {
            if (s.sound) {
                this.setFrame(1)
            } else {
                this.setFrame(0)
            }
            s.sound = !s.sound
        })

        buttons.overlay = new Button(scene, 50, 50, 5, false)
        buttons.overlay.setSprite('overlay')
        buttons.overlay.fillScreen()


        buttons.pause = new Button(scene, 5, 7, 0, true)
        buttons.pause.setSprite('pause')
        buttons.pause.sprite.on('pointerdown', function () {
            if (!gameSession.practiceGame) {
                gameSession.timer.pause()
            }

            scene.buttons.overlay.toggleVisibility()
            scene.buttons.resume.toggleVisibility()
            scene.buttons.quit.toggleVisibility()
            scene.buttons.pauseText.toggleVisibility()

        })

        buttons.resume = new Button(scene, 33, 60, 10, false)
        buttons.resume.setSprite('resume')
        buttons.resume.sprite.on('pointerdown', function () {
            if (!gameSession.practiceGame) {
                gameSession.timer.resume()
            }

            scene.buttons.overlay.toggleVisibility()
            scene.buttons.quit.toggleVisibility()
            scene.buttons.resume.toggleVisibility()
            scene.buttons.pauseText.toggleVisibility()
        })

        //may not be used now
        buttons.quit = new Button(scene, 66, 60, 10, false)
        buttons.quit.setSprite('quit')
        buttons.quit.sprite.on('pointerdown', function () {
            if (user !== 'quicktest') {
                // Statistics for time taken to complete game
                gameStats.endGameTime = gameSession.timer.timeElapsed()
                console.log('Duration: ', gameStats.startGameTime - gameStats.endGameTime)
                gameStats.completion = 'Quit'
                gameStats.resetGameStats()
            }
            game.scene.stop('play')
            showLobby()
        })

        buttons.pauseText = new Button(scene, 50, 40, 10)
        buttons.pauseText.sprite = scene.add.text(0, 0, 'Would you like to quit?', {
            font: '64px Arial',
            fill: '#000000'
        })
        buttons.pauseText.sprite.setVisible(false)
        buttons.pauseText.sprite.setOrigin(0.5, 0.5)
        buttons.pauseText.sprite.setDepth(buttons.pauseText.depth)

        buttons.shuffleText = new Button(scene, 50, 40, 10)
        buttons.shuffleText.sprite = scene.add.text(0, 0, 'There are no moves remaining.', {
            font: '64px Arial',
            fill: '#000000'
        })
        buttons.shuffleText.sprite.setVisible(false)
        buttons.shuffleText.sprite.setOrigin(0.5, 0.5)
        buttons.shuffleText.sprite.setDepth(buttons.shuffleText.depth)

        buttons.endText = new Button(scene, 50, 30, 10)
        buttons.endText.sprite = scene.add.text(0, 0, 'Congratulations!', {font: '64px Arial', fill: '#000000'})
        buttons.endText.sprite.setVisible(false)
        buttons.endText.sprite.setOrigin(0.5, 0.5)
        buttons.endText.sprite.setDepth(buttons.endText.depth)

        buttons.scoreText = new Button(scene, 50, 50, 10)
        buttons.scoreText.sprite = scene.add.text(0, 0, '', {font: '64px Arial', fill: '#000000', align: 'center'})
        buttons.scoreText.sprite.setVisible(false)
        buttons.scoreText.sprite.setOrigin(0.5, 0.5)
        buttons.scoreText.sprite.setDepth(buttons.scoreText.depth)

        return buttons

    },

    endGame: function () {
        emitter.destroy()
        if (!gameSession.practiceGame) {
            gameSession.timer.pause()
            gameStats.endGameTime = gameSession.timer.timeElapsed()
            postData()
        }
        this.board.playSound('finishGame')
        game.scene.stop('play')
        game.scene.start('stats')
    }
})

/**
 * A scene for the general stats of Mahjong
 * @extends Phaser.Scene
 */
var stats = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function stats() {
        Phaser.Scene.call(this, {key: 'stats'});
    },
    /**
     * loads the images needed for the buttons that we will load for later in the game
     */
    preload: function () {
        //do things here
        scene = this
        var theme = gameSession.theme
        this.load.image('startGameButton', BASE_URL + '/static/mahjong/Resources/Themes/' + theme + '/Continue.png')
        this.load.image('overlay', BASE_URL + '/static/mahjong/Resources/Themes/' + theme + '/Overlay.png')
    },
    /**
     * Adds the text and buttons for the stats screen
     */
    create: function () {


        var fontStyle = {font: 'bold 42px Arial', fill: '#000'}
        var overlay = new Button(scene, 50, 50, 5, true)
        var depth = overlay.depth + 1
        var timeText = null
        var matchesText = null
        //console.log(overlay)
        overlay.setSprite('overlay')
        overlay.fillScreen()
        x = game.config.width / 2
        y = window.innerHeight / 2
        ydisplacement = 60
        if (gameSession.packageLayouts.length > 0 && !gameSession.finishedSession) {
            time = gameStats.endGameTime - gameStats.startGameTime
            this.add.text(x, y - ydisplacement * 3, 'Congratulations!', fontStyle).setOrigin(0.5, 0.5).setDepth(depth)

            matchesText = 'You\'ve made ' + gameStats.correctMatches + ' matches'
            this.add.text(x, y - ydisplacement * 2, matchesText, fontStyle).setOrigin(0.5, 0, 5).setDepth(depth)
            if (Math.floor(time / 60) <= 0) {
                timeText = 'in ' + time + ' seconds'
            } else if (Math.floor(time / 60) === 0) {
                timeText = 'in ' + (Math.floor(time / 60)) + ' minute and ' + (time - Math.floor(time / 60) * 60) + ' seconds'
            } else {
                timeText = 'in ' + (Math.floor(time / 60)) + ' minutes and ' + (time - Math.floor(time / 60) * 60) + ' seconds'
            }
            this.add.text(x, y - ydisplacement, timeText, fontStyle).setOrigin(0.5, 0, 5).setDepth(depth)

            var startGameButton = this.add.sprite(x, y + ydisplacement, 'startGameButton').setInteractive().setDepth(depth)
            startGameButton.on('pointerdown', function () {
                if (!gameSession.practiceGame) {
                    gameStats.completion = 'Finished'
                }

                gameStats.resetGameStats()
                gameStats.layout = gameSession.packageLayouts.shift()
                $.getJSON(BASE_URL + '/static/mahjong/Resources/Layouts/' + gameSession.package + '/' + gameStats.layout + '.json?' + (new Date()).getTime(), function (layout) {
                    gameSession.layout = layout
                    game.scene.stop('stats')
                    game.scene.start('play')
                })

            }, this)
        } else if (!gameSession.finishedSession) {
            this.add.text(x, y - ydisplacement, 'You are done the package!', fontStyle).setOrigin(0.5, 0.5).setDepth(depth)
            var finishSessionButton = this.add.sprite(x, y + ydisplacement, 'startGameButton').setInteractive().setDepth(depth)
            finishSessionButton.on('pointerdown', function () {
                if (!gameSession.practiceGame) {
                    gameStats.completion = 'Finished'
                }
                gameStats.resetGameStats()
                game.scene.stop('stats')
                showLobby()
            }, this)
        } else {
            this.add.text(x, y - ydisplacement, 'You are done the Session!', fontStyle).setOrigin(0.5, 0.5).setDepth(depth)
            var finishSessionButton = this.add.sprite(x, y + ydisplacement, 'startGameButton').setInteractive().setDepth(depth)
            finishSessionButton.on('pointerdown', function () {
                //showLobby()
                gameStats.completion = 'Session Over'
                if (!gameSession.practiceGame) {
                }
                gameStats.resetGameStats()
                window.location.replace('/mahjong')
            }, this)
        }
    }
});

/**
 * resizes the game by editing the game renderer.
 * @function resizeGame
 */
function resizeGame(background) {
    var s = gameSession
    var width
    var height

    //determine maximum games size while maintaining a 4:3 ratio
    if (window.innerWidth < window.innerHeight) {
        width = window.innerWidth - 16
        height = window.innerWidth * (0.75) - 16
    }
    if (window.innerWidth > window.innerHeight) {
        width = Math.min(window.innerHeight * (4 / 3), window.innerWidth) - 16
        height = width * (3 / 4) - 16
    }

    game.renderer.resize(width, height, 1)
    game.config.width = width
    game.config.height = height

    //calculate the overall size of the layout
    layoutWidth = (s.sizeX - 1) * s.tileset.tileFaceX + s.tileset.tileX
    layoutHeight = (s.sizeY - 1) * s.tileset.tileFaceY + s.tileset.tileY

    //calculate the optimal tile scaling and necessary offset to center
    scale = Math.min((height * 0.9) / Math.max(layoutWidth, layoutHeight), 1)
    s.scale = scale
    s.offsetX = (width / 2) - ((layoutWidth * scale) / 2)
        + (s.tileset.tileFaceX * scale / 2)
    s.offsetY = (height / 2) - ((layoutHeight * scale) / 2)
        + (s.tileset.tileFaceY * scale / 2)

    background.scaleX = width / background.width
    background.scaleY = height / background.height
}

/**
 * Create a new Game object
 * @function startGame
 */
function startGame() {
    var gameConfig = {
        width: screen.width,
        height: screen.height,
        backgroundColor: '#00422c',
        type: Phaser.AUTO,
        parent: 'gameDiv',
        scene: [play, stats]
    }
    game = new Phaser.Game(gameConfig)
}

/**
 * posts the data to the server
 * @function postData()
 */
function postData() {
    var xhr = new XMLHttpRequest();
    $('.btns').fadeIn(1000);
    var url = SERVER_URL+'/api/createsession'
    gameStats["feedback"] = feedback
    delete gameStats["gameSnapshot"]
    var postData = JSON.stringify(
        {
            'participant': this.participant,
            'staff': this.staff,
            'activity': 'Mahjong',
            'organization_name': organization,
            'score': gameStats['endGameTime'],
            'session_info': gameStats,
        })
    console.log(postData);
    var method = 'POST'
    var shouldBeAsync = true
    var request = new XMLHttpRequest()
    request.open(method, url, shouldBeAsync)
    request.setRequestHeader('Authorization', 'Token ' + this.token)
    request.setRequestHeader('JSON', 'application/json;charset=UTF-8')
    request.setRequestHeader('Content-Type', 'application/json')
    request.send(postData)
}
