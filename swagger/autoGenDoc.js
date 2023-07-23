const mongooseToSwagger = require("mongoose-to-swagger");
const swaggerAutogen = require("swagger-autogen")({
  openapi: "3.0.0",
  language: "pt-BR",
});

const outputFile = "./swagger_output.json";
const endpointFiles = ["../index.js"];

let doc = {
  info: {
    version: "1.0.0",
    title: "API Biblioteca DNC",
    description: "Documentação da API da Bliblioteca DNC",
  },
  servers: [
    {
      url: "http://localhost:4000",
      description: "Servidor localhost",
    },
    {
      url: "https://bibliotecaDNC-back.vercel.app",
      description: "Servidor de produção",
    },
  ],
  consumes: ["application/json"],
  produces: ["aplication/json"],
};

swaggerAutogen(outputFile, endpointFiles, doc).then(() => {
    console.log("Documentação do Swagger gerada, encontra-se no arquivo em: "+outputFile);
    if(process.env.NODE_ENV !== 'production'){
        require("../index.js");
    }
});
