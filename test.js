function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function sayHello1() {
  console.log("HELLO1-1");
  await console.log("안녕");
  console.log("HELLO1-2");
}

let arr = [1, 3, 5];
let tempArr = [...arr];
