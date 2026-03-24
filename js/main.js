/* =========================
   CYBERPUNK 鼠标拖尾 v2
   ========================= */

function initCursorGlow() {
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  canvas.style.position = "fixed";
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "999";

  // 初始化尺寸
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const trail = [];
  const MAX_TRAIL = 25; // 拖尾长度
  const mouse = { x: canvas.width / 2, y: canvas.height / 2 };
  const velocity = { x: 0, y: 0 };

  document.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  // 每帧记录鼠标位置到 trail 数组
  function updateTrail() {
    if (trail.length === 0) {
      trail.push({ x: mouse.x, y: mouse.y });
    }

    const last = trail[trail.length - 1];

    // 缓动插值
    velocity.x += (mouse.x - last.x) * 0.1;
    velocity.y += (mouse.y - last.y) * 0.1;
    velocity.x *= 0.8; // 阻尼
    velocity.y *= 0.8;

    const newPos = {
      x: last.x + velocity.x,
      y: last.y + velocity.y
    };

    trail.push(newPos);

    if (trail.length > MAX_TRAIL) trail.shift();
  }

  function drawTrail() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < trail.length; i++) {
      const p = trail[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      // 渐变颜色
      ctx.fillStyle = `rgba(${255 - i * 8}, ${255}, ${255}, ${i / trail.length})`;
      ctx.fill();
    }
  }

  function animate() {
    updateTrail();
    drawTrail();
    requestAnimationFrame(animate);
  }

  animate();
}