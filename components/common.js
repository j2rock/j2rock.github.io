// 检查系统暗黑模式
function checkSystemDarkMode() {
  // 优先使用用户设置
  const userPreference = localStorage.getItem('darkMode');
  if (userPreference === 'enabled') {
    document.body.classList.add('dark-mode');
    return;
  }
  if (userPreference === 'disabled') {
    document.body.classList.remove('dark-mode');
    return;
  }
  
  // 如果用户没有设置，则跟随系统
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-mode');
  }
  
  // 监听系统主题变化
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (!localStorage.getItem('darkMode')) { // 只在用户未手动设置时响应
      if (event.matches) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    }
  });
}

// 首页专用的头部加载函数
function loadIndexHeader() {
    const headerHTML = `
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" type="image/x-icon" href="favicon.png">
        <script>
          (function() {
            const userPreference = localStorage.getItem('darkMode');
            if (userPreference === 'enabled') {
              document.documentElement.classList.add('dark-mode');
            } else if (userPreference === 'disabled') {
              document.documentElement.classList.remove('dark-mode');
            } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
              document.documentElement.classList.add('dark-mode');
            }
          })();
        </script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js" integrity="sha256-YMa+wAM6QkVyz999odX7lPRxkoYAan8suedu4k2Zur8=" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" integrity="sha256-MBffSnbbXwHCuZtgPYiwMQbfE7z+GOZ7fBPCNB06Z98=" crossorigin="anonymous">
        <link rel="stylesheet" type="text/css" href="components/style.css">
        <title>MG</title>
      </head>
    `;
    document.head.innerHTML = headerHTML;
    checkSystemDarkMode();
}
  
// 加载二级文件里共用的头部
function loadCommonHeader(productName) {
  const headerHTML = `
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="icon" type="image/x-icon" href="../favicon.png">
      <script>
        (function() {
          const userPreference = localStorage.getItem('darkMode');
          if (userPreference === 'enabled') {
            document.documentElement.classList.add('dark-mode');
          } else if (userPreference === 'disabled') {
            document.documentElement.classList.remove('dark-mode');
          } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark-mode');
          }
        })();
      </script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js" integrity="sha256-YMa+wAM6QkVyz999odX7lPRxkoYAan8suedu4k2Zur8=" crossorigin="anonymous"></script>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" integrity="sha256-MBffSnbbXwHCuZtgPYiwMQbfE7z+GOZ7fBPCNB06Z98=" crossorigin="anonymous">
      <link rel="stylesheet" type="text/css" href="../components/style.css">
      <title>${productName} ITX Case</title>
    </head>
  `;
  document.head.innerHTML = headerHTML;
  checkSystemDarkMode();
}

// 加载共用的导航栏
function loadCommonNav(productModel) {
  const nav = document.createElement('div');
  nav.className = 'block';
  nav.innerHTML = `
    <p>
      <a href="../index.html" id="pagetop">HOME</a> | 
      <a href="../products/s400.html">S400</a> | 
      <a href="../products/s300.html">S300</a> | 
      <a href="../products/g200.html">G200</a>
    </p>
    <div><a href="#picgroup1">${productModel} Black Gallery</a></div>
    <div><a href="#picgroup2">${productModel} White Gallery</a></div>
    <div><a href="#man">Manual</a></div>
    <div><a href="#install">Installation Guide</a></div>
  `;
  document.querySelector('.container').prepend(nav);
}

// 创建图片展示区域
function createGallerySection(productModel, color, imageCount) {
  const galleryHTML = `
    <div class="block">
      <h1><a id="picgroup${color === 'White' ? '2' : '1'}">${productModel} ${color}</a></h1>
      ${color === 'White' ? '<a href="#top">Go to top</a>' : ''}
      <div id="thumbnails${color === 'White' ? '2' : ''}">
        ${Array.from({length: imageCount}, (_, i) => i + 1)
          .map(num => `
            <img class="thumbnail${color === 'White' ? '2' : ''} ${num === 1 ? 'selected' : ''}" 
                 src="pics/${productModel}/${productModel}C${color === 'White' ? 'W' : 'B'}-${num}.jpg" 
                 onclick="changeImage${color === 'White' ? '2' : ''}(this)"
            >
          `).join('')}
      </div>
      <div>
        <img id="main-image${color === 'White' ? '2' : ''}" 
             src="pics/${productModel}/${productModel}C${color === 'White' ? 'W' : 'B'}-1.jpg">
      </div>
    </div>
  `;
  return galleryHTML;
}

// 创建说明书部分
function createManualSection(productModel) {
  return `
    <div class="block">
      <h1><a id="man">Manual</a></h1>
      <a href="#top">Go to top</a>
      <div>
        <embed src="pdfs/${productModel.toLowerCase()}.manual.pdf" type="application/pdf" width="100%" height="1000px"/>
      </div>
    </div>
  `;
}

// 创建安装指南部分
function createInstallGuideSection(videoId) {
  return `
    <div class="block">
      <h1><a id="install">Installation Guide</a></h1>
      <a href="#top">Go to top</a>
      <div class="youtube">
        <iframe width="100%" class="video-iframe" 
                src="https://www.youtube.com/embed/${videoId}" 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen></iframe>
      </div>
    </div>
  `;
}

// 加载图片切换功能
function loadImageHandlers() {
  window.changeImage = function(image) {
    const mainImage = document.getElementById("main-image");
    mainImage.src = image.src;
    const thumbnails = document.getElementsByClassName("thumbnail");
    for (let i = 0; i < thumbnails.length; i++) {
      thumbnails[i].classList.remove("selected");
    }
    image.classList.add("selected");
  }

  window.changeImage2 = function(image) {
    const mainImage = document.getElementById("main-image2");
    mainImage.src = image.src;
    const thumbnails = document.getElementsByClassName("thumbnail2");
    for (let i = 0; i < thumbnails.length; i++) {
      thumbnails[i].classList.remove("selected");
    }
    image.classList.add("selected");
  }
}

// 创建首页产品卡片
function createProductCard(productModel, imageCount) {
  return `
    <div class="col-md-4">
      <div class="card">
        <img src="products/pics/${productModel}/${productModel}CB-1.jpg" class="card-img-top" alt="${productModel}">
        <div class="card-body">
          <h5 class="card-title">${productModel} ITX Case</h5>
          <p class="card-text">Available in Black & White</p>
          <a href="products/${productModel.toLowerCase()}.html" class="btn btn-primary">Learn More</a>
        </div>
      </div>
    </div>
  `;
}

// 修改暗黑模式切换按钮
function loadDarkModeToggle() {
  const darkModeToggle = document.createElement('div');
  darkModeToggle.className = 'dark-mode-toggle-container';
  darkModeToggle.innerHTML = `
    <button onclick="toggleDarkMode()" class="dark-mode-toggle">
      🌓
    </button>
  `;
  document.body.appendChild(darkModeToggle);
}

// 修改暗黑模式切换函数
window.toggleDarkMode = function() {
  const isDarkMode = document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
} 