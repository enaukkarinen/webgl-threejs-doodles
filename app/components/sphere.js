import {
  Scene, WebGLRenderer, CanvasRenderer,
  AmbientLight, PerspectiveCamera, Mesh,
  SphereGeometry, MeshBasicMaterial
} from 'three';

export default function createSphere(elementId) {
  const scene = new Scene();
  const renderer = window.WebGLRenderingContext ? new WebGLRenderer() : new CanvasRenderer();
  const light = new AmbientLight(0xffffff);
  let camera;
  let sphere;

  function initScene() {
    const doc = document.getElementById(elementId);

    renderer.setSize(300, 300);
    doc.appendChild(renderer.domElement);
    scene.background = 'transparent';
    scene.add(light);

    /**
     * PerspectiveCamera params
     * 1. frustrum vertical field-of-view
     * 2. aspect ratio (width/height)
     * 3. near
     * 4. far
     */
    camera = new PerspectiveCamera(
      35,
      1,
      1,
      1000);

    camera.position.z = 100;

    scene.add(camera);


    /**
     * Meshes
     * Vertices: positions in space defines as x, y, z coordinates.
     * Faces: connect vertices together
     */
    const material = new MeshBasicMaterial({
      color: 'red',
      wireframe: true
    });

    sphere = new Mesh(
      new SphereGeometry(15, 16, 16),
      material
    );

    sphere.name = 'ensio';

    scene.add(sphere);
  }

  function render() {
    sphere.rotation.y += 0.01;
    sphere.rotation.x += 0.01;
    renderer.render(scene, camera);
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
     * The window.requestAnimationFrame() method tells the browser that
     * you wish to perform an animation and requests that the browser
     * call a specified function to update an animation before the next
     * repaint. The method takes as an argument a callback to be invoked
     * before the repaint.
     */
    requestAnimationFrame(render);
  }

  initScene();
  render();
}
