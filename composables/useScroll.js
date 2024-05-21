import { ref, onMounted, onUnmounted } from 'vue'

export const useScroll = () => {
    const canScroll = ref(true)
    let scrollController = null

    const updateHelper = (param) => {
        // Logic for updating scroll position
    }

    const handleScroll = (e) => {
        if (!canScroll.value) return

        const delta = (e.wheelDelta) ? -e.wheelDelta : e.detail * 20

        if (delta > 50) {
            canScroll.value = false
            clearTimeout(scrollController)
            scrollController = setTimeout(() => {
                canScroll.value = true
            }, 800)
            updateHelper(1)
        } else if (delta < -50) {
            canScroll.value = false
            clearTimeout(scrollController)
            scrollController = setTimeout(() => {
                canScroll.value = true
            }, 800)
            updateHelper(-1)
        }
    }

    onMounted(() => {
        window.addEventListener('mousewheel', handleScroll)
        window.addEventListener('DOMMouseScroll', handleScroll)
    })

    onUnmounted(() => {
        window.removeEventListener('mousewheel', handleScroll)
        window.removeEventListener('DOMMouseScroll', handleScroll)
    })

    return { canScroll, updateHelper }
}
