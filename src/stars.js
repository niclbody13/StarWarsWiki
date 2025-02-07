const canvas = document.getElementById("starfield");
      const ctx = canvas.getContext("2d");
    
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    
      class Star {
        constructor() {
          this.reset();
        }
    
        reset() {
          this.x = (Math.random() - 0.5) * canvas.width; // Random x position
          this.y = (Math.random() - 0.5) * canvas.height; // Random y position
          this.z = Math.random() * canvas.width; // Depth (farther away stars start small)
          this.radius = 1; // Initial size
        }
    
        update() {
          this.z -= 0.5; // Move forward along z-axis
    
          if (this.z < 1) this.reset(); // Reset star when it gets too close
        }
    
        draw() {
          const scale = canvas.width / (this.z + 1); // Perspective effect
          const screenX = this.x * scale + canvas.width / 2;
          const screenY = this.y * scale + canvas.height / 2;
          const starSize = Math.max(0.5, 2 - this.z / canvas.width); // Stars appear larger as they approach
    
          ctx.beginPath();
          ctx.arc(screenX, screenY, starSize, 0, Math.PI * 2);
          ctx.fillStyle = "white";
          ctx.fill();
        }
      }
    
      const stars = [];
      for (let i = 0; i < 600; i++) {
        stars.push(new Star());
      }
    
      function animate() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    
        stars.forEach(star => {
          star.update();
          star.draw();
        });
    
        requestAnimationFrame(animate);
      }
    
      animate();