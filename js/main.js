/* ==========================================================================
   Monika B R - Premium Portfolio - Core Javascript
   ========================================================================= */

document.addEventListener("DOMContentLoaded", function () {
  
  // ==========================================
  // 1. PRELOADER & COUNTER INITIALIZATION
  // ==========================================
  const preloader = document.getElementById("preloader");
  const preloaderPercent = document.getElementById("preloaderPercent");
  
  if (preloader && preloaderPercent) {
    let count = 0;
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 8) + 2;
      if (count >= 100) {
        count = 100;
        clearInterval(interval);
        setTimeout(() => {
          preloader.classList.add("fade-out");
          // Initialize AOS animations after preloader fades out
          if (typeof AOS !== "undefined") {
            AOS.init({
              duration: 1000,
              once: true,
              mirror: false
            });
          }
        }, 500);
      }
      preloaderPercent.textContent = count + "%";
    }, 50);
  }


  // ==========================================
  // 3. THREE.JS 3D SCENE BACKGROUND
  // ==========================================
  const canvas = document.getElementById("heroCanvas");
  if (canvas && typeof THREE !== "undefined") {
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 5;
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);
    
    // Purple light
    const light1 = new THREE.DirectionalLight(0x8b5cf6, 3);
    light1.position.set(5, 5, 2);
    scene.add(light1);
    
    // Cyan light
    const light2 = new THREE.DirectionalLight(0x06b6d4, 3);
    light2.position.set(-5, -5, 2);
    scene.add(light2);
    
    // Central 3D mesh shape removed
    
    // Particle Starfield in the background
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 180;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 12;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.035,
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.6
    });
    
    const starfield = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(starfield);
    
    // Mouse movement response inside Three.js
    let targetX = 0;
    let targetY = 0;
    
    window.addEventListener("mousemove", (e) => {
      targetX = (e.clientX - window.innerWidth / 2) * 0.0005;
      targetY = (e.clientY - window.innerHeight / 2) * 0.0005;
    });
    
    // Resize Handler
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Clock for timing coordinates
    const clock = new THREE.Clock();
    
    // Animation Loop
    function tick() {
      const elapsedTime = clock.getElapsedTime();
      
      // Rotations and morph variables removed
      
      // Rotate particles starfield
      starfield.rotation.y = elapsedTime * 0.05;
      starfield.rotation.x = elapsedTime * 0.02;
      
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    }
    
    tick();
  }

  // ==========================================
  // 4. THEME SWITCHER (DARK / LIGHT MODE)
  // ==========================================
  const themeToggleBtn = document.getElementById("themeToggle");
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector("i") : null;
  const currentTheme = localStorage.getItem("theme");
  
  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);
    if (currentTheme === "light" && themeIcon) {
      themeIcon.className = "fas fa-moon";
    }
  }
  
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      let theme = document.documentElement.getAttribute("data-theme");
      if (theme === "light") {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        if (themeIcon) themeIcon.className = "fas fa-sun";
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        if (themeIcon) themeIcon.className = "fas fa-moon";
      }
    });
  }

  // ==========================================
  // 5. AUDIO SYNTH BLOCKS REMOVED
  // ==========================================

  // ==========================================
  // 6. SCROLL TIMELINE, NAV BLUR & SCROLL PROGRESS
  // ==========================================
  const navbar = document.querySelector(".navbar");
  const scrollProgressBar = document.getElementById("scrollProgressBar");
  const backToTopBtn = document.getElementById("backToTopBtn");
  
  window.addEventListener("scroll", () => {
    // Nav scroll blur
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    
    // Scroll progress bar width calculation
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (window.scrollY / windowHeight) * 100;
    if (scrollProgressBar) {
      scrollProgressBar.style.width = scrollPercent + "%";
    }
    
    // Back to top button visibility
    if (window.scrollY > 500) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
    
    // Active Link Tracker based on section offsets
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");
    let currentActive = "";
    
    sections.forEach(sec => {
      const secTop = sec.offsetTop - 120;
      const secHeight = sec.offsetHeight;
      if (window.scrollY >= secTop && window.scrollY < secTop + secHeight) {
        currentActive = sec.getAttribute("id");
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentActive}`) {
        link.classList.add("active");
      }
    });
  });

  // Scroll to Top action
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // ==========================================
  // 7. COUNTERS INTERSECTION OBSERVER (STATS)
  // ==========================================
  const counterElements = document.querySelectorAll(".stat-number, .stat-box-number");
  
  if (counterElements.length > 0) {
    const observerOptions = {
      threshold: 0.5
    };
    
    const countUpObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const endValue = parseFloat(target.getAttribute("data-count"));
          const duration = 2000; // 2 seconds counting speed
          const stepTime = 30;
          const stepCount = duration / stepTime;
          const increment = endValue / stepCount;
          let currentVal = 0;
          
          const counterInterval = setInterval(() => {
            currentVal += increment;
            if (currentVal >= endValue) {
              clearInterval(counterInterval);
              // Handle integers vs decimals like CGPA
              target.textContent = (endValue % 1 === 0) ? Math.floor(endValue) + (target.getAttribute("data-count").includes("+") ? "+" : "") : endValue.toFixed(2);
            } else {
              target.textContent = (endValue % 1 === 0) ? Math.floor(currentVal) + (target.getAttribute("data-count").includes("+") ? "+" : "") : currentVal.toFixed(2);
            }
          }, stepTime);
          
          countUpObserver.unobserve(target); // Run once
        }
      });
    }, observerOptions);
    
    counterElements.forEach(counter => {
      countUpObserver.observe(counter);
    });
  }

  // ==========================================
  // 8. PROJECT CARDS FILTERING SYSTEM
  // ==========================================
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCols = document.querySelectorAll(".project-col");
  
  if (filterButtons.length > 0 && projectCols.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        // Toggle active button
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        
        const filterValue = btn.getAttribute("data-filter");
        
        projectCols.forEach(col => {
          if (filterValue === "all" || col.getAttribute("data-category") === filterValue) {
            col.style.display = "block";
            // Re-trigger AOS animations or entry scales
            col.style.opacity = "1";
            col.style.transform = "scale(1)";
          } else {
            col.style.display = "none";
          }
        });
      });
    });
  }

  // ==========================================
  // 9. PROJECT MODAL CONTENT BINDER
  // ==========================================
  const projectZoomBtns = document.querySelectorAll(".project-zoom-btn");
  const modalImg = document.getElementById("projectModalImg");
  const modalTitle = document.getElementById("projectModalLabel");
  const modalDesc = document.getElementById("projectModalDesc");
  const modalFeatures = document.getElementById("projectModalFeatures");
  const modalGit = document.getElementById("projectModalGitLink");
  const modalDemo = document.getElementById("projectModalDemoLink");
  
  projectZoomBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".project-card");
      if (card) {
        const title = card.querySelector(".project-title").textContent;
        const desc = card.querySelector(".project-desc").textContent;
        const img = card.querySelector(".project-img").src;
        const features = card.querySelector(".project-features").innerHTML;
        const gitLink = card.querySelector(".project-links a:nth-child(1)").href;
        const demoLink = card.querySelector(".project-links a:nth-child(2)").href;
        
        if (modalImg) modalImg.src = img;
        if (modalTitle) modalTitle.textContent = title;
        if (modalDesc) modalDesc.textContent = desc;
        if (modalFeatures) modalFeatures.innerHTML = features;
        if (modalGit) modalGit.href = gitLink;
        if (modalDemo) modalDemo.href = demoLink;
      }
    });
  });

  // ==========================================
  // 10. MOBILE NAVIGATION HAMBURGER TRIGGERS
  // ==========================================
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.getElementById("navbarNav");
  const navMobileLinks = document.querySelectorAll(".navbar-collapse .nav-link");
  
  if (navbarToggler && navbarCollapse) {
    // Close mobile menu drawer when nav links are clicked
    navMobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 991) {
          navbarToggler.classList.add("collapsed");
          navbarToggler.setAttribute("aria-expanded", "false");
          navbarCollapse.classList.remove("show");
        }
      });
    });
  }

  // ==========================================
  // 11. INITIALIZE VANILLA TILT CARDS
  // ==========================================
  if (typeof VanillaTilt !== "undefined") {
    VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
      max: 10,
      speed: 400,
      glare: true,
      "max-glare": 0.15
    });
  }

  // ==========================================
  // 12. TYPED.JS INSTANTIATION (HERO EFFECT)
  // ==========================================
  if (typeof Typed !== "undefined" && document.getElementById("typed")) {
    new Typed("#typed", {
      strings: [
        "Java Developer",
        "Full Stack Developer",
        "AI & Data Science Student",
        "Problem Solver"
      ],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 1500,
      loop: true,
      showCursor: true,
      cursorChar: "_"
    });
  }



  // ==========================================
  // 14. TERMINAL TYPING ANIMATION (HERO SECTION)
  // ==========================================
  const terminalBody = document.querySelector(".terminal-body");
  if (terminalBody) {
    const codeLines = [
      {
        plain: "// Professional Profile",
        html: '<span class="code-comment">// Professional Profile</span>'
      },
      {
        plain: "public class MonikaBR {",
        html: '<span class="code-keyword">public class</span> <span class="code-class">MonikaBR</span> {'
      },
      {
        plain: '    String role = "Java & Full-Stack Developer";',
        html: '    <span class="code-type">String</span> role = <span class="code-string">"Java & Full-Stack Developer"</span>;'
      },
      {
        plain: '    String focus = "AI & Data Science";',
        html: '    <span class="code-type">String</span> focus = <span class="code-string">"AI & Data Science"</span>;'
      },
      {
        plain: "",
        html: ""
      },
      {
        plain: "    public void code() {",
        html: '    <span class="code-keyword">public void</span> <span class="code-method">code</span>() {'
      },
      {
        plain: "        while (learning) {",
        html: '        <span class="code-keyword">while</span> (learning) {'
      },
      {
        plain: "            self.buildProjects();",
        html: '            self.<span class="code-method">buildProjects</span>();'
      },
      {
        plain: "            self.solveProblems();",
        html: '            self.<span class="code-method">solveProblems</span>();'
      },
      {
        plain: "        }",
        html: '        }'
      },
      {
        plain: "    }",
        html: '    }'
      },
      {
        plain: "}",
        html: '}'
      }
    ];
    
    let currentLineIndex = 0;
    let currentCharIndex = 0;
    
    function typeNextLine() {
      if (currentLineIndex >= codeLines.length) {
        // Wait 5 seconds and restart
        setTimeout(() => {
          terminalBody.innerHTML = "";
          currentLineIndex = 0;
          currentCharIndex = 0;
          typeNextLine();
        }, 5000);
        return;
      }
      
      const lineData = codeLines[currentLineIndex];
      
      // Create new line element
      const lineDiv = document.createElement("div");
      lineDiv.className = "code-line";
      
      const lineNum = document.createElement("span");
      lineNum.className = "line-number";
      lineNum.textContent = currentLineIndex + 1;
      
      const codeContent = document.createElement("code");
      codeContent.className = "code-content";
      
      lineDiv.appendChild(lineNum);
      lineDiv.appendChild(codeContent);
      terminalBody.appendChild(lineDiv);
      
      // Scroll terminal to bottom
      terminalBody.scrollTop = terminalBody.scrollHeight;
      
      if (lineData.plain === "") {
        // Empty line, proceed immediately
        currentLineIndex++;
        setTimeout(typeNextLine, 200);
        return;
      }
      
      // Type character by character
      function typeChar() {
        if (currentCharIndex < lineData.plain.length) {
          // Append next character
          codeContent.textContent = lineData.plain.substring(0, currentCharIndex + 1);
          
          // Add cursor
          const cursor = document.createElement("span");
          cursor.className = "terminal-cursor";
          codeContent.appendChild(cursor);
          
          currentCharIndex++;
          // Random typing speed (30ms - 80ms)
          const typingSpeed = Math.random() * 50 + 30;
          setTimeout(typeChar, typingSpeed);
        } else {
          // Line finished typing! Remove cursor, replace with highlighted HTML
          codeContent.innerHTML = lineData.html;
          currentCharIndex = 0;
          currentLineIndex++;
          // Short pause between lines (300ms - 600ms)
          setTimeout(typeNextLine, Math.random() * 300 + 300);
        }
      }
      
      typeChar();
    }
    
    typeNextLine();
  }
});
