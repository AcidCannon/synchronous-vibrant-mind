/** JavaScript singleton design pattern for storing game statistics data */
let GameStats = function () {
    'use strict'

    if (!GameStats.instance) {
        console.log('Singleton.instance is undefined. Creating singleton...')

        let gameNumber = 1

        let statistics = {
            gameNumber: 1,
            package: null,
            layout: null,
            selections: 0,
            deselections: 0,
            correctMatches: 0,
            incorrectMatches: 0,
            hintsEnabled: false,
            hintsUsed: 0,
            timesShuffled: 0,
            completion: null,
            startGameTime: 0,
            endGameTime: 0,
            
            gameSnapshot: {
                boardConfig: [],
                events: []
            },

            setInstance: function () {
                GameStats.instance = this
            },

            resetGameStats: function() {
                if (!gameSession.practiceGame) {
                    this.gameNumber += 1
                }
                this.package = null
                this.layout = null
                this.selections = 0
                this.deselections = 0
                this.correctMatches = 0
                this.incorrectMatches = 0
                this.hintsEnabled = false
                this.hintsUsed = 0
                this.timesShuffled = 0
                this.completion = null
                this.startGameTime = 0
                this.endGameTime = 0
                
                this.gameSnapshot = {
                    boardConfig: [],
                    events: []
                }
            },

            /**
             * Sends all of the data to the server to be stored
             * @function postGameStats
             */
            postGameStats: function() {
                //let today = getDate()
                if (this.completion === null) {
                    if (gameProperties.finishedSession) {
                        this.completion = 'Session Ended'
                    } else {
                        this.completion = 'Quit'
                    }
                }
                let xhr = new XMLHttpRequest();
                let url = 'https://vibrant-minds.org/vibrantminds2/api/createevent'
                let postData = JSON.stringify(
                    {
                        'event':{
                            'gameNumber': this.gameNumber,
                            'level': this.level,
                            'deselections': this.deselections,
                            'correctMatches': this.correctMatches,
                            'incorrectMatches': this.incorrectMatches,
                            'hintsEnabled': this.hintsEnabled,
                            'hintsUsed': this.hintsUsed,
                            'completion': this.completion,
                            'score': this.score,
                            'duration': this.duration,
                            
                            
                            'gameSnapshot': this.gameSnapshot
                        }
                    })
                let method = 'POST'
                let shouldBeAsync = true
                let request = new XMLHttpRequest()
                request.open(method, url, shouldBeAsync)
                request.setRequestHeader('Authorization', 'Token ' + this.token)
                request.setRequestHeader('JSON', 'application/json;charset=UTF-8')
                request.setRequestHeader('Content-Type', 'application/json')
                request.send(postData)
            },
        }

        // Set the instance as a reference to the statistics object
        statistics.setInstance()
        return statistics

    }
    else {
        //console.warn('Singleton already has an instance, here it is: ' + GameStats.instance)
        return GameStats.instance
    }
}

let gameStats = new GameStats()