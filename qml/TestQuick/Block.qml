import QtQuick 1.1
import Qt.labs.particles 1.0

Item{
    id: block
    property int row:0
    property int col:0
    property bool dropped: false
    property bool died: false
    property color color: "blue"
    width: parent.blockWidth
    height: parent.blockHeight
    x:width*col
    y:height*row

    Rectangle{
        id: rect
        anchors.fill: parent
        radius: 10
        border.width: 2
        smooth: true
        gradient: Gradient {
             GradientStop { position: 0.0; color: Qt.lighter(block.color) }
             GradientStop { position: 0.5; color: block.color }
             GradientStop { position: 1.0; color: Qt.lighter(block.color) }
        }  
    }
    Behavior on y{
        enabled: dropped
        SpringAnimation{
            spring: 5; damping: 0.2
        }
    }
    Particles {
             id: particles

             width: 1; height: 1
             anchors.centerIn: parent

             emissionRate: 0
             lifeSpan: 700; lifeSpanDeviation: 600
             angle: 0; angleDeviation: 360;
             velocity: 100; velocityDeviation: 30
             source: "blueStar.png";

         }
    states:[
      State{
        name: "Death"
        when: died
        StateChangeScript{
            script: {
                particles.burst(100)
                rect.opacity=0
                block.destroy(700)
            }
        }
     }
    ]

}
