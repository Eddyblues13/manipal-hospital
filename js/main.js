// Main JavaScript for Manipal Teaching Hospital Website

// Disable right-click context menu
document.addEventListener("contextmenu", (e) => {
  e.preventDefault()
  return false
})

// Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
document.addEventListener("keydown", (e) => {
  // F12
  if (e.keyCode === 123) {
    e.preventDefault()
    return false
  }
  // Ctrl+Shift+I
  if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
    e.preventDefault()
    return false
  }
  // Ctrl+Shift+J
  if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
    e.preventDefault()
    return false
  }
  // Ctrl+U
  if (e.ctrlKey && e.keyCode === 85) {
    e.preventDefault()
    return false
  }
  // Ctrl+S
  if (e.ctrlKey && e.keyCode === 83) {
    e.preventDefault()
    return false
  }
})

// Disable text selection on specific elements
document.addEventListener("selectstart", (e) => {
  e.preventDefault()
  return false
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("mainNav")
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Mobile menu toggle fix
document.addEventListener("DOMContentLoaded", () => {
  const navbarToggler = document.querySelector(".navbar-toggler")
  const navbarCollapse = document.querySelector(".navbar-collapse")

  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener("click", () => {
      const isExpanded = navbarToggler.getAttribute("aria-expanded") === "true"
      navbarToggler.setAttribute("aria-expanded", !isExpanded)

      if (navbarCollapse.classList.contains("show")) {
        navbarCollapse.classList.remove("show")
      } else {
        navbarCollapse.classList.add("show")
      }
    })

    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth < 992) {
          navbarCollapse.classList.remove("show")
          navbarToggler.setAttribute("aria-expanded", "false")
        }
      })
    })

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
        if (navbarCollapse.classList.contains("show")) {
          navbarCollapse.classList.remove("show")
          navbarToggler.setAttribute("aria-expanded", "false")
        }
      }
    })
  }
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Loading animation for buttons
function showLoading(button) {
  const originalText = button.innerHTML
  button.innerHTML = '<span class="loading"></span> Loading...'
  button.disabled = true

  setTimeout(() => {
    button.innerHTML = originalText
    button.disabled = false
  }, 2000)
}

// Form validation
function validateForm(form) {
  const inputs = form.querySelectorAll("input[required], select[required], textarea[required]")
  let isValid = true

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      input.classList.add("is-invalid")
      isValid = false
    } else {
      input.classList.remove("is-invalid")
    }

    // Email validation
    if (input.type === "email" && input.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(input.value)) {
        input.classList.add("is-invalid")
        isValid = false
      }
    }

    // Phone validation
    if (input.type === "tel" && input.value) {
      const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
      if (!phoneRegex.test(input.value.replace(/\s/g, ""))) {
        input.classList.add("is-invalid")
        isValid = false
      }
    }
  })

  return isValid
}

// Appointment booking functionality
function bookAppointment(form) {
  if (validateForm(form)) {
    const submitBtn = form.querySelector('button[type="submit"]')
    showLoading(submitBtn)

    // Simulate API call
    setTimeout(() => {
      alert("Appointment booked successfully! You will receive a confirmation email shortly.")
      form.reset()
    }, 2000)
  }
}

// Contact form functionality
function submitContactForm(form) {
  if (validateForm(form)) {
    const submitBtn = form.querySelector('button[type="submit"]')
    showLoading(submitBtn)

    // Simulate API call
    setTimeout(() => {
      alert("Thank you for your message! We will get back to you within 24 hours.")
      form.reset()
    }, 2000)
  }
}

// Emergency contact functionality
function callEmergency() {
  if (confirm("This will call our emergency helpline. Continue?")) {
    window.location.href = "tel:+918202922108"
  }
}

// Search functionality
function searchSite(query) {
  if (query.trim()) {
    // Simulate search functionality
    console.log("Searching for:", query)
    // In a real implementation, this would redirect to search results
    alert("Search functionality will be implemented soon.")
  }
}

// Department filter functionality
function filterDepartments(category) {
  const departments = document.querySelectorAll(".department-card")

  departments.forEach((dept) => {
    if (category === "all" || dept.dataset.category === category) {
      dept.style.display = "block"
    } else {
      dept.style.display = "none"
    }
  })
}

// Doctor search functionality
function searchDoctors(specialty) {
  const doctors = document.querySelectorAll(".doctor-card")

  doctors.forEach((doctor) => {
    if (specialty === "all" || doctor.dataset.specialty === specialty) {
      doctor.style.display = "block"
    } else {
      doctor.style.display = "none"
    }
  })
}

// News pagination
let currentNewsPage = 1
const newsPerPage = 6

function loadNews(page) {
  // Simulate loading news articles
  console.log("Loading news page:", page)
  currentNewsPage = page
}

// Image lazy loading
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]")

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        observer.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Initialize lazy loading when DOM is loaded
document.addEventListener("DOMContentLoaded", lazyLoadImages)

