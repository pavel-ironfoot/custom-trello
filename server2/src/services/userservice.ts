
import { Block, UserPost } from "../common/types-and-interfaces";
import { getCurrentTime, mergeObjects } from "../common/useful-functions";

export class UserService {

    allPosts: UserPost[][] = [
        [],
        [],
        [],
    ];

    blocks: Block[] = [
        { id: 'do', },
        { id: 'check', },
        { id: 'done', },
    ];

    postCounter: number = 1;

    async showDonePosts(num: string) {
        return this.allPosts[Number(num)];
    }

    async changePostStatus(start: string, end: string,) {

        let startValue: any = {
            id: 0,
            description: '',
            title: '',
            status: '',
        };
        let startNumber = 0;
        let index = 77;
        let foundStart = 77;
        let foundEnd = 77;

        this.allPosts.map((elem, j) => {
            elem.map((el, i) => {
                if (el.id === Number(start)) {
                    startValue = { ...el };
                    startNumber = i;

                    foundStart = j;

                }

                if (el.id === Number(end)) {

                    index = elem.findIndex(obj => obj.id === Number(end));
                    foundEnd = j;

                }
            });
        })
        this.allPosts[foundStart].splice(startNumber, 1);
        this.allPosts[foundEnd].splice(index, 0, startValue);

        return startValue;
    }

    async changePostStatusArea(start: string, statusblock: string) {
        let status = 0;
        this.blocks.map((elem, index) => {
            if (elem.id === statusblock) {
                status = index;
            }
        });

        let startValue: any = {
            id: 0,
            title: '',
            description: '',
            status: '',
            members: '',
            comments: '',
            duedate: '',
            estimatedtime: '',
            remainingtime: '',
        };
        let startNumber = 0;
        let foundStart = 77;

        this.allPosts.map((elem, j) => {
            elem.map((el, i) => {
                if (el.id === Number(start)) {
                    startValue = { ...el };
                    startNumber = i;
                    foundStart = j;
                }
            })
        });
        this.allPosts[status].push(startValue);
        this.allPosts[foundStart].splice(startNumber, 1);

        return startValue;
    }

    async blocksCards() {
        return this.blocks;
    }

    async setBlocksCards(start: string, end: string) {
        let startIndex = 0;
        let endIndex = 0;

        const newCardList = this.blocks.map((elem, index) => {
            if (start === elem.id) {
                elem = { ...elem, id: end };
                startIndex = index;
                return elem;
            }
            if (end === elem.id) {
                elem = { ...elem, id: start };
                endIndex = index;
                return elem;
            }

            return elem;
        })
        this.blocks = newCardList;
        let arr: any = [];
        const temp: any = this.allPosts[startIndex];
        this.allPosts[startIndex] = this.allPosts[endIndex];
        this.allPosts[endIndex] = temp;

        return this.blocks;
    }

    async deleteUserPost(postId: string,) {
        let n = 0;
        let deletePostId = 0;

        this.allPosts.forEach((elem, index) => {
            elem.forEach((el, i) => {
                if (el.id === Number(postId)) {
                    console.log('find');
                    n = index;
                    deletePostId = i;
                }
            });
        });

        this.allPosts[n] = this.allPosts[n].filter((el, i) => i !== deletePostId);

        console.log(`user posts = ${JSON.stringify(this.allPosts[n])}`);
    }

    async createBlock(status: string) {
        let stop = false;
        this.blocks.map((elem) => {
            if (elem.id === status) {
                stop = true;
            }
        });
        if (stop) {
            return this.blocks;
        }
        this.blocks.push({ id: status });
        this.allPosts.push([]);
        console.log(this.blocks);
        return this.blocks;
    }

    async deleteBlock(status: string) {
        let ind = 0;
        this.blocks.map((elem, index) => {
            if (elem.id === status) {
                ind = index;
            }
        });
        this.allPosts.splice(ind, 1);
        this.blocks.splice(ind, 1);
        console.log(this.blocks);
        return this.blocks;
    }

    async createPost(stat: string, todoTitle: string, description: string, members: string, comments: string, duedate: string) {
        const dateNow = Date.now();
        const userPost: UserPost = {
            id: this.postCounter,
            title: todoTitle,
            description,
            status: stat,
            members,
            comments,
            duedate,
            timeNow: dateNow,
            estimatedtime: '',
            remainingtime: '',
        }
        console.log(userPost.timeNow)
        let index = 0;

        this.blocks.map((elem, ind) => {
            if (elem.id === stat) {
                index = ind;
            }
        });

        this.allPosts[index].push(userPost);
        this.postCounter++;
        console.log(`user posts = ${JSON.stringify(this.allPosts[index])}`);
        return userPost;
    }

    async editPost(postid: string, title: string, description: string, members: string, comments: string,) {
        let i = 0;
        let j = 0;

        const userPost: UserPost = {
            title,
            description,
            members,
            comments,
        }

        this.allPosts.map((elem, index) => {
            elem.map((el, ind) => {
                if (el.id === Number(postid)) {
                    j = index;
                    i = ind;
                }
            })
        })
        this.allPosts[j][i]

        const newPost = mergeObjects(this.allPosts[j][i], userPost);

        this.allPosts[j][i] = { ...newPost };

        console.log(`user posts = ${JSON.stringify(newPost)}`);
        return newPost;
    }

}

export const userService = new UserService();