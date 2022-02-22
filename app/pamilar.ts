require('dotenv').config();
import fs from 'fs';

if (process.env.BLK_PARSER == "1") {
    let filename = "";
    if (process.env.BLK_LOG_FILENAME != undefined && process.env.BLK_LOG_FILENAME != "") {
        filename = process.env.BLK_LOG_FILENAME;
    } else{
        console.log("Warning: BLK_LOG_FILENAME not set, falling back to default filename input_logs/blkminer.txt");
        filename = "blkminer.txt";
    }

    console.log("Reading block miner log file: " + filename + "\n");

    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            console.log("ERROR reading log file, please be sure to configure the BLK_LOG_FILENAME variable in .env file.")
            //console.error(err)
            return
        }
        //console.log(data)
        let filteredDataArr = data.match(/^.*\b(real)\b.*$/gm) || [];
        let filteredData = "";
        filteredDataArr.forEach(element => {
            filteredData = filteredData + element + "\n";
        });
        let timestamps = filteredData.match(/\d.*(?= INFO)/g) || [];
        let shares_strings = filteredData.match(/(?<=shr: ).*(?= real)/g) || [];
        let hashrates_strings = filteredData.match(/(?<=real: ).*(?= Ke)/g) || [];

        let shares = shares_strings.map(function (item) {
            return parseInt(item, 10);
        });

        let hashrates = hashrates_strings.map(function (item) {
            return parseInt(item, 10);
        });

        const sum_hashrates = hashrates.reduce((a, b) => a + b, 0);
        const avg_hashrate = Math.ceil(sum_hashrates / hashrates.length) || 0;

        const sum_shares = shares.reduce((a, b) => a + b, 0);

        let deltaTimeSeconds = Number(timestamps[timestamps.length - 1]) - Number(timestamps[0]);
        let formattedDeltaTime = new Date(deltaTimeSeconds * 1000).toISOString().substring(11, 19);
        console.log("_________________________________________");
        console.log("________________TIMEFRAME________________\n");
        console.log("Timeframe (hh:mm:ss) => " + formattedDeltaTime);

        console.log("_________________________________________");
        console.log("_________________HASHRATE________________\n")
        console.log("Max => " + Math.max(...hashrates) + " Ke/s");
        console.log("Min => " + Math.min(...hashrates) + " Ke/s");
        console.log("Avg => " + avg_hashrate + " Ke/s");

        console.log("_________________________________________");
        console.log("__________________SHARES_________________\n")
        console.log("Max => " + Math.max(...shares));
        console.log("Total => " + sum_shares);
        console.log("Per minute => " + (sum_shares / (deltaTimeSeconds / 60)).toFixed(2));
        console.log("_________________________________________");

        if (process.env.GENERATE_BLK_CSV == "1") {
            let csv = "timestamp,shares,Ke/s\n";
            for (let index = 0; index < timestamps.length; index++) {
                csv = csv + timestamps[index] + "," + shares[index] + "," + hashrates[index] + "\n";
            }
            //console.log(csv);
            fs.writeFileSync('parsed_data_blkminer.csv', csv);
            console.log('parsed_data_blkminer.csv created.');
        }

    });

}

if (process.env.ANN_PARSER == "1") {
    let filename = "";
    if (process.env.ANN_LOG_FILENAME != undefined && process.env.ANN_LOG_FILENAME != "") {
        filename = process.env.ANN_LOG_FILENAME;
    } else {
        console.log("Warning: ANN_LOG_FILENAME not set, falling back to default filename input_logs/annminer.txt");
        filename = "annminer.txt";
    }

    console.log("Reading announcement miner log file: " + filename + "\n");

    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            //console.error(err);
            console.log("ERROR reading log file, please be sure to configure the ANN_LOG_FILENAME variable in .env file.")
            return
        }
        //Get only lines with data useful for stats
        let filteredDataArr = data.match(/^.*\b(goodrate)\b.*$/gm) || [];
        let filteredData = "";
        filteredDataArr.forEach(element => {
            filteredData = filteredData + element + "\n";
        });
        let timestamps = filteredData.match(/\d.*(?= INFO)/g) || [];
        let bandwidth_strings = filteredData.match(/(?<=Ke\/s\s{3}).*(?=Mb\/s)/g) || [];
        let hashrates_strings = filteredData.match(/(?<=.rs:\d{3} ).*(?= Ke\/s)/g) || [];

        console.log(bandwidth_strings);

        let bandwidth = bandwidth_strings.map(function (item) {
            return parseFloat(item);
        });

        let hashrates = hashrates_strings.map(function (item) {
            return parseInt(item, 10);
        });

        const sum_hashrates = hashrates.reduce((a, b) => a + b, 0);
        const avg_hashrate = Math.ceil(sum_hashrates / hashrates.length) || 0;

        const sum_bandwidth = bandwidth.reduce((a, b) => a + b, 0);
        const avg_bandwidth = (sum_bandwidth / bandwidth.length) || 0;

        let deltaTimeSeconds = Number(timestamps[timestamps.length - 1]) - Number(timestamps[0]);
        let formattedDeltaTime = new Date(deltaTimeSeconds * 1000).toISOString().substring(11, 19);
        console.log("_________________________________________");
        console.log("________________TIMEFRAME________________\n");
        console.log("Timeframe (hh:mm:ss) => " + formattedDeltaTime);

        console.log("_________________________________________");
        console.log("_________________HASHRATE________________\n")
        console.log("Max => " + Math.max(...hashrates) + " Ke/s");
        console.log("Min => " + Math.min(...hashrates) + " Ke/s");
        console.log("Avg => " + avg_hashrate + " Ke/s");

        console.log("_________________________________________");
        console.log("________________BANDWIDTH________________\n")
        console.log("Max => " + Math.max(...bandwidth) + " Mb/s");
        console.log("Min => " + Math.min(...bandwidth) + " Mb/s");
        console.log("Avg => " + avg_bandwidth.toFixed(2) + " Mb/s");
        console.log("_________________________________________");

        if (process.env.GENERATE_BLK_CSV == "1") {
            let csv = "timestamp,hashrate,Mb/s\n";
            for (let index = 0; index < timestamps.length; index++) {
                csv = csv + timestamps[index] + "," + hashrates[index] + "," + bandwidth[index] + "\n";
            }
            //console.log(csv);
            fs.writeFileSync('parsed_data_annminer.csv', csv);
            console.log('parsed_data_annminer.csv created.');
        }

    });

}