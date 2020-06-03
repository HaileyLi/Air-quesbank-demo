
import React from 'react';
import ReactDOM from 'react-dom';
import { Chat } from '@progress/kendo-react-conversational-ui';
import "./Bot.css";
import botReply from "./bot.json";
class Bot extends React.Component {
    constructor(props) {
        super(props);
        this.user = {
            id: 1,
            avatarUrl: "https://via.placeholder.com/24/008000/008000.png"
        };
        this.bot = { id: 0 };
        this.state = {
            messages: [
                {
                    author: this.bot,
                    suggestedActions: [
                        {
                            type: 'reply',
                            value: 'Who are you?'
                        }, {
                            type: 'reply',
                            value: 'Hello!'
                        }, {
                            type: 'reply',
                            value: 'Can you speak Chinese?'
                        },
                        {
                            type: 'reply',
                            value: 'What does this application do?'
                        },

                        {
                            type: 'reply',
                            value: 'Where can I generate a test paper?'
                        },
                        {
                            type: 'reply',
                            value: 'Where can I manage tags?'
                        },
                        {
                            type: 'reply',
                            value: 'Where can I manage all the questions?'
                        }
                    ],
                    timestamp: new Date(),
                    text: "Hello, I am Quesbot! There are some suggested questions:"
                }
            ]
        };
    }

    addNewMessage = (event) => {
        let botResponce = Object.assign({}, event.message);
        botResponce.text = this.countReplayLength(event.message.text);
        botResponce.author = this.bot;
        this.setState((prevState) => ({
            messages: [
                ...prevState.messages,
                event.message
            ]
        }));
        setTimeout(() => {
            this.setState(prevState => ({
                messages: [
                    ...prevState.messages,
                    botResponce
                ]
            }));
        }, 1000);
    };

    checkIncludes = (parent, substrs) => {
        for (var i = 0; i < substrs.length; i++) {
            var substr = substrs[i].toLowerCase();
            if (parent.toLowerCase().includes(substr)) {
                return true
            }
        }
        return false
    }

    randomGet = (arr) => {
        return arr[Math.floor(Math.random() * arr.length)]
    }

