const { Telegraf } = require("telegraf");
const bot = new Telegraf("1867707895:AAHrEFbdpEoSEh64gEnCFa0eh3cuaFAFc9w");
const fetch = require("node-fetch");
let verClima = false;
let num = 0;
let sumar = false;

bot.start((ctx) => {
  ctx.reply(
    "Holaa " + ctx.from?.first_name + " ¿Como estás? 😀 ¿Que quieres hacer?"
  );
  ctx.reply("¿Quieres ver el clima de hoy? hace click aqui 👉 /clima ");
  ctx.reply("¿Quieres que cuente tus mensajes? NOTA: Apuesto a que no puedes escribir 100 mensajes 😏 hace click aqui 👉 /contador ");
});

bot.command("/clima", async (ctx) => {
  ctx.reply("¡Te cuento sobre el clima! ¿De donde eres?");
  verClima = true;
});

const clima = async (ctx, ubicacion) => {
  if(ubicacion=== undefined){
    ubicacion = "uruguay"
  }
  await fetch(
    "https://api.openweathermap.org/data/2.5/find?q="+ ubicacion +"&appid=20d3d9f619a1972f10e06b49934168cf"
  )
    .then((res) => res.json())
    .then((res) => {
      console.log("estoy");
      let temperaturaActual = parseFloat(
        res.list[0].main.temp - 273.15
      ).toFixed(2);
      let tempMax = parseFloat(res.list[0].main.temp_max - 273.15).toFixed(2);
      let tempMin = parseFloat(res.list[0].main.temp_min - 273.15).toFixed(2);

      ctx.reply(
        res.list[0].name +
          " \n La temperatura atual es de: " +
          temperaturaActual +
          "C° \n La Maxima para hoy es de: " +
          tempMax +
          " \n La minima para hoy es de: " +
          tempMin +
          " \n Humedad: " +
          res.list[0].main.humidity +
          "%"
      );
      console.log(res.list[0].name + " - " + res.list[0].main.temp);
      console.log(res);
    })
    .catch((error) => console.log(error));
};

bot.command("/contador", (ctx) => {
  ctx.reply(
    "Voy a contar, te reto a llegar a los 100 mensajes😉... Cuando quieras detener la cuenta escribe /terminar"
  );
  sumar = true;
});
bot.command("/terminar", (ctx) => {
  ctx.reply("Me estaba divirtiendo :( ...");
  sumar = false;
});
bot.on("text", (ctx) => {
  if (sumar) {
    ctx.reply(++num);
    if (num == 50) {
      ctx.reply("VAS POR LA MITAD 😅");
    } else if (num == 80) {
      ctx.reply("Estas mmuy cerca 😮");
    } else if (num == 90) {
      ctx.reply("Estas muuuuy cerca 🙄");
    } else if (num == 95) {
      ctx.reply("Ups ocurrio un error... 😏🤣🤣");
      ctx.reply(0);
    } else if (num == 96) {
      ctx.reply("Caiste!. 🤣🤣");
    } else if (num == 100) {
      ctx.reply("Suficiente! Lo acabas de lograr. 👏");
    }
  }
  if (verClima) {
    clima(ctx, ctx.update.message.text);
  }
});

bot.launch();
