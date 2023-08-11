let func = require("./index");

(async () => {
    let response = await func.handler({ queryStringParameters: {
        url: "https://www.americanas.com.br/produto/1611390626/notebook-positivo-motion-i34128a-core-i3-4gb-128gb-ssd-64gb-nuvem-tela14-hd-windows-10-home-cobaltgray?chave=prf_hm_0_oh_1_00_"
    }});
    
    console.log(response);
})();