const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      CLIENT_ID : process.env.CLIENT_ID,
      CLIENT_SECRET : process.env.CLIENT_SECRET,
      CALLBACK : process.env.CALLBACK,
      MONGODB : process.env.MONGODB
    }
  }

  return {
    /* config options for all phases except development here */
  }
}
