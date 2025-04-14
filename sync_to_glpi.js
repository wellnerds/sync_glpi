const axios = require('axios');
const mysql = require('mysql');
require('dotenv').config();

// Configurações do GLPI
const GLPI_URL = `${process.env.GLPI_API_URL}/Computer`;
const TOKEN = process.env.GLPI_APP_TOKEN;
const GLPI_USER = process.env.GLPI_USER;
const GLPI_PASSWORD = process.env.GLPI_PASSWORD;

// Configurações do Banco de Dados
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

// Função para coletar dados da view
function fetchInventoryData(callback) {
    const connection = mysql.createConnection(dbConfig);

    connection.connect((err) => {
        if (err) {
            return console.error('Erro ao conectar ao banco de dados:', err);
        }

        const query = 'SELECT * FROM sua_view'; // view
        connection.query(query, (error, results) => {
            connection.end();

            if (error) {
                return console.error('Erro ao executar a consulta:', error);
            }

            callback(results);
        });
    });
}

async function sendToGLPI(data) {
    try {
        const response = await axios.post(GLPI_URL, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`,
            },
        });
        console.log('Ativo adicionado com sucesso ao GLPI:', response.data);
        return response.data.id; // Retorna o ID do ativo criado
    } catch (error) {
        console.error('Erro ao adicionar ativo:', error.response.data);
        return null;
    }
}
async function associateElements(glpiId, relatedData) {
    const associationData = {
        id: glpiId, // Adicione campos para a associação
    };

    try {
        const response = await axios.post(`${GLPI_URL}/${glpiId}/associate`, associationData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`,
            },
        });
        console.log('Associação realizada com sucesso:', response.data);
    } catch (error) {
        console.error('Erro ao associar elemento:', error.response.data);
    }
}
async function main() {
    fetchInventoryData(async (inventoryData) => {
        for (const item of inventoryData) {
            const dataToSend = {
                name: item.name, // campos necessário
                serial: item.serial,
                os: item.os,
                os_version: item.os_version, // outros campos necessário
            };
            const glpiId = await sendToGLPI(dataToSend);
            if (glpiId) {
                await associateElements(glpiId, item); 
            }
        }
    });
}

main();