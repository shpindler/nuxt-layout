/** Inject $bp attribute to Vue instance which consists breakpoints. */

import Vue from 'vue'

const xs = parseInt('<%= options.xs %>')
const sm = parseInt('<%= options.sm %>')
const md = parseInt('<%= options.md %>')
const lg = parseInt('<%= options.lg %>')

class BreakpointStore {
  constructor() {
    this.VM = new Vue({
      data() {
        return {
          breakpoints: {
            xs: [0, xs - 1],
            sm: [xs, sm - 1],
            md: [sm, md - 1],
            lg: [md, lg - 1],
            xl: [lg, Infinity]
          },
          screenWidth: document.documentElement.clientWidth
        }
      },
      computed: {
        bp() {
          let result = null

          for (let k in this.breakpoints) {
            if (Object.hasOwnProperty(this.breakpoints, k)) {
              const v = this.breakpoints[k]
              if (v[0] <= this.screenWidth && v[1] >= this.screenWidth) {
                result = k
              }
            }
          }

          return result
        },
        xs() {
          return this.bp === 'xs'
        },
        sm() {
          return this.bp === 'sm'
        },
        md() {
          return this.bp === 'md'
        },
        lg() {
          return this.bp === 'lg'
        },
        xl() {
          return this.bp === 'xl'
        },
        isMobile() {
          return this.xs || this.sm
        },
        isTablet() {
          return this.md
        },
        isDesktop() {
          return this.lg || this.xl
        },
        isMobileOrTablet() {
          return this.isMobile || this.isTablet
        },
        isDesktopOrTablet() {
          return this.isDesktop || this.isTablet
        }
      },
      created() {
        addEventListener('resize', this.updateScreenWidth)
        addEventListener('orientationchange', this.updateScreenWidth)
      },
      methods: {
        updateScreenWidth() {
          this.screenWidth = document.documentElement.clientWidth
        }
      }
    })
  }

  get value() {
    return this.VM.bp
  }
}

const DevicePlugin = {
  Store: BreakpointStore,
  install(Vue, options) {
    Vue.mixin({
      beforeCreate() {
        this.$bp = options.store.VM
      }
    })
  }
}

Vue.use(DevicePlugin, {
  store: new DevicePlugin.Store()
})
