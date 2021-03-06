
import React from 'react';
import {
  Scene, WebGLRenderer, CanvasRenderer,
  AmbientLight, PerspectiveCamera, Mesh,
  SphereGeometry, MeshBasicMaterial
} from 'three';

export default class Sphere extends React.Component {

  static propTypes = {
    width: React.PropTypes.string.isRequired,
    height: React.PropTypes.string.isRequired,
    distance: React.PropTypes.string,
    color: React.PropTypes.string
  }

  static defaultProps = {
    distance: '75',
    color: 'white'
  }

  constructor() {
    super();
    this.scene = new Scene();
    this.renderer = window.WebGLRenderingContext ?
      new WebGLRenderer({ alpha: true }) : new CanvasRenderer({ alpha: true });

    Sphere.instanceId = Sphere.instanceId ? Sphere.instanceId + 1 : 1;

    this.id = `sphere-${Sphere.instanceId}`;
  }

  componentDidMount() {
    this.initScene();
  }

  shouldComponentUpdate() {
    // You can access `this.props` and `this.state` here
    // This function should return a boolean, whether the component should re-render.
    return false;
  }


  initScene() {
    this.renderer.setSize(this.props.width, this.props.height);
    document.getElementById(this.id).appendChild(this.renderer.domElement);
    this.scene.background = 'transparent';
    this.scene.add(new AmbientLight(0xffffff));

    /**
     * PerspectiveCamera params
     * 1. frustrum vertical field-of-view
     * 2. aspect ratio (width/height)
     * 3. near
     * 4. far
     */
    this.camera = new PerspectiveCamera(
      35,
      1,
      1,
      100);

    this.camera.position.z = this.props.distance || 50;

    this.scene.add(this.camera);

    /**
     * Meshes
     * Vertices: positions in space defines as x, y, z coordinates.
     * Faces: connect vertices together
     */
    this.sphere = new Mesh(
      new SphereGeometry(15, 8, 8),
      new MeshBasicMaterial({ color: this.props.color || 'white', wireframe: true })
    );

    this.sphere.name = 'ensio';
    this.scene.add(this.sphere);

    this.nextFrame();
  }

  nextFrame() {
    this.sphere.rotation.y += 0.005;
    // this.sphere.rotation.x += 0.01;
    this.renderer.render(this.scene, this.camera);

    setTimeout(() => {
      this.forceUpdate(this.nextFrame);
    });
  }

  render() {
    return (
      <div id={this.id} />);
  }

}
