<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div
    id="app"
    :style="getSize"
    @click="[displayRipple($event), resetAppTimer()]"
    @mousemove="resetAppTimer()"
  >
    <router-view/>
  </div>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
import APP_CONFIG from '../static/app-config'
export default {
  name: 'app',
  data () {
    return {
      appTimer: null
    }
  },
  created () {
    // reset the app timer
    this.resetAppTimer()
  },
  mounted () {
    this.resize()

    // set an event listener for resizing
    window.addEventListener('resize', this.resize)
  },
  beforeDestroy () {
    // remove the event listener
    window.removeEventListener('resize', this.resize)
  },
  computed: {
    getSize () {
      return {
        width: APP_CONFIG.monitor.width + 'px',
        height: APP_CONFIG.monitor.height + 'px'
      }
    }
  },
  methods: {
    resize () {
      // calc how much the content should be zoomed
      let zoom

      let ratioW = window.innerWidth / APP_CONFIG.monitor.width
      let ratioH = window.innerHeight / APP_CONFIG.monitor.height
      ratioW < ratioH ? zoom = ratioW : zoom = ratioH

      // zoom it
      const el = document.getElementById('app')
      el.style.zoom = zoom
    },
    // display ripple effect at mouse-clicked position
    displayRipple (event) {
      // remove old repple element
      const oldRippleElement = document.getElementById('touch-ripple')
      if (oldRippleElement) {
        oldRippleElement.parentNode.removeChild(oldRippleElement)
      }

      // calc ripple position
      const rippleRadius = 15
      let posX = event.clientX - rippleRadius
      let posY = event.clientY - rippleRadius

      // create new ripple element
      const newRippleElement = document.createElement('span')
      newRippleElement.id           = 'touch-ripple'
      newRippleElement.style.width  = (rippleRadius * 2) + 'px'
      newRippleElement.style.height = (rippleRadius * 2) + 'px'
      newRippleElement.style.left   = posX + 'px'
      newRippleElement.style.top    = posY + 'px'

      const appElement = document.getElementById('app')
      appElement.appendChild(newRippleElement)

      newRippleElement.classList.add('touch-ripple-effect')
    },
    resetAppTimer () {
      clearTimeout(this.appTimer)
      this.appTimer = setTimeout(() => {
        console.log('Timeout. Returning to Home screen.')
        this.jumpTo('home', {dir: 'home'})
      }, APP_CONFIG.timeout)
    }
  }
}
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style lang='stylus'>
@import 'reset-css/reset.css'
@import '/stylus/base/*'
@import '/stylus/fonts'
@import '/stylus/global-styles'
</style>
