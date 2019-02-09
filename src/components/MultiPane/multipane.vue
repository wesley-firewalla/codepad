<template>
  <div
    :class="classnames"
    :style="{ cursor, userSelect }"
    @mousedown="onMouseDown"
  >
    <slot />
  </div>
</template>

<script>
const LAYOUT_HORIZONTAL = 'horizontal'
const LAYOUT_VERTICAL = 'vertical'

export default {
  name: 'Multipane',

  props: {
    layout: {
      type: String,
      default: LAYOUT_HORIZONTAL
    }
  },

  data() {
    return {
      isResizing: false
    }
  },

  computed: {
    classnames() {
      return [
        'multipane',
        'layout-' + this.layout.slice(0, 1),
        this.isResizing ? 'is-resizing' : ''
      ]
    },
    cursor() {
      return this.isResizing
        ? this.layout === LAYOUT_HORIZONTAL
          ? 'col-resize'
          : 'row-resize'
        : ''
    },
    userSelect() {
      return this.isResizing ? 'none' : ''
    }
  },

  methods: {
    onMouseDown({ target: resizer, pageX: initialPageX, pageY: initialPageY }) {
      if (
        resizer.className &&
        typeof resizer.className === 'string' &&
        resizer.className.match('multipane-resizer')
      ) {
        if (resizer.parentElement !== this.$el) {
          return
        }
        const self = this
        const { $el: container, layout } = self

        let pane = resizer.previousElementSibling
        let previousPane = true
        const style = window.getComputedStyle(pane)
        if (style.flexGrow !== '0') {
          pane = resizer.nextElementSibling
          previousPane = false
        }
        const {
          offsetWidth: initialPaneWidth,
          offsetHeight: initialPaneHeight
        } = pane

        const usePercentage = !!(pane.style.width + '').match('%')

        const { addEventListener, removeEventListener } = window

        const resize = (initialSize, offset = 0) => {
          if (layout === LAYOUT_HORIZONTAL) {
            const containerWidth = container.clientWidth
            const paneWidth = initialSize + (previousPane ? offset : -offset)

            return (pane.style.width = usePercentage
              ? (paneWidth / containerWidth) * 100 + '%'
              : paneWidth + 'px')
          } else if (layout === LAYOUT_VERTICAL) {
            const containerHeight = container.clientHeight
            const paneHeight = initialSize + (previousPane ? offset : -offset)

            return (pane.style.height = usePercentage
              ? (paneHeight / containerHeight) * 100 + '%'
              : paneHeight + 'px')
          }
        }

        // This adds is-resizing class to container
        self.isResizing = true

        // Resize once to get current computed size

        // Trigger paneResizeStart event
        self.$emit(
          'paneResizeStart',
          pane,
          resizer,
          layout === LAYOUT_HORIZONTAL
            ? resize(initialPaneWidth)
            : resize(initialPaneHeight)
        )

        const onMouseMove = ({ pageX, pageY }) => {
          self.$emit(
            'paneResize',
            pane,
            resizer,
            layout === LAYOUT_HORIZONTAL
              ? resize(initialPaneWidth, pageX - initialPageX)
              : resize(initialPaneHeight, pageY - initialPageY)
          )
        }

        const onMouseUp = () => {
          // Run resize one more time to set computed width/height.
          // This removes is-resizing class to container
          self.isResizing = false

          removeEventListener('mousemove', onMouseMove)
          removeEventListener('mouseup', onMouseUp)

          self.$emit(
            'paneResizeStop',
            pane,
            resizer,
            layout === LAYOUT_HORIZONTAL
              ? resize(pane.clientWidth)
              : resize(pane.clientHeight)
          )
        }

        addEventListener('mousemove', onMouseMove)
        addEventListener('mouseup', onMouseUp)
      }
    }
  }
}
</script>

<style lang="scss">
.multipane {
  display: flex;

  &.layout-v {
    flex-direction: column;
  }

  &.layout-h {
    flex-direction: row;
  }
}

.multipane > div {
  position: relative;
}

.multipane-resizer {
  display: block;
  position: relative;
  z-index: 2;
}

.layout-v > .multipane-resizer {
  width: 100%;
  height: 8px;
  margin-bottom: -8px;
  cursor: row-resize;
}

.layout-h > .multipane-resizer {
  width: 8px;
  height: 100%;
  margin-left: -7px;
  left: 0;
  cursor: col-resize;
  border-right: 1px solid #dcdfe6;
}
</style>
