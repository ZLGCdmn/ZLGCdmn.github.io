/* =========================
   CYBERPUNK MAIN.JS
   ========================= */

// ===== 页面加载完成后执行 =====
document.addEventListener("DOMContentLoaded", () => {
  typingEffect();
  initParticles();
  initCursorGlow();
  initProgressBar();
});

/* =========================
   1️⃣ 打字机效果
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
   2️⃣ 粒子背景（优化版）
   ========================= */
function initParticles() {
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

  let particles = [];

  const COUNT = 60; // 粒子数量（性能可调）

  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: Math.random() * 1 - 0.5,
      vy: Math.random() * 1 - 0.5
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00f7ff";

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      ctx.fillRect(p.x, p.y, 2, 2);

      // 边界反弹
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    });

    requestAnimationFrame(draw);
  }

  draw();
}

/* =========================
   3️⃣ 鼠标霓虹拖尾
   ========================= */
function initCursorGlow() {
  const trail = [];

  const particles = []; // 粒子数组
  const mouse = { x: window.innerWidth/2, y: window.innerHeight/2 };

// 鼠标移动时更新目标位置
  document.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

// 粒子更新函数
  function animate() {
    requestAnimationFrame(animate);

    particles.forEach(p => {
      // 粒子向鼠标位置靠拢
      p.x += (mouse.x - p.x) * 0.05;
      p.y += (mouse.y - p.y) * 0.05;

      // 渲染粒子
      drawParticle(p);
    });
  }

// 启动动画
  animate();

    if (trail.length > 15) trail.shift();

  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  canvas.style.position = "fixed";
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "999";

  resize();

  window.addEventListener("resize", resize);

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < trail.length; i++) {
      const p = trail[i];

      ctx.fillStyle = `rgba(0,255,255,${i / trail.length})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  draw();
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

const el = document.querySelector(".glitch");

if (el) {
  let text = el.innerText;
  el.innerText = "";

  let i = 0;

  function typing() {
    if (i < text.length) {
      el.innerText += text[i];
      i++;
      setTimeout(typing, 80);
    }
  }

  typing();
}