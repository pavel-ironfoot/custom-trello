import express, { Request, Response, NextFunction } from "express";
import { userService } from "../services";

export class UserController {
    router: any = express.Router();
    constructor() {

        this.router.get('/', (req: Request, res: Response, next: NextFunction) => {
            res.send('start');
        });

        this.router.get('/main-blocks', this.showBlocks);
        this.router.post('/main-blocks/:status', this.addNewBlocks);
        this.router.delete('/main-blocks/:status', this.deleteOneBlock);

        this.router.patch('/main-blocks/:start/:end', this.setBlocks);

        this.router.get('/post-category/:index', this.donePosts);

        this.router.patch('/posts/:start/:end/', this.changeStatus);
        this.router.patch('/posts-area/:start/:statusblock', this.changeStatusArea);
        this.router.delete('/post/:postId/', this.deletePost);

        this.router.post('/create-post', this.addPost);
        this.router.patch('/create-post/:postid', this.editPost);

    }

    addPost = async (req: Request, res: Response, next: NextFunction) => {
        const { stat, todoTitle, description, members, comments, duedate, } = req.body;
        const post = await userService.createPost(stat, todoTitle, description, members, comments, duedate);
        res.send(post);
    }

    editPost = async (req: Request, res: Response, next: NextFunction) => {
        const { todoTitleEdit, descriptionEdit, membersEdit, commentsEdit, } = req.body;
        const post = await userService.editPost(req.params.postid, todoTitleEdit, descriptionEdit, membersEdit, commentsEdit,);
        res.send(post);
    }

    showBlocks = async (req: Request, res: Response, next: NextFunction) => {
        const showBlocks = await userService.blocksCards();
        res.send(showBlocks);
    }

    setBlocks = async (req: Request, res: Response, next: NextFunction) => {
        const showBlocks = await userService.setBlocksCards(req.params.start, req.params.end);
        res.send(showBlocks);
    }

    addNewBlocks = async (req: Request, res: Response, next: NextFunction) => {
        const showBlocks = await userService.createBlock(req.params.status);
        res.send(showBlocks);
    }

    deleteOneBlock = async (req: Request, res: Response, next: NextFunction) => {
        const showBlocks = await userService.deleteBlock(req.params.status);
        res.send(showBlocks);
    }

    donePosts = async (req: Request, res: Response, next: NextFunction) => {
        const allPosts = await userService.showDonePosts(req.params.index);
        res.send(allPosts);
    }

    changeStatus = async (req: Request, res: Response, next: NextFunction) => {
        const updatePost = await userService.changePostStatus(req.params.start, req.params.end,);
        res.send(updatePost);
    }

    changeStatusArea = async (req: Request, res: Response, next: NextFunction) => {
        const updatePost = await userService.changePostStatusArea(req.params.start, req.params.statusblock,);
        res.send(updatePost);
    }

    deletePost = async (req: Request, res: Response, next: NextFunction) => {
        const deletePost = await userService.deleteUserPost(req.params.postId,);
        deletePost;
        res.send('post delete');
    }

}

export const usercontroller = new UserController();

