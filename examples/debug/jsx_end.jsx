import {Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs} from "react/jsx-runtime";
export const MERCURY_SLIDES_LENGTH = 3;
function _createMdxContent(props) {
  const _components = {
    code: "code",
    div: "div",
    h1: "h1",
    p: "p",
    pre: "pre",
    span: "span",
    ...props.components
  }, {Presentation, Slide} = _components;
  if (!Presentation) _missingMdxReference("Presentation", true);
  if (!Slide) _missingMdxReference("Slide", true);
  return _jsxs(Presentation, {
    slidesLength: "3",
    children: ["\n", _jsxs(Slide, {
      index: "0",
      children: ["\n", _jsx(_components.h1, {
        children: "Slide 1"
      }), "\n", _jsx(_components.p, {
        children: "Here's a basic code example:"
      }), "\n", _jsx(_Fragment, {
        children: _jsx(_components.pre, {
          className: "shiki shiki-themes one-light material-theme-darker",
          style: {
            backgroundColor: "#FAFAFA",
            "--shiki-dark-bg": "#212121",
            color: "#383A42",
            "--shiki-dark": "#EEFFFF"
          },
          tabIndex: "0",
          children: _jsx(_components.code, {
            children: _jsxs(_components.span, {
              className: "line",
              children: [_jsx(_components.span, {
                style: {
                  color: "#383A42",
                  "--shiki-dark": "#EEFFFF"
                },
                children: "console"
              }), _jsx(_components.span, {
                style: {
                  color: "#383A42",
                  "--shiki-dark": "#89DDFF"
                },
                children: "."
              }), _jsx(_components.span, {
                style: {
                  color: "#4078F2",
                  "--shiki-dark": "#82AAFF"
                },
                children: "log"
              }), _jsx(_components.span, {
                style: {
                  color: "#383A42",
                  "--shiki-dark": "#EEFFFF"
                },
                children: "("
              }), _jsx(_components.span, {
                style: {
                  color: "#50A14F",
                  "--shiki-dark": "#89DDFF"
                },
                children: "\""
              }), _jsx(_components.span, {
                style: {
                  color: "#50A14F",
                  "--shiki-dark": "#C3E88D"
                },
                children: "Hello, world!"
              }), _jsx(_components.span, {
                style: {
                  color: "#50A14F",
                  "--shiki-dark": "#89DDFF"
                },
                children: "\""
              }), _jsx(_components.span, {
                style: {
                  color: "#383A42",
                  "--shiki-dark": "#EEFFFF"
                },
                children: ")"
              })]
            })
          })
        })
      }), "\n"]
    }), "\n", _jsxs(Slide, {
      index: "1",
      children: ["\n", _jsx(_components.h1, {
        children: "Slide 2 - TypeScript with Twoslash"
      }), "\n", _jsx(_components.p, {
        children: "TypeScript with type information:"
      }), "\n", _jsx(_Fragment, {
        children: _jsx(_components.pre, {
          className: "shiki shiki-themes one-light material-theme-darker twoslash lsp",
          style: {
            backgroundColor: "#FAFAFA",
            "--shiki-dark-bg": "#212121",
            color: "#383A42",
            "--shiki-dark": "#EEFFFF"
          },
          tabIndex: "0",
          children: _jsxs(_components.code, {
            children: [_jsxs(_components.span, {
              className: "line",
              children: [_jsx(_components.span, {
                style: {
                  color: "#A626A4",
                  "--shiki-dark": "#C792EA"
                },
                children: "interface"
              }), _jsx(_components.span, {
                style: {
                  color: "#C18401",
                  "--shiki-dark": "#FFCB6B"
                },
                children: " "
              }), _jsx(_components.span, {
                style: {
                  color: "#C18401",
                  "--shiki-dark": "#FFCB6B"
                },
                children: "User"
              }), _jsx(_components.span, {
                style: {
                  color: "#383A42",
                  "--shiki-dark": "#89DDFF"
                },
                children: " {"
              })]
            }), "\n", _jsxs(_components.span, {
              className: "line",
              children: [_jsx(_components.span, {
                style: {
                  color: "#383A42",
                  "--shiki-dark": "#F07178"
                },
                children: "  "
              }), _jsx(_components.span, {
                style: {
                  color: "#383A42",
                  "--shiki-dark": "#F07178"
                },
                children: _jsxs(_components.span, {
                  className: "twoslash-hover",
                  children: [_jsx(_components.span, {
                    className: "twoslash-popup-container",
                    children: _jsxs(_components.code, {
                      className: "twoslash-popup-code",
                      children: [_jsx(_components.span, {
                        style: {
                          color: "#383A42",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "User"
                      }), _jsx(_components.span, {
                        style: {
                          color: "#383A42",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "."
                      }), _jsx(_components.span, {
                        style: {
                          color: "#E45649",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "name"
                      }), _jsx(_components.span, {
                        style: {
                          color: "#383A42",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: ": string"
                      })]
                    })
                  }), "name"]
                })
              }), _jsx(_components.span, {
                style: {
                  color: "#0184BC",
                  "--shiki-dark": "#89DDFF"
                },
                children: ":"
              }), _jsx(_components.span, {
                style: {
                  color: "#0184BC",
                  "--shiki-dark": "#FFCB6B"
                },
                children: " string"
              })]
            }), "\n", _jsxs(_components.span, {
              className: "line",
              children: [_jsx(_components.span, {
                style: {
                  color: "#383A42",
                  "--shiki-dark": "#F07178"
                },
                children: "  "
              }), _jsx(_components.span, {
                style: {
                  color: "#383A42",
                  "--shiki-dark": "#F07178"
                },
                children: _jsxs(_components.span, {
                  className: "twoslash-hover",
                  children: [_jsx(_components.span, {
                    className: "twoslash-popup-container",
                    children: _jsxs(_components.code, {
                      className: "twoslash-popup-code",
                      children: [_jsx(_components.span, {
                        style: {
                          color: "#383A42",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "User"
                      }), _jsx(_components.span, {
                        style: {
                          color: "#383A42",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "."
                      }), _jsx(_components.span, {
                        style: {
                          color: "#E45649",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "age"
                      }), _jsx(_components.span, {
                        style: {
                          color: "#383A42",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: ": number"
                      })]
                    })
                  }), "age"]
                })
              }), _jsx(_components.span, {
                style: {
                  color: "#0184BC",
                  "--shiki-dark": "#89DDFF"
                },
                children: ":"
              }), _jsx(_components.span, {
                style: {
                  color: "#0184BC",
                  "--shiki-dark": "#FFCB6B"
                },
                children: " number"
              })]
            }), "\n", _jsx(_components.span, {
              className: "line",
              children: _jsx(_components.span, {
                style: {
                  color: "#383A42",
                  "--shiki-dark": "#89DDFF"
                },
                children: "}"
              })
            }), "\n", _jsx(_components.span, {
              className: "line"
            }), "\n", _jsxs(_components.span, {
              className: "line",
              children: [_jsx(_components.span, {
                style: {
                  color: "#A626A4",
                  "--shiki-dark": "#C792EA"
                },
                children: "const"
              }), _jsx(_components.span, {
                style: {
                  color: "#986801",
                  "--shiki-dark": "#EEFFFF"
                },
                children: " "
              }), _jsx(_components.span, {
                style: {
                  color: "#986801",
                  "--shiki-dark": "#EEFFFF"
                },
                children: _jsxs(_components.span, {
                  className: "twoslash-hover",
                  children: [_jsx(_components.span, {
                    className: "twoslash-popup-container",
                    children: _jsxs(_components.code, {
                      className: "twoslash-popup-code",
                      children: [_jsx(_components.span, {
                        style: {
                          color: "#A626A4",
                          "--shiki-dark": "#C792EA"
                        },
                        children: "const"
                      }), _jsx(_components.span, {
                        style: {
                          color: "#986801",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: " user"
                      }), _jsx(_components.span, {
                        style: {
                          color: "#0184BC",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), _jsx(_components.span, {
                        style: {
                          color: "#C18401",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " User"
                      })]
                    })
                  }), "user"]
                })
              }), _jsx(_components.span, {
                style: {
                  color: "#0184BC",
                  "--shiki-dark": "#89DDFF"
                },
                children: ":"
              }), _jsx(_components.span, {
                style: {
                  color: "#C18401",
                  "--shiki-dark": "#FFCB6B"
                },
                children: " "
              }), _jsx(_components.span, {
                style: {
                  color: "#C18401",
                  "--shiki-dark": "#FFCB6B"
                },
                children: "User"
              }), _jsx(_components.span, {
                style: {
                  color: "#0184BC",
                  "--shiki-dark": "#89DDFF"
                },
                children: " ="
              }), _jsx(_components.span, {
                style: {
                  color: "#383A42",
                  "--shiki-dark": "#89DDFF"
                },
                children: " {"
              })]
            }), "\n", _jsxs(_components.span, {
              className: "line",
              children: [_jsx(_components.span, {
                style: {
                  color: "#E45649",
                  "--shiki-dark": "#F07178"
                },
                children: "  "
              }), _jsx(_components.span, {
                style: {
                  color: "#E45649",
                  "--shiki-dark": "#F07178"
                },
                children: _jsxs(_components.span, {
                  className: "twoslash-hover",
                  children: [_jsx(_components.span, {
                    className: "twoslash-popup-container",
                    children: _jsxs(_components.code, {
                      className: "twoslash-popup-code",
                      children: [_jsx(_components.span, {
                        style: {
                          color: "#383A42",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "User"
                      }), _jsx(_components.span, {
                        style: {
                          color: "#383A42",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "."
                      }), _jsx(_components.span, {
                        style: {
                          color: "#E45649",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "name"
                      }), _jsx(_components.span, {
                        style: {
                          color: "#383A42",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: ": string"
                      })]
                    })
                  }), "name"]
                })
              }), _jsx(_components.span, {
                style: {
                  color: "#0184BC",
                  "--shiki-dark": "#89DDFF"
                },
                children: ":"
              }), _jsx(_components.span, {
                style: {
                  color: "#50A14F",
                  "--shiki-dark": "#89DDFF"
                },
                children: " \""
              }), _jsx(_components.span, {
                style: {
                  color: "#50A14F",
                  "--shiki-dark": "#C3E88D"
                },
                children: "Alice"
              }), _jsx(_components.span, {
                style: {
                  color: "#50A14F",
                  "--shiki-dark": "#89DDFF"
                },
                children: "\""
              }), _jsx(_components.span, {
                style: {
                  color: "#383A42",
                  "--shiki-dark": "#89DDFF"
                },
                children: ","
              })]
            }), "\n", _jsxs(_components.span, {
              className: "line",
              children: [_jsx(_components.span, {
                style: {
                  color: "#E45649",
                  "--shiki-dark": "#F07178"
                },
                children: "  "
              }), _jsx(_components.span, {
                style: {
                  color: "#E45649",
                  "--shiki-dark": "#F07178"
                },
                children: _jsxs(_components.span, {
                  className: "twoslash-hover",
                  children: [_jsx(_components.span, {
                    className: "twoslash-popup-container",
                    children: _jsxs(_components.code, {
                      className: "twoslash-popup-code",
                      children: [_jsx(_components.span, {
                        style: {
                          color: "#383A42",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "User"
                      }), _jsx(_components.span, {
                        style: {
                          color: "#383A42",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "."
                      }), _jsx(_components.span, {
                        style: {
                          color: "#E45649",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "age"
                      }), _jsx(_components.span, {
                        style: {
                          color: "#383A42",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: ": number"
                      })]
                    })
                  }), "age"]
                })
              }), _jsx(_components.span, {
                style: {
                  color: "#0184BC",
                  "--shiki-dark": "#89DDFF"
                },
                children: ":"
              }), _jsx(_components.span, {
                style: {
                  color: "#986801",
                  "--shiki-dark": "#F78C6C"
                },
                children: " 30"
              })]
            }), "\n", _jsx(_components.span, {
              className: "line",
              children: _jsx(_components.span, {
                style: {
                  color: "#383A42",
                  "--shiki-dark": "#89DDFF"
                },
                children: "}"
              })
            }), "\n", _jsx(_components.span, {
              className: "line"
            }), "\n", _jsx(_components.span, {
              className: "line",
              children: _jsx(_components.span, {
                style: {
                  color: "#A0A1A7",
                  "--shiki-light-font-style": "italic",
                  "--shiki-dark": "#545454",
                  "--shiki-dark-font-style": "italic"
                },
                children: "// Hover over 'user' to see type information"
              })
            }), "\n", _jsxs(_components.span, {
              className: "line",
              children: [_jsx(_components.span, {
                style: {
                  color: "#383A42",
                  "--shiki-dark": "#EEFFFF"
                },
                children: _jsxs(_components.span, {
                  className: "twoslash-hover",
                  children: [_jsx(_components.span, {
                    className: "twoslash-popup-container",
                    children: _jsxs(_components.code, {
                      className: "twoslash-popup-code",
                      children: [_jsx(_components.span, {
                        style: {
                          color: "#A626A4",
                          "--shiki-dark": "#C792EA"
                        },
                        children: "const"
                      }), _jsx(_components.span, {
                        style: {
                          color: "#986801",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: " user"
                      }), _jsx(_components.span, {
                        style: {
                          color: "#0184BC",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), _jsx(_components.span, {
                        style: {
                          color: "#C18401",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " User"
                      })]
                    })
                  }), "user"]
                })
              }), _jsx(_components.span, {
                style: {
                  color: "#383A42",
                  "--shiki-dark": "#89DDFF"
                },
                children: "."
              }), _jsx(_components.span, {
                style: {
                  color: "#E45649",
                  "--shiki-dark": "#EEFFFF"
                },
                children: _jsxs(_components.span, {
                  className: "twoslash-hover twoslash-query-presisted",
                  children: [_jsxs(_components.span, {
                    className: "twoslash-popup-container",
                    children: [_jsx(_components.div, {
                      className: "twoslash-popup-arrow"
                    }), _jsxs(_components.code, {
                      className: "twoslash-popup-code",
                      children: [_jsx(_components.span, {
                        style: {
                          color: "#383A42",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "User"
                      }), _jsx(_components.span, {
                        style: {
                          color: "#383A42",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "."
                      }), _jsx(_components.span, {
                        style: {
                          color: "#E45649",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: "name"
                      }), _jsx(_components.span, {
                        style: {
                          color: "#383A42",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: ": string"
                      })]
                    })]
                  }), "name"]
                })
              })]
            }), "\n", _jsx(_components.span, {
              className: "line"
            })]
          })
        })
      }), "\n"]
    }), "\n", _jsxs(Slide, {
      index: "2",
      children: ["\n", _jsx(_components.h1, {
        children: "Slide 3 - More Twoslash Examples"
      }), "\n", _jsx(_components.p, {
        children: "Error highlighting:"
      }), "\n", _jsx(_Fragment, {
        children: _jsx(_components.pre, {
          className: "shiki shiki-themes one-light material-theme-darker twoslash lsp",
          style: {
            backgroundColor: "#FAFAFA",
            "--shiki-dark-bg": "#212121",
            color: "#383A42",
            "--shiki-dark": "#EEFFFF"
          },
          tabIndex: "0",
          children: _jsxs(_components.code, {
            children: [_jsxs(_components.span, {
              className: "line",
              children: [_jsx(_components.span, {
                style: {
                  color: "#A626A4",
                  "--shiki-dark": "#C792EA"
                },
                children: "let"
              }), _jsx(_components.span, {
                style: {
                  color: "#383A42",
                  "--shiki-dark": "#EEFFFF"
                },
                children: " "
              }), _jsx(_components.span, {
                className: "twoslash-error",
                children: _jsx(_components.span, {
                  style: {
                    color: "#383A42",
                    "--shiki-dark": "#EEFFFF"
                  },
                  children: "message"
                })
              }), _jsx(_components.span, {
                style: {
                  color: "#0184BC",
                  "--shiki-dark": "#89DDFF"
                },
                children: ":"
              }), _jsx(_components.span, {
                style: {
                  color: "#0184BC",
                  "--shiki-dark": "#FFCB6B"
                },
                children: " string"
              }), _jsx(_components.span, {
                style: {
                  color: "#0184BC",
                  "--shiki-dark": "#89DDFF"
                },
                children: " ="
              }), _jsx(_components.span, {
                style: {
                  color: "#986801",
                  "--shiki-dark": "#F78C6C"
                },
                children: " 42"
              })]
            }), _jsx(_components.div, {
              className: "twoslash-meta-line twoslash-error-line",
              children: "Type 'number' is not assignable to type 'string'."
            })]
          })
        })
      }), "\n", _jsx(_components.p, {
        children: "Type queries:"
      }), "\n", _jsx(_Fragment, {
        children: _jsx(_components.pre, {
          className: "shiki shiki-themes one-light material-theme-darker twoslash lsp",
          style: {
            backgroundColor: "#FAFAFA",
            "--shiki-dark-bg": "#212121",
            color: "#383A42",
            "--shiki-dark": "#EEFFFF"
          },
          tabIndex: "0",
          children: _jsxs(_components.code, {
            children: [_jsxs(_components.span, {
              className: "line",
              children: [_jsx(_components.span, {
                style: {
                  color: "#A626A4",
                  "--shiki-dark": "#C792EA"
                },
                children: "function"
              }), _jsx(_components.span, {
                style: {
                  color: "#4078F2",
                  "--shiki-dark": "#82AAFF"
                },
                children: " "
              }), _jsx(_components.span, {
                style: {
                  color: "#4078F2",
                  "--shiki-dark": "#82AAFF"
                },
                children: _jsxs(_components.span, {
                  className: "twoslash-hover",
                  children: [_jsx(_components.span, {
                    className: "twoslash-popup-container",
                    children: _jsxs(_components.code, {
                      className: "twoslash-popup-code",
                      children: [_jsx(_components.span, {
                        style: {
                          color: "#A626A4",
                          "--shiki-dark": "#C792EA"
                        },
                        children: "function"
                      }), _jsx(_components.span, {
                        style: {
                          color: "#4078F2",
                          "--shiki-dark": "#82AAFF"
                        },
                        children: " greet"
                      }), _jsx(_components.span, {
                        style: {
                          color: "#383A42",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "("
                      }), _jsx(_components.span, {
                        style: {
                          color: "#383A42",
                          "--shiki-light-font-style": "inherit",
                          "--shiki-dark": "#EEFFFF",
                          "--shiki-dark-font-style": "italic"
                        },
                        children: "name"
                      }), _jsx(_components.span, {
                        style: {
                          color: "#0184BC",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), _jsx(_components.span, {
                        style: {
                          color: "#0184BC",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " string"
                      }), _jsx(_components.span, {
                        style: {
                          color: "#383A42",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ")"
                      }), _jsx(_components.span, {
                        style: {
                          color: "#0184BC",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), _jsx(_components.span, {
                        style: {
                          color: "#0184BC",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " string"
                      })]
                    })
                  }), "greet"]
                })
              }), _jsx(_components.span, {
                style: {
                  color: "#383A42",
                  "--shiki-dark": "#89DDFF"
                },
                children: "("
              }), _jsx(_components.span, {
                style: {
                  color: "#383A42",
                  "--shiki-light-font-style": "inherit",
                  "--shiki-dark": "#EEFFFF",
                  "--shiki-dark-font-style": "italic"
                },
                children: _jsxs(_components.span, {
                  className: "twoslash-hover",
                  children: [_jsx(_components.span, {
                    className: "twoslash-popup-container",
                    children: _jsxs(_components.code, {
                      className: "twoslash-popup-code",
                      children: [_jsx(_components.span, {
                        style: {
                          color: "#383A42",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "name"
                      }), _jsx(_components.span, {
                        style: {
                          color: "#383A42",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), _jsx(_components.span, {
                        style: {
                          color: "#383A42",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: " string"
                      })]
                    })
                  }), "name"]
                })
              }), _jsx(_components.span, {
                style: {
                  color: "#0184BC",
                  "--shiki-dark": "#89DDFF"
                },
                children: ":"
              }), _jsx(_components.span, {
                style: {
                  color: "#0184BC",
                  "--shiki-dark": "#FFCB6B"
                },
                children: " string"
              }), _jsx(_components.span, {
                style: {
                  color: "#383A42",
                  "--shiki-dark": "#89DDFF"
                },
                children: ")"
              }), _jsx(_components.span, {
                style: {
                  color: "#383A42",
                  "--shiki-dark": "#89DDFF"
                },
                children: " {"
              })]
            }), "\n", _jsxs(_components.span, {
              className: "line",
              children: [_jsx(_components.span, {
                style: {
                  color: "#A626A4",
                  "--shiki-light-font-style": "inherit",
                  "--shiki-dark": "#89DDFF",
                  "--shiki-dark-font-style": "italic"
                },
                children: "  return"
              }), _jsx(_components.span, {
                style: {
                  color: "#50A14F",
                  "--shiki-dark": "#89DDFF"
                },
                children: " `"
              }), _jsx(_components.span, {
                style: {
                  color: "#50A14F",
                  "--shiki-dark": "#C3E88D"
                },
                children: "Hello, "
              }), _jsx(_components.span, {
                style: {
                  color: "#CA1243",
                  "--shiki-dark": "#89DDFF"
                },
                children: "${"
              }), _jsx(_components.span, {
                style: {
                  color: "#383A42",
                  "--shiki-dark": "#EEFFFF"
                },
                children: _jsxs(_components.span, {
                  className: "twoslash-hover",
                  children: [_jsx(_components.span, {
                    className: "twoslash-popup-container",
                    children: _jsxs(_components.code, {
                      className: "twoslash-popup-code",
                      children: [_jsx(_components.span, {
                        style: {
                          color: "#383A42",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: "name"
                      }), _jsx(_components.span, {
                        style: {
                          color: "#383A42",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), _jsx(_components.span, {
                        style: {
                          color: "#383A42",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: " string"
                      })]
                    })
                  }), "name"]
                })
              }), _jsx(_components.span, {
                style: {
                  color: "#CA1243",
                  "--shiki-dark": "#89DDFF"
                },
                children: "}"
              }), _jsx(_components.span, {
                style: {
                  color: "#50A14F",
                  "--shiki-dark": "#C3E88D"
                },
                children: "!"
              }), _jsx(_components.span, {
                style: {
                  color: "#50A14F",
                  "--shiki-dark": "#89DDFF"
                },
                children: "`"
              })]
            }), "\n", _jsx(_components.span, {
              className: "line",
              children: _jsx(_components.span, {
                style: {
                  color: "#383A42",
                  "--shiki-dark": "#89DDFF"
                },
                children: "}"
              })
            }), "\n", _jsx(_components.span, {
              className: "line"
            }), "\n", _jsxs(_components.span, {
              className: "line",
              children: [_jsx(_components.span, {
                style: {
                  color: "#A626A4",
                  "--shiki-dark": "#C792EA"
                },
                children: "const"
              }), _jsx(_components.span, {
                style: {
                  color: "#986801",
                  "--shiki-dark": "#EEFFFF"
                },
                children: " "
              }), _jsx(_components.span, {
                style: {
                  color: "#986801",
                  "--shiki-dark": "#EEFFFF"
                },
                children: _jsxs(_components.span, {
                  className: "twoslash-hover twoslash-query-presisted",
                  children: [_jsxs(_components.span, {
                    className: "twoslash-popup-container",
                    children: [_jsx(_components.div, {
                      className: "twoslash-popup-arrow"
                    }), _jsxs(_components.code, {
                      className: "twoslash-popup-code",
                      children: [_jsx(_components.span, {
                        style: {
                          color: "#A626A4",
                          "--shiki-dark": "#C792EA"
                        },
                        children: "const"
                      }), _jsx(_components.span, {
                        style: {
                          color: "#986801",
                          "--shiki-dark": "#EEFFFF"
                        },
                        children: " result"
                      }), _jsx(_components.span, {
                        style: {
                          color: "#0184BC",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), _jsx(_components.span, {
                        style: {
                          color: "#0184BC",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " string"
                      })]
                    })]
                  }), "result"]
                })
              }), _jsx(_components.span, {
                style: {
                  color: "#0184BC",
                  "--shiki-dark": "#89DDFF"
                },
                children: " ="
              }), _jsx(_components.span, {
                style: {
                  color: "#4078F2",
                  "--shiki-dark": "#82AAFF"
                },
                children: " "
              }), _jsx(_components.span, {
                style: {
                  color: "#4078F2",
                  "--shiki-dark": "#82AAFF"
                },
                children: _jsxs(_components.span, {
                  className: "twoslash-hover",
                  children: [_jsx(_components.span, {
                    className: "twoslash-popup-container",
                    children: _jsxs(_components.code, {
                      className: "twoslash-popup-code",
                      children: [_jsx(_components.span, {
                        style: {
                          color: "#A626A4",
                          "--shiki-dark": "#C792EA"
                        },
                        children: "function"
                      }), _jsx(_components.span, {
                        style: {
                          color: "#4078F2",
                          "--shiki-dark": "#82AAFF"
                        },
                        children: " greet"
                      }), _jsx(_components.span, {
                        style: {
                          color: "#383A42",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: "("
                      }), _jsx(_components.span, {
                        style: {
                          color: "#383A42",
                          "--shiki-light-font-style": "inherit",
                          "--shiki-dark": "#EEFFFF",
                          "--shiki-dark-font-style": "italic"
                        },
                        children: "name"
                      }), _jsx(_components.span, {
                        style: {
                          color: "#0184BC",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), _jsx(_components.span, {
                        style: {
                          color: "#0184BC",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " string"
                      }), _jsx(_components.span, {
                        style: {
                          color: "#383A42",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ")"
                      }), _jsx(_components.span, {
                        style: {
                          color: "#0184BC",
                          "--shiki-dark": "#89DDFF"
                        },
                        children: ":"
                      }), _jsx(_components.span, {
                        style: {
                          color: "#0184BC",
                          "--shiki-dark": "#FFCB6B"
                        },
                        children: " string"
                      })]
                    })
                  }), "greet"]
                })
              }), _jsx(_components.span, {
                style: {
                  color: "#383A42",
                  "--shiki-dark": "#EEFFFF"
                },
                children: "("
              }), _jsx(_components.span, {
                style: {
                  color: "#50A14F",
                  "--shiki-dark": "#89DDFF"
                },
                children: "\""
              }), _jsx(_components.span, {
                style: {
                  color: "#50A14F",
                  "--shiki-dark": "#C3E88D"
                },
                children: "TypeScript"
              }), _jsx(_components.span, {
                style: {
                  color: "#50A14F",
                  "--shiki-dark": "#89DDFF"
                },
                children: "\""
              }), _jsx(_components.span, {
                style: {
                  color: "#383A42",
                  "--shiki-dark": "#EEFFFF"
                },
                children: ")"
              })]
            }), "\n", _jsx(_components.span, {
              className: "line"
            })]
          })
        })
      }), "\n"]
    }), "\n"]
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? _jsx(MDXLayout, {
    ...props,
    children: _jsx(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}
function _missingMdxReference(id, component) {
  throw new Error("Expected " + (component ? "component" : "object") + " `" + id + "` to be defined: you likely forgot to import, pass, or provide it.");
}

import { Presentation } from "@r4ai/mercury-ui";

export default ({ components }) => {
  return <Presentation Content={MDXContent} slidesLength={MERCURY_SLIDES_LENGTH} components={components} />;
}