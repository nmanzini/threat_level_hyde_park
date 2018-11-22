function SceneManager(canvas) {
    
    const clock = new THREE.Clock();
    
    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    }
    
    const scene = buildScene();
    const renderer = buildRender(screenDimensions);
    const camera = buildCamera(screenDimensions);
    let sceneSubjects = [];
    var loader = new THREE.GLTFLoader();
    loader.load(
		// resource URL
		'assets/gltf/car01/1377 Car.gltf',
		// called when the resource is loaded
		
		function ( gltf ) {
            car = gltf.scene.children[0]
            car.scale.x = 0.06
            car.scale.y = 0.06
            car.scale.z = 0.06

            car.rotation.y = Math.PI/2
            sceneSubjects = createSceneSubjects(scene,camera,car);
		},
		// called while loading is progressing
		function ( xhr ) {
			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		},
		// called when loading has errors
		function ( error ) {
			console.log( 'An error happened' );
		}
	)
    
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
                    let posX, posZ;
                    posX = Math.random() * 200 - 100;
                    posZ = Math.random() * 200 - 100;

                    // Make sure trees do not spawn at car spawn spot
                    // Radius around car is currently 10 x 10
                    while((Math.abs(posX = Math.random() * 200 - 100) < 10) && (Math.abs(posZ = Math.random() * 200 - 100) < 10));                    mesh.position.x = posX;

                    mesh.position.y = 0;
                    mesh.position.z = posZ;
                    mesh.updateMatrix();
                    mesh.matrixAutoUpdate = false;
                    scene.add( mesh );
                }
                let limit = 200;
                for ( var i = -1*(limit/2); i < limit/2; i ++ ) {
                    for(let j=0; j<4; j++)
                    {
                        var mesh1 = tree01.clone ();
                        
                        mesh1.position.x =  Math.pow(-1,parseInt((j)/2)) * Math.pow(limit/2, (j+1)%2) * Math.pow(i,j%2);
                        mesh1.position.y = 0;
                        mesh1.position.z = Math.pow(-1,parseInt((j)/2)) * Math.pow(limit/2, (j)%2) * Math.pow(i,(j+1)%2);
                        mesh1.updateMatrix();
                        mesh1.matrixAutoUpdate = false;
                        scene.add( mesh1 );    
                    }
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
            camera.position.set(0,25,25);
            camera.rotation.set(-Math.PI/4,0,0)
            
            return camera;
        }
        
        
        function createSceneSubjects(scene,camera,mesh) {
            const sceneSubjects = [
                new Car(scene,camera,mesh)
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