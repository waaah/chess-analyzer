import * as fs from "fs";
import * as readline from "readline";
import * as path from "path";

async function readTSV(filePath) {
  const rows = [];
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let headers = null;

  for await (const line of rl) {
    if (!headers) {
      headers = line.split("\t");
    } else {
      const values = line.split("\t");
      const row = {};
      headers.forEach((h, i) => {
        row[h] = values[i] || "";
      });
      rows.push(row);
    }
  }
  return { headers, rows };
}

async function mergeTSVs(files) {
  let mergedHeaders = null;
  const mergedRows = [];

  for (const file of files) {
    const { headers, rows } = await readTSV(file);
    if (!mergedHeaders) {
      mergedHeaders = headers;
    } else if (mergedHeaders.join() !== headers.join()) {
      throw new Error(`Header mismatch in file ${file}`);
    }
    mergedRows.push(...rows);
  }

  return { headers: mergedHeaders, rows: mergedRows };
}

async function saveJSON(data, outputFile) {
  ensureDirExists(outputFile);
  fs.writeFileSync(
    outputFile,
    JSON.stringify(formatData(data), null, 2),
    "utf-8"
  );
  console.log(`Saved JSON to ${outputFile}`);
}

function ensureDirExists(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true }); // creates nested folders too
  }
}

function formatData(data) {
  const obj = {};
  for (const d of data) {
    obj[d.pgn] = d;
  }
  return obj;
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 3) {
    console.error(
      "Usage: node merge_parse_tsv.js output.json input1.tsv input2.tsv ..."
    );
    process.exit(1);
  }

  const outputJSON = args[0];
  const inputFiles = args.slice(1);

  try {
    const mergedData = await mergeTSVs(inputFiles);
    await saveJSON(mergedData.rows, outputJSON);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

main();
