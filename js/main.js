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
/* ===============================
   鼠标拖尾 + 点击特效
   =============================== */

const trail = [];
const trailMaxLength = 20; // 拖尾长度
const clickEffects = [];

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

// 设置全屏
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = 9999;

// 窗口缩放时调整画布
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// 鼠标移动拖尾
document.addEventListener('mousemove', (e) => {
  trail.push({ x: e.clientX, y: e.clientY });
  if (trail.length > trailMaxLength) trail.shift();
});

// 鼠标点击特效
document.addEventListener('click', (e) => {
  clickEffects.push({
    x: e.clientX,
    y: e.clientY,
    radius: 0,
    alpha: 1
  });
});

// 渲染循环
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 绘制拖尾
  trail.forEach((pos, index) => {
    const size = (index / trailMaxLength) * 8 + 2; // 越靠后越大
    const alpha = index / trailMaxLength;
    ctx.fillStyle = `rgba(0, 200, 255, ${alpha})`;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);
    ctx.fill();
  });

  // 绘制点击特效
  for (let i = clickEffects.length - 1; i >= 0; i--) {
    const effect = clickEffects[i];
    ctx.beginPath();
    ctx.arc(effect.x, effect.y, effect.radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255, 100, 50, ${effect.alpha})`;
    ctx.lineWidth = 2;
    ctx.stroke();

    effect.radius += 2;
    effect.alpha -= 0.02;

    if (effect.alpha <= 0) {
      clickEffects.splice(i, 1);
    }
  }

  requestAnimationFrame(animate);
}

// 开始动画
animate();
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