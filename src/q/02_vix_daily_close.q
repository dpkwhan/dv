baseDir:"C:\\dhan\\data\\";

// VIX
// First update the file header to: date,open,high,low,close
system "cd ",baseDir,"vix";
vix:("DFFFF"; enlist ",") 0: `$":vixcurrent.csv";
vix:`date`open`high`low`close xcol vix;
data:select string date,close from vix where date>2009.01.01;

system "cd ",baseDir,"json";
`:vix_daily_close.json 0: enlist .j.j data;