// Accessibility improvements
function improveAccessibility() {
  // Add skip to main content link
  const skipLink = document.createElement("a")
  skipLink.href = "#main-content"
  skipLink.className = "sr-only sr-only-focusable"
  skipLink.textContent = "Skip to main content"
  document.body.insertBefore(skipLink, document.body.firstChild)

  // Add aria-labels to social links
  const socialLinks = document.querySelectorAll(".social-link")
  socialLinks.forEach((link) => {
    const icon = link.querySelector("i")
    if (icon) {
      const platform = icon.className.includes("facebook")
        ? "Facebook"
        : icon.className.includes("twitter")
          ? "Twitter"
          : icon.className.includes("instagram")
            ? "Instagram"
            : icon.className.includes("linkedin")
              ? "LinkedIn"
              : "Social Media"
      link.setAttribute("aria-label", `Follow us on ${platform}`)
    }
  })
}

// Initialize accessibility improvements
document.addEventListener("DOMContentLoaded", improveAccessibility)

// Performance monitoring
function monitorPerformance() {
  if ("performance" in window) {
    window.addEventListener("load", () => {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart
      console.log("Page load time:", loadTime + "ms")

      // Send performance data to analytics (if implemented)
      if (loadTime > 3000) {
        console.warn("Page load time is slow:", loadTime + "ms")
      }
    })
  }
}

// Initialize performance monitoring
monitorPerformance()

// Error handling
window.addEventListener("error", (e) => {
  console.error("JavaScript error:", e.error)
  // In production, send error to logging service
})

// Service worker registration (for offline functionality)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}

// Print functionality
function printPage() {
  window.print()
}

// Share functionality
function shareContent(title, url) {
  if (navigator.share) {
    navigator
      .share({
        title: title,
        url: url,
      })
      .catch(console.error)
  } else {
    // Fallback for browsers that don't support Web Share API
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
    window.open(shareUrl, "_blank")
  }
}

// // Cookie consent (basic implementation)
// function showCookieConsent() {
//   if (!localStorage.getItem("cookieConsent")) {
//     const consent = confirm("This website uses cookies to improve your experience. Do you accept?")
//     if (consent) {
//       localStorage.setItem("cookieConsent", "accepted")
//     }
//   }
// }

// // Initialize cookie consent
// document.addEventListener("DOMContentLoaded", showCookieConsent)

