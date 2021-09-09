import { StaticAssets } from '../assets'

const questionDetails = [
  {
    text: 'What is your name, title and company?',
    chunkSize: '0.25',
  },
  {
    text: 'What challenge did you have?',
    chunkSize: '0.5',
  },
  {
    text: 'What made this partner the obvious choice?',
    chunkSize: '',
  },
  {
    text: 'What were the results?',
    chunkSize: '',
  },
]

const {
  ImageCaptureIcon,
  ImageUploadIcon,
  AudioCaptureIcon,
  audioTestimonialIcon,
  VideoCaptureIcon,
  videoTestimonialIcon,
} = StaticAssets
let pathName = window.location.pathname.replaceAll('/', '')
pathName = pathName ? `/${pathName}` : ''

const defaultConfigs = {
  topic: 'demostories',
  customClass: 'fk-demo',
  experience: 'demo',
  logo: 'https://logodix.com/logo/1931272.png',
  brand: {
    pallete: {
      primary: '#42c0fb',
      secondary: '#e5f3ff',
      text: 'black',
      subText: 'grey',
      success: 'green',
      info: 'blue',
      warning: 'orange',
      error: 'red',
    },
    background: {
      type: 'color', //image|color
      value: 'white',
    },
    pageLoad: {
      type: 'video',
      url: '',
      enabled: false,
    },
  },
  layout: {
    header: {
      enabled: true,
      heading: 'Demo Content Creation',
      logo: 'https://logodix.com/logo/1931272.png',
    },
    footer: {
      enabled: true,
      heading: 'Powered By Fankave',
      logo: 'https://logodix.com/logo/1931272.png',
    },
  },
  widgets: {
    enableDownload: true,
    form: {
      user: {
        enabled: true,
        name: true,
        username: true,
        email: true,
      },
      text: {
        enabled: true,
        limit: 280,
        placeholder: 'Your Story...',
      },
      hastages: {
        enabled: true,
        limit: 5,
        options: ['CiscoFuture', 'CiscoImpact', 'MyImpact'],
      },
    },
    sharing: {
      enabled: true,
      twitter: true,
      linkedIn: true,
    },
    imageCapture: {
      enabled: true,
      icon: ImageCaptureIcon,
      label: 'Capture Image',
      processing: {
        pre: false,
        post: true,
      },
    },
    videoCapture: {
      enabled: true,
      icon: VideoCaptureIcon,
      label: 'Capture Video',
    },
    imageUpload: {
      enabled: true,
      processing: {
        post: true,
      },
      icon: ImageUploadIcon,
      label: 'Upload Image',
    },
    audioCapture: {
      enabled: true,
      icon: AudioCaptureIcon,
      label: 'Record Audio',
    },
    audioTestimonial: {
      enabled: true,
      icon: audioTestimonialIcon,
      label: 'Audio Testimonial',
    },
    videoTestimonial: {
      enabled: true,
      icon: videoTestimonialIcon,
      label: 'Video Testimonial',
    },
  },
  default: {
    topic: 'demostories',
    customClass: 'default-layout',
    onPageLoad: {
      video: {
        url: `${pathName}/honeybook/honeybook.mp4`,
        display: false,
      },
    },
    background: {
      type: 'image', //image|video
    },

    pageLayout: {
      header: {
        position: 'center',
        subLogoUrl: '',
        subLogoTex: '',
        mainLogoHeight: '40px',
        subLogoHeight: '',
        mainLogoMargin: '0 0 27px 0',
        subLogoMargin: '',
      },
      footer: {
        position: 'center',
        logoUrl: '',
      },
    },

    widget: {
      width: '298px',
      height: '729px',
      background: `${pathName}/default/widget-bg.png`,
      borderRadius: '12px',
      widgetGif: {
        url: '',
        gif: false,
      },
      logo: {
        position: 'bottom-right',
        url: '',
        height: '',
      },
      mainHeadingText: '',
      fontSize: '',
      fontColor: '',

      homeScreen: {
        cardStyle: 'rows', // columns | rows
        videoBox: {
          display: false,
          icon: `${pathName}/default/camera.png`,
          text: 'RECORD VIDEO',
          borderRadius: '18px',
          background: '',
          border: 'solid 2px #878787',
          iconColor: '',
          iconSize: '',
          fontColor: '',
          fontSize: '',
        },
        audioBox: {
          display: false,
          icon: `${pathName}/default/mic.png`,
          text: 'RECORD AUDIO',
          borderRadius: '18px',
          background: '',
          border: 'solid 2px #878787',
          iconColor: '',
          iconSize: '',
          fontColor: '',
          fontSize: '',
        },
        imageCaptureBox: {
          display: true,
          type: 'imageCapture',
          icon: `${pathName}/demo/upload.png`,
          text: 'CAPTURE IMAGE',
          borderRadius: '18px',
          background: '',
          border: 'solid 2px #878787',
          iconColor: '',
          iconSize: '',
          fontColor: '',
          fontSize: '',
        },
        imageUploadBox: {
          display: false,
          type: 'imageUpload',
          icon: `${pathName}/demo/upload.png`,
          text: 'UPLOAD IMAGE',
          borderRadius: '18px',
          background: '',
          border: 'solid 2px #878787',
          iconColor: '',
          iconSize: '',
          fontColor: '',
          fontSize: '',
        },
      },

      previewScreen: {
        video: {
          height: '350',
          fontSize: '',
          fontColor: '',
          video: {},
          input: {
            placeholders: {
              name: 'Name (optional)',
              fontSize: '12px',
              fontWeight: '500',
              fontColor: '#000',
              boxShadow: '',
              borderRadius: '20px',
              border: 'solid 2px rgba(218, 218, 218, 0.21)',
            },

            icon: '',
            iconColor: '',
            borderRadius: '',
            borderColor: '',
            display: {
              name: true,
              mail: false,
              company: false,
            },
          },
          button: {
            backgroundColor: '#5089ed',
            text: 'Approve',
            fontSize: '14px',
            fontWeight: '500',
            color: '#fff',
            textTransform: 'uppercase',
            borderRadius: '40px',
            height: '33px',
            width: '110px',
            placement: 'center',
          },

          bgHeight: '100vh',
        },
        audio: {
          fontSize: '',
          fontColor: '',
          audio: {
            displayWave: false,
          },
          input: {
            placeholders: {
              name: 'Name (optional)',
              fontSize: '12px',
              fontColor: '#2d2d2d',
              boxShadow: '',
              borderRadius: '20px',
            },
            button: {
              backgroundColor: '#4dbbe5',
              text: 'Approve',
              fontSize: '14px',
              fontWeight: '500',
              color: '#fff',
              textTransform: 'uppercase',
              borderRadius: '40px',
              height: '33px',
              width: '110px',
              placement: 'center',
            },

            icon: '',
            iconColor: '',
            borderRadius: '',
            borderColor: '',
            display: {
              name: true,
              mail: false,
              company: false,
            },
          },
          button: {
            backgroundColor: '#5089ed',
            text: 'Approve',
            fontSize: '14px',
            fontWeight: '500',
            color: '#fff',
            textTransform: 'uppercase',
            borderRadius: '40px',
            height: '33px',
            width: '110px',
            placement: 'center',
          },
          card: {
            icon: `${pathName}/default/mic-icon-white.png`,
          },
        },
      },

      recordingScreen: {
        video: {
          height: '550',
          questionDetails,
          button: {
            display: false,
            startRecording: {
              text: 'Record',
            },
            stopRecording: {
              text: 'Stop',
            },
          },
          icon: {
            display: true,
          },
        },
        audio: {
          questionDetails,
          button: {
            display: false,
            startRecording: {
              text: 'Record',
            },
            stopRecording: {
              text: 'Stop',
            },
          },
          icon: {
            display: true,
          },
          micIcon: {
            stroke: '#86a6e3',
            background: '#5e91f3',
            canvasPrimaryColor: '#5e91f3',
            canvasSecondaryColor: '#88abf0',
          },
        },
      },

      thankyouScreen: {
        shareIcon: {
          borderRadius: 'none',
          url: `${pathName}/default/share-icon.png`,
          bgColor: 'transparent',
          height: '35px',
          display: true,
        },
        tweetIcon: {
          borderRadius: 'none',
          url: `${pathName}/default/tweet-icon.png`,
          bgColor: 'transparent',
          height: '61px',
        },
        twitterButton: {
          bgColor: '#5089ed',
          borderRadius: '22px',
          display: true,
          placement: 'center',
        },
        linkedinButton: {
          bgColor: '#5089ed',
          borderRadius: '22px',
          display: false,
        },
        button: {
          backgroundColor: '#5089ed',
          text: 'Share',
          display: false,
          fontSize: '',
          color: '',
          height: '60px',
          width: '180px',
        },
        input: {
          color: '',
          fontSize: '17px',
          placeholder: '',
          borderRadius: '22px',
          background: '',
          borderColor: '',
          height: '85px',
        },
      },
    },
  },
}

export default defaultConfigs
