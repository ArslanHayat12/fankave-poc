const beviBookConfigs = {
  default: {
    customClass: "default",
    background: {
      type: "image", //image|video
      url: "/bevi/background.png",
    },

    pageLayout: {
      header: {
        position: "center",
        mainLogoUrl: "/bevi/main-logo.png",
        subLogoUrl: "/bevi/sub-logo.png",
        mainLogoHeight: "45px",
        subLogoHeight: "22px",
        mainLogoMargin: "0 0 27px 0",
        subLogoMargin: "",
      },
      footer: {
        position: "center",
        logoUrl: "",
      },
    },

    widget: {
      background: "/bevi/widget-bg.png",
      widgetGif: {
        position: "center", //left|right
        url: "/bevi/bevi-gif.gif",
      },
      logo: {
        position: "bottom-right",
        url: "/bevi/footer-logo.png",
      },
      mainHeadingText: "",
      fontSize: "",
      fontColor: "",

      homeScreen: {
        videoBox: {
          icon: "/bevi/camera-icon.png",
          text: "",
          borderRadius: "18px",
          background: "",
          border: "solid 2px #878787",
          iconColor: "",
          iconSize: "",
          fontColor: "",
          fontSize: "",
        },
        audioBox: {
          icon: "/bevi/mic-icon.png",
          text: "",
          borderRadius: "18px",
          background: "",
          border: "solid 2px #878787",
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
        video: {
          height: "350px",
        },
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

export default beviBookConfigs;
