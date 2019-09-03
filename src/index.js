/**
 * Workflowy Calendar Generator
 *
 * author: zinsani@gmail.com
 */

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const toDigit = (number, digit) => {
  const len = number.toString().length;
  return len < digit
    ? `${[...Array(digit - len).keys()].map(_ => 0).join("")}${number}`
    : number;
};

function generate(options) {
  if (!isValid(options)) return;

  const { year, month, startingDayIndex, lastDay } = options;
  console.log(
    `
    generating 20${year}-${month} calendar starting with ${days[startingDayIndex]} and ends at ${lastDay}...
    copy below and paste it into your workflowy
    `
  );

  // show header
  console.log(days.join("   "));
  let d = 0,
    weekDay = 0,
    numOfWeek = 0,
    monthString = "";
  const blankString = "   ";
  while (d++ < lastDay) {
    if (numOfWeek === 0 && weekDay < startingDayIndex) {
      monthString += blankString;
      d--;
    } else {
      monthString += toDigit(d, 3).replace(/0/, " ");
    }
    if (weekDay < 7) monthString += blankString;
    if (weekDay === 6) {
      monthString += "\n";
      numOfWeek++;
    }
    weekDay = (weekDay + 1) % 7;
  }
  console.log(monthString);
  console.log("\n");
  Array.from(Array(lastDay).keys())
    .map(x => toDigit(x + 1, 2))
    .forEach((day, i) =>
      console.log(
        `#${year}-${month}-${day} ${days[(startingDayIndex + i) % days.length]}`
      )
    );
}

function isValid(options) {
  const invalid = Object.keys(options).filter(
    k => options[k] == undefined || options[k] == null
  );
  invalid.forEach(k => console.error(`${k} is invalid`));
  return invalid.length === 0;
}

function showInfo() {
  console.log(`
--------------------------------
  Workflowy Calendar Generator
--------------------------------
## author: zinsani@gmail.com

## when you make calendar for 2019-10 starting with tuesday and ends at 31, run below  
npm start 19 10 2 31

## days index starts from 0 (Sun) to 6 (Sat)
  `);
}

try {
  if (process.argv.length < 3) return showInfo();

  const [year, month, startingDayIndex, lastDay] = process.argv
    .filter((v, i) => i > 1)
    .map(x => parseInt(x, 10));
  generate({ year, month, startingDayIndex, lastDay });
} catch (error) {
  console.error(error);
}
