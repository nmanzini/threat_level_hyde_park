class CarModel{
    
    constructor(Geometry,Material,Acceleration,PeakVelocity,TurningRadius,Damage,TurningPeakVelocity){
        this.Acceleration = Acceleration;
        this.PeakVelocity = PeakVelocity;
        this.TurningPeakVelocity = TurningPeakVelocity;
        this.Damage = Damage;
        this.TurningRadius = TurningRadius;
        this.Velocity = new THREE.Vector3(0.01,0,0);
        this.Car = new THREE.Mesh( Geometry, Material );
        this.VerticalAxis = new THREE.Vector3( 0, 1, 0 );
	    this.Angle = Math.PI / 30;
    }
    
    turn(Direction){
        // console.log(Direction);
        if (Direction == 'left')
        {   
            this.Velocity.applyAxisAngle( this.VerticalAxis, this.Angle );
            this.Car.rotateOnAxis(this.VerticalAxis,this.Angle);
        }
        else if (Direction == 'right'){
            this.Velocity.applyAxisAngle( this.VerticalAxis, -this.Angle );
            this.Car.rotateOnAxis(this.VerticalAxis,-this.Angle);
        }
        else{
            console.log('Incorrect Direction');
        }
        this.decelerate();
    }
    accelerate(){
        if (this.Velocity.length() < this.PeakVelocity)
        {   this.Velocity.setLength(this.Velocity.length() + this.Acceleration);
        }
        if (this.Velocity.length() >= this.PeakVelocity)
        {
            this.Velocity.clampLength(0,this.PeakVelocity);
        }
    }

    decelerate(){
        console.log(this.Velocity.length());
        if (this.Velocity.length() > 0.001)
        {   
            this.Velocity.setLength(this.Velocity.length() - (0.7 * this.Acceleration));
        }
        this.Velocity.clampLength(0.15,this.PeakVelocity);
    }

    updatePos(){
        // this.accelerate();
        this.Car.position.add(this.Velocity);
    }
}