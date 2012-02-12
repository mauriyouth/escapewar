/**
 * VX-0 Object
 *
 * @extends ship
 * 
 * @param spec {id, owner, 
 *              position, orientation,
 *              velocity, rotation, GL}
 */
var vx0 = function(spec, my) {
    var my = my || {};
    var _super = {};

    spec.model = 'vx0';    
    spec.invmass = 0.2;
    spec.invinertia = 2.002;
    spec.radius = 15;
    spec.thrust = { push: 0.002, rot: 0.005 };

    my.GL = spec.GL;
    my.size = 4;
    my.shipvx = voxel({GL: my.GL,
		       size: my.size});
    my.simvx =  voxel({GL: my.GL,
		       size: my.size / 2.0});

    // public
    var render;    /* render() */
    var simulate;  /* simulate() */

    var that = ship(spec, my);    


    /**
     * renders the object (step)
     */
    render = function() {	
	my.shipvx.setColor([0, 1, 0, 1]);

	mat4.translate(my.GL.mvMatrix(), [my.size, -my.size, 0.0]);	
	my.shipvx.draw();
	mat4.translate(my.GL.mvMatrix(), [-2*my.size, 0.0, 0.0]);	
	my.shipvx.draw();

	my.shipvx.setColor([1, 0, 0, 1]);

	mat4.translate(my.GL.mvMatrix(), [my.size, 2*my.size, 0.0]);	
	my.shipvx.draw();
    };

    /**
     * simulate and render trajectory
     */ 
    simulate = function() {	
	var s = _super.simulate(config.SIMULATION_LEN, 200);	
	for(var i = 0; i < config.SIMULATION_LEN; i++) {
	    my.simvx.setColor([0.4 - 0.3 / config.SIMULATION_LEN * i, 
			       0.4 - 0.3 / config.SIMULATION_LEN * i,
			       0.4 - 0.3 / config.SIMULATION_LEN * i, 1]);
	    mat4.identity(my.GL.mvMatrix());
	    mat4.translate(my.GL.mvMatrix(), [s[i].x,
					      s[i].y,
					      0]);	    
	    my.simvx.draw();
	}
    }

    method(that, 'render', render, _super);
    method(that, 'simulate', simulate, _super);

    return that;
};
