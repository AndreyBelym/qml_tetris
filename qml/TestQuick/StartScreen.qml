import QtQuick 1.1

Rectangle {
    id: startScreen
    width: 300
    height: 420
    signal startGame
    Column{
        anchors.horizontalCenter: parent.horizontalCenter
        anchors.top: parent.top
        Button{
            text: "New game"
            onClicked: startGame()
        }
        Button{
            text: "Exit"
            onClicked: Qt.quit()
        }
    }
    Keys.onSpacePressed: startGame()
}
