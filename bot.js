const Discord = require('discord.js');
const bot = new Discord.Client();

const prefix = "!";


bot.login(process.env.BOT_TOKEN);

bot.on('ready', () => {
    bot.user.setGame(`www.alvim.com & www.alvim.host | GustavoLuii#9510 ©`);
});

bot.on("ready", function() {
    console.log("Estou online!");
});

bot.on('message', function (message) {
    if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;
	
	let command = message.content.split(" ")[0];
	command = command.slice(prefix.length);
	
	let args = message.content.split(" ").slice(1);
    
    if (command === "anunciar") {
        if (message.member.hasPermission("ADMINISTRATOR")) {

            const text = args.slice(0.5).join(" ");
             if (text.length < 0.5) return message.channel.send("Você precisa por alguma mensagem!").then((value) => {
               setTimeout(() => {
                    value.delete();
                }, 5000);
            });
            const embed = new Discord.RichEmbed()
            .setColor("4DC23B")
            .setAuthor("Anúncio - ALVIMHOST", `https://i.imgur.com/xxJboxv.png`)
            .setFooter(`• Anúncio feito por: ${message.author.username}`,message.member.user.displayAvatarURL)
            .setDescription(text);
            message.channel.send("@everyone")
            message.delete().catch();
            message.channel.send({embed})
        
        }
    
    }
})

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
  
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
  
    if(cmd === `!ban`){
  
     let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
     if(!bUser) return message.channel.send("Membro não encontrado.");
     let bReason = args.join(" ").slice(22);
     if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("❌ | Você não tem permissão!");
     if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("❌ | Essa pessoa não pode ser banida, porque ele possui um cargo superior ao meu.");
  
     let banEmbed = new Discord.RichEmbed()
     .setDescription("⛔ | Banimento:")
     .setColor("#bc0000")
     .setImage("https://i.imgur.com/VNY0oqd.gif")
     .addField("Membro Banido:", `${bUser}`)
     .addField("Banido por:", `<@${message.author.id}>`)
     .addField("Motivo:", bReason)
  
     let incidentchannel = message.guild.channels.find(`name`, "punições");
     if(!incidentchannel) return message.channel.send("Não foi possível encontrar o canal de punições.");
  
     message.guild.member(bUser).ban(bReason);
     incidentchannel.send(banEmbed);
     message.channel.send("⚠ | Membro Banido!");
    
  
     return;
    }
     if(cmd === `!notificar`){

  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Você não possui permissão para fazer isso.");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Não foi possível encontrar esse usuário.");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Especifique um cargo!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Cargo não encontrado.");

  if(rMember.roles.has(gRole.id)) return message.reply("Esse membro já possui esse cargo.");
  await(rMember.addRole(gRole.id));
  message.channel.send(":white_check_mark: | Cargo setado!");

  try{
    await rMember.send("Parabéns, agora você possui o cargo `" + gRole.name +"` em nosso Discord.")
  }catch(e){
    message.channel.send(`Parabéns <@${rMember.id}>, agora você possui o cargo ${gRole.name}. em nosso Discord.`)
  }

  return;
}
});


bot.on('guildMemberAdd', member => {
    bot.guilds.get(member.guild.id).members.get(member.id).sendMessage("Bem-Vindo " + member + " à "+ member.guild.name +"\n\n`Conheça alguns de nossos planos abaixo:`\n\n• Hospedagem De Site Plano Bronze - :moneybag: R$6.00/mês\n• Hospedagem De Site Plano Prata - :moneybag: R$10.00/mês\n• Hospedagem De Site Plano Ouro - :moneybag: R$15.00/mês\n• Hospedagem De Site Plano Diamantes - :moneybag: R$20.00/mês\n\nSite: https://www.alvim.com/\nDiscord: https://discord.gg/vWs4Z9X");

})

bot.on('guildMemberAdd', member => {
    let channel = member.guild.channels.find('name', 'bem-vindo');
    let memberavatar = member.user.avatarURL
        if (!channel) return;
        let embed = new Discord.RichEmbed()
        .setColor('#00FF00')
        .setDescription("Bem-Vindo "+ member +" à "+ member.guild.name +"\n\n`Chats Importantes em nosso discord` :page_facing_up:\n\n<#475812526475444224> - Regras do nosso Discord.\n<#475821897137913861> - Planos de hospedagem.\n<#475813985132871692> - Chat de anúncios.\n<#475812852742225921> - bate-papo entre membros.\n")
       channel.sendEmbed(embed);
});

bot.on('guildMemberAdd', member => {

    console.log(`${member}`, "has joined" + `${member.guild.name}`)

});
