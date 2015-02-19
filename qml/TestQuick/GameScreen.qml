import QtQuick 1.1
import "tetris.js" as Tetris

Rectangle {
    id: canvas
    width: 300
    height: 420
    property int blockWidth: 30
    property int blockHeight: 30

    signal init
    signal clear
    signal gameOver
    signal stopGame
    signal startGame

    onInit: Tetris.init()
    onClear: Tetris.clear()
    onGameOver: timer.stop()
    onStartGame: timer.start()
    onStopGame: timer.stop()

    //Component.onCompleted: init()

    Keys.onLeftPressed: Tetris.moveLeft()
    Keys.onRightPressed: Tetris.moveRight()
    Keys.onDownPressed: Tetris.doDrop()
    Keys.onUpPressed: Tetris.revert()

    Keys.onSpacePressed: stopGame()

    Timer{
        id: timer
        interval: 500
        running: false; repeat: true
        onTriggered: Tetris.doTurn()
    }
    Text{
        visible: !timer.running
        anchors.bottom: parent.bottom
        anchors.horizontalCenter: parent.horizontalCenter
        font.pixelSize: 12
        color: "red"
        text: "Paused"
    }
}
