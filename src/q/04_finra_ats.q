dataDir:(getenv `RINRA_ATS_DATA_DIR);
system "cd ",dataDir;

files:key hsym `$dataDir;
csvFiles:files where files like "weeklySummary*.csv";
finraATS:raze 0:[("SSJSSSSDJJSSDDDD"; enlist ",")] each csvFiles;

select count i by firmCRDNumber from finraATS
