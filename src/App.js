import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'storm-react-diagrams/dist/style.min.css';
import * as SRD from "storm-react-diagrams";

class App extends Component {
  constructor(props){
    super(props);
    this.state = { saved: null, engine: {} }
  }

  componentWillMount(){

    // 1) setup the diagram engine
    var engine = new SRD.DiagramEngine();
    engine.installDefaultFactories();

    engine.version = 0;
    this.setState({ engine : engine});

    // 2) setup the diagram model
    var model = new SRD.DiagramModel();
    engine.setDiagramModel(model);

    // 3) create a default node
    var node1 = new SRD.DefaultNodeModel("Node 1", "rgb(0,192,255)");
    let port1 = node1.addOutPort("Out");
    node1.setPosition(100, 100);

    // 4) create another default node
    var node2 = new SRD.DefaultNodeModel("Node 2", "rgb(192,255,0)");
    let port2 = node2.addInPort("In");
    node2.setPosition(400, 100);

    // 5) link the ports
    let link1 = port1.link(port2);

    // 6) add the models to the root graph
    model.addAll(node1, node2, link1);

    // 7) load model into engine

    console.log('engine created');
  }

  render() {
    const engine = this.state.engine;
    if (!engine) {
      console.log('has no engine');
    }
    if (engine) {
      console.log('has engine');
      //engine.forceUpdate();
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div style={{width:'100%', height:'400px', border: '1px solid red', backgroundColor: 'lightblue'}}>
          <SRD.DiagramWidget className="srd-demo-canvas" diagramEngine={engine} smartRouting={false} />
        </div>
      </div>
    );
  }
}

export default App;
