const TOKEN = process.argv[2];
const WINPOST = {
    ownerId : -32445793,
    postId : 16685,
    winPostFullId : '', //for build id like -32445793_16685
}
WINPOST.winPostFullId = `${WINPOST.ownerId}_${WINPOST.postId}`;
const countForWin = 2000;

const { VK } = require('vk-io');

const vk = new VK();

vk.setToken(TOKEN);

let countOfComments = 0;

async function run() {

    while (countOfComments < countForWin-3){
        const response = await vk.api.wall.getById({
            posts: winPostFullId,
        }).catch(console.log) ;
        countOfComments = response[0].comments.count;
        console.log(countOfComments);

    }
    const tic = Date.now();

    vk.api.wall.createComment({
        owner_id: -32445793,
        post_id: 16685,
        message: 'поездка загород',
    }).then(
        response => {
            console.log(response);
            console.log(`first comment delay: ${Date.now()-tic}`);
        },
        error => {
            console.log(error);
        }
    );
    vk.api.wall.createComment({
        owner_id: -32445793,
        post_id: 16685,
        message: 'хочу посмотреть кино на фестивале',
    }).then(
        response => {
            console.log(response);
            console.log(`second comment delay: ${Date.now()-tic}`);
        },
        error => {
            console.log(error);
        }
    );
    vk.api.wall.createComment({
        owner_id: -32445793,
        post_id: 16685,
        message: 'пикник',
    }).then(
        response => {
            console.log(response);
            console.log(`third comment delay: ${Date.now()-tic}`);
            vk.api.wall.getById({
                posts: winPostId,
            }).then(
                response => {
                    console.log(response[0].comments.count)
                },
                error => {
                    console.log(error);
                }
            ).catch(console.log);
        },
        error => {
            console.log(error);
        }
    );
}

run().catch(console.log);