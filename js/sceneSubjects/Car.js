function Car(scene, camera) {
	
	// const radius = 2;
	// const car = new THREE.Mesh(
	// 	new THREE.IcosahedronBufferGeometry(radius, 2),
	// 	new THREE.MeshStandardMaterial({ flatShading: true })
	// 	);

	var geometry = new THREE.BoxGeometry( 3, 1, 2 );
	var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
	var car = new THREE.Mesh( geometry, material );



	let direction_v = new THREE.Vector3(0.2,0,0);


	var vertical_axis = new THREE.Vector3( 0, 1, 0 );
	var angle = Math.PI / 30;

	
	car.position.set(0, 0, 0);

	var keyState = {};

	function getKeyCode(key1,key2)
	{
		if(key1 == 65 || key2 == 65 || key1==37 || key2 == 37)	return 'left';
		if(key1 == 68 || key2 == 68 || key1==39 || key2 == 39)	return 'right';
	}

	document.addEventListener('contextmenu', event => event.preventDefault());

	window.addEventListener('touchstart', function(e) {
		if(e.touches[0].screenX < this.window.innerWidth/2)
			keyState['left'] = true;
		if(e.touches[0].screenX > this.window.innerWidth/2)
			keyState['right'] = true;	
	},true);

	window.addEventListener('touchend', function(e) {
		// When touch lifted, all turning stops
		// Solved problem case: startTouch in right half and move finger to left half, then lift
		keyState['left'] = false;
		keyState['right'] = false;
	},true);

	window.addEventListener('keydown',function(e){
		this.console.log(getKeyCode(e.keyCode, e.which));
		keyState[getKeyCode(e.keyCode, e.which)] = true;
	},true);    
	window.addEventListener('keyup',function(e){
		keyState[getKeyCode(e.keyCode, e.which)] = false;
	},true);
	
	function updateUserMovement()
	{
		if (keyState['left']){
			direction_v.applyAxisAngle( vertical_axis, angle );
			car.rotation.y+= angle ;
			camera.rotation.y+= angle ;
		}    
		if (keyState['right']){
			direction_v.applyAxisAngle( vertical_axis, -angle );
			car.rotation.y-= angle ;
			camera.rotation.y-= angle ;		
		}
	}
	
	scene.add(car);


	this.update = function(time,camera) {
		updateUserMovement();
		car.position.add(direction_v);
		camera.position.add(direction_v);
	}
}