// Back to top button
function addBackToTopButton() {
  const backToTop = document.createElement("button")
  backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>'
  backToTop.className = "back-to-top"
  backToTop.setAttribute("aria-label", "Back to top")
  backToTop.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
    `

  document.body.appendChild(backToTop)

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop.style.display = "block"
    } else {
      backToTop.style.display = "none"
    }
  })

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  })
}

// Initialize back to top button
document.addEventListener("DOMContentLoaded", addBackToTopButton)


// Main JavaScript for Manipal Teaching Hospital Website

// Disable right-click context menu
document.addEventListener("contextmenu", (e) => {
  e.preventDefault()
  return false
})

// Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
document.addEventListener("keydown", (e) => {
  // F12
  if (e.keyCode === 123) {
    e.preventDefault()
    return false
  }
  // Ctrl+Shift+I
  if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
    e.preventDefault()
    return false
  }
  // Ctrl+Shift+J
  if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
    e.preventDefault()
    return false
  }
  // Ctrl+U
  if (e.ctrlKey && e.keyCode === 85) {
    e.preventDefault()
    return false
  }
  // Ctrl+S
  if (e.ctrlKey && e.keyCode === 83) {
    e.preventDefault()
    return false
  }
})

// Disable text selection on specific elements
document.addEventListener("selectstart", (e) => {
  e.preventDefault()
  return false
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("mainNav")
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Mobile menu functionality
document.addEventListener("DOMContentLoaded", () => {
  const navbarToggler = document.querySelector(".navbar-toggler")
  const navbarCollapse = document.querySelector(".navbar-collapse")

  if (navbarToggler && navbarCollapse) {
    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth < 992) {
          // Use Bootstrap's collapse method to hide the menu
          const bsCollapse = new bootstrap.Collapse(navbarCollapse)
          bsCollapse.hide()
        }
      })
    })

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
        if (navbarCollapse.classList.contains("show")) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse)
          bsCollapse.hide()
        }
      }
    })
  }
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Loading animation for buttons
function showLoading(button) {
  const originalText = button.innerHTML
  button.innerHTML = '<span class="loading"></span> Loading...'
  button.disabled = true

  setTimeout(() => {
    button.innerHTML = originalText
    button.disabled = false
  }, 2000)
}

// Form validation
function validateForm(form) {
  const inputs = form.querySelectorAll("input[required], select[required], textarea[required]")
  let isValid = true

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      input.classList.add("is-invalid")
      isValid = false
    } else {
      input.classList.remove("is-invalid")
    }

    // Email validation
    if (input.type === "email" && input.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(input.value)) {
        input.classList.add("is-invalid")
        isValid = false
      }
    }

    // Phone validation
    if (input.type === "tel" && input.value) {
      const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
      if (!phoneRegex.test(input.value.replace(/\s/g, ""))) {
        input.classList.add("is-invalid")
        isValid = false
      }
    }
  })

  return isValid
}

// Appointment booking functionality
function bookAppointment(form) {
  if (validateForm(form)) {
    const submitBtn = form.querySelector('button[type="submit"]')
    showLoading(submitBtn)

    // Simulate API call
    setTimeout(() => {
      alert("Appointment booked successfully! You will receive a confirmation email shortly.")
      form.reset()
    }, 2000)
  }
}

// Contact form functionality
function submitContactForm(form) {
  if (validateForm(form)) {
    const submitBtn = form.querySelector('button[type="submit"]')
    showLoading(submitBtn)

    // Simulate API call
    setTimeout(() => {
      alert("Thank you for your message! We will get back to you within 24 hours.")
      form.reset()
    }, 2000)
  }
}

// Emergency contact functionality
function callEmergency() {
  if (confirm("This will call our emergency helpline. Continue?")) {
    window.location.href = "tel:+918202922108"
  }
}

// Search functionality
function searchSite(query) {
  if (query.trim()) {
    // Simulate search functionality
    console.log("Searching for:", query)
    // In a real implementation, this would redirect to search results
    alert("Search functionality will be implemented soon.")
  }
}

// Department filter functionality
function filterDepartments(category) {
  const departments = document.querySelectorAll(".department-card")

  departments.forEach((dept) => {
    if (category === "all" || dept.dataset.category === category) {
      dept.style.display = "block"
    } else {
      dept.style.display = "none"
    }
  })
}

// Doctor search functionality
function searchDoctors(specialty) {
  const doctors = document.querySelectorAll(".doctor-card")

  doctors.forEach((doctor) => {
    if (specialty === "all" || doctor.dataset.specialty === specialty) {
      doctor.style.display = "block"
    } else {
      doctor.style.display = "none"
    }
  })
}


function loadNews(page) {
  // Simulate loading news articles
  console.log("Loading news page:", page)
  currentNewsPage = page
}

// Image lazy loading
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]")

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        observer.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Initialize lazy loading when DOM is loaded
document.addEventListener("DOMContentLoaded", lazyLoadImages)

// Accessibility improvements
function improveAccessibility() {
  // Add skip to main content link
  const skipLink = document.createElement("a")
  skipLink.href = "#main-content"
  skipLink.className = "sr-only sr-only-focusable"
  skipLink.textContent = "Skip to main content"
  document.body.insertBefore(skipLink, document.body.firstChild)

  // Add aria-labels to social links
  const socialLinks = document.querySelectorAll(".social-link")
  socialLinks.forEach((link) => {
    const icon = link.querySelector("i")
    if (icon) {
      const platform = icon.className.includes("facebook")
        ? "Facebook"
        : icon.className.includes("twitter")
          ? "Twitter"
          : icon.className.includes("instagram")
            ? "Instagram"
            : icon.className.includes("linkedin")
              ? "LinkedIn"
              : "Social Media"
      link.setAttribute("aria-label", `Follow us on ${platform}`)
    }
  })
}

// Initialize accessibility improvements
document.addEventListener("DOMContentLoaded", improveAccessibility)

// Performance monitoring
function monitorPerformance() {
  if ("performance" in window) {
    window.addEventListener("load", () => {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart
      console.log("Page load time:", loadTime + "ms")

      // Send performance data to analytics (if implemented)
      if (loadTime > 3000) {
        console.warn("Page load time is slow:", loadTime + "ms")
      }
    })
  }
}

// Initialize performance monitoring
monitorPerformance()

// Error handling
window.addEventListener("error", (e) => {
  console.error("JavaScript error:", e.error)
  // In production, send error to logging service
})

// Service worker registration (for offline functionality)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}

// Print functionality
function printPage() {
  window.print()
}

// Share functionality
function shareContent(title, url) {
  if (navigator.share) {
    navigator
      .share({
        title: title,
        url: url,
      })
      .catch(console.error)
  } else {
    // Fallback for browsers that don't support Web Share API
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
    window.open(shareUrl, "_blank")
  }
}

// // Cookie consent (basic implementation)
// function showCookieConsent() {
//   if (!localStorage.getItem("cookieConsent")) {
//     const consent = confirm("This website uses cookies to improve your experience. Do you accept?")
//     if (consent) {
//       localStorage.setItem("cookieConsent", "accepted")
//     }
//   }
// }

// // Initialize cookie consent
// document.addEventListener("DOMContentLoaded", showCookieConsent)

// Back to top button
function addBackToTopButton() {
  const backToTop = document.createElement("button")
  backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>'
  backToTop.className = "back-to-top"
  backToTop.setAttribute("aria-label", "Back to top")
  backToTop.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
    `

  document.body.appendChild(backToTop)

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop.style.display = "block"
    } else {
      backToTop.style.display = "none"
    }
  })

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  })
}

// Initialize back to top button
document.addEventListener("DOMContentLoaded", addBackToTopButton)
