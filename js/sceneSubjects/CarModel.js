class CarModel{
    
    constructor(mesh,Acceleration,PeakVelocity,TurningAcceleration,Damage,TurningPeakVelocity){
        this.Acceleration = Acceleration;
        this.PeakVelocity = PeakVelocity;
        this.TurningPeakVelocity = TurningPeakVelocity;
        this.Damage = Damage;
        this.TurningAcceleration = TurningAcceleration;
        this.Velocity = new THREE.Vector3(0.01,0,0);
        this.Car = mesh;
        this.VerticalAxis = new THREE.Vector3( 0, 1, 0 );
        this.Angle = 0;
        this.Car.position.set(0, 0, 0);
        
    }

    
    
    accelerateTurnAngle()
    {
        // console.log("TURN",this.Angle, "Turn peak",this.TurningPeakVelocity, "Angle", this.Angle);
        if (this.Angle < this.TurningPeakVelocity)
        {   
            this.Angle = this.Angle + this.TurningAcceleration;
        }
        if (this.Angle >= this.TurningPeakVelocity)
        {
            this.Angle = this.TurningPeakVelocity;
        }
    }

    decelerateTurnAngle()
    {
        if (this.Angle > 0)
        {   
            this.Angle = this.Angle - 2*this.TurningAcceleration;
        }
        if (this.Angle <= 0)
        {
            this.Angle = 0;
        }   
    }

    turn(Direction){
        // console.log(Direction);
        this.accelerateTurnAngle();
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
            // console.log('Incorrect Direction');
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
        // console.log(this.Velocity.length());
        if (this.Velocity.length() > 0.001)
        {   
            this.Velocity.setLength(this.Velocity.length() - (0.5 * this.Acceleration));
        }
        this.Velocity.clampLength(0.15,this.PeakVelocity);
    }

    updatePos(){
        // this.accelerate();
        this.Car.position.add(this.Velocity);
    }
}