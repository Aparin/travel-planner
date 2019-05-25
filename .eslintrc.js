module.exports = {
    "extends": "airbnb",
    "env": {
        "browser": true
    },
    "plugins": [
      "react-hooks"
    ],
    "rules": {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn"
    },
    "parser": "babel-eslint"
  };