import { Question } from "@/types/questionnaire";
export const cities = ["北京","上海","杭州","南京","苏州","成都","重庆","广州","深圳","厦门","青岛","西安","长沙","武汉"];
export const wordOptions = ["温柔","勇敢","有趣","认真","可爱","嘴硬","稳定","浪漫","敏感","自由","可靠","热情","慢热","固执","细心","独立"];
export const perspectiveOptions = ["TA 正在忙，晚点会回","TA 想自己安静一会儿","TA 可能有点不开心","TA 正在想该怎么回复","TA 单纯没有看到","我一般不会多想"];
export const coupleQuestions: Question[] = [
  { id:"cities", type:"city_map", creatorPrompt:"今年，一起去过哪些地方？", partnerPrompt:"今年，你们一起去过哪些地方？", helper:"选中你记得的城市，让地图亮起来。", options:cities },
  { id:"food", type:"single_choice", creatorPrompt:"今年和 TA 在一起时，你们最常吃的东西是？", partnerPrompt:"今年和 TA 在一起时，你们最常吃的东西是？", helper:"选一个最有今年味道的答案。", options:["火锅","烧烤","面或粉","日料","甜品","家常菜","外卖","每次都不一样"] },
  { id:"drink", type:"drink_builder", creatorPrompt:"今年，我最爱喝什么？", partnerPrompt:"你觉得邀请你的 TA 最爱喝什么？", helper:"一个写自己的答案，一个写眼中的对方。", options:["奶茶","咖啡","果茶","柠檬水"] },
  { id:"words", type:"three_words", creatorPrompt:"用三个词形容今年的 TA。", partnerPrompt:"用三个词形容今年的自己。", helper:"刚好三个，凭第一直觉选。", options:wordOptions },
  { id:"catchphrase", type:"text", creatorPrompt:"TA 今年最常说的一句话或口头禅是什么？", partnerPrompt:"你觉得自己今年最常说的一句话或口头禅是什么？", helper:"短短一句就好。", config:{ placeholder:"例如：等一下，我马上来", multiline:false, maxLength:60 } },
  { id:"perspective", type:"perspective_choice", creatorPrompt:"当 TA 一段时间没回消息时，你脑子里最先出现的是哪种场景？", partnerPrompt:"当你一段时间没回消息时，你觉得 TA 最先想到哪种场景？", helper:"没有正确答案，只是看看彼此读到了什么。", options:perspectiveOptions },
  { id:"future_message", type:"text", creatorPrompt:"给明年的我们留一句话。", partnerPrompt:"给明年的我们留一句话。", helper:"明年再打开时，希望这句话仍然有温度。", config:{ placeholder:"写给明年的你们……", multiline:true, maxLength:180 } },
  { id:"photo", type:"photo", creatorPrompt:"今年你最想珍藏的一张照片。", partnerPrompt:"今年你最想珍藏的一张照片。", helper:"上传 1 张图片，先为共同报告留一个位置。", config:{ maxSizeMb:5 } },
  { id:"future_activity", type:"text", creatorPrompt:"明年最想一起做的一件事是什么？", partnerPrompt:"明年最想一起做的一件事是什么？", helper:"写具体一点，看看你们会不会想到同一件事。", config:{ placeholder:"例如：一起学会潜水", multiline:false, maxLength:80 } },
  { id:"future_place", type:"text", creatorPrompt:"明年最想一起去的一个地方是？", partnerPrompt:"明年最想一起去的一个地方是？", helper:"可以是一座城市，也可以是一个小小的地点。", config:{ placeholder:"例如：大理", multiline:false, maxLength:60 } }
];
