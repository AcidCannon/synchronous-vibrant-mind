/**
 * Initializes the lobby with values from assets
 * @function initLobby
 */
function initLobby() {
    // From https://stackoverflow.com/a/46115659
    // Can add date to end of getJSON calls to cache bust
    $.getJSON(BASE_URL + '/static/mahjong/Resources/Layouts/PackageList.json?' + (new Date()).getTime(), function (packages) {
        fillDropBox(packages, 'packageDropBox')
        $.getJSON(BASE_URL + '/static/mahjong/Resources/Layouts/' + packages[0] + '/layouts.json?' + (new Date()).getTime(), function (layouts) {
            fillDropBox(layouts, 'layoutDropBox')
            gameSession.packageLayouts = getPackageLayouts(layouts)
        })
    })

    $.getJSON(BASE_URL + '/static/mahjong/Resources/Tilesets/SetList.json?' + (new Date()).getTime(), function (tilesets) {
        fillDropBox(tilesets, 'tilesetDropBox')
    })

    $.getJSON(BASE_URL + '/static/mahjong/Resources/Themes/ThemeList.json?' + (new Date()).getTime(), function (backgrounds) {
        fillDropBox(backgrounds, 'themeDropBox')
    })

    gameStats.participant = participant
    gameStats.staff = staff
}

/**
 * generic dropBox filling function. takes an element and populates it with the elements of a json array
 * @function fillDropBox
 * @param {json[]} json - json array of options
 */
function fillDropBox(json, elementId) {
    var dropBox = document.getElementById(elementId).options
    for (var i = 0; i < json.length; i++) {
        dropBox.add(new Option(json[i], json[i]), i)
    }
}

/**
 * Returns an Array of layout names for the package given in the json file
 * @function getPackageLayouts
 * @param {json[]} json - json array of layouts in a package
 * @return (Array) - array of layouts within a packages json
 */
function getPackageLayouts(json) {
    console.log('putting in package layouts')
    let layouts = []
    for (let i = 0; i < json.length; i++) {
        layouts.push(json[i])
    }
    return layouts
}

/**
 * When a user selects a new package load which layouts are available in that package and display them
 * @function changePackage
 * @param {string} name - the name of the package selected
 */
function changePackage(name) {
    $('#layoutDropBox').empty()
    $.getJSON(BASE_URL + '/static/mahjong/Resources/Layouts/' + name + '/layouts.json?' + (new Date()).getTime(), function (layouts) {
        fillDropBox(layouts, 'layoutDropBox')
        gameSession.packageLayouts = getPackageLayouts(layouts)
    })
}

/**
 * changes the lobby Divs to visible and hides the gameDiv
 * @function showLobby
 */
function showLobby() {
    //setTimeout(function () {game.destroy(true)}, 1000)
    if (gameSession.timer !== null) {
        document.getElementById('timerMinuteField').value = gameSession.timer.getJustMinutesRemaining()
        document.getElementById('timerSecondField').value = gameSession.timer.getJustSecondsRemaining()
    }

    document.getElementById('lobbyDiv').style.display = 'block'
    document.getElementById('gameDiv').style.display = 'none'
}

/**
 * Loads assets for the game and places them in the GameSession
 * @function showGame
 * @see GameSession
 */
function showGame(practiceGame) {
    document.getElementById('lobbyDiv').style.display = 'none'
    document.getElementById('gameDiv').style.display = 'block'

    gameSession.theme = document.getElementById('themeDropBox').value
    gameSession.hardMode = document.getElementById('hardCheck').checked
    gameSession.enabledHints = document.getElementById('hintCheck').checked
    gameSession.practiceGame = practiceGame

    let packageName = document.getElementById('packageDropBox').value
    let layoutName = document.getElementById('layoutDropBox').value


    gameStats.package = packageName
    gameSession.package = packageName
    gameStats.hintsEnabled = gameSession.enabledHints


    // getJSON is asynchronous, so nesting the rest inside it ensures everything is loaded when startGame is called   
    $.getJSON(BASE_URL + '/static/mahjong/Resources/Layouts/' + gameStats.package + '/layouts.json?' + (new Date()).getTime(), function (layouts) {
        gameSession.packageLayouts = getPackageLayouts(layouts)
        while (gameSession.packageLayouts[0] != layoutName) {
            gameSession.packageLayouts.shift()
        }

        let tileset = document.getElementById('tilesetDropBox').value
        $.getJSON(BASE_URL + '/static/mahjong/Resources/Tilesets/' + tileset + '/tiles.json?' + (new Date()).getTime(), function (tileset) {
            gameSession.tileset = tileset

            $.getJSON(BASE_URL + '/static/mahjong/Resources/Themes/' + gameSession.theme + '/Colours.json?' + (new Date()).getTime(), function (colours) {
                gameSession.colours = colours

                if (!practiceGame) {
                    if (gameSession.timer === null) {
                        let minutes = document.getElementById('timerMinuteField').value
                        let seconds = document.getElementById('timerSecondField').value
                        if (!minutes) {
                            minutes = 0
                        }
                        if (!seconds) {
                            seconds = 0
                        }

                        gameSession.timer = new Timer()
                        gameSession.timer.setTimeout(parseInt(minutes) * 60 + parseInt(seconds), function () {
                            gameSession.timer.pause()
                            console.log(emitter)
                            gameSession.finishedSession = true
                            emitter.emit('endGame')
                        })

                        document.getElementById('timerMinuteField').disabled = true
                        document.getElementById('timerSecondField').disabled = true
                        document.getElementById('timerText').innerText = 'Time Left in Session'
                    }
                }
                if (!gameSession.gameInstatiated) {
                    gameStats.layout = gameSession.packageLayouts.shift()
                    $.getJSON(BASE_URL + '/static/mahjong/Resources/Layouts/' + gameSession.package + '/' + gameStats.layout + '.json?' + (new Date()).getTime(), function (layout) {
                        gameSession.layout = layout
                    })
                    gameSession.gameInstatiated = true
                    startGame()
                } else {
                    gameStats.layout = gameSession.packageLayouts.shift()
                    $.getJSON(BASE_URL + '/static/mahjong/Resources/Layouts/' + gameSession.package + '/' + gameStats.layout + '.json?' + (new Date()).getTime(), function (layout) {
                        gameSession.layout = layout
                        console.log(gameSession.package)
                        console.log(gameStats.layout)
                        game.scene.start('play')
                    })
                }
            })
        })
    })
}
