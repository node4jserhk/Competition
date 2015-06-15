# Competition
A little competition that draw patterns on a grid

## How to run?
  - npm install
  - cp config.sample.js config.js
  - development:
      gulp
    production:
      gulp build 
      iojs index.js
  - for player 
    + go to /www/index.html
    + enter unique player name
    + read the instruction
    + code the solution
    + press Ctrl-Enter(Win) or Cmd-Enter(Mac) to check
  - for host 
    + go to /www/index.html#/panel
    + enter number of minute of competition and pass-phrase "node4jser"
    + start the competition
    
## Known issues
  - safari out grow browser window height (won't fix)
  - IE is not tested
  
## Solutions?
  - read /src/question/<question_name>