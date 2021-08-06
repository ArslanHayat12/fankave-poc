export const beviBookConfigs = {
    "default": {
        "containerCssClassname": "default",
        "background": "linear-gradient(20deg, #364D9D, #308CC3)",
        "loadingMedia": {
            "url": () => `http://storage.googleapis.com/animable/cisco/${lodash.random(1, 4)}.mp4`
        },
        "layout": {
            "regular": {
                "header": {
                    "leftLogoUrl": './assets/logo/it-cancun.png',
                    "rightLogoUrl": './assets/logo/ciscolive-cancun.png'
                },
                "footer": {
                    "logoUrl": './assets/logo/fankave-cornered.png'
                },
            },
            "threecolumn": {
                "header": {
                    "leftLogoUrl": './assets/logo/it-cancun.png',
                    "rightLogoUrl": './assets/logo/ciscolive-cancun.png'
                },
                "footer": {
                    "logoUrl": ''
                },
            }
        }
    }
}