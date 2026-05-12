import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

/* ── Animated particle canvas background ── */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(129, 140, 248, ${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 80; i++) particles.push(new Particle());

    const connectDistance = 120;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - dist / connectDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="landing-particles" />;
}

/* ── Mini animated 3×3 convolution grid ── */
function ConvolutionDemo() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep(s => (s + 1) % 4), 1200);
    return () => clearInterval(id);
  }, []);

  const input = [
    [0.1, 0.8, 0.3, 0.5, 0.2],
    [0.9, 0.4, 0.7, 0.1, 0.6],
    [0.2, 0.6, 0.5, 0.9, 0.3],
    [0.7, 0.3, 0.8, 0.2, 0.7],
    [0.4, 0.9, 0.1, 0.6, 0.4],
  ];

  const positions = [
    { r: 0, c: 0 },
    { r: 0, c: 1 },
    { r: 1, c: 0 },
    { r: 1, c: 1 },
  ];

  const pos = positions[step];

  return (
    <div className="landing-demo-grid">
      {input.map((row, r) =>
        row.map((val, c) => {
          const inWindow = r >= pos.r && r < pos.r + 3 && c >= pos.c && c < pos.c + 3;
          const brightness = Math.round(val * 255);
          return (
            <div
              key={`${r}-${c}`}
              className={`landing-demo-cell ${inWindow ? 'active' : ''}`}
              style={{
                backgroundColor: `rgb(${brightness}, ${brightness}, ${brightness})`,
              }}
            />
          );
        })
      )}
    </div>
  );
}

/* ── Feature card component ── */
function FeatureCard({ icon, title, description, delay }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`landing-feature-card ${visible ? 'visible' : ''}`} ref={ref}>
      <div className="landing-feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

