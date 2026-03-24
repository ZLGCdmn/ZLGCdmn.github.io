/* =========================
   CYBERPUNK MAIN.JS
   ========================= */

// ===== 页面加载完成后执行 =====
document.addEventListener("DOMContentLoaded", () => {
  typingEffect();
  initBackgroundParticles();
  initCursorGlow();
  initProgressBar();
});

/* =========================
   1️⃣ 打字机文字效果
   ========================= */
function typingEffect() {
  const el = document.querySelector(".glitch");
  if (!el) return;

  const text = el.innerText;
  el.innerText = "";

  let i = 0;
  function typing() {
    if (i < text.length) {
      el.innerText += text[i];
      i++;
      setTimeout(typing, 60);
    }
  }

  typing();
}

/* =========================
   2️⃣ 背景粒子
   ========================= */
function initBackgroundParticles() {
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  canvas.style.position = "fixed";
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.zIndex = "-1";

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  const particles = [];
  const COUNT = 60;

  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: Math.random() * 1 - 0.5,
      vy: Math.random() * 1 - 0.5,
      size: Math.random() * 2 + 1,
      color: "#00f7ff"
    });
  }

  function draw() {
    ctx.fillStyle = "rgba(10,10,20,0.3)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    });

    requestAnimationFrame(draw);
  }

  draw();
}

/* =========================
   3️⃣ 鼠标拖尾粒子
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

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const trail = [];
  const PARTICLE_COUNT = 30;
  const particles = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 4 + 2,
      color: "#00f7ff"
    });
  }

  const mouse = { x: canvas.width / 2, y: canvas.height / 2 };

  document.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    trail.push({ x: mouse.x, y: mouse.y });
    if (trail.length > 20) trail.shift();
  });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 粒子缓动 + 自身漂移
    particles.forEach(p => {
      p.x += (mouse.x - p.x) * 0.05 + p.vx;
      p.y += (mouse.y - p.y) * 0.05 + p.vy;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });

    // 绘制拖尾
    for (let i = 0; i < trail.length; i++) {
      const p = trail[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,255,255,${i / trail.length})`;
      ctx.fill();
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* =========================
   4️⃣ 页面滚动进度条
   ========================= */
function initProgressBar() {
  const bar = document.createElement("div");
  document.body.appendChild(bar);

  bar.style.position = "fixed";
  bar.style.top = "0";
  bar.style.left = "0";
  bar.style.height = "3px";
  bar.style.background = "#00f7ff";
  bar.style.zIndex = "9999";
  bar.style.width = "0%";
  bar.style.boxShadow = "0 0 10px #00f7ff";

  window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
    const percent = (scrollTop / height) * 100;
    bar.style.width = percent + "%";
  });
}