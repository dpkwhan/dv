dataDir: baseDir,"finra";
system "cd ",dataDir;
files:key hsym `$dataDir;

atsCsvFiles:files where files like "weeklySummary.2019-03-*csv";
atsData:raze 0:[("SS SSSS JJSSD   "; enlist ",")] each atsCsvFiles;
select sum totalWeeklyShareQuantity by tierIdentifier,summaryTypeCode from atsData where issueSymbolIdentifier=`AA


select from atsData where issueSymbolIdentifier like "LLY*",summaryTypeCode like "ATS*"