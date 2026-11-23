import * as THREE from 'three';

const PALETTES = {
  'deep-sea': { ink: 0x0d1b2a, prussian: 0x1b263b, surface: 0x1b263b, dusk: 0x415a77, lavender: 0x778da9, alabaster: 0xe0e1dd },
  'forest-signal': { ink: 0x10211d, prussian: 0x1b352e, surface: 0x1b352e, dusk: 0x456b5d, lavender: 0x94aa8d, alabaster: 0xe4e8dc },
  'ember-archive': { ink: 0x24191b, prussian: 0x3a262b, surface: 0x3a262b, dusk: 0x7b5259, lavender: 0xbb8580, alabaster: 0xefe6dc },
  'twilight-purple-dreams': { ink: 0x171738, prussian: 0x2e1760, surface: 0x2e1760, dusk: 0x3423a6, lavender: 0x7180b9, alabaster: 0xdff3e4 },
  'deep-sea-symphony': { ink: 0x071013, prussian: 0x23b5d3, surface: 0x102a32, dusk: 0x75abbc, lavender: 0xa2aebb, alabaster: 0xdfe0e2 }
};
let COLORS = PALETTES[document.documentElement.dataset.palette] || PALETTES['deep-sea'];
const DISTRICTS = {
  operations: { name: 'OPS BAY', center: [-16, -14], color: COLORS.alabaster },
  tools: { name: 'WEB TOOLS', center: [18, -14], color: COLORS.lavender },
  arcade: { name: 'ARCADE REEF', center: [0, 18], color: COLORS.lavender },
  archive: { name: 'FIELD NOTES', center: [27, 18], color: COLORS.dusk }
};

