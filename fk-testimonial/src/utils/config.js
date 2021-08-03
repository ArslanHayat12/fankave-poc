export const waitForAddedNode = (params) => {
    const config = {
        subtree: !!params.recursive || !params.parent,
        childList: true
    }
    const parent = params.parent || document
    const el = document.getElementById(params.id)
    const creationObserver = new MutationObserver(function () {
        const target = document.getElementById(params.id)
        if (target) {
            this.disconnect()
            params.done(target)
            removalObserver.observe(parent, config)
        }
    })
    const removalObserver = new MutationObserver(function () {
        if (!document.getElementById(params.id)) {
            this.disconnect()
            creationObserver.observe(parent, config)
        }
    })
    if (el) {
        params.done(el)
        removalObserver.observe(parent, config)
    }
    if (!el) {
        creationObserver.observe(parent, config)
    }
}
