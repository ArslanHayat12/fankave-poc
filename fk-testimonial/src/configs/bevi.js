export const beviBookConfigs = {
  default: {
    preLoadedVideo: {
      position: "center", //left|right
      url: "",
    },
    background: "",

    containerCssClassname: "default",

    loadingMedia: {
      url: `/testimonial-poc/bg-video.mp4`,
    },
    layout: {
      regular: {
        header: {
          leftLogoUrl: "/wave.png",
          rightLogoUrl: "/wave.png",
          centerLogoUrlParentUrl: "",
          centerLogoUrlChildUrl: "",
        },
        footer: {
          logoUrl: "/wave.png",
        },
      },
      threecolumn: {
        header: {
          leftLogoUrl: "/wave.png",
          rightLogoUrl: "/wave.png",
        },
        footer: {
          logoUrl: "",
        },
      },
    },

    card: {
      background: "",
      topLogo: "",
      logo: {
        topLeft: "",
        bottomRight: "",
      },
      mainHeadingText: "",
      fontSize: "",
      fontColor: "",
      homeScreen: {
        videoBox: {
          icon: "",
          text: "",
          borderRadius: "",
          background: "",
          borderColor: "",
          iconColor: "",
          iconSize: "",
          fontColor: "",
          fontSize: "",
        },
        audioBox: {
          icon: "",
          text: "",
          borderRadius: "",
          background: "",
          borderColor: "",
          iconColor: "",
          iconSize: "",
          fontColor: "",
          fontSize: "",
        },
      },
      previewScreen: {
        video: {
          heading: "",
          fontSize: "",
          fontColor: "",
          video: {},
          input: {
            placeholders: {
              name: "",
              email: "",
              company: "",
              fontSize: "",
              fontColor: "",
            },

            icon: "",
            iconColor: "",
            borderRadius: "",
            borderColor: "",
          },
          button: {
            backgroundColor: "",
            text: "",
            fontSize: "",
            color: "",
          },
        },
        audio: {
          heading: "",
          fontSize: "",
          fontColor: "",
          audio: {},
          input: {
            placeholders: {
              name: "",
              email: "",
              company: "",
              fontSize: "",
              fontColor: "",
            },

            icon: "",
            iconColor: "",
            borderRadius: "",
            borderColor: "",
          },
          button: {
            backgroundColor: "",
            text: "",
            fontSize: "",
            color: "",
          },
          card: {
            icon: "",
          },
        },
      },

      recordingScreen: {
        video: {},
      },

      thankyouScreen: {
        heading: "",
        subHeading: "",
        shareIcon: "",
        tweetIcon: "",
        goBackText: "",
        button: {
          backgroundColor: "",
          text: "",
          fontSize: "",
          color: "",
        },
        input: {
          color: "",
          fontSize: "",
          placeholder: "",
          borderRadius: "",
          background: "",
          borderColor: "",
          height: "",
        },
      },
    },
  },
};
