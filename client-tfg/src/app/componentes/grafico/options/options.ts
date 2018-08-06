export let options = {
      edges: {
        color: 'grey',
        arrows: {
          to: { enabled: true, scaleFactor: 1 }
        },
        smooth: false
      },
      interaction: {
        selectConnectedEdges: false,
        multiselect: true
      },
      physics: {
        hierarchicalRepulsion: {
          nodeDistance: 0,
          springConstant: 0
        }
      },
      groups: {
        Direct: {
          shape: 'circularImage',
          size: 15,
          shapeProperties: { borderDashes: [0, 30] },
          image: '../assets/images/Directo.jpg'
        },
        Division: {
          shape: 'circularImage',
          size: 15,
          shapeProperties: { borderDashes: [0, 30] },
          image: '../assets/images/Division.png'
        },
        Fusion: {
          shape: 'circularImage',
          size: 15,
          shapeProperties: { borderDashes: [0, 30] },
          image: '../assets/images/Fusion.png'
        },
        Increment: {
          shape: 'circularImage',
          size: 15,
          shapeProperties: { borderDashes: [0, 30] },
          image: '../assets/images/Incremento.jpeg'
        },
        Incremented: {
          shape: 'circularImage',
          size: 15,
          shapeProperties: { borderDashes: [0, 30] },
          image: '../assets/images/Incrementado.png'
        },
        Reused: {
          shape: 'circularImage',
          size: 15,
          shapeProperties: { borderDashes: [0, 30] },
          image: '../assets/images/Reutilizado.png'
        },
        Warning: {
          shape: 'circularImage',
          size: 15,
          shapeProperties: { borderDashes: [0, 30] },
          color: { background: 'red' },
          image: '../assets/images/Division.png'
        },
        Iteraciones: {
          shape: 'circularImage',
          size: 10,
          color: {
            border: 'grey',
            background: 'white'
          }
        }
      },
      nodes: {
        physics: false,
        color: {
          background: 'white'
        }
      }
    };
