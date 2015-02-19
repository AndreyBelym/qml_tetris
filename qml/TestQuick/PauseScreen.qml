import QtQuick 1.1

Rectangle {
    id: startScreen
    width: 300
    height: 420
    signal startGame
    signal showMenu
    Column{
        anchors.horizontalCenter: parent.horizontalCenter
        anchors.top: parent.top
        Button{
            text: "Continue"
            onClicked: startGame()
        }
        Button{
            text: "Main menu"
            onClicked: showMenu()
        }
        Button{
            text: "Exit"
            onClicked: Qt.quit()
        }
    }
}