function makeLabelTexture(title, subtitle, theme, paletteId) {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 150;
  const context = canvas.getContext('2d');
  const dark = theme === 'dark';
  const palette = PALETTES[paletteId] || PALETTES['deep-sea'];
  const cssColor = function (value) { return '#' + value.toString(16).padStart(6, '0'); };
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = dark ? cssColor(palette.ink) : cssColor(palette.alabaster);
  context.strokeStyle = dark ? cssColor(palette.lavender) : cssColor(palette.dusk);
  context.lineWidth = 3;
  context.beginPath();
  if (typeof context.roundRect === 'function') context.roundRect(6, 6, 628, 138, 26);
  else context.rect(6, 6, 628, 138);
  context.fill();
  context.stroke();
  context.fillStyle = dark ? cssColor(palette.alabaster) : cssColor(palette.ink);
  context.font = '700 35px "Space Grotesk", Arial, sans-serif';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(title.length > 28 ? title.slice(0, 26) + '…' : title, 320, 62, 575);
  context.fillStyle = dark ? cssColor(palette.lavender) : cssColor(palette.dusk);
  context.font = '600 21px "DM Sans", Arial, sans-serif';
  context.fillText(subtitle.toUpperCase(), 320, 107, 570);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function addBox(scene, material, size, position, radius) {
  const geometry = new THREE.BoxGeometry(size[0], size[1], size[2]);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(position[0], position[1], position[2]);
  if (radius) mesh.rotation.y = radius;
  scene.add(mesh);
  return mesh;
}

export async function mountExplorer(options) {
  const canvas = options.canvas;
  const host = canvas.parentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: false,
    powerPreference: 'low-power'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = false;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 180);
  const ambient = new THREE.HemisphereLight(0xe0e1dd, 0x1b263b, 2.1);
  scene.add(ambient);
  const keyLight = new THREE.DirectionalLight(0xe0e1dd, 2.3);
  keyLight.position.set(-18, 30, 24);
  scene.add(keyLight);

  const waterGeometry = new THREE.PlaneGeometry(140, 140, 48, 48);
  const waterMaterial = new THREE.MeshStandardMaterial({
    color: COLORS.prussian,
    roughness: 0.52,
    metalness: 0.15,
    transparent: true,
    opacity: 0.94
  });
  const water = new THREE.Mesh(waterGeometry, waterMaterial);
  water.rotation.x = -Math.PI / 2;
  water.position.y = -0.75;
  scene.add(water);

  const grid = new THREE.GridHelper(120, 40, COLORS.dusk, COLORS.dusk);
  grid.position.y = -0.7;
  const gridMaterials = Array.isArray(grid.material) ? grid.material : [grid.material];
  gridMaterials.forEach(function (material) { material.transparent = true; material.opacity = 0.17; });
  scene.add(grid);

  const routeMaterial = new THREE.MeshStandardMaterial({ color: COLORS.lavender, emissive: COLORS.dusk, emissiveIntensity: 0.62, roughness: 0.35 });
  const platformMaterial = new THREE.MeshStandardMaterial({ color: COLORS.surface || COLORS.prussian, roughness: 0.7, metalness: 0.2 });
  const platformEdgeMaterial = new THREE.MeshStandardMaterial({ color: COLORS.dusk, emissive: COLORS.dusk, emissiveIntensity: 0.18, roughness: 0.4 });
  const platformDecor = new THREE.MeshStandardMaterial({ color: COLORS.lavender, emissive: COLORS.dusk, emissiveIntensity: 0.35, roughness: 0.45 });
  const hubMeshes = [];
  const labelSprites = [];
  const projectNodes = [];
  const disposable = [];

  function track(resource) { disposable.push(resource); return resource; }

  Object.entries(DISTRICTS).forEach(function (entry) {
    const district = entry[1];
    const center = district.center;
    const base = new THREE.Mesh(track(new THREE.CylinderGeometry(8.2, 9.1, 1.25, 48)), platformMaterial);
    base.position.set(center[0], -0.05, center[1]);
    scene.add(base);
    const rim = new THREE.Mesh(track(new THREE.TorusGeometry(8.45, 0.16, 8, 64)), platformEdgeMaterial);
    rim.rotation.x = Math.PI / 2;
    rim.position.set(center[0], 0.62, center[1]);
    scene.add(rim);
    const centerDisc = new THREE.Mesh(track(new THREE.CircleGeometry(6.8, 48)), new THREE.MeshBasicMaterial({ color: COLORS.dusk, transparent: true, opacity: 0.13, side: THREE.DoubleSide }));
    centerDisc.rotation.x = -Math.PI / 2;
    centerDisc.position.set(center[0], 0.605, center[1]);
    scene.add(centerDisc);
    hubMeshes.push(centerDisc);

    for (let i = 0; i < 4; i += 1) {
      const angle = (Math.PI * 2 * i) / 4;
      const buoy = new THREE.Mesh(track(new THREE.CylinderGeometry(0.12, 0.18, 1.6, 10)), platformDecor);
      buoy.position.set(center[0] + Math.cos(angle) * 7.1, 1.15, center[1] + Math.sin(angle) * 7.1);
      scene.add(buoy);
      const cap = new THREE.Mesh(track(new THREE.SphereGeometry(0.26, 12, 8)), platformDecor);
      cap.position.set(buoy.position.x, 2, buoy.position.z);
      scene.add(cap);
    }

    const hubTexture = makeLabelTexture(district.name, 'deep sea district', document.documentElement.dataset.theme || 'dark', document.documentElement.dataset.palette);
    track(hubTexture);
    const hubSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: hubTexture, transparent: true, depthWrite: false }));
    hubSprite.scale.set(7.4, 1.75, 1);
    hubSprite.position.set(center[0], 3.1, center[1]);
    scene.add(hubSprite);
    labelSprites.push({ sprite: hubSprite, title: district.name, subtitle: 'deep sea district' });
  });

  function addRoute(from, to, curveOffset) {
    const start = new THREE.Vector3(from[0], -0.15, from[1]);
    const end = new THREE.Vector3(to[0], -0.15, to[1]);
    const middle = new THREE.Vector3((from[0] + to[0]) / 2 + curveOffset[0], -0.05, (from[1] + to[1]) / 2 + curveOffset[1]);
    const curve = new THREE.QuadraticBezierCurve3(start, middle, end);
    const geometry = track(new THREE.TubeGeometry(curve, 48, 0.11, 6, false));
    const line = new THREE.Mesh(geometry, routeMaterial);
    scene.add(line);
  }
  addRoute(DISTRICTS.operations.center, DISTRICTS.tools.center, [0, -8]);
  addRoute(DISTRICTS.tools.center, DISTRICTS.arcade.center, [8, 0]);
  addRoute(DISTRICTS.arcade.center, DISTRICTS.operations.center, [-8, 1]);
  addRoute(DISTRICTS.arcade.center, DISTRICTS.archive.center, [7, 5]);

  const coralMaterial = new THREE.MeshStandardMaterial({ color: COLORS.dusk, roughness: 0.78, metalness: 0.08 });
  [
    [-29, -22, 1.3], [-8, -27, 1.1], [31, -23, 1.4], [30, 6, 1.1],
    [-20, 10, 1.2], [-18, 26, 1.15], [10, 31, 1.2], [36, 25, 1.35],
    [8, -29, 1.2], [-34, -5, 1.3], [37, -5, 1.05]
  ].forEach(function (item, index) {
    const group = new THREE.Group();
    const trunk = new THREE.Mesh(track(new THREE.CylinderGeometry(0.12, 0.32, 1.6 * item[2], 8)), coralMaterial);
    trunk.position.y = 0.2;
    group.add(trunk);
    for (let branchIndex = 0; branchIndex < 3; branchIndex += 1) {
      const branch = new THREE.Mesh(track(new THREE.ConeGeometry(0.24, 1.3 * item[2], 7)), coralMaterial);
      branch.position.set((branchIndex - 1) * 0.38, 0.76 + branchIndex * 0.18, 0);
      branch.rotation.z = (branchIndex - 1) * 0.43;
      group.add(branch);
    }
    group.position.set(item[0], -0.08, item[1]);
    group.rotation.y = index * 0.71;
    scene.add(group);
  });

  const speckPositions = new Float32Array(190 * 3);
  for (let i = 0; i < 190; i += 1) {
    speckPositions[i * 3] = (Math.random() - 0.5) * 100;
    speckPositions[i * 3 + 1] = Math.random() * 16 - 2;
    speckPositions[i * 3 + 2] = (Math.random() - 0.5) * 100;
  }
  const speckGeometry = track(new THREE.BufferGeometry());
  speckGeometry.setAttribute('position', new THREE.BufferAttribute(speckPositions, 3));
  const specks = new THREE.Points(speckGeometry, new THREE.PointsMaterial({ color: COLORS.alabaster, size: 0.13, transparent: true, opacity: 0.62, sizeAttenuation: true }));
  scene.add(specks);

  const vehicle = new THREE.Group();
  const hullMaterial = new THREE.MeshStandardMaterial({ color: COLORS.alabaster, roughness: 0.36, metalness: 0.32 });
  const hull = new THREE.Mesh(track(new THREE.CapsuleGeometry(0.52, 1.25, 5, 12)), hullMaterial);
  hull.rotation.z = Math.PI / 2;
  vehicle.add(hull);
  const nose = new THREE.Mesh(track(new THREE.ConeGeometry(0.44, 0.65, 16)), hullMaterial);
  nose.rotation.z = -Math.PI / 2;
  nose.position.x = 0.97;
  vehicle.add(nose);
  const windowMaterial = new THREE.MeshStandardMaterial({ color: COLORS.dusk, emissive: COLORS.dusk, emissiveIntensity: 0.65, metalness: 0.48, roughness: 0.2 });
  const windowMesh = new THREE.Mesh(track(new THREE.SphereGeometry(0.26, 16, 12)), windowMaterial);
  windowMesh.scale.set(0.25, 0.75, 1);
  windowMesh.position.set(0.05, 0.18, 0.45);
  vehicle.add(windowMesh);
  const finMaterial = new THREE.MeshStandardMaterial({ color: COLORS.lavender, roughness: 0.5, metalness: 0.2 });
  const fin = new THREE.Mesh(track(new THREE.BoxGeometry(0.48, 0.12, 0.74)), finMaterial);
  fin.position.set(-0.36, -0.34, 0);
  vehicle.add(fin);
  const tail = new THREE.Mesh(track(new THREE.TorusGeometry(0.34, 0.075, 8, 24)), platformDecor);
  tail.rotation.y = Math.PI / 2;
  tail.position.x = -0.9;
  vehicle.add(tail);
  vehicle.position.set(-24, 1.15, -14);
  scene.add(vehicle);

  const markerGeometry = track(new THREE.SphereGeometry(0.62, 18, 14));
  const markerBaseGeometry = track(new THREE.CylinderGeometry(0.62, 0.86, 0.35, 20));
  const markerRingGeometry = track(new THREE.TorusGeometry(0.95, 0.055, 8, 36));
  const projectMaterials = {
    professional: new THREE.MeshStandardMaterial({ color: COLORS.alabaster, emissive: COLORS.dusk, emissiveIntensity: 0.55, metalness: 0.25, roughness: 0.3 }),
    personal: new THREE.MeshStandardMaterial({ color: COLORS.lavender, emissive: COLORS.dusk, emissiveIntensity: 0.7, metalness: 0.25, roughness: 0.3 }),
    academic: new THREE.MeshStandardMaterial({ color: COLORS.dusk, emissive: COLORS.lavender, emissiveIntensity: 0.52, metalness: 0.25, roughness: 0.3 })
  };
  const projectRingMaterials = {
    professional: new THREE.MeshStandardMaterial({ color: COLORS.alabaster, emissive: COLORS.lavender, emissiveIntensity: 0.35, transparent: true, opacity: 0.78 }),
    personal: new THREE.MeshStandardMaterial({ color: COLORS.lavender, emissive: COLORS.dusk, emissiveIntensity: 0.48, transparent: true, opacity: 0.78 }),
    academic: new THREE.MeshStandardMaterial({ color: COLORS.dusk, emissive: COLORS.lavender, emissiveIntensity: 0.48, transparent: true, opacity: 0.78 })
  };

  options.projects.forEach(function (project) {
    const nodeGroup = new THREE.Group();
    const base = new THREE.Mesh(markerBaseGeometry, platformMaterial);
    base.position.y = 0.85;
    nodeGroup.add(base);
    const orbMaterial = (projectMaterials[project.type] || projectMaterials.personal).clone();
    const orb = new THREE.Mesh(markerGeometry, orbMaterial);
    orb.position.y = 1.58;
    nodeGroup.add(orb);
    const ringMaterial = (projectRingMaterials[project.type] || projectRingMaterials.personal).clone();
    const ring = new THREE.Mesh(markerRingGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.79;
    nodeGroup.add(ring);
    nodeGroup.position.set(project.world[0], 0, project.world[1]);
    nodeGroup.userData.projectId = project.id;
    scene.add(nodeGroup);
    projectNodes.push({ project: project, group: nodeGroup, orb: orb, ring: ring, baseEmissiveIntensity: orb.material.emissiveIntensity });
    const district = DISTRICTS[project.district];
    const labelTexture = makeLabelTexture(project.title, (district ? district.name : typeLabelsFor(project.type)) + ' · ' + typeLabelsFor(project.type), document.documentElement.dataset.theme || 'dark', document.documentElement.dataset.palette);
    track(labelTexture);
    const label = new THREE.Sprite(new THREE.SpriteMaterial({ map: labelTexture, transparent: true, depthWrite: false }));
    label.scale.set(5.9, 1.38, 1);
    label.position.set(project.world[0], 4.25, project.world[1]);
    label.userData.projectId = project.id;
    scene.add(label);
    labelSprites.push({ sprite: label, title: project.title, subtitle: (district ? district.name : '') + ' · ' + typeLabelsFor(project.type) });
  });

  function typeLabelsFor(type) {
    if (type === 'professional') return 'PROFISSIONAL';
    if (type === 'academic') return 'ACADÊMICO';
    return 'PESSOAL';
  }

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const clock = new THREE.Clock();
  const keys = new Set();
  const touchDirections = new Set();
  const target = new THREE.Vector3();
  let selectedProject = null;
  let frame = 0;
  let isDisposed = false;
  let lastTheme = document.documentElement.dataset.theme || 'dark';
  let lastSelectionTimestamp = 0;

  function refreshTheme(theme, paletteId) {
    lastTheme = theme;
    COLORS = PALETTES[paletteId] || PALETTES['deep-sea'];
    const isDark = theme === 'dark';
    const background = isDark ? COLORS.ink : COLORS.alabaster;
    scene.background = new THREE.Color(background);
    scene.fog = new THREE.Fog(background, 42, 105);
    renderer.setClearColor(background, 1);
    waterMaterial.color.setHex(isDark ? COLORS.prussian : COLORS.lavender);
    waterMaterial.opacity = isDark ? 0.94 : 0.62;
    ambient.color.setHex(isDark ? COLORS.alabaster : COLORS.alabaster);
    ambient.groundColor.setHex(isDark ? COLORS.prussian : COLORS.dusk);
    keyLight.color.setHex(isDark ? COLORS.alabaster : COLORS.alabaster);
    gridMaterials.forEach(function (material) { material.color.setHex(COLORS.dusk); });
    hubMeshes.forEach(function (mesh) { mesh.material.color.setHex(COLORS.dusk); });
    routeMaterial.color.setHex(COLORS.lavender);
    routeMaterial.emissive.setHex(COLORS.dusk);
    platformMaterial.color.setHex(COLORS.surface || COLORS.prussian);
    platformEdgeMaterial.color.setHex(COLORS.dusk);
    platformEdgeMaterial.emissive.setHex(COLORS.dusk);
    platformDecor.color.setHex(COLORS.lavender);
    platformDecor.emissive.setHex(COLORS.dusk);
    coralMaterial.color.setHex(COLORS.dusk);
    specks.material.color.setHex(COLORS.alabaster);
    hullMaterial.color.setHex(COLORS.alabaster);
    windowMaterial.color.setHex(COLORS.dusk);
    windowMaterial.emissive.setHex(COLORS.dusk);
    finMaterial.color.setHex(COLORS.lavender);
    projectMaterials.professional.color.setHex(COLORS.alabaster);
    projectMaterials.professional.emissive.setHex(COLORS.dusk);
    projectMaterials.personal.color.setHex(COLORS.lavender);
    projectMaterials.personal.emissive.setHex(COLORS.dusk);
    projectMaterials.academic.color.setHex(COLORS.dusk);
    projectMaterials.academic.emissive.setHex(COLORS.lavender);
    projectRingMaterials.professional.color.setHex(COLORS.alabaster);
    projectRingMaterials.professional.emissive.setHex(COLORS.lavender);
    projectRingMaterials.personal.color.setHex(COLORS.lavender);
    projectRingMaterials.personal.emissive.setHex(COLORS.dusk);
    projectRingMaterials.academic.color.setHex(COLORS.dusk);
    projectRingMaterials.academic.emissive.setHex(COLORS.lavender);
    projectNodes.forEach(function (item) {
      const baseOrb = projectMaterials[item.project.type] || projectMaterials.personal;
      const baseRing = projectRingMaterials[item.project.type] || projectRingMaterials.personal;
      item.orb.material.color.setHex(baseOrb.color.getHex());
      item.orb.material.emissive.setHex(baseOrb.emissive.getHex());
      item.orb.material.emissiveIntensity = selectedProject && selectedProject.project.id === item.project.id ? 1.15 : item.baseEmissiveIntensity;
      item.ring.material.color.setHex(baseRing.color.getHex());
      item.ring.material.emissive.setHex(baseRing.emissive.getHex());
    });
    labelSprites.forEach(function (entry) {
      const texture = makeLabelTexture(entry.title, entry.subtitle, theme, paletteId);
      const oldTexture = entry.sprite.material.map;
      entry.sprite.material.map = texture;
      entry.sprite.material.needsUpdate = true;
      if (oldTexture) oldTexture.dispose();
    });
  }

  function setSelected(item) {
    if (!item) return;
    if (selectedProject && selectedProject.project.id === item.project.id) return;
    selectedProject = item;
    options.onSelectProject(item.project.id);
    lastSelectionTimestamp = performance.now();
    projectNodes.forEach(function (node) {
      const active = node.project.id === item.project.id;
      node.ring.scale.setScalar(active ? 1.35 : 1);
      node.orb.material.emissiveIntensity = active ? 1.15 : node.baseEmissiveIntensity;
    });
  }

  function clearSelected() {
    if (!selectedProject) return;
    selectedProject = null;
    options.selectedProjectName.textContent = 'Navegue até um farol';
    options.openSelectedProject.disabled = true;
    projectNodes.forEach(function (item) {
      item.ring.scale.setScalar(1);
      item.orb.material.emissiveIntensity = item.baseEmissiveIntensity;
    });
  }

  function resize() {
    if (isDisposed || !host) return;
    const rect = host.getBoundingClientRect();
    const width = Math.max(1, rect.width);
    const height = Math.max(1, rect.height);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  function movementVector() {
    let x = 0;
    let z = 0;
    if (keys.has('ArrowLeft') || keys.has('a') || touchDirections.has('left')) x -= 1;
    if (keys.has('ArrowRight') || keys.has('d') || touchDirections.has('right')) x += 1;
    if (keys.has('ArrowUp') || keys.has('w') || touchDirections.has('forward')) z -= 1;
    if (keys.has('ArrowDown') || keys.has('s') || touchDirections.has('back')) z += 1;
    const length = Math.hypot(x, z) || 1;
    return { x: x / length, z: z / length, moving: Boolean(x || z) };
  }

  function nearestProject() {
    let nearest = null;
    let nearestDistance = 7.2;
    projectNodes.forEach(function (item) {
      const dx = vehicle.position.x - item.group.position.x;
      const dz = vehicle.position.z - item.group.position.z;
      const distance = Math.hypot(dx, dz);
      if (distance < nearestDistance) {
        nearest = item;
        nearestDistance = distance;
      }
    });
    return nearest;
  }

  function animate() {
    if (isDisposed) return;
    frame = window.requestAnimationFrame(animate);
    if (document.visibilityState === 'hidden' || !document.getElementById('explorerDialog').open) return;
    const delta = Math.min(clock.getDelta(), 0.05);
    const movement = movementVector();
    if (movement.moving) {
      vehicle.position.x += movement.x * delta * 9;
      vehicle.position.z += movement.z * delta * 9;
      vehicle.position.x = THREE.MathUtils.clamp(vehicle.position.x, -37, 37);
      vehicle.position.z = THREE.MathUtils.clamp(vehicle.position.z, -34, 35);
      vehicle.rotation.y = Math.atan2(-movement.z, movement.x);
    }
    if (!reducedMotion) {
      vehicle.position.y = 1.15 + Math.sin(performance.now() * 0.0017) * 0.1;
      water.position.y = -0.75 + Math.sin(performance.now() * 0.00024) * 0.035;
      projectNodes.forEach(function (item, index) {
        item.orb.position.y = 1.58 + Math.sin(performance.now() * 0.0015 + index) * 0.14;
        item.ring.rotation.z += delta * 0.16;
      });
      specks.rotation.y += delta * 0.008;
    }
    const nearby = nearestProject();
    if (nearby && (!selectedProject || selectedProject.project.id !== nearby.project.id)) setSelected(nearby);
    if (!nearby && selectedProject && performance.now() - lastSelectionTimestamp > 1500) clearSelected();

    const desiredCamera = new THREE.Vector3(vehicle.position.x, vehicle.position.y + 9.5, vehicle.position.z + 13.5);
    camera.position.lerp(desiredCamera, 1 - Math.pow(0.0006, delta));
    target.set(vehicle.position.x, vehicle.position.y + 0.55, vehicle.position.z);
    camera.lookAt(target);
    renderer.render(scene, camera);
  }

  function isExplorerActive() {
    const dialog = document.getElementById('explorerDialog');
    const projectDialog = document.getElementById('projectDialog');
    return dialog && dialog.open && !(projectDialog && projectDialog.open);
  }
  function onKeyDown(event) {
    if (!isExplorerActive()) return;
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(key)) event.preventDefault();
    if (key === 'e' && selectedProject) {
      event.preventDefault();
      options.onOpenProject(selectedProject.project.id);
      return;
    }
    keys.add(key);
  }
  function onKeyUp(event) {
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    keys.delete(key);
  }
  function onBlur() { keys.clear(); touchDirections.clear(); }
  function onPointerDown(event) {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(projectNodes.map(function (item) { return item.group; }), true);
    if (!hits.length) return;
    let object = hits[0].object;
    while (object && !object.userData.projectId) object = object.parent;
    const project = object && options.projects.find(function (item) { return item.id === object.userData.projectId; });
    if (project) setSelected(projectNodes.find(function (item) { return item.project.id === project.id; }));
  }
  function onTouchStart(event) {
    const direction = event.currentTarget.dataset.move;
    if (!direction) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    touchDirections.add(direction);
  }
  function onTouchEnd(event) {
    const direction = event.currentTarget.dataset.move;
    if (direction) touchDirections.delete(direction);
  }
  function onThemeChange(event) { refreshTheme(event.detail.theme, event.detail.palette); }

  window.addEventListener('resize', resize);
  window.addEventListener('keydown', onKeyDown, { passive: false });
  window.addEventListener('keyup', onKeyUp);
  window.addEventListener('blur', onBlur);
  window.addEventListener('portfolio-theme-change', onThemeChange);
  canvas.addEventListener('pointerdown', onPointerDown);
  const touchButtons = Array.from(options.touchControls.querySelectorAll('[data-move]'));
  touchButtons.forEach(function (button) {
    button.addEventListener('pointerdown', onTouchStart);
    button.addEventListener('pointerup', onTouchEnd);
    button.addEventListener('pointercancel', onTouchEnd);
    button.addEventListener('lostpointercapture', onTouchEnd);
  });
  refreshTheme(lastTheme, document.documentElement.dataset.palette);
  resize();
  const start = options.projects.find(function (project) { return project.id === 'sicadpro'; });
  if (start) setSelected(projectNodes.find(function (item) { return item.project.id === start.id; }));
  frame = window.requestAnimationFrame(animate);

  return {
    dispose: function () {
      if (isDisposed) return;
      isDisposed = true;
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('portfolio-theme-change', onThemeChange);
      canvas.removeEventListener('pointerdown', onPointerDown);
      touchButtons.forEach(function (button) {
        button.removeEventListener('pointerdown', onTouchStart);
        button.removeEventListener('pointerup', onTouchEnd);
        button.removeEventListener('pointercancel', onTouchEnd);
        button.removeEventListener('lostpointercapture', onTouchEnd);
      });
      scene.traverse(function (object) {
        if (object.geometry && typeof object.geometry.dispose === 'function') object.geometry.dispose();
        if (object.material) {
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach(function (material) {
            if (material.map && typeof material.map.dispose === 'function') material.map.dispose();
            if (typeof material.dispose === 'function') material.dispose();
          });
        }
      });
      disposable.forEach(function (resource) { if (resource && typeof resource.dispose === 'function') resource.dispose(); });
      renderer.dispose();
      renderer.setAnimationLoop(null);
      scene.clear();
    }
  };
}
