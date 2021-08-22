let globalEnv = {
    development: {
        openWeatherUrl: process.env.MIX_OPENWEATHER_API_URL,
        openWeatherKey: process.env.MIX_OPENWEATHER_API_KEY,
    },
    production: {
        embedScriptUrl: 'https://s3.us-east-2.amazonaws.com/pathtojs.js',
        embedCssUrl: 'https://s3.us-east-2.amazonaws.com/pathtocss.css',
    }
};

export default function env(property){
    return globalEnv[process.env.NODE_ENV][property];
};