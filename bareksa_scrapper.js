const generateFile = require("./utils.js");

generateFile(
  "pasar_uang",
  "https://www.bareksa.com/id/data/reksadana/daftar/?view=performance&trans=2&type=1&aum_value=0"
);

generateFile(
  "pendapatan_tetap",
  "https://www.bareksa.com/id/data/reksadana/daftar/?view=performance&trans=2&type=2&aum_value=0"
);

generateFile(
  "campuran",
  "https://www.bareksa.com/id/data/reksadana/daftar/?view=performance&trans=2&type=4&aum_value=0"
);

generateFile(
  "saham",
  "https://www.bareksa.com/id/data/reksadana/daftar/?view=performance&trans=2&type=3&aum_value=0"
);
