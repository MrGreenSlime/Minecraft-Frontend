<template>
  <div>
    <StarsAnimation />
    <DeviceNotification />
    <Header />
    <SideNav />
    <main>
      <Intro />
      <TeamSlider />
    </main>
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue'
import StarsAnimation from '@/components/StarsAnimation'
import DeviceNotification from '@/components/DeviceNotification.vue'
import Header from '@/components/Header.vue'
import SideNav from '@/components/SideNav.vue'
import Intro from '@/components/Intro.vue'
import TeamSlider from '@/components/TeamSlider.vue'

export default defineComponent({
  components: {
    StarsAnimation,
    DeviceNotification,
    Header,
    SideNav,
    Intro,
    TeamSlider
  }
})


</script>