/* ── Stats counter ── */
function AnimatedCounter({ end, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const increment = end / (duration / 16);
    const id = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(id);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(id);
  }, [started, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Main Landing Page ── */
export default function LandingPage() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setLoaded(true));
  }, []);

  return (
    <div className={`landing ${loaded ? 'loaded' : ''}`}>
      <ParticleCanvas />

      {/* ── Navigation ── */}
      <nav className="landing-nav">
        <div className="landing-nav-logo">
          <div className="landing-logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </div>
          <span>CNN Visualizer</span>
        </div>
        <div className="landing-nav-links">
          <a href="#features">Features</a>
          <a href="#operations">Operations</a>
          <a href="#about">About</a>
          <button className="landing-nav-cta" onClick={() => navigate('/visualizer')}>
            Launch App →
          </button>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="landing-hero">
        <div className="landing-hero-badge">
          <span className="landing-badge-dot" />
          Open Source Educational Tool
        </div>

        <h1 className="landing-hero-title">
          <span className="landing-hero-line">Understand</span>
          <span className="landing-hero-line gradient">Convolution</span>
          <span className="landing-hero-line">Visually</span>
        </h1>

        <p className="landing-hero-subtitle">
          An interactive, step-by-step visualizer for CNN operations. Watch how filters slide
          across images, see the math in real-time, and build deep intuition for convolutional
          neural networks.
        </p>

        <div className="landing-hero-actions">
          <button className="landing-btn-primary" onClick={() => navigate('/visualizer')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Start Visualizing
          </button>
          <a className="landing-btn-secondary" href="#features">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            Learn More
          </a>
        </div>

        {/* Mini convolution demo */}
        <div className="landing-hero-demo">
          <ConvolutionDemo />
          <div className="landing-demo-label">Live Convolution Preview</div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="landing-stats">
        <div className="landing-stat">
          <div className="landing-stat-value"><AnimatedCounter end={16} suffix="+" /></div>
          <div className="landing-stat-label">Filter Kernels</div>
        </div>
        <div className="landing-stat-divider" />
        <div className="landing-stat">
          <div className="landing-stat-value"><AnimatedCounter end={3} /></div>
          <div className="landing-stat-label">Operations</div>
        </div>
        <div className="landing-stat-divider" />
        <div className="landing-stat">
          <div className="landing-stat-value"><AnimatedCounter end={10} suffix="+" /></div>
          <div className="landing-stat-label">Dataset Samples</div>
        </div>
        <div className="landing-stat-divider" />
        <div className="landing-stat">
          <div className="landing-stat-value">∞</div>
          <div className="landing-stat-label">Custom Filters</div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="landing-features" id="features">
        <div className="landing-section-header">
          <span className="landing-section-tag">Features</span>
          <h2>Everything You Need to Understand CNNs</h2>
          <p>A comprehensive toolkit for visualizing and learning about convolutional neural network operations.</p>
        </div>

        <div className="landing-features-grid">
          <FeatureCard
            delay={100}
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="3" />
                <rect x="6" y="6" width="4" height="4" rx="1" />
                <rect x="14" y="6" width="4" height="4" rx="1" />
                <rect x="6" y="14" width="4" height="4" rx="1" />
                <rect x="14" y="14" width="4" height="4" rx="1" />
              </svg>
            }
            title="Step-by-Step Animation"
            description="Watch the filter kernel slide across the input matrix one position at a time. Play, pause, or step through manually."
          />
          <FeatureCard
            delay={200}
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            }
            title="Multiple Operations"
            description="Explore convolution, max pooling, and transposed convolution — all three fundamental CNN operations."
          />
          <FeatureCard
            delay={300}
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 20V10" />
                <path d="M18 20V4" />
                <path d="M6 20v-4" />
              </svg>
            }
            title="Real-Time Math"
            description="See the element-wise multiplication and summation happening live with an interactive calculation display."
          />
          <FeatureCard
            delay={400}
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="13.5" cy="6.5" r="2.5" />
                <path d="M17.5 10.5L19 12l-5.5 5.5L10 14l-5 5" />
                <path d="M2 2h20v20H2z" />
              </svg>
            }
            title="MNIST & Fashion MNIST"
            description="Visualize operations on real dataset samples from MNIST handwritten digits and Fashion MNIST."
          />
          <FeatureCard
            delay={500}
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            }
            title="Custom Filters"
            description="Design your own 3×3 filter kernels and instantly see how they transform the input image."
          />
          <FeatureCard
            delay={600}
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            }
            title="Hyperparameter Controls"
            description="Adjust stride, padding, and activation functions (ReLU) to see how they affect the output feature map."
          />
        </div>
      </section>

      {/* ── Operations Showcase ── */}
      <section className="landing-operations" id="operations">
        <div className="landing-section-header">
          <span className="landing-section-tag">Operations</span>
          <h2>Three Core CNN Operations</h2>
          <p>Master the building blocks of modern computer vision architectures.</p>
        </div>

        <div className="landing-ops-grid">
          <div className="landing-op-card">
            <div className="landing-op-number">01</div>
            <h3>Convolution</h3>
            <p>
              The fundamental operation that applies learned filters to detect features like edges,
              textures, and patterns in images. Watch element-wise multiplication and summation in action.
            </p>
            <div className="landing-op-formula">
              <code>Output[i,j] = Σ Input[i+m, j+n] × Kernel[m,n]</code>
            </div>
          </div>

          <div className="landing-op-card">
            <div className="landing-op-number">02</div>
            <h3>Max Pooling</h3>
            <p>
              Downsampling operation that reduces spatial dimensions while preserving the most important
              features. Selects the maximum value within each pooling window.
            </p>
            <div className="landing-op-formula">
              <code>Output[i,j] = max(Window[m,n])</code>
            </div>
          </div>

          <div className="landing-op-card">
            <div className="landing-op-number">03</div>
            <h3>Transposed Convolution</h3>
            <p>
              Also known as deconvolution — upsamples the feature map by spreading input values through
              the filter kernel. Essential for architectures like U-Net and GANs.
            </p>
            <div className="landing-op-formula">
              <code>Output[i·s+m, j·s+n] += Input[i,j] × Kernel[m,n]</code>
            </div>
          </div>
        </div>
      </section>

      {/* ── About / CTA ── */}
      <section className="landing-cta-section" id="about">
        <div className="landing-cta-glow" />
        <h2>Ready to Explore?</h2>
        <p>
          Dive into the interactive visualizer and build a deep understanding of how convolutional
          neural networks process and transform visual data.
        </p>
        <button className="landing-btn-primary large" onClick={() => navigate('/visualizer')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          Launch the Visualizer
        </button>
      </section>

      {/* ── Footer ── */}
      <footer className="landing-footer">
        <div className="landing-footer-content">
          <div className="landing-footer-brand">
            <div className="landing-logo-icon small">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </div>
            <span>CNN Convolution Visualizer</span>
          </div>
          <p className="landing-footer-text">
            Built for learning. An educational tool for understanding convolutional neural networks.
          </p>
          <div className="landing-footer-divider" />
          <p className="landing-footer-copy">
            © {new Date().getFullYear()} CNN Visualizer • Made with ❤️ for ML education
          </p>
        </div>
      </footer>
    </div>
  );
}
