import QtQuick 1.1
Rectangle {
    id: tetrisGame
    width: 300
    height: 420
    GameScreen{
        id: gameScreen
        visible: false
        onStopGame: {
            visible=false
            pauseScreen.focus=true
            pauseScreen.visible=true
        }
        Timer {
            id: go_timer
            interval: 1000
            onTriggered: {
                parent.visible=false
                startScreen.focus=true
                startScreen.visible=true
            }
        }

        onGameOver: {
            focus=false
            clear()
            go_timer.running=true
        }
    }
    StartScreen{
        id: startScreen
        focus: true
        onStartGame: {
            visible=false
            gameScreen.focus=true
            gameScreen.visible=true
            gameScreen.init()
            gameScreen.startGame()
        }
    }
    PauseScreen{
        id: pauseScreen
        visible:false
        onStartGame: {
            visible=false
            gameScreen.focus=true
            gameScreen.visible=true
            gameScreen.startGame()
        }
        onShowMenu: {
            visible=false
            startScreen.focus=true
            startScreen.visible=true
        }
    }
}

