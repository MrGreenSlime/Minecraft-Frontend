<template>
  <div class="intro">
    <div class="intro--banner">
      <h1 style="text-shadow: 4px 4px 8px #000000;">Our <span style="color: #ad04f0;">BIG</span><br>minecolonies<br>integration app</h1>
      <NuxtLink to="/manual" class="cta">
        Download Now
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             viewBox="0 0 150 118" style="enable-background:new 0 0 150 118;" xml:space="preserve">
          <g transform="translate(0.000000,118.000000) scale(0.100000,-0.100000)">
            <path d="M870,1167c-34-17-55-57-46-90c3-15,81-100,194-211l187-185l-565-1c-431,0-571-3-590-13c-55-28-64-94-18-137c21-20,33-20,597-20h575l-192-193C800,103,794,94,849,39c20-20,39-29,61-29c28,0,63,30,298,262c147,144,272,271,279,282c30,51,23,60-219,304C947,1180,926,1196,870,1167z"/>
          </g>
        </svg>
        <span class="btn-background"></span>
      </NuxtLink>
      <img src="~/assets/img/minespace.png" alt="Welcome">
    </div>
    <div class="intro--options">
      <NuxtLink to="/about">
        <h3>About</h3>
        <p>We use a combination of 4 mods to make everything work smoothly with our app and our goals.</p>
      </NuxtLink>
      <NuxtLink to="/manual">
        <h3>Manual</h3>
        <p>It only takes 3 clicks to install and set up the app, and you can start using it for your own Minecraft worlds.</p>
      </NuxtLink>
      <NuxtLink to="/login">
        <h3>Login</h3>
        <p>You can use our app at home or link it with your online account and access it online whenever you want.</p>
      </NuxtLink>
    </div>
    <div class="scroll-indicator">ˬ</div>
  </div>
</template>

<script setup>
// No additional script needed
</script>

<style scoped>
.cta {
  position: relative;
  display: inline-block;
  padding: 10px 30px;
  font-size: 1.5rem;
  color: white;
  background-color: transparent;
  border: 2px solid #ad04f0;
  border-radius: 5px;
  cursor: pointer;
  overflow: hidden;
  margin-top: 1rem;
  transition: color 0.3s ease;
  text-decoration: none; /* Ensure the link has no underline */
}

.cta svg {
  margin-left: 10px;
  fill: white;
  width: 24px;
  height: 24px;
  vertical-align: middle;
}

.cta:hover {
  background-color: #ad04f0;
  transition: background-color 4s ease;

}

.cta .btn-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 75%;
  height: 100%;
  background-color: #ad04f0;
  z-index: -1;
  transform: translateX(-100%);
  transition: transform 0.3s ease, width 0.3s ease;
}

.cta:hover .btn-background {
  transform: translateX(0);
  width: 100%;
}

.cta:hover {
  color: white;

}

@keyframes background-slide {
  from {
    width: 75%;
    transform: translateX(-100%);
  }
  to {
    width: 100%;
    transform: translateX(0);
  }
}

.cta:hover .btn-background {
  animation: background-slide 0.3s forwards;
}
</style>
