const questionDetails = [
  {
    text: "What is your name, title and company?",
    chunkSize: "0.25",
  },
  {
    text: "What challenge did you have?",
    chunkSize: "0.5",
  },
  {
    text: "What made this partner the obvious choice?",
    chunkSize: "",
  },
  {
    text: "What were the results?",
    chunkSize: "",
  },
];

let pathName = window.location.pathname.replaceAll("/", "");
pathName = pathName ? `/${pathName}` : "";

const demoConfigs = {
  default: {
    topic: "demostories",
    customClass: "demo-layout",
    onPageLoad: {
      video: {
        url: `${pathName}/honeybook/honeybook.mp4`,
        display: false,
      },
    },
    background: {
      type: "image", //image|video
      url: `${pathName}/demo/background.png`,
    },

    pageLayout: {
      header: {
        position: "center",
        mainLogoUrl: "",
        subLogoUrl: "",
        subLogoTex: "",
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
      width: "298px",
      height: "729px",
      background: `${pathName}/demo/widget-bg.png`,
      borderRadius: "12px",
      widgetGif: {
        url: "",
        gif: false,
      },
      logo: {
        position: "",
        url: `${pathName}/demo/postal-logo.png`,
        height: "40px",
      },
      mainHeadingText: "",
      fontSize: "",
      fontColor: "",

      homeScreen: {
        cardStyle: "columns", // columns | rows
        heading: "Select one to record your testimonial",
        videoBox: {
          display: true,
          type: "video",
          icon: `${pathName}/demo/camera.png`,
          text: "RECORD VIDEO",
          borderRadius: "18px",
          background: "",
          border: "solid 2px #878787",
          iconColor: "",
          iconSize: "",
          fontColor: "",
          fontSize: "",
        },
        audioBox: {
          display: true,
          type: "audio",
          icon: `${pathName}/demo/mic.png`,
          text: "RECORD AUDIO",
          borderRadius: "18px",
          background: "",
          border: "solid 2px #878787",
          iconColor: "",
          iconSize: "",
          fontColor: "",
          fontSize: "",
        },
        imageCaptureBox: {
          display: true,
          type: "imageCapture",
          icon: `${pathName}/demo/upload.png`,
          text: "CAPTURE IMAGE",
          borderRadius: "18px",
          background: "",
          border: "solid 2px #878787",
          iconColor: "",
          iconSize: "",
          fontColor: "",
          fontSize: "",
        },
        imageUploadBox: {
          display: true,
          type: "imageUpload",
          icon: `${pathName}/demo/upload.png`,
          text: "UPLOAD IMAGE",
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
          height: "350",
          heading: "Preview Video Testimonial",
          fontSize: "",
          fontColor: "",
          video: {},
          input: {
            placeholders: {
              name: "Name (optional)",
              fontSize: "12px",
              fontWeight: "500",
              fontColor: "#000",
              boxShadow: "",
              borderRadius: "20px",
              border: "solid 2px rgba(218, 218, 218, 0.21)",
            },

            icon: "",
            iconColor: "",
            borderRadius: "",
            borderColor: "",
            display: {
              name: true,
              mail: false,
              company: false,
            },
          },
          button: {
            backgroundColor: "#5089ed",
            text: "Approve",
            fontSize: "14px",
            fontWeight: "500",
            color: "#fff",
            textTransform: "uppercase",
            borderRadius: "40px",
            height: "33px",
            width: "110px",
            placement: "center",
          },

          bgHeight: "100vh",
        },
        audio: {
          heading: "Preview Audio Testimonial",
          fontSize: "",
          fontColor: "",
          audio: {
            displayWave: false,
          },
          input: {
            placeholders: {
              name: "Name (optional)",
              fontSize: "12px",
              fontColor: "#2d2d2d",
              boxShadow: "",
              borderRadius: "20px",
            },
            button: {
              backgroundColor: "#4dbbe5",
              text: "Approve",
              fontSize: "14px",
              fontWeight: "500",
              color: "#fff",
              textTransform: "uppercase",
              borderRadius: "40px",
              height: "33px",
              width: "110px",
              placement: "center",
            },

            icon: "",
            iconColor: "",
            borderRadius: "",
            borderColor: "",
            display: {
              name: true,
              mail: false,
              company: false,
            },
          },
          button: {
            backgroundColor: "#5089ed",
            text: "Approve",
            fontSize: "14px",
            fontWeight: "500",
            color: "#fff",
            textTransform: "uppercase",
            borderRadius: "40px",
            height: "33px",
            width: "110px",
            placement: "center",
          },
          card: {
            icon: "default/mic-icon-white.png",
          },
        },
      },

      recordingScreen: {
        video: {
          heading: "Record Video Testimonial",
          height: "550",
          questionDetails,
          button: {
            display: false,
            startRecording: {
              text: "Record",
            },
            stopRecording: {
              text: "Stop",
            },
          },
          icon: {
            display: true,
          },

          videoChunks: {
            available: true,
            thumbnail: {
              width: "70px",
            },
            tags: {
              preview: "PREVIEW",
              redo: "RE-DO",
              recordAnswer: "RECORD ANSWER",
              background: "#35a4ff",
            },
          },
        },
        audio: {
          heading: "Record Audio Testimonial",
          questionDetails,
          button: {
            display: false,
            startRecording: {
              text: "Record",
            },
            stopRecording: {
              text: "Stop",
            },
          },
          icon: {
            display: true,
          },
          micIcon: {
            stroke: "#86a6e3",
            background: "#5e91f3",
            canvasPrimaryColor: "#5e91f3",
            canvasSecondaryColor: "#88abf0",
          },
        },
      },

      thankyouScreen: {
        heading: "Thank you",
        subHeading: "We will be in touch if we need anything else.",
        shareIcon: {
          borderRadius: "none",
          url: `${pathName}/demo/share-icon.png`,
          bgColor: "transparent",
          height: "95px",
          display: true,
        },
        tweetIcon: {
          borderRadius: "none",
          url: `${pathName}/demo/tweet-icon.png`,
          bgColor: "transparent",
          height: "61px",
        },
        twitterButton: {
          bgColor: "#5089ed",
          borderRadius: "22px",
          display: true,
          placement: "center",
        },
        linkedinButton: {
          bgColor: "#5089ed",
          borderRadius: "22px",
          display: false,
        },
        goBackText: "Go Again",
        button: {
          backgroundColor: "#5089ed",
          text: "Share",
          display: false,
          fontSize: "",
          color: "",
          height: "60px",
          width: "180px",
        },
        input: {
          color: "",
          fontSize: "17px",
          placeholder: "",
          borderRadius: "22px",
          background: "",
          borderColor: "",
          height: "85px",
        },
      },
    },
  },
};

export default demoConfigs;
