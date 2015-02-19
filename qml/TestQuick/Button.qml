import QtQuick 1.1

Rectangle {
    width: 100
    height: 62
    border.color: "black"
    property string text: ""
    Text{
        text: parent.text
        anchors.centerIn: parent
    }
    signal clicked


    MouseArea{
        anchors.fill: parent
        onClicked: parent.clicked()
    }
}
