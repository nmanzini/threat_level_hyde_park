function SceneManager(canvas) {

    const clock = new THREE.Clock();
    
    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    }
    
    const scene = buildScene();
    const renderer = buildRender(screenDimensions);
    const camera = buildCamera(screenDimensions);
    const sceneSubjects = createSceneSubjects(scene,camera);

    function buildScene() {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#000");

        // shows axes
        var axesHelper = new THREE.AxesHelper( 5 );
        scene.add( axesHelper );
    
        var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
        scene.add( light );

        var loader = new THREE.GLTFLoader();
        loader.load(
            // resource URL
            'assets/gltf/tree01/tree01.gltf',
            // called when the resource is loaded
            function ( gltf ) {
                tree01 = gltf.scene.children[0]
                tree01.scale.x = 0.01;
                tree01.scale.y = 0.01;
                tree01.scale.z = 0.01;

                // scene.add(tree01)
                for ( var i = 0; i < 500; i ++ ) {
                    var mesh = tree01.clone ();
                    mesh.position.x = Math.random() * 200 - 100;
                    mesh.position.y = 0;
                    mesh.position.z = Math.random() * 200 - 100;
                    mesh.updateMatrix();
                    mesh.matrixAutoUpdate = false;
                    scene.add( mesh );
                }
        
            },
            // called while loading is progressing
            function ( xhr ) {
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            // called when loading has errors
            function ( error ) {
                console.log( 'An error happened' );
            }
        );

        return scene;
    }

    function buildRender({ width, height }) {
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }); 
        const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);

        renderer.gammaInput = true;
        renderer.gammaOutput = true; 

        return renderer;
    }

    function buildCamera({ width, height }) {
        const aspectRatio = width / height;
        const fieldOfView = 60;
        const nearPlane = 1;
        const farPlane = 100; 
        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        camera.position.set(0,4,4);
        camera.rotation.set(0,-Math.PI/2,0)

        return camera;
    }


    function createSceneSubjects(scene,camera) {
        const sceneSubjects = [
            new Car(scene,camera)
        ];

        return sceneSubjects;
    }

    this.camera = camera;



    this.update = () => {
        const elapsedTime = clock.getElapsedTime();

        for(let i=0; i<sceneSubjects.length; i++)
        	sceneSubjects[i].update(elapsedTime,camera);

        renderer.render(scene, camera);
    }

    this.onWindowResize = function() {
        const { width, height } = canvas;

        screenDimensions.width = width;
        screenDimensions.height = height;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
        renderer.setSize(width, height);
    }
}