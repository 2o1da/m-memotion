function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function sayHello3() {
  console.log("HELLO3");
}
async function sayHello1() {
  console.log("HELLO1-1");
  await delay(2000);
  console.log("HELLO1-2");
}
const sayHello2 = async () => {
  console.log("HELLO2-1");
  await delay(1000);
  console.log("HELLO2-2");
};

sayHello1();
sayHello2();
sayHello3();