    countReplayLength = (question) => {
        var answer = this.randomGet(["Sorry, I don't understand.", "Try asking something simple",
            "I am so sorry.", "My mom is Hailey, contact her.", "I know I am too young to understand you.",
            "It’s All My Fault I couldn't understand you.", "Forgive me I dont understand you", "😃 Grinning Face With Big Eyes", "😄 Grinning Face With Smiling Eyes", "😁 Beaming Face With Smiling Eyes", "😆 Grinning Squinting Face", "😅 Grinning Face With Swe", "🤣 Rolling on the Floor Laughi", "😂 Face With Tears of J", "🙂 Slightly Smiling Fa", "🙃 Upside - Down Fa", "😉 Winking Fa", "😊 Smiling Face With Smiling Ey", "😇 Smiling Face With Ha", "😍 Smiling Face With Heart - Ey", "🤩 Star - Stru", "😘 Face Blowing a Ki", "😗 Kissing Fa", "😚 Kissing Face With Closed Ey", "😙 Kissing Face With Smiling Ey", "😋 Face Savoring Fo", "😛 Face With Tong", "😜 Winking Face With Tong", "🤪 Zany Fa", "😝 Squinting Face With Tong", "🤑 Money - Mouth Fa", "🤗 Hugging Fa", "🤭 Face With Hand Over Mou", "🤫 Shushing Fa", "🤔 Thinking Fa", "🤐 Zipper - Mouth Fa", "🤨 Face With Raised Eyebr", "😐 Neutral Fa", "😑 Expressionless Fa", "😶 Face Without Mou", "😏 Smirking Fa", "😒 Unamused Fa", "🙄 Face With Rolling Ey", "😬 Grimacing Fa", "🤥 Lying Fa", "😌 Relieved Fa", "😔 Pensive Fa", "😪 Sleepy Fa", "🤤 Drooling Fa", "😴 Sleeping Fa", "😷 Face With Medical Ma", "🤒 Face With Thermomet", "🤕 Face With Head - Banda", "🤢 Nauseated Fa", "🤮 Face Vomiti", "🤧 Sneezing Fa", "😵 Dizzy Face"]);
        const REGEX_CHINESE = /[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\u{20000}-\u{2a6df}]|[\u{2a700}-\u{2b73f}]|[\u{2b740}-\u{2b81f}]|[\u{2b820}-\u{2ceaf}]|[\uf900-\ufaff]|[\u3300-\u33ff]|[\ufe30-\ufe4f]|[\uf900-\ufaff]|[\u{2f800}-\u{2fa1f}]/u;

        if (this.checkIncludes(question, ["hi", "hello"])) answer = this.randomGet(["Nice meeting you", "How are you?", "How’s it going?", "How do you do?", "What’s up?"]);
        if (this.checkIncludes(question, ["your name"])) answer = "My name is Quesbot.";
        if (this.checkIncludes(question, ["questions", "i don't know", "i do not know"])) answer = "You can ask me questions related to this app";
        if (this.checkIncludes(question, ["help", "help me", "trouble", "problem", "babe", "baby", "dear"])) answer = "Do you need assistance? I'm here for you";
        if (this.checkIncludes(question, ["work", "job"])) answer = ["I am working for Quesbank", "Are you tired of working"][Math.floor(Math.random() * 2)];
        if (this.checkIncludes(question, ["do you"])) answer = ["Yes I do.", "No I don't.", "Take a guess.", "Maybe I do.", "I feel like I do."][Math.floor(Math.random() * 5)];
        if (this.checkIncludes(question, ["did you"])) answer = ["Yes I did.", "No I didn't.", "Take a guess.", "Maybe I did.", "I feel like I did."][Math.floor(Math.random() * 5)];
        if (this.checkIncludes(question, ["can you"])) answer = ["Yes I can.", "No I can't.", "Take a guess.", "Maybe I can.", "I feel like I can."][Math.floor(Math.random() * 5)];
        if (this.checkIncludes(question, ["why", "why do you", "why are you"])) answer = ["I don't really know", "You may need to contact my mom", "I suggest you not asking me this kinda hard question. I am only 1 year old"][Math.floor(Math.random() * 3)];
        if (this.checkIncludes(question, ["where", "where do you", "where did you"])) answer = ["I don't really know", "You may need to contact my mom", "I suggest you not asking me this kinda hard question. I am only 1 year old"][Math.floor(Math.random() * 3)];
        if (this.checkIncludes(question, ["who", "who are"])) answer = ["I don't really know", "You may need to contact my mom", "I suggest you not asking me this kinda hard question. I am only 1 year old"][Math.floor(Math.random() * 3)];
        if (this.checkIncludes(question, ["how", "how do you"])) answer = ["I don't really know", "You may need to contact my mom", "I suggest you not asking me this kinda hard question. I am only 1 year old"][Math.floor(Math.random() * 3)];
        if (this.checkIncludes(question, ["your age", "how are you"])) answer = "I was born in 2019, guess how old I am.";
        if (this.checkIncludes(question, ["happy", "nice"])) answer = this.randomGet(["Glad to hear!", "I'm happy for you."]);
        if (this.checkIncludes(question, ["sad", "cry", "bad"])) answer = ["Sorry to hear!", "Sorry My fault."][Math.floor(Math.random() * 2)];
        if (this.checkIncludes(question, ["woman", "man", "boy", "girl"])) answer = ["I am your robot friend", "I am a robot"][Math.floor(Math.random() * 2)];
        if (this.checkIncludes(question, ["good", "ok", "k", "great", "kk", "okay", "fine"])) answer = ["good", ":)", "ok", "perfect", "kk"][Math.floor(Math.random() * 5)];
        if (this.checkIncludes(question, ["no"])) answer = this.randomGet(["why", "what's wrong"]);
        if (this.checkIncludes(question, ["your mother", "your mom", "your parent", "your dad"])) answer = ["My mom is Hailey", "My mom Hailey is pretty"][Math.floor(Math.random() * 2)];
        if (this.checkIncludes(question, ["can you"])) answer = ["Yes I can.", "No I can't.", "Take a guess.", "Maybe I can.", "I feel like I can."][Math.floor(Math.random() * 5)];
        if (this.checkIncludes(question, ["kiki"])) answer = "I know Kiki, she is pretty";
        if (this.checkIncludes(question, ["chinese"])) answer = "你说啥";
        if (this.checkIncludes(question, ["generate"])) answer = "Clicking the printer icon at your left hand side nav bar will take you to the page.";
        if (this.checkIncludes(question, ["database"])) answer = "Clicking the database icon (under home) at your left hand side nav bar will take you to the page.";
        if (this.checkIncludes(question, ["tags"])) answer = "Clicking the pie chart icon at your left hand side nav bar will take you to the page.";
        if (this.checkIncludes(question, ["who are you"])) answer = "I am the robot who can answer your questions about this app!";
        if (this.checkIncludes(question, ["how are you"])) answer = ["😀 Grinning Face", "I am good! You?", "I am doing fine, you?", "I am good", "I am sad"][Math.floor(Math.random() * 4)];
        if (this.checkIncludes(question, ["hailey"])) answer = ["I love Hailey", "Hailey is my mom.", "Hailey is pretty", "Hailey GOGO!"][Math.floor(Math.random() * 4)];
        if (this.checkIncludes(question, ["bbox"])) answer = "pilipalapeng";
        if (this.checkIncludes(question, ["thank you", "thanks"])) answer = ["You are welcome", "no probelm", "I am glad I can help"][Math.floor(Math.random() * 3)];
        if (this.checkIncludes(question, ["sing", "song", "dance"])) answer = ["🎤 Karaoke🎤 "][Math.floor(Math.random() * 1)];
        if (this.checkIncludes(question, ["eat", "breakfast", "lunch", "dinner", "meal", "food", "meat", "hungry"])) answer = this.randomGet(["🍇 Grapes.", "🍈 Melon.", "🍉 Watermelon.", "🍊 Tangerine.", "🍋 Lemon.", "🍌 Banana.", "🍍 Pineapple."]);
        if (this.checkIncludes(question, ["what are you doing", "are you doing"])) answer = this.randomGet(["🙏 Folded Hands", "💅 Nail Polish", "✍ Writing", "👄 Loving you"]);
        if (this.checkIncludes(question, ["wear"])) answer = this.randomGet(["👔 Necktie", "👕 T-Shirt", "👖 Jeans", "🧣 Scarf", "🧤 Gloves", "🧥 Coat", "🧦 Socks", "👗 Dress", "👘 Kimono", "👙 Bikini", "👚 Woman’s Clothes", " 👛 Purse", " 👜 Handbag", " 👝 Clutch Bag", "  🎒 Backpack", "  👞 Man’s Shoe", "  👟 Running Shoe", " 👠 High-Heeled Shoe", " 👡 Woman’s Sandal", " 👢 Woman’s Boot"]);
        if (this.checkIncludes(question, ["want to", "going to"])) answer = this.randomGet(["GO! GO! GO!"]);
        if (this.checkIncludes(question, ["you know"])) answer = this.randomGet(["I know! Right?"]);
        if (this.checkIncludes(question, ["human"])) answer = this.randomGet(["I am robot"]);
        if (this.checkIncludes(question, ["quesbot"])) answer = this.randomGet(["What can I do for you?"]);
        if (this.checkIncludes(question, ["jack"])) answer = this.randomGet(["who is Jack", "are you Jack?"]);
        if (this.checkIncludes(question, ["my name is", "i am", "i'm"])) answer = "Hello, " + question.split('is ').pop();
        if (this.checkIncludes(question, ["manage", "add new"])) answer = this.randomGet(["Clicking the pie chart icon on the left nav bar will take you to the page"]);

        if (this.checkIncludes(question, ["joke"])) answer = this.randomGet(["I like turtle"]);
        if (this.checkIncludes(question, ["login"])) answer = this.randomGet(["login to your teacher account to use your own feature"]);
        if (this.checkIncludes(question, ["logout"])) answer = this.randomGet(["logout byebye"]);
        if (this.checkIncludes(question, ["signup"])) answer = this.randomGet(["You can only sign up as a teacher"]);
        if (this.checkIncludes(question, ["brian"])) answer = this.randomGet(["I know Brian.", "Brian is my dad."]);
        if (REGEX_CHINESE.test(question)) answer = ["别逗了", "哈哈", "你说的对", "我懂你", "你太厉害了", "为什么呢", "真好", "对"][Math.floor(Math.random() * 8)];

        switch (question) {
            case "Who are you?":
                answer = "I am the robot who can answer your questions about this app!"
                break;
            case "Hello!":
                answer = "Nice to meeting you! May I help you?"
                break;
            case "What does this application do?":
                answer = "This application helps teachers managing question database and generating test papers."
                break;
            case "Can you speak Chinese?":
                answer = "你好，我也可以说中文。"
                break;
            case "Where can I generate a test paper?":
                answer = "Clicking the printer icon at your left hand side nav bar will take you to the page."
                break;
            case "Where can I manage tags?":
                answer = "Clicking the pie chart icon at your left hand side nav bar will take you to the page."
                break;
            case "Where can I manage all the questions?":
                answer = "Clicking the database icon (under home) at your left hand side nav bar will take you to the page."
                break;
            case "you?":
                answer = "I am good"
                break;
            default:
                break;
        }

        return answer;

    }

    render() {
        return (
            <div>
                <Chat user={this.user}
                    messages={this.state.messages}
                    onMessageSend={this.addNewMessage}
                    placeholder={"Type a message..."}
                    width={400}>
                </Chat>
            </div>
        );
    }
}

export default Bot;
