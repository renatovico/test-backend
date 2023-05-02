const xlsx = require('xlsx');

module.exports = ({ logger, mapperXLS, db }) => {

    const parseSeedData = (targetFile) => {
        try {
            let workbook = xlsx.readFile(targetFile);
            let firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            return xlsx.utils.sheet_to_json(firstSheet);
        } catch(err) {
            logger.error(`Fail to parse or read the seed data - ${err} - ${err.stack}`);
            return [];
        }
    }

    async function runImporterForSingleRow(row) {
        try {
            return await db.sequelize.transaction(async (t) => {
                return await mapperXLS.mapToModel(row, t);
            });
        } catch (err) {
            logger.error(`Error on import data: ${row} - ${err} - ${err.stack}`);
            return false;

        }
    }

    async function runImporter() {
        //TODO: If data > 10MB change to streams for evicts memory scale
        let targetFile = `${__dirname}/../../start_data.xlsx`; //TODO: Get from env or Args
        let decodeSheet = parseSeedData(targetFile);

        // decodeSheet = decodeSheet.slice(0, 10); // FOR DEV

        const chunkSize = 10; //chunk the process for evicts hammer on database process
        let importedData = 0;
        let failData = 0;
        logger.info(`Importer Process: ${decodeSheet.length} - Chunk Of ${chunkSize} `);
        for (let i = 0; i < decodeSheet.length; i += chunkSize) {
            const chunkTarget = decodeSheet.slice(i, i + chunkSize);
            let executes = chunkTarget.map(runImporterForSingleRow);
            let result = await Promise.all(executes);
            importedData += result.filter(r => r === true).length;
            failData += result.filter(r => r === false).length;
        }

        const resultStats = `Importer finish - Rows Found: ${decodeSheet.length} - Imported: ${importedData} - Fail: ${failData} - Unmapped: ${decodeSheet.length-importedData-failData}`;

        if (importedData === 0 || failData > 0 || decodeSheet.length === 0) {
            logger.error(resultStats);
        } else {
            logger.info(resultStats);
        }

    }

    return {
        start: async() => {
            logger.info('importer run');
            await runImporter();
            await db.closeConnection();
        }
    }

}