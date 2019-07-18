/*globals THREE */
(() => {
    var dom = document.querySelector('canvas'),
    width = window.innerWidth,
    height = window.innerHeight,
    mp = Math.PI,
    reqRet,
    rad = function(r){return r * (Math.PI / 180);};

    (function(w,r){
        w['r'+r] = w['r'+r] ||
        w['webkitR'+r] ||
        w['mozR'+r] ||
        w['oR'+r] ||
        w['msR'+r] ||
        function(callback){w.setTimeout(callback,1000/60);};
    })(window,'equestAnimationFrame');

    (function(w,c){
        w['c'+c] = w['c'+c] ||
        w['webkitC'+c] ||
        w['mozC'+c] ||
        w['oC'+c] ||
        w['msC'+c] ||
        function(callback){w.clearTimeout(callback);};
    })(window,'ancelAnimationFrame');

    var renderer = new THREE.WebGLRenderer({
        canvas:dom
    });
    renderer.setSize(width,height);
    renderer.setPixelRatio(window.devicePixelRatio);

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(75,width / height,1,1000);
    camera.position.set(0, 0, 0);
    scene.add(camera);

    var geometry = new THREE.SphereGeometry(5,60,40);
    geometry.scale(-1,1,1);

    var mat = new THREE.MeshBasicMaterial({
      map:new THREE.TextureLoader().load('image.jpg')
    });

    var sphere = new THREE.Mesh(geometry,mat);
    scene.add(sphere);

    //OrbitControls
    var ctrl = new THREE.OrbitControls(camera,dom);
    ctrl.target.set(
      camera.position.x,
      camera.position.y,
      camera.position.z - 0.01
    );
    ctrl.enableDamping = true;
    ctrl.dampingFactor = 0.2;
    ctrl.enableZoom = false;
    ctrl.enablePan = false;


    //毎秒描画
    var load = function(){
        ctrl.update();
        renderer.render(scene,camera);
        requestAnimationFrame(load);
    };
    load();


    $(window).on('resize',function(){
        var w = window.innerWidth,
        h = window.innerHeight;
        renderer.setSize(w,h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    });
})();
