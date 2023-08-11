const axios = require('axios');
const htmlMetadata = require('html-metadata');

exports.handler = async (event) => {
    try {
        const agents = require('./agents');
        let url = event.url || event.queryStringParameters.url;
        
        if(url){
            url = decodeURIComponent(url);
            
            const res = await axios.get(url, {
                'User-Agent': agents[Math.floor(Math.random() * agents.length)]
            });

            const regex = /<script[\s]type=["']application\/ld\+json["']>(.*?)<\/script>/gmi;
            let matchs = [];

            let m;

            while ((m = regex.exec(res.data)) !== null) {
                if (m.index === regex.lastIndex) 
                    regex.lastIndex++;
                                
                m.forEach((match, groupIndex) => {
                    try{
                        if(groupIndex == 1)
                            matchs.push(JSON.parse(match));
                    }
                    catch(err){ }
                });
            }

            let metas = await htmlMetadata.loadFromString(res.data);
            
            return {
                statusCode: 200,
                body: JSON.stringify({ matchs, metas })
            };
        }
        else{
            return {
                statusCode: 400,
                body: "Invalid url"
            };
        }
    } catch (e) {
        console.log(e);
        
        return {
            statusCode: 400,
            body: JSON.stringify(e)
        };
    }
};