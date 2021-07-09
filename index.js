
		import * as THREE from './build/three.module.js';

		import { OrbitControls } from './jsm/controls/OrbitControls.js';
		import { TrackballControls } from './jsm/controls/TrackballControls.js';
		import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';

		const textureError =  document.getElementById("texture-error");

		//Init 1
		var wallSpeed = 10;
		var container1;
		var camera1, light1, scene1, renderer1, controls1;
		let wallRangeInput = document.getElementById("wall-speed-input");
		let wallRangeOutput = document.getElementById("wall-speed-output");
		wallRangeInput.addEventListener("input", function () {
			wallRangeOutput.innerHTML = wallSpeed = wallRangeInput.value;
		})
		//Init 2
		var container2;
		var camera2, light2, scene2, renderer2, controls2;
		var clock = new THREE.Clock();
		const rotationRad = -(Math.PI / 2);
		const defaultTexture = 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Heiji_Monogatari_Emaki_-_Sanjo_scroll_part_5_-_v2.jpg';

		let paintUrlInput = document.getElementById('paint-url');
		let paintSubmitInput = document.getElementById('paint-btn');
		paintSubmitInput.addEventListener("click", function () {
			loadPaintTexture(paintUrlInput.value)
		});

		//commun event
		window.addEventListener('resize', onWindowResize, false);
		init1();
		init2();
		animate();

		function init1() {

			container1 = document.getElementById("first")

			camera1 = new THREE.PerspectiveCamera(45, container1.offsetWidth / container1.offsetHeight, 0.25, 100);
			camera1.position.set(0, -1, 0);

			scene1 = new THREE.Scene();

			light1 = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.5);
			scene1.add(light1);

			const light = new THREE.PointLight(0xd2a689, 1, 40);
			light.position.set(0, 0, 0);
			scene1.add(light);

			var loader = new GLTFLoader().setPath('models/_Custom/infinty/');
			loader.load('HugeWall.gltf', function (gltf) {
				gltf.scene.name = "wall1"
				scene1.add(gltf.scene);
				let m = scene1.getObjectByName("wall1");
				if (m) {
				}
				render1();
			});
			loader.load('HugeWall.gltf', function (gltf) {
				gltf.scene.name = "wall2"
				scene1.add(gltf.scene);
				let m = scene1.getObjectByName("wall2");
				if (m) {
					m.position.y = 10;
				}
				render1();
			});
			loader.load('HugeWall.gltf', function (gltf) {
				gltf.scene.name = "wall3"
				scene1.add(gltf.scene);
				let m = scene1.getObjectByName("wall3");
				if (m) {
					m.position.y = 20;
				}
				render1();
			});
			loader.load('HugeWall.gltf', function (gltf) {
				gltf.scene.name = "wall4"
				scene1.add(gltf.scene);
				let m = scene1.getObjectByName("wall4");
				if (m) {
					m.position.y = 30;
				}
				render1();
			});
			renderer1 = new THREE.WebGLRenderer({ antialias: true });
			renderer1.setPixelRatio(window.devicePixelRatio);
			renderer1.setSize(container1.offsetWidth, container1.offsetHeight);
			renderer1.toneMapping = THREE.ACESFilmicToneMapping;
			renderer1.toneMappingExposure = 0.8;
			renderer1.outputEncoding = THREE.sRGBEncoding;
			renderer1.setClearColor(new THREE.Color("#1c1514"), 1.0)
			container1.appendChild(renderer1.domElement);

			controls1 = new TrackballControls(camera1, renderer1.domElement);

			controls1.target.set(0, 0, 0);
		}

		function init2() {
			container2 = document.getElementById("second")

			camera2 = new THREE.PerspectiveCamera(45, container2.offsetWidth / container2.offsetHeight, 0.25, 40);
			camera2.position.set(0.0, 0.0, 15);

			scene2 = new THREE.Scene();

			light2 = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
			scene2.add(light2);

			var loader = new GLTFLoader().setPath('models/_Custom/painting/');
			loader.load('frame.gltf', function (gltf) {
				gltf.scene.name = "frame"
				scene2.add(gltf.scene);
				let f = scene2.getObjectByName("frame");
				if (f) {
					f.rotateY(rotationRad);
				}
				render2();
			});

			const geometry = new THREE.PlaneGeometry(9.4, 5.2);
			const material = new THREE.MeshBasicMaterial({ color: 0xE4E5E2, side: THREE.DoubleSide });
			const plane = new THREE.Mesh(geometry, material);
			plane.name = "paint";
			scene2.add(plane);

			loadPaintTexture(defaultTexture);

			renderer2 = new THREE.WebGLRenderer({ antialias: true });
			renderer2.setPixelRatio(window.devicePixelRatio);
			renderer2.setSize(container2.offsetWidth, container2.offsetHeight);
			renderer2.toneMapping = THREE.ACESFilmicToneMapping;
			renderer2.toneMappingExposure = 0.8;
			renderer2.outputEncoding = THREE.sRGBEncoding;
			renderer2.setClearColor(new THREE.Color('#B6AA95'), 1.0)
			container2.appendChild(renderer2.domElement);

			controls2 = new TrackballControls(camera2, renderer2.domElement);
			controls2.target.set(0, 0, 0);

			window.addEventListener('resize', onWindowResize, false);

		}

		function animate() {
			requestAnimationFrame(animate);
			animateScene1();
			animateScene2();
		}

		function animateScene1() {
			controls1.update();
			let m1 = scene1.getObjectByName("wall1");
			let m2 = scene1.getObjectByName("wall2");
			let m3 = scene1.getObjectByName("wall3");
			let m4 = scene1.getObjectByName("wall4");
			if (m1 && m2 && m3 && m4) {
				m1.position.y -= wallSpeed / 100;
				m2.position.y -= wallSpeed / 100;
				m3.position.y -= wallSpeed / 100;
				m4.position.y -= wallSpeed / 100;
				if (m1.position.y < -5) {
					m1.position.y = 35;
				}
				if (m2.position.y < -5) {
					m2.position.y = 35;
				}
				if (m3.position.y < -5) {
					m3.position.y = 35;
				}
				if (m4.position.y < -5) {
					m4.position.y = 35;
				}
			}
			renderer1.render(scene1, camera1);
		}

		function animateScene2() {
			controls2.update();
			renderer2.render(scene2, camera2);
		}

		function loadPaintTexture(textureUrl) {
			new THREE.TextureLoader().load(textureUrl, loadPaintCallBack, undefined, function (err) { textureError.innerHTML = 'An error happened.';});
		}
		
		function loadPaintCallBack(texture) {
			let p = scene2.getObjectByName("paint");
			if (p) {
				p.material.map = texture;
				p.material.needsUpdate = true;
			}
		}

		function onWindowResize() {

			camera1.aspect = container1.offsetWidth / container1.offsetHeight;
			camera1.updateProjectionMatrix();
			renderer1.setSize(container1.offsetWidth, container1.offsetHeight);
			controls1.handleResize();
			render1();

			camera2.aspect = container2.offsetWidth / container2.offsetHeight;
			camera2.updateProjectionMatrix();
			renderer2.setSize(container2.offsetWidth, container2.offsetHeight);
			controls2.handleResize();
			render2();
		}

		function render1() {
			renderer1.render(scene1, camera1);
		}

		function render2() {
			renderer2.render(scene2, camera2);
		}