function Car(scene, camera) {
	
	// const radius = 2;
	// const car = new THREE.Mesh(
	// 	new THREE.IcosahedronBufferGeometry(radius, 2),
	// 	new THREE.MeshStandardMaterial({ flatShading: true })
	// 	);

	console.log(camera);
	

	var geometry = new THREE.BoxGeometry( 3, 1, 2 );
	var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
	var car = new THREE.Mesh( geometry, material );



	let direction_v = new THREE.Vector3(0.2,0,0);


	var vertical_axis = new THREE.Vector3( 0, 1, 0 );
	var angle = Math.PI / 30;

	
	car.position.set(0, 0, 0);

	let keyState = {};
	window.addEventListener('keydown',function(e){
		keyState[e.keyCode || e.which] = true;
	},true);    
	window.addEventListener('keyup',function(e){
		keyState[e.keyCode || e.which] = false;
	},true);
	
	function updateUserMovement()
	{
		if (keyState[37] || keyState[65]){	// 'a'
			direction_v.applyAxisAngle( vertical_axis, angle );
			car.rotation.y+= angle ;
			camera.rotation.y+= angle ;
		}    
		if (keyState[39] || keyState[68]){	// 'd'
			direction_v.applyAxisAngle( vertical_axis, -angle );
			car.rotation.y-= angle ;
			camera.rotation.y-= angle ;		}
	}
	
	scene.add(car);


	this.update = function(time,camera) {
		updateUserMovement();
		car.position.add(direction_v);
		camera.position.add(direction_v);
	}